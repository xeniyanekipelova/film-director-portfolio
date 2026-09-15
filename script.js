const toggle = document.querySelector('.nav-toggle, .home-toggle');
const nav = document.querySelector('.nav, .home-nav');
const ru = document.documentElement.lang === 'ru';
if (toggle && nav) {
  const close = () => { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', ru ? 'Открыть меню' : 'Open menu'); };
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', ru ? (open ? 'Закрыть меню' : 'Открыть меню') : (open ? 'Close menu' : 'Open menu'));
  });
  nav.addEventListener('click', e => { if(e.target.closest('a')) close(); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && nav.classList.contains('is-open')) { close(); toggle.focus(); } });
}
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
