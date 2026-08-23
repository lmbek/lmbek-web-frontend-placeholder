package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"
)

type SystemInfo struct {
	Service     string    `json:"service"`
	Environment string    `json:"environment"`
	Timestamp   time.Time `json:"timestamp"`
	Status      string    `json:"status"`
	Version     string    `json:"version"`
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	env := os.Getenv("ENVIRONMENT")
	if env == "" {
		env = "local"
	}

	mux := http.NewServeMux()

	// Static files handler
	staticDir := os.Getenv("STATIC_DIR")
	if staticDir == "" {
		staticDir = "./static"
	}
	fileServer := http.FileServer(http.Dir(staticDir))
	mux.Handle("/", fileServer)

	// Health check endpoint
	mux.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(w).Encode(map[string]string{
			"status": "healthy",
			"uptime": "ok",
		})
	})

	// Service Info API endpoint
	mux.HandleFunc("/api/info", func(w http.ResponseWriter, r *http.Request) {
		info := SystemInfo{
			Service:     "web-frontend",
			Environment: env,
			Timestamp:   time.Now().UTC(),
			Status:      "operational",
			Version:     "1.0.0",
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(w).Encode(info)
	})

	server := &http.Server{
		Addr:         ":" + port,
		Handler:      mux,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	log.Printf("Starting web-frontend service on port %s (env: %s)...", port, env)
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("Server error: %v", err)
	}
}
