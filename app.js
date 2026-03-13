async function loadCV(){

try{

const response = await fetch("./cv.md");

const markdown = await response.text();

document.getElementById("cv").innerHTML = marked.parse(markdown);

}catch(err){

document.getElementById("cv").innerHTML =
"<p>Unable to load CV.</p>";

}

}

async function loadRepos(){

const container = document.getElementById("repo-grid");

try{

const response = await fetch(
"https://api.github.com/users/anandamurti/repos?sort=updated&per_page=6"
);

const repos = await response.json();

const reposHTML = repos
.filter(repo => !repo.fork)
.slice(0,6)
.map(repo => {

return `
<div class="repo-card">

<h3>
<a href="${repo.html_url}" target="_blank">
${repo.name}
</a>
</h3>

<p>
${repo.description || "No description provided."}
</p>

<div class="repo-meta">

<span>★ ${repo.stargazers_count}</span>

<span>${repo.language || "Code"}</span>

</div>

</div>
`;

}).join("");

container.innerHTML = reposHTML;

}catch(err){

container.innerHTML =
"<div class='loading-card'>Unable to load repositories.</div>";

}

}

loadCV();
loadRepos();