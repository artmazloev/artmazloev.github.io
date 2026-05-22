// Sticky header shadow
const header = document.getElementById("header");
const onScroll = () => {
  if (window.scrollY > 8) header.classList.add("is-scrolled");
  else header.classList.remove("is-scrolled");
};
document.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Reveal on scroll — progressive enhancement only.
// Content is visible by default; JS adds subtle entry animation.
const supportsIO = "IntersectionObserver" in window;
const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

if (supportsIO && !prefersReduced) {
  const revealTargets = document.querySelectorAll(
    ".hero__copy, .hero__portrait, .section__head, .section__body, .card, .tile, .timeline, .contact__inner, .edu, .certs"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = `${Math.min(i * 40, 200)}ms`;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -10% 0px" }
  );
  revealTargets.forEach((el) => io.observe(el));
}

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
