(() => {
  const page = document.querySelector('.landing-page');
  const track = document.getElementById('paperTrack');
  const note = document.getElementById('scrollNote');

  if (!page || !track) return;

  const update = () => {
    const rect = page.getBoundingClientRect();
    const total = Math.max(1, page.offsetHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, -rect.top / total));
    const viewport = document.querySelector('.paper-window');
    const viewportHeight = viewport?.clientHeight || window.innerHeight;
    const maxShift = Math.max(0, track.scrollHeight - viewportHeight);

    track.style.transform = `translate3d(0, ${-maxShift * progress}px, 0)`;

    if (note) {
      note.textContent = progress < 0.08
        ? 'Scroll to read the proclamation'
        : progress > 0.92
          ? 'You have reached the end of the scroll'
          : 'Continue scrolling';
    }
  };

  let ticking = false;
  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  window.addEventListener('load', requestUpdate);
  update();
})();
