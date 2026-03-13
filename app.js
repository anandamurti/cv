async function loadCV() {
  const cvContainer = document.getElementById("cv");

  try {
    const response = await fetch("./cv.md");

    if (!response.ok) {
      throw new Error("CV file not found");
    }

    const markdown = await response.text();
    cvContainer.innerHTML = marked.parse(markdown);
  } catch (error) {
    cvContainer.innerHTML = `
      <p>Unable to load the CV section right now.</p>
    `;
  }
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

    const preferredOrder = [
      "cv",
      "blog-application-flask",
      "flask-login-app",
      "FlaskProject3",
      "OnlineChatApplication",
      "Computer-Graphics-Unit-4"
    ];

    const repoMap = new Map(repos.map((repo) => [repo.name, repo]));

    const selectedRepos = preferredOrder
      .map((name) => repoMap.get(name))
      .filter(Boolean)
      .filter((repo) => !repo.fork);

    const fallbackRepos = repos
      .filter((repo) => !repo.fork)
      .filter((repo) => repo.description || repo.language)
      .filter((repo) => !preferredOrder.includes(repo.name))
      .slice(0, 6 - selectedRepos.length);

    const finalRepos = [...selectedRepos, ...fallbackRepos].slice(0, 6);

    container.innerHTML = finalRepos
      .map((repo) => {
        const cleanName = repo.name.replace(/-/g, " ");
        const description = repo.description || "Source code and implementation details available in the repository.";
        const language = repo.language || "Code";

        return `
          <article class="repo-card">
            <h3>
              <a href="${repo.html_url}" target="_blank" rel="noopener">${cleanName}</a>
            </h3>
            <p>${description}</p>
            <div class="repo-meta">
              <span>★ ${repo.stargazers_count}</span>
              <span>${language}</span>
              <span>Updated ${new Date(repo.updated_at).toLocaleDateString()}</span>
            </div>
          </article>
        `;
      })
      .join("");
  } catch (error) {
    container.innerHTML = `
      <div class="loading-card">Unable to load repositories right now.</div>
    `;
  }
}

loadCV();
loadRepos();