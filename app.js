import { marked } from "marked";
import cvMarkdown from "./cv.md?raw";

const featuredRepoFallbacks = [
  {
    name: "cv",
    html_url: "https://github.com/anandamurti/cv",
    description:
      "Recruiter-facing CV and portfolio site built to present production work clearly on GitHub Pages.",
    language: "HTML",
    stargazers_count: 0,
    updated_at: "2026-03-13T19:40:15Z"
  },
  {
    name: "blog-application-flask",
    html_url: "https://github.com/anandamurti/blog-application-flask",
    description:
      "Flask-based web application project covering backend structure, templates, and full-stack fundamentals.",
    language: "Python",
    stargazers_count: 0,
    updated_at: "2025-08-08T14:54:05Z"
  },
  {
    name: "FlaskProject3",
    html_url: "https://github.com/anandamurti/FlaskProject3",
    description:
      "Flask project focused on backend logic, routing, templates, and application structure.",
    language: "Python",
    stargazers_count: 0,
    updated_at: "2025-07-07T12:46:43Z"
  },
  {
    name: "flask-login-app",
    html_url: "https://github.com/anandamurti/flask-login-app",
    description:
      "Authentication-focused Flask project covering login flows, forms, and web app fundamentals.",
    language: "HTML",
    stargazers_count: 0,
    updated_at: "2025-03-21T16:03:46Z"
  },
  {
    name: "OnlineChatApplication",
    html_url: "https://github.com/anandamurti/OnlineChatApplication",
    description:
      "Chat application project demonstrating interface structure and real-time communication concepts.",
    language: "HTML",
    stargazers_count: 0,
    updated_at: "2025-03-21T16:10:32Z"
  },
  {
    name: "Computer-Graphics-Unit-4",
    html_url: "https://github.com/anandamurti/Computer-Graphics-Unit-4",
    description:
      "Computer graphics coursework project exploring visual rendering and 3D concepts.",
    language: "Graphics",
    stargazers_count: 0,
    updated_at: "2025-12-09T23:27:59Z"
  }
];

function decorateExternalLinks(container) {
  const externalLinks = container.querySelectorAll('a[href^="http"]');

  externalLinks.forEach(link => {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener");
  });
}

function loadCV() {
  const cvContainer = document.getElementById("cv");

  try {
    cvContainer.innerHTML = marked.parse(cvMarkdown);
    decorateExternalLinks(cvContainer);
  } catch (error) {
    cvContainer.innerHTML = `
      <div class="loading-card">
        <p>CV content could not be loaded.</p>
        <p>Please check the repository for the latest version.</p>
      </div>
    `;
  }
}

function scoreRepo(repo) {
  const searchableText = [
    repo.name,
    repo.description || "",
    repo.language || ""
  ]
    .join(" ")
    .toLowerCase();

  const keywordWeights = [
    ["cv", 100],
    ["python", 12],
    ["flask", 12],
    ["node", 12],
    ["next.js", 12],
    ["next", 10],
    ["rest", 10],
    ["api", 10],
    ["automation", 10],
    ["sql", 8],
    ["data", 8],
    ["pdf", 8],
    ["excel", 8],
    ["ocr", 8],
    ["portfolio", 8],
    ["cashflow", 8],
    ["devops", 8],
    ["apache", 8],
    ["dns", 8],
    ["cpanel", 8],
    ["windows", 8],
    ["desktop", 8],
    ["mac", 6],
    ["pyside", 6],
    ["typer", 6],
    ["cli", 6],
    ["bootstrap", 6],
    ["tailwind", 6],
    ["docker", 6],
    ["react", 6],
    ["llm", 6]
  ];

  let score = 0;

  keywordWeights.forEach(([keyword, weight]) => {
    if (searchableText.includes(keyword)) {
      score += weight;
    }
  });

  if (repo.homepage) {
    score += 6;
  }

  if (repo.description) {
    score += 5;
  }

  score += Math.min(repo.stargazers_count || 0, 5);

  const daysSinceUpdate =
    (Date.now() - new Date(repo.updated_at).getTime()) / 86400000;

  score += Math.max(0, 12 - Math.min(daysSinceUpdate / 30, 12));

  return score;
}

function renderRepos(container, repos) {
  container.innerHTML = repos
    .map(repo => {
      const cleanName = repo.name
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, letter => letter.toUpperCase());

      const description =
        repo.description ||
        "Repository showcasing implementation details, code structure, and delivery decisions.";

      const language = repo.language || "Multi-language";

      const updatedDate = new Date(repo.updated_at).toLocaleDateString(
        undefined,
        {
          year: "numeric",
          month: "short",
          day: "numeric"
        }
      );

      return `
        <article class="repo-card">
          <h3>
            <a href="${repo.html_url}" target="_blank" rel="noopener">
              ${cleanName}
            </a>
          </h3>
          <p>${description}</p>
          <div class="repo-meta">
            <span class="repo-lang">${language}</span>
            <span class="repo-stars">&#9733; ${repo.stargazers_count}</span>
            <span class="repo-updated">Updated ${updatedDate}</span>
          </div>
        </article>
      `;
    })
    .join("");
}

function selectFeaturedRepos(repos) {
  return repos
    .filter(repo => !repo.fork)
    .map(repo => ({
      ...repo,
      recruiterScore: scoreRepo(repo)
    }))
    .sort((a, b) => {
      if (b.recruiterScore !== a.recruiterScore) {
        return b.recruiterScore - a.recruiterScore;
      }

      return new Date(b.updated_at) - new Date(a.updated_at);
    })
    .slice(0, 8);
}

async function loadRepos() {
  const container = document.getElementById("repo-grid");

  try {
    const response = await fetch(
      "https://api.github.com/users/anandamurti/repos?sort=updated&per_page=100"
    );

    if (!response.ok) {
      throw new Error("GitHub API request failed");
    }

    const repos = await response.json();
    const featuredRepos = selectFeaturedRepos(repos);

    if (!featuredRepos.length) {
      renderRepos(container, featuredRepoFallbacks);
      return;
    }

    renderRepos(container, featuredRepos);
  } catch (error) {
    renderRepos(container, featuredRepoFallbacks);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadCV();
  loadRepos();
});
