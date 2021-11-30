const seedAppConfig = {
    endpoint: process.env.SEED_APP_CONFIG_ENDPOINT || 'http://localhost:4566',
    region: process.env.SEED_APP_CONFIG_REGION || 'us-west-2'
}

export default seedAppConfig;
