# Website Frontend Service (`web-frontend`)

A lightweight, modern, responsive website frontend for the LMBEK Hobby Cloud platform written in Go 1.26 with embedded static assets and status checks.

---

## 🚀 Running Locally

### Via Go Toolchain:
```bash
go run .
# Opens http://localhost:8080
```

### Via Local Orchestrator:
```bash
# In workspace root:
make up
# Or for live hot-reloading:
make hotreload
```

---

## 🐳 Container Build

```bash
docker build -t ghcr.io/lmbek/lmbek-hobby-web-frontend:latest .
docker run -p 8080:8080 ghcr.io/lmbek/lmbek-hobby-web-frontend:latest
```

---

## ⚙️ Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `8080` | HTTP listening port |
| `ENVIRONMENT` | `local` | Environment identifier (`local`, `staging`, `production`) |
| `STATIC_DIR` | `./static` | Directory containing static assets (`index.html`, CSS, JS) |
