(() => {
  const selected = new Set();
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const entries = [...document.querySelectorAll('.reading-item')];
  const reset = document.getElementById('clear-filters');
  const count = document.getElementById('result-count');
  function filter() {
    let visible = 0;
    entries.forEach(entry => {
      const topics = JSON.parse(entry.dataset.topics);
      entry.hidden = selected.size > 0 && !topics.some(topic => selected.has(topic));
      if (!entry.hidden) visible += 1;
    });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(selected.has(button.dataset.filter))));
    count.textContent = `${visible} reading${visible === 1 ? '' : 's'}`;
    document.getElementById('reading-empty').hidden = visible > 0;
    reset.disabled = selected.size === 0;
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.filter;
    if (selected.has(key)) selected.delete(key);
    else selected.add(key);
    filter();
  }));
  reset.addEventListener('click', () => {
    selected.clear();
    filter();
  });
  document.querySelector('.filter-sidebar').hidden = false;
})();
