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

// Blog category filter (/blog/ page)
(function () {
  const filterBtns = document.querySelectorAll(".blog-filter__btn");
  const cards = document.querySelectorAll(".posts--list .post-card");
  if (!filterBtns.length || !cards.length) return;

  const applyFilter = (cat) => {
    cards.forEach((card) => {
      const cats = (card.dataset.cats || "").split(/\s+/);
      const visible = cat === "all" || cats.includes(cat);
      card.classList.toggle("is-hidden", !visible);
    });
    filterBtns.forEach((b) => b.classList.toggle("is-active", b.dataset.cat === cat));
    // sync URL
    const url = new URL(window.location.href);
    if (cat === "all") url.searchParams.delete("cat");
    else url.searchParams.set("cat", cat);
    history.replaceState(null, "", url.toString());
  };

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => applyFilter(btn.dataset.cat));
  });

  // Apply ?cat= from URL on load
  const params = new URLSearchParams(window.location.search);
  const initial = params.get("cat");
  if (initial) applyFilter(initial);
})();
