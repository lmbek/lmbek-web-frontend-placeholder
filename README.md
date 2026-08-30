# Website Frontend Service (`web-frontend`)

A lightweight, responsive coming-soon page served by Go 1.26 with a Kubernetes health endpoint.

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
| `STATIC_DIR` | `./static` | Directory containing the HTML and CSS assets |
