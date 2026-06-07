(() => {
  const page = document.querySelector('.scroll-page');
  const track = document.getElementById('scrollTrack');
  const fill = document.getElementById('progressFill');
  const percent = document.getElementById('progressPercent');
  if (!page || !track) return;

  const update = () => {
    const rect = page.getBoundingClientRect();
    const total = page.offsetHeight - window.innerHeight;
    const progress = Math.min(1, Math.max(0, -rect.top / total));
    const panelHeight = track.firstElementChild?.offsetHeight || 0;
    const maxShift = Math.max(0, track.scrollHeight - panelHeight);
    track.style.transform = `translateY(${-maxShift * progress}px)`;
    if (fill) fill.style.height = `${progress * 100}%`;
    if (percent) percent.textContent = `${Math.round(progress * 100)}%`;
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
