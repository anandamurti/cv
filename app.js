import { marked } from "marked";
import cvMarkdown from "./cv/current/cv_master.md?raw";

function decorateExternalLinks(container) {
  const externalLinks = container.querySelectorAll('a[href^="http"], a[href^="mailto"], a[href^="tel"]');

  externalLinks.forEach(link => {
    if (link.getAttribute("href")?.startsWith("http")) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener");
    }
  });
}

function loadCV() {
  const cvContainer = document.getElementById("cv");

  if (!cvContainer) {
    return;
  }

  try {
    cvContainer.innerHTML = marked.parse(cvMarkdown);
    decorateExternalLinks(cvContainer);
  } catch (error) {
    cvContainer.innerHTML = `
      <div class="status-card">
        <p>The latest CV markdown could not be loaded.</p>
        <p>Please view the repository for the current version.</p>
      </div>
    `;
  }
}

function loadYear() {
  const year = document.getElementById("current-year");

  if (year) {
    year.textContent = new Date().getFullYear().toString();
  }
}

function initRevealOnScroll() {
  const revealItems = Array.from(document.querySelectorAll(".reveal"));

  if (!revealItems.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach(item => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      root: null,
      threshold: 0.14,
      rootMargin: "0px 0px -12% 0px"
    }
  );

  revealItems.forEach(item => observer.observe(item));
}

function initActiveNavIndicator() {
  const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));

  if (!navLinks.length) {
    return;
  }

  const sections = navLinks
    .map(link => {
      const href = link.getAttribute("href");
      return href ? document.querySelector(href) : null;
    })
    .filter(Boolean);

  if (!sections.length) {
    return;
  }

  const setActive = id => {
    navLinks.forEach(link => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
    });
  };

  const sectionAccentMap = new Map([
    ["systems", "#8fa18f"],
    ["work", "#989183"],
    ["tools", "#8a9aa2"],
    ["certifications", "#9b90a3"],
    ["connect", "#8f9991"]
  ]);

  const setAccentForSection = id => {
    const accent = sectionAccentMap.get(id) || sectionAccentMap.get("systems");

    if (!accent) {
      return;
    }

    document.documentElement.style.setProperty("--accent", accent);
    document.documentElement.style.setProperty("--signal", accent);
    document.documentElement.style.setProperty("--signal-strong", accent);
  };

  let activeId = sections[0].id;
  setActive(activeId);
  setAccentForSection(activeId);

  if (!("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      const visibleSections = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (!visibleSections.length) {
        return;
      }

      const nextId = visibleSections[0].target.id;

      if (nextId === activeId) {
        return;
      }

      activeId = nextId;
      setActive(activeId);
      setAccentForSection(activeId);
    },
    {
      root: null,
      threshold: [0.12, 0.32, 0.56],
      rootMargin: "-30% 0px -52% 0px"
    }
  );

  sections.forEach(section => observer.observe(section));
}

function initSystemInteractionLayer() {
  const systemsGrid = document.querySelector(".systems-grid");

  if (!(systemsGrid instanceof HTMLElement)) {
    return;
  }

  const cards = Array.from(systemsGrid.querySelectorAll(".system-card"));

  if (!cards.length) {
    return;
  }

  const clearFocus = () => {
    systemsGrid.classList.remove("is-focusing");
    cards.forEach(card => card.classList.remove("is-focused"));
  };

  const setFocus = activeCard => {
    systemsGrid.classList.add("is-focusing");
    cards.forEach(card => {
      card.classList.toggle("is-focused", card === activeCard);
    });
  };

  const syncFocusToActiveElement = () => {
    const activeEl = document.activeElement;

    if (!(activeEl instanceof HTMLElement)) {
      clearFocus();
      return;
    }

    const activeCard = activeEl.closest(".system-card");

    if (activeCard && cards.includes(activeCard)) {
      setFocus(activeCard);
      return;
    }

    if (!systemsGrid.matches(":hover")) {
      clearFocus();
    }
  };

  cards.forEach(card => {
    if (!card.hasAttribute("tabindex")) {
      card.setAttribute("tabindex", "0");
    }

    card.addEventListener("mouseenter", () => {
      setFocus(card);
    });

    card.addEventListener("focusin", () => {
      setFocus(card);
    });

    card.addEventListener("focusout", () => {
      requestAnimationFrame(syncFocusToActiveElement);
    });

    card.addEventListener("click", event => {
      const target = event.target;

      if (target instanceof HTMLElement && target.closest("a, button")) {
        return;
      }

      const shouldExpand = !card.classList.contains("is-expanded");
      cards.forEach(item => item.classList.remove("is-expanded"));

      if (shouldExpand) {
        card.classList.add("is-expanded");
        setFocus(card);
      } else {
        syncFocusToActiveElement();
      }
    });

    card.addEventListener("keydown", event => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      event.preventDefault();
      card.click();
    });
  });

  systemsGrid.addEventListener("mouseleave", () => {
    requestAnimationFrame(syncFocusToActiveElement);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadCV();
  loadYear();
  initRevealOnScroll();
  initActiveNavIndicator();
  initSystemInteractionLayer();
});
