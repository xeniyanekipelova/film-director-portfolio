const toggle = document.querySelector(".nav-toggle, .home-toggle");
const nav = document.querySelector(".nav, .home-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
}

const cursor = document.querySelector(".cursor");

if (cursor && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  window.addEventListener("mousemove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });

  document.querySelectorAll(".js-view").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("is-view"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("is-view"));
  });
}
