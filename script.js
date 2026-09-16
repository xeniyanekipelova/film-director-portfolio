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

// Keep photographic previews on the current page, including cropped documentation.
const viewer = document.createElement('dialog');
viewer.className = 'photo-viewer';
viewer.setAttribute('aria-label', ru ? 'Просмотр фотографии' : 'Photo preview');
const closePhoto = document.createElement('button');
closePhoto.className = 'photo-close';
closePhoto.type = 'button';
closePhoto.textContent = '×';
closePhoto.setAttribute('aria-label', ru ? 'Закрыть' : 'Close');
const photoContent = document.createElement('div');
photoContent.className = 'photo-content';
viewer.append(closePhoto, photoContent);
document.body.append(viewer);
let photoTrigger;
function openPhoto(img) {
  photoTrigger = img;
  const crop = img.closest('.document-crop, .construction-crop');
  const copy = (crop || img).cloneNode(true);
  copy.removeAttribute('tabindex');
  copy.removeAttribute('role');
  copy.querySelectorAll('[tabindex]').forEach(el => el.removeAttribute('tabindex'));
  photoContent.replaceChildren(copy);
  if (crop) {
    const ratio = crop.getBoundingClientRect().width / crop.getBoundingClientRect().height;
    copy.style.width = `min(88vw, ${80 * ratio}vh, 1200px)`;
    copy.style.maxWidth = 'none';
  }
  viewer.showModal();
  document.body.classList.add('photo-open');
  closePhoto.focus();
}
closePhoto.addEventListener('click', () => viewer.close());
viewer.addEventListener('click', e => { if (e.target === viewer || e.target === photoContent) viewer.close(); });
viewer.addEventListener('close', () => {
  document.body.classList.remove('photo-open');
  photoTrigger?.focus({preventScroll:true});
  photoContent.replaceChildren();
});
document.querySelectorAll('main:not([data-project-index]) img').forEach(img => {
  img.tabIndex = 0;
  img.setAttribute('role', 'button');
  img.setAttribute('aria-haspopup', 'dialog');
  img.setAttribute('aria-label', (ru ? 'Увеличить: ' : 'Enlarge: ') + (img.alt || (ru ? 'фотографию' : 'photo')));
  img.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); openPhoto(img); });
  img.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); openPhoto(img); }
  });
  const link = img.closest('a');
  if (link && /\.(jpg|jpeg|png|webp)(\?.*)?$/i.test(link.getAttribute('href') || '')) {
    link.removeAttribute('target');
    link.addEventListener('click', e => { e.preventDefault(); openPhoto(img); });
  }
});
