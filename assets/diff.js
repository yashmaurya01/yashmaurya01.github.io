// Settings
const ignoreWhitespace = document.getElementById('ignore-whitespace');
const ignoreCase = document.getElementById('ignore-case');
const leftText = document.getElementById('left-text');
const rightText = document.getElementById('right-text');
const compareBtn = document.getElementById('compare-btn');
const diffOutput = document.getElementById('diff-output');
const sideBySideBtn = document.getElementById('side-by-side-btn');
const unifiedBtn = document.getElementById('unified-btn');
const copyBtn = document.getElementById('copy-diff');
let currentMode = 'side';

function processLines(text) {
    let lines = text.split(/\r?\n/);
    if (ignoreWhitespace.checked) {
        lines = lines.map(l => l.trim());
    }
    if (ignoreCase.checked) {
        lines = lines.map(l => l.toLowerCase());
    }
    return lines;
}

function wordDiff(a, b) {
    // Simple word diff: highlight words in b not in a (added), and in a not in b (removed)
    const aWords = a.split(/(\s+)/);
    const bWords = b.split(/(\s+)/);
    let resultA = '', resultB = '';
    let i = 0, j = 0;
    while (i < aWords.length || j < bWords.length) {
        if (i < aWords.length && j < bWords.length && aWords[i] === bWords[j]) {
            resultA += escapeHTML(aWords[i]);
            resultB += escapeHTML(bWords[j]);
            i++; j++;
        } else if (j < bWords.length && !aWords.includes(bWords[j])) {
            resultB += `<span class='diff-word-added'>${escapeHTML(bWords[j])}</span>`;
            j++;
        } else if (i < aWords.length && !bWords.includes(aWords[i])) {
            resultA += `<span class='diff-word-removed'>${escapeHTML(aWords[i])}</span>`;
            i++;
        } else {
            // fallback: just show as changed
            if (i < aWords.length) {
                resultA += `<span class='diff-word-removed'>${escapeHTML(aWords[i])}</span>`;
                i++;
            }
            if (j < bWords.length) {
                resultB += `<span class='diff-word-added'>${escapeHTML(bWords[j])}</span>`;
                j++;
            }
        }
    }
    return [resultA, resultB];
}

function compareTexts(left, right) {
    // Improved line-by-line diff using LCS for better accuracy
    const l = processLines(left);
    const r = processLines(right);
    // LCS table
    const m = l.length, n = r.length;
    const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (l[i] === r[j]) dp[i][j] = 1 + dp[i + 1][j + 1];
            else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
        }
    }
    let i = 0, j = 0;
    let diff = [];
    while (i < m && j < n) {
        if (l[i] === r[j]) {
            diff.push({ type: 'unchanged', left: l[i], right: r[j], i, j });
            i++; j++;
        } else if (dp[i + 1][j] >= dp[i][j + 1]) {
            diff.push({ type: 'removed', left: l[i], right: '', i, j: null });
            i++;
        } else {
            diff.push({ type: 'added', left: '', right: r[j], i: null, j });
            j++;
        }
    }
    while (i < m) {
        diff.push({ type: 'removed', left: l[i], right: '', i, j: null });
        i++;
    }
    while (j < n) {
        diff.push({ type: 'added', left: '', right: r[j], i: null, j });
        j++;
    }
    // Mark changed lines (removed followed by added)
    let finalDiff = [];
    for (let k = 0; k < diff.length; k++) {
        if (diff[k].type === 'removed' && diff[k + 1] && diff[k + 1].type === 'added') {
            finalDiff.push({
                type: 'changed',
                left: diff[k].left,
                right: diff[k + 1].right,
                i: diff[k].i,
                j: diff[k + 1].j
            });
            k++; // skip next
        } else {
            finalDiff.push(diff[k]);
        }
    }
    return finalDiff;
}

function charDiff(a, b) {
    const m = a.length, n = b.length;
    const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (a[i] === b[j]) dp[i][j] = 1 + dp[i + 1][j + 1];
            else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
        }
    }
    let i = 0, j = 0;
    let outA = '', outB = '';
    while (i < m && j < n) {
        if (a[i] === b[j]) {
            outA += escapeHTML(a[i]);
            outB += escapeHTML(b[j]);
            i++; j++;
        } else if (dp[i + 1][j] >= dp[i][j + 1]) {
            outA += `<span class="diff-char-removed">${escapeHTML(a[i])}</span>`;
            i++;
        } else {
            outB += `<span class="diff-char-added">${escapeHTML(b[j])}</span>`;
            j++;
        }
    }
    while (i < m) {
        outA += `<span class="diff-char-removed">${escapeHTML(a[i])}</span>`;
        i++;
    }
    while (j < n) {
        outB += `<span class="diff-char-added">${escapeHTML(b[j])}</span>`;
        j++;
    }
    return [outA, outB];
}

