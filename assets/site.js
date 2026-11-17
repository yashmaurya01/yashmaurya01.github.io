// Follow research topics across years without changing the default full archive.
const topicControls = document.querySelector('.research-topics');
const researchPapers = [...document.querySelectorAll('.paper')];
const researchYears = [...document.querySelectorAll('.research-year')];
const topicButtons = [...topicControls.querySelectorAll('[data-topic]')];
const filterStatus = document.getElementById('research-filter-status');
function filterResearch(topic) {
  let count = 0;
  researchPapers.forEach(paper => {
    paper.hidden = topic !== 'all' && !paper.dataset.topics.split(' ').includes(topic);
    if (!paper.hidden) count += 1;
  });
  researchYears.forEach(year => {
    year.hidden = !year.querySelector('.paper:not([hidden])');
    document.querySelector('.year-index a[href="#' + year.id + '"]').hidden = year.hidden;
  });
  topicButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.topic === topic)));
  const label = topicButtons.find(button => button.dataset.topic === topic).textContent;
  filterStatus.textContent = topic === 'all' ? 'Showing all ' + count + ' research entries.' : 'Showing ' + count + ' research entries in ' + label + '.';
}
topicButtons.forEach(button => button.addEventListener('click', () => filterResearch(button.dataset.topic)));
topicControls.hidden = false;
// News links and direct paper anchors should always reveal their target.
function revealResearchTarget(hash) {
  const target = document.getElementById(hash.slice(1));
  const paper = target?.closest('.paper');
  if (paper?.hidden) {
    filterResearch('all');
    return target;
  }
}
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => revealResearchTarget(link.getAttribute('href')));
});
window.addEventListener('hashchange', () => {
  const target = revealResearchTarget(window.location.hash);
  if (target) target.scrollIntoView({block: 'start'});
});

// Keep the contact action local: copy the address without opening a mail client.
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch (_) {
    const field = document.createElement('textarea');
    field.value = text;
    field.readOnly = true;
    field.style.cssText = 'position:fixed;inset:0 auto auto -9999px;opacity:0';
    document.body.appendChild(field);
    field.select();
    try {
      if (!document.execCommand('copy')) throw new Error('Copy unavailable');
    } finally {
      field.remove();
    }
  }
}

const emailButton = document.getElementById('copy-email');
const emailLabel = emailButton.querySelector('.action-label');
const emailStatus = document.getElementById('email-status');
let emailTimer;
emailButton.hidden = false;
emailButton.addEventListener('click', async () => {
  clearTimeout(emailTimer);
  try {
    await copyText(emailButton.dataset.email);
    emailLabel.textContent = 'Copied';
    emailButton.setAttribute('aria-label', 'Email address copied');
    emailStatus.classList.add('sr-only');
    emailStatus.textContent = 'Email address copied to clipboard';
    emailButton.focus({preventScroll: true});
  } catch (_) {
    emailStatus.classList.remove('sr-only');
    emailStatus.textContent = emailButton.dataset.email;
  }
  emailTimer = setTimeout(() => {
    emailLabel.textContent = 'Email';
    emailButton.setAttribute('aria-label', 'Copy email address');
    emailStatus.textContent = '';
  }, 2500);
});

const bioButton = document.getElementById('copy-bio');
const bioDetails = document.getElementById('speaker-bio-details');
function revealLinkedBio() {
  if (window.location.hash === '#speaker-bio') bioDetails.open = true;
}
document.querySelectorAll('a[href="#speaker-bio"]').forEach(link => {
  link.addEventListener('click', () => { bioDetails.open = true; });
});
window.addEventListener('hashchange', revealLinkedBio);
revealLinkedBio();

// Keep figures on the page, with a fallback for browsers without native dialogs.
const figurePreview = document.getElementById('figure-preview');
{
  const nativeDialog = typeof figurePreview.showModal === 'function';
  const previewBackdrop = document.getElementById('preview-backdrop');
  const previewImage = figurePreview.querySelector('.preview-image');
  const previewTitle = document.getElementById('figure-preview-title');
  const previewSource = figurePreview.querySelector('.preview-source');
  const previewClose = figurePreview.querySelector('.preview-close');
  let previewTrigger;
  let inertElements = [];
  function finishPreview() {
    document.body.classList.remove('preview-open');
    previewBackdrop.hidden = true;
    figurePreview.classList.remove('preview-fallback');
    inertElements.forEach(element => { element.inert = false; });
    inertElements = [];
    previewImage.removeAttribute('src');
    previewTrigger?.focus({preventScroll: true});
  }
  function closePreview() {
    if (nativeDialog) figurePreview.close();
    else {
      figurePreview.removeAttribute('open');
      finishPreview();
    }
  }
  document.querySelectorAll('.figure-link').forEach(link => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.setAttribute('aria-controls', 'figure-preview');
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      previewTrigger = link;
      previewImage.src = link.href;
      previewImage.alt = link.querySelector('img').alt;
      previewTitle.textContent = link.closest('.paper').querySelector('h4').textContent;
      previewSource.href = link.closest('figure').querySelector('figcaption a').href;
      if (nativeDialog) figurePreview.showModal();
      else {
        figurePreview.setAttribute('role', 'dialog');
        figurePreview.setAttribute('aria-modal', 'true');
        figurePreview.setAttribute('open', '');
        figurePreview.classList.add('preview-fallback');
        previewBackdrop.hidden = false;
        inertElements = [...document.body.children].filter(element => element !== figurePreview && element !== previewBackdrop && !element.inert);
        inertElements.forEach(element => { element.inert = true; });
        previewClose.focus({preventScroll: true});
      }
      document.body.classList.add('preview-open');
    });
  });
  previewClose.addEventListener('click', closePreview);
  previewBackdrop.addEventListener('click', closePreview);
  figurePreview.addEventListener('click', event => {
    if (event.target !== figurePreview) return;
    const bounds = figurePreview.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closePreview();
  });
  figurePreview.addEventListener('close', finishPreview);
  document.addEventListener('keydown', event => {
    if (nativeDialog || !figurePreview.hasAttribute('open')) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closePreview();
    } else if (event.key === 'Tab') {
      if (event.shiftKey && document.activeElement === previewClose) {
        event.preventDefault();
        previewSource.focus();
      } else if (!event.shiftKey && document.activeElement === previewSource) {
        event.preventDefault();
        previewClose.focus();
      }
    }
  });
}

const status = document.getElementById('copy-status');
let statusTimer;
bioButton.hidden = false;
bioButton.addEventListener('click', async () => {
  clearTimeout(statusTimer);
  try {
    await copyText(document.getElementById('bio-text').textContent);
    status.textContent = 'Bio copied';
    bioButton.firstChild.textContent = 'Copied ';
  } catch (_) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(document.getElementById('bio-text'));
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = 'Bio selected. Copy it, or download the text file.';
  }
  statusTimer = setTimeout(() => {
    status.textContent = '';
    bioButton.firstChild.textContent = 'Copy bio ';
  }, 5000);
});
