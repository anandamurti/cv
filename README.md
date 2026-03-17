# Ananda Moreira CV

Recruiter-facing CV site and portfolio summary for Ananda Moreira.

This repository is designed to present production software work clearly and quickly for hiring managers, recruiters, and technical reviewers. It highlights backend development, full-stack delivery, desktop tooling, document workflows, and production infrastructure work across finance, accounting, and insurance use cases.

Live site: https://anandamurti.github.io/cv/

## What this repo shows

- Python, Flask, Node.js, Java, MongoDB, REST APIs, and SQL-based application work
- Desktop and internal tooling with PySide6, Excel automation, and document processing
- Production deployment experience across Apache, mod_wsgi, DNS, NAT, cPanel, and GitHub Pages
- LLM evaluation work through Outlier, presented in practical and non-buzzy terms

## Featured work

### Client Acquisition and Avatar Pipeline

- Static Node.js website used for client acquisition and lead generation
- Linked Flask login portal for gated consultora avatar access
- Production setup and maintenance across Apache, DNS, NAT, and cPanel

### Portfolio PDF to Excel Automation

- Converts UBS-style portfolio PDFs into structured Excel workbooks
- Uses layered extraction, OCR fallback, diagnostics, and audit-friendly reporting
- Designed for repeated operational use through CLI workflows

### Cashflow Desktop Application

- Windows desktop application built with Python and PySide6
- Transforms multiple Excel inputs into a monthly cashflow workbook in pt-BR
- Uses background processing to keep the interface responsive

### Financial and Insurance Automation Systems

- Backend services for insurer API integrations, reporting, reconciliation, and data normalization
- Internal Flask applications deployed on Linux with Apache and SQL databases

## Stack

- Languages: Python, JavaScript, Java, SQL, PHP, Swift
- Backend: Flask, SQLAlchemy, Node.js, Java, MongoDB, REST APIs, Typer, Maven
- Frontend: HTML, CSS, Tailwind CSS, Bootstrap
- Data and automation: Pandas, OpenPyXL, OCR, Google Document AI, PDF extraction
- Desktop: PySide6, QThread, Windows desktop tooling
- API and tooling: Postman, Git, GitHub
- Platforms: Linux, Windows
- Infrastructure: AWS, Apache2, mod_wsgi, SSL/TLS, DNS, NAT, cPanel, GitHub Pages

## Local development

```powershell
npm install
npm run dev
```

Build for production:

```powershell
npm run build
```

## Deployment

This repo includes a GitHub Actions workflow that builds the site and deploys the `dist` output to GitHub Pages on pushes to `main`.

To use it:

1. Enable GitHub Pages for the repository.
2. Set the source to `GitHub Actions`.
3. Push to `main`.

## Contact

- Email: anandaanandamurti@gmail.com
- LinkedIn: https://linkedin.com/in/ananda-murti-batista-moreira-837576326
- GitHub: https://github.com/anandamurti
