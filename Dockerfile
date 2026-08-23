# Build Stage
FROM golang:1.26-alpine AS builder

WORKDIR /app
COPY go.mod ./
RUN go mod download || true

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o web-frontend .

# Final Minimal Stage
FROM alpine:3.20

RUN apk --no-cache add ca-certificates tzdata curl && \
    adduser -D -u 10001 appuser

WORKDIR /app
COPY --from=builder /app/web-frontend /app/web-frontend
COPY --from=builder /app/static /app/static
RUN chown -R appuser:appuser /app

USER 10001:10001

ENV PORT=8080
ENV STATIC_DIR=/app/static
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/healthz || exit 1

ENTRYPOINT ["/app/web-frontend"]
