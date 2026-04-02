# Ananda Moreira

Tremembe, Sao Paulo, Brazil  
+55 12 99120-5669  
[anandaanandamurti@gmail.com](mailto:anandaanandamurti@gmail.com)  
[GitHub](https://github.com/anandamurti) | [LinkedIn](https://linkedin.com/in/ananda-murti-batista-moreira-837576326) | [Portfolio](https://anandamurti.github.io/cv/)

## Positioning

Full-stack developer working mostly in Python backends, document-heavy automation, and local AI tools. Most of my recent work has been web apps, internal tools, and retrieval workflows for finance, insurance, and accounting teams, with the usual mix of messy inputs, validation rules, deployment problems, and support work.

## Stack

- Languages: Python, JavaScript, Java, SQL, HTML/CSS
- Backend / Full stack: Flask, Node.js, REST APIs, SQLAlchemy, CRUD systems, server-rendered web apps, Next.js, TypeScript, authentication flows
- AI / Retrieval: RAG, Ollama integration, structured LLM outputs, chunking, embeddings, LanceDB, SQLite / FTS architecture
- Data / Automation: Pandas, OpenPyXL, PDF extraction, OCR workflows, Google Document AI, Excel generation, CLI tooling
- Desktop and UI: PySide6, QThread, responsive interfaces, localized business tooling
- Databases and Platforms: SQLite, MySQL, MongoDB, Linux, Windows
- Infra / Deployment: Apache, mod_wsgi, AWS, SSL/TLS, DNS, NAT, cPanel, Git, GitHub, GitHub Pages

## Selected Projects

### Local-First LLM Automation Platform
*Next.js, TypeScript, Python, Ollama, LanceDB, SQLite*

- Built the first working slice of a local-first RAG platform with a Next.js UI, a Python API, a worker-style ingestion path, and a loopback-only Ollama runtime.
- Kept retrieval, prompts, and model calls in the backend. Implemented authenticated uploads, immutable document versions, chunk manifests, workspace-scoped LanceDB storage, and citation-aware chat streaming with structured Ollama output.
- The target retrieval path is hybrid: SQLite FTS for exact terms, LanceDB for semantic recall. Added retrieval scoping and local-only policy checks to keep the browser away from the model and prevent cross-workspace leaks.

### Portfolio PDF to Excel Automation Platform
*Python, Camelot, Tabula, pdfplumber, Google Document AI, OpenPyXL*

- Built a Python pipeline that turns UBS-style portfolio statements into Excel workbooks ready for accounting review.
- Used Camelot, Tabula, pdfplumber, and Google Document AI as fallback because one parser was not enough for real statements.
- Added batch and single-file CLI modes, summary sheets, diagnostics, and JSON run reports for audit and validation.

### Insurance Premium Automation Platform
*Python, REST APIs, Excel automation*

- Built Python services around insurer APIs, validation rules, and reporting flows used for premium calculation.
- Normalized insurer-specific responses before feeding them into internal CRUD and Excel reporting flows.
- Kept the system running as API contracts and business rules changed.

### Client Acquisition and Flask Portal Pipeline
*Node.js, Flask, Apache, DNS, NAT, cPanel*

- Built a public Node.js site for interactive lead capture, then connected it to a Flask portal for login, registration, and gated access.
- Set up Apache, DNS, NAT, and cPanel so both apps stayed reachable and routed correctly in production.
- Handled releases and break-fix work across both sides once it was live.

### Cashflow Desktop Application
*Python, PySide6, QThread, Excel automation*

- Built a Windows desktop application that transforms one or more Excel inputs into a monthly cashflow workbook for an accounting client.
- Moved long-running workbook generation onto QThread so the UI stayed usable.
- Added validation, monthly mappings, dropdown generation, and packaged builds for day-to-day client use.

## Experience

### Backend Developer
**LCPT Sistemas I** | Oct 2024 - Present

- Build Flask apps, Python services, CLI tools, and desktop utilities for finance, insurance, and accounting workflows.
- Turn PDFs, bank statements, insurer data, and Excel inputs into structured outputs teams can review, export, and use downstream.
- Deploy and debug Linux-hosted applications running on Apache and mod_wsgi, with SQL databases, DNS/NAT configuration, and the usual environment issues.
- Implemented OCR-assisted extraction, normalization for more than 70 bank statement layouts, and deterministic plus BM25-style matching for reconciliation.
- Keep systems usable after client rules change, third-party APIs shift, or something breaks in production.

### LLM Trainer and Evaluator
**Outlier** | Concurrent contract

- Reviewed model outputs for reasoning quality, instruction-following, and factual consistency across varied tasks.
- That work made me stricter about where LLMs help and where you still want schemas, validation, and deterministic code.

## Education

**Bachelor of Science in Computer Science, Magna Cum Laude**  
University of the People | 2026

## Languages

English, Portuguese
