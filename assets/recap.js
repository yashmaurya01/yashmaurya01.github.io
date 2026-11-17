function escapeHTML(text) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getParams() {
  const p = new URLSearchParams(window.location.search);
  return {
    set: p.get('set'),
    mode: p.get('mode') || 'flashcards'
  };
}

const params = getParams();
const data = window.READING_DATA;

const article = data.articles.find((a) => a.id === params.set) || null;
const quiz = article ? data.quizzes[article.id] : null;
let cards = article ? [...(data.flashcards[article.id] || [])] : [];

const pageTitle = document.getElementById('page-title');
const pageSubtitle = document.getElementById('page-subtitle');
const hubSection = document.getElementById('hub-section');
const hubList = document.getElementById('hub-list');

const flashcardsSection = document.getElementById('flashcards-section');
const quizSection = document.getElementById('quiz-section');

const cardLabel = document.getElementById('card-face-label');
const cardText = document.getElementById('card-text');
const cardIndex = document.getElementById('card-index');

let currentCard = 0;
let showingBack = false;

function renderHub() {
  hubList.innerHTML = data.articles.map((a) => {
    return `<a href="quiz.html?set=${encodeURIComponent(a.id)}&amp;mode=flashcards">${escapeHTML(a.title)} (${escapeHTML(a.venue)})</a>`;
  }).join('');
}

function setMode(mode) {
  document.querySelectorAll('.mode-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
    btn.setAttribute('aria-pressed', String(btn.dataset.mode === mode));
  });

  flashcardsSection.classList.toggle('hidden', mode !== 'flashcards');
  quizSection.classList.toggle('hidden', mode !== 'quiz');
}

function renderCard() {
  if (!cards.length) {
    cardLabel.textContent = 'No Cards';
    cardText.textContent = 'No flashcards are available for this reading yet.';
    cardIndex.textContent = 'Card 0/0';
    return;
  }

  const card = cards[currentCard];
  cardLabel.textContent = showingBack ? 'Answer' : 'Question';
  cardText.textContent = showingBack ? card.back : card.front;
  cardIndex.textContent = `Card ${currentCard + 1}/${cards.length}`;
}

function renderQuiz(setQuiz) {
  const root = document.getElementById('quiz-root');
  root.innerHTML = '';
  setQuiz.questions.forEach((q, i) => {
    const card = document.createElement('article');
    card.className = 'q-card';
    card.innerHTML = `
      <h2 class="q-title" id="question-${i}">${i + 1}. ${escapeHTML(q.prompt)}</h2>
      <div class="q-options" role="radiogroup" aria-labelledby="question-${i}">
        ${q.options.map((opt, j) => `<label><input type="radio" name="q-${i}" value="${j}"> ${escapeHTML(opt)}</label>`).join('')}
      </div>
      <div class="feedback" id="fb-${i}"></div>
    `;
    root.appendChild(card);
  });
}

function gradeQuiz(setQuiz) {
  let correct = 0;
  const total = setQuiz.questions.length;

  setQuiz.questions.forEach((q, i) => {
    const fb = document.getElementById(`fb-${i}`);
    fb.className = 'feedback';

    const selected = document.querySelector(`input[name="q-${i}"]:checked`);
    if (!selected) {
      fb.textContent = 'No option selected yet.';
      return;
    }

    const picked = Number(selected.value);
    if (picked === q.answer) {
      correct += 1;
      fb.classList.add('ok');
      fb.textContent = q.feedback;
    } else {
      fb.classList.add('bad');
      fb.textContent = `Not quite. ${q.feedback}`;
    }
  });

  const summary = document.getElementById('summary');
  const pct = Math.round((correct / total) * 100);
  summary.classList.add('show');
  summary.innerHTML = `<strong>Score:</strong> ${correct}/${total} (${pct}%).`;
}

function resetQuiz() {
  if (!article) return;
  window.location.href = `quiz.html?set=${encodeURIComponent(article.id)}&mode=quiz`;
}



if (!article || !quiz) {
  pageTitle.textContent = 'Recap Studio';
  pageSubtitle.textContent = 'Choose a reading to revisit with flashcards or a quiz.';
  hubSection.classList.remove('hidden');
  flashcardsSection.classList.add('hidden');
  quizSection.classList.add('hidden');
  document.getElementById('mode-row').classList.add('hidden');
  renderHub();
} else {
  pageTitle.textContent = article.title;
  pageSubtitle.textContent = `${article.venue} · ${article.published}`;

  document.querySelectorAll('.mode-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      const url = `quiz.html?set=${encodeURIComponent(article.id)}&mode=${encodeURIComponent(mode)}`;
      window.history.replaceState({}, '', url);
      setMode(mode);
    });
  });

  setMode(params.mode === 'quiz' ? 'quiz' : 'flashcards');

  renderCard();
  renderQuiz(quiz);

  document.getElementById('flashcard-stage').addEventListener('click', () => {
    showingBack = !showingBack;
    renderCard();
  });

  document.getElementById('next-card').addEventListener('click', () => {
    if (!cards.length) return;
    currentCard = (currentCard + 1) % cards.length;
    showingBack = false;
    renderCard();
  });

  document.getElementById('prev-card').addEventListener('click', () => {
    if (!cards.length) return;
    currentCard = (currentCard - 1 + cards.length) % cards.length;
    showingBack = false;
    renderCard();
  });

  document.getElementById('shuffle-cards').addEventListener('click', () => {
    cards = shuffleArray(cards);
    currentCard = 0;
    showingBack = false;
    renderCard();
  });

  document.getElementById('grade-btn').addEventListener('click', () => gradeQuiz(quiz));
  document.getElementById('reset-btn').addEventListener('click', resetQuiz);
}
