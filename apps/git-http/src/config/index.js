const getenv = (key, fallback) => process.env[key] || fallback;

export default {
  port: Number(getenv('GIT_HTTP_PORT', '8080')),
  databaseUrl: getenv('DATABASE_URL', ''),
  repoStoragePath: getenv('REPO_STORAGE_PATH', './storage/repos'),
  apiInternalUrl: getenv('API_INTERNAL_URL', 'http://localhost:8080'),
};
