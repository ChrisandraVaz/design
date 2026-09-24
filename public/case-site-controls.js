(() => {
  const nav = document.createElement('nav');
  nav.className = 'case-site-controls';
  nav.setAttribute('aria-label', 'Portfolio navigation');
  nav.innerHTML = '<a href="/#work">Work</a><a href="/about">About</a><button type="button"></button>';
  const button = nav.querySelector('button');
  function update() {
    const theme = document.documentElement.dataset.theme || 'light';
    nav.dataset.theme = theme;
    button.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    button.innerHTML = theme === 'light' ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/></svg>' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>';
  }
  button.addEventListener('click', () => {
    const next = nav.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('portfolio-theme', next);
    update();
  });
  document.body.append(nav);
  update();
})();
