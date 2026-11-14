(() => {
  const links = document.querySelectorAll(".language-nav a");
  const sections = document.querySelectorAll("main section[id], main article[id], main h3[id]");

  function readingSection() {
    const linkedSection = document.getElementById(window.location.hash.slice(1));
    if (linkedSection) {
      const rect = linkedSection.getBoundingClientRect();
      if (rect.bottom > 76 && rect.top < window.innerHeight) return window.location.hash;
    }
    let current = "";
    for (const section of sections) {
      if (section.getBoundingClientRect().top > 76) break;
      current = "#" + section.id;
    }
    return current || (linkedSection ? window.location.hash : "");
  }

  function setTarget(link, hash) {
    const destination = new URL(link.href);
    destination.hash = hash;
    link.href = destination.href;
  }

  function syncHash() {
    for (const link of links) setTarget(link, window.location.hash);
  }

  syncHash();
  window.addEventListener("hashchange", syncHash);
  for (const link of links) {
    link.addEventListener("focus", () => setTarget(link, readingSection()));
    link.addEventListener("pointerdown", () => setTarget(link, readingSection()));
    link.addEventListener("click", () => setTarget(link, readingSection()));
  }
})();
