# GitHub Deployment Commands

## 1. Save the CV outputs into the repository

```powershell
git add cv\archive\cv_v1_original.pdf cv\archive\cv_v1_extracted.txt
git add cv\current\cv_master.md cv\current\cv_github.md cv\current\cv_print.html cv\current\cv_print.pdf cv\current\cover_letter_print.html cv\current\cover_letter_print.pdf cv\current\deploy_commands.md
git add README.md cv.md cover_letter.md index.html styles.css app.js resume.pdf cover_letter.pdf public\resume.pdf public\cv-print.html
```

## 2. Build and preview the GitHub Pages version locally

```powershell
npm.cmd run build
npm.cmd run preview
```

## 3. Commit the rewrite

```powershell
git commit -m "Rewrite CV around AI, RAG, and automation systems"
```

## 4. Push and update GitHub Pages

```powershell
git push origin main
```

If GitHub Pages is already configured to deploy from GitHub Actions, pushing to `main` will trigger the existing workflow and publish the updated CV site.