function generateDiffHTML(diff, mode) {
    if (mode === 'side') {
        let html = '<table class="diff-table"><caption class="sr-only">Original and revised text, side by side</caption><colgroup><col class="number-column"><col><col class="number-column"><col></colgroup>';
        html += '<tr><th></th><th>Left</th><th></th><th>Right</th></tr>';
        diff.forEach((d, idx) => {
            html += `<tr class="${d.type}">`;
            html += `<td class="line-num">${d.i !== null && d.i !== undefined ? d.i + 1 : ''}</td>`;
            if (d.type === 'changed') {
                const [leftHTML, rightHTML] = charDiff(d.left, d.right);
                html += `<td>${leftHTML}</td>`;
                html += `<td class="line-num">${d.j !== null && d.j !== undefined ? d.j + 1 : ''}</td>`;
                html += `<td>${rightHTML}</td>`;
            } else {
                html += `<td>${d.left !== undefined ? escapeHTML(d.left) : ''}</td>`;
                html += `<td class="line-num">${d.j !== null && d.j !== undefined ? d.j + 1 : ''}</td>`;
                html += `<td>${d.right !== undefined ? escapeHTML(d.right) : ''}</td>`;
            }
            html += '</tr>';
        });
        html += '</table>';
        return html;
    } else {
        // Unified view
        let html = '<table class="diff-table"><caption class="sr-only">Unified text differences</caption><colgroup><col class="marker-column"><col class="number-column"><col></colgroup>';
        diff.forEach((d, idx) => {
            let marker = d.type === 'added' ? '+' : d.type === 'removed' ? '-' : d.type === 'changed' ? '~' : ' ';
            html += `<tr class="${d.type}">`;
            html += `<td class="marker">${marker}</td>`;
            html += `<td class="line-num">${d.i !== null && d.i !== undefined ? d.i + 1 : (d.j !== null && d.j !== undefined ? d.j + 1 : '')}</td>`;
            if (d.type === 'changed') {
                const [leftHTML, rightHTML] = charDiff(d.left, d.right);
                html += `<td>${leftHTML}</td>`;
                html += '</tr>';
                html += `<tr class="${d.type}"><td class="marker">~</td><td class="line-num">${d.j + 1}</td><td>${rightHTML}</td></tr>`;
            } else {
                html += `<td>${escapeHTML(d.type === 'added' ? d.right : d.left)}</td>`;
                html += '</tr>';
            }
        });
        html += '</table>';
        return html;
    }
}

function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#39;' }[c];
    });
}

function doCompare() {
    const left = leftText.value;
    const right = rightText.value;
    const diff = compareTexts(left, right);
    diffOutput.innerHTML = generateDiffHTML(diff, currentMode);
    copyBtn.disabled = !left && !right;
    document.getElementById('diff-status').textContent = left === right ? 'The texts are identical.' : diff.every(line => line.type === 'unchanged') ? 'The texts match with the current settings.' : 'Differences shown below.';
}

compareBtn.onclick = doCompare;
ignoreWhitespace.onchange = doCompare;
ignoreCase.onchange = doCompare;
leftText.oninput = rightText.oninput = function () {
    diffOutput.innerHTML = '';
    copyBtn.disabled = true;
    document.getElementById('diff-status').textContent = '';
};
sideBySideBtn.onclick = function () {
    currentMode = 'side';
    sideBySideBtn.classList.add('active');
    unifiedBtn.classList.remove('active');
    sideBySideBtn.setAttribute('aria-pressed', 'true');
    unifiedBtn.setAttribute('aria-pressed', 'false');
    doCompare();
};
unifiedBtn.onclick = function () {
    currentMode = 'unified';
    unifiedBtn.classList.add('active');
    sideBySideBtn.classList.remove('active');
    unifiedBtn.setAttribute('aria-pressed', 'true');
    sideBySideBtn.setAttribute('aria-pressed', 'false');
    doCompare();
};
copyBtn.onclick = async function () {
    try {
        await navigator.clipboard.writeText(diffOutput.innerText);
        document.getElementById('diff-status').textContent = 'Diff copied.';
    } catch (_) {
        document.getElementById('diff-status').textContent = 'Copy unavailable. Select and copy the result below.';
    }
};
