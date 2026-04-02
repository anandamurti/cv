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

document.addEventListener("DOMContentLoaded", () => {
  loadCV();
  loadYear();
});
