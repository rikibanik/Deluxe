const getenv = (key, fallback) => process.env[key] || fallback;

export default {
  port: Number(getenv('API_PORT', '8080')),
  nodeEnv: getenv('NODE_ENV', 'development'),
  databaseUrl: getenv('DATABASE_URL', ''),
  jwtSecret: getenv('JWT_SECRET', 'dev-secret-change-in-production'),
  repoStoragePath: getenv('REPO_STORAGE_PATH', './storage/repos'),
  sessionTtl: getenv('SESSION_TTL', '168h'),
};
