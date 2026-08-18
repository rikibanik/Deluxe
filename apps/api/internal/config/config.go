package config

import "os"

// Config holds API service configuration loaded from environment variables.
type Config struct {
	DatabaseURL     string
	JWTSecret       string
	RepoStoragePath string
	Port            string
}

// Load reads configuration from the environment.
func Load() Config {
	return Config{
		DatabaseURL:     os.Getenv("DATABASE_URL"),
		JWTSecret:       os.Getenv("JWT_SECRET"),
		RepoStoragePath: getenv("REPO_STORAGE_PATH", "./storage/repos"),
		Port:            getenv("API_PORT", "8080"),
	}
}

func getenv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
