const config = {
  endpoint: process.env.MIGRATION_SEED_APP_CONFIG_ENDPOINT || "http://localhost:4566",
  region: process.env.MIGRATION_SEED_APP_CONFIG_REGION || "us-west-2",
};

export default config;
