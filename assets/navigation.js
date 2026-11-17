(() => {
// Content is rendered in HTML. These controls are progressive enhancements.
const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
function updateThemeLabel() {
  themeButton.setAttribute('aria-label', root.dataset.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
}
themeButton.hidden = false;
updateThemeLabel();
themeButton.addEventListener('click', () => {
  const dark = root.dataset.theme !== 'dark';
  if (dark) root.dataset.theme = 'dark';
  else delete root.dataset.theme;
  try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (_) {}
  updateThemeLabel();
});

const menuButton = document.querySelector('.menu-toggle');
const menu = document.getElementById('nav-links');
menuButton.hidden = false;
function closeMenu() {
  menu.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = 'Menu';
}
menuButton.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? 'Close' : 'Menu';
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => {
  if (!menu.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.classList.contains('is-open')) {
    closeMenu();
    menuButton.focus();
  }
});

})();
