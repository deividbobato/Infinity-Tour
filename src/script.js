document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("menu");
  const links = document.querySelectorAll(".nav__link");

  /* Sombra no header ao rolar */
  const onScroll = () =>
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Menu mobile */
  const setMenu = (open) => {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  };
  toggle.addEventListener("click", () =>
    setMenu(!menu.classList.contains("is-open")),
  );
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) setMenu(false);
  });

  /* Link ativo conforme a seção visível */
  const sections = [...links]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter((s) => s && !s.hidden);

  const setActive = (id) => {
    links.forEach((l) =>
      l.classList.toggle("is-active", l.getAttribute("href") === `#${id}`),
    );
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-40% 0px -55% 0px" },
  );

  sections.forEach((s) => observer.observe(s));

  /* Chegou no fim da página = Contato ativo */
  window.addEventListener(
    "scroll",
    () => {
      const fim =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 4;
      if (fim) setActive("contato");
    },
    { passive: true },
  );
});
