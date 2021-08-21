export const environment = {
    production: false,
    version: require('../../package.json').version,
    auth_url: 'http://localhost:8080/oauth/token?grant_type=password',
    api_url: 'http://localhost:8080/api/v2',
    typeahead_length: 20,
    signing_key: 'FTuOnY5nSfd8mUUC830wbyG9ey8pQsfJ'
  };
