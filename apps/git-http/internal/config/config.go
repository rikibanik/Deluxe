package config

import "os"

type Config struct {
	DatabaseURL     string
	RepoStoragePath string
	APIInternalURL  string
	Port            string
}

func Load() Config {
	return Config{
		DatabaseURL:     os.Getenv("DATABASE_URL"),
		RepoStoragePath: getenv("REPO_STORAGE_PATH", "./storage/repos"),
		APIInternalURL:  getenv("API_INTERNAL_URL", "http://localhost:8080"),
		Port:            getenv("GIT_HTTP_PORT", "8080"),
	}
}

func getenv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
