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
      <div class="loading-card">
        <p>CV content could not be loaded.</p>
        <p>Please check the repository for the latest version.</p>
      </div>
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



    const repoMap = new Map(
      repos.map(repo => [repo.name, repo])
    );



    const selectedRepos = preferredOrder
      .map(name => repoMap.get(name))
      .filter(Boolean)
      .filter(repo => !repo.fork);



    const fallbackRepos = repos
      .filter(repo => !repo.fork)
      .filter(repo => repo.description || repo.language)
      .filter(repo => !preferredOrder.includes(repo.name))
      .slice(0, 8 - selectedRepos.length);



    const finalRepos = [...selectedRepos, ...fallbackRepos].slice(0, 8);



    container.innerHTML = finalRepos.map(repo => {

      const cleanName = repo.name
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, l => l.toUpperCase());



      const description =
        repo.description ||
        "Source code and implementation details available in the repository.";



      const language = repo.language || "Code";



      const updatedDate = new Date(repo.updated_at)
        .toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric"
        });



      return `

        <article class="repo-card">

          <h3>
            <a href="${repo.html_url}" target="_blank" rel="noopener">
              ${cleanName}
            </a>
          </h3>

          <p>${description}</p>

          <div class="repo-meta">

            <span class="repo-lang">
              ${language}
            </span>

            <span class="repo-stars">
              ★ ${repo.stargazers_count}
            </span>

            <span class="repo-updated">
              Updated ${updatedDate}
            </span>

          </div>

        </article>

      `;

    }).join("");



  } catch (error) {

    container.innerHTML = `
      <div class="loading-card">
        Unable to load repositories at the moment.
      </div>
    `;

  }

}



document.addEventListener("DOMContentLoaded", () => {

  loadCV();
  loadRepos();

});