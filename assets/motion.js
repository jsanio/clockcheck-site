/* Sections rise into view once, as they are scrolled to, and the example result arrives the way a result does
 * in the app (a fade with a slight scale-up). The look is in assets/site.css (.motion, .reveal,
 * .appear, .is-in); this file only decides which sections wait and notices when they arrive.
 *
 * It does nothing, and nothing is ever hidden, for visitors who ask for less motion
 * (prefers-reduced-motion) or whose browser has no IntersectionObserver. Sections already on screen
 * when the page loads are left alone, so there is no flash. No libraries, no network requests.
 */
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Only sections still below the fold wait to rise in.
  var fold = window.innerHeight * 0.92;
  var waiting = Array.prototype.filter.call(document.querySelectorAll('.section, .result'), function (el) {
    return el.getBoundingClientRect().top > fold;
  });
  if (!waiting.length) return;

  var footer = document.querySelector('.footer');
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        // A jump (the End key, a link) can skip sections: reveal this one and every one before it.
        // The footer is a backstop for a jump that lands past the last section.
        var upTo = entry.target === footer ? waiting.length - 1 : waiting.indexOf(entry.target);
        waiting.forEach(function (el, i) {
          if (i <= upTo) {
            el.classList.add('is-in');
            io.unobserve(el); // once only
          }
        });
      });
    },
    { rootMargin: '0px 0px -8% 0px' }
  );

  waiting.forEach(function (el) {
    el.classList.add(el.classList.contains('result') ? 'appear' : 'reveal');
    io.observe(el);
  });
  if (footer) io.observe(footer);
  // Last, so nothing is hidden unless the observer is really watching it.
  document.documentElement.classList.add('motion');
})();
