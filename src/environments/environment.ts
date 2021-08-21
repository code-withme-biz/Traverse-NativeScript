export const environment = {
  production: true,
  version: require('../../package.json').version,
  auth_url: 'https://event-api.carbondevapps.com/oauth/token?grant_type=password',
  api_url: 'https://event-api.carbondevapps.com/api/v2',
  typeahead_length: 20,
  sentry_url: 'https://3c5704b4336f4de996c48053f2b48bb1@sentry.io/1190340',
  signing_key: '83EAB275D8A1279BB16F1191D4EC9'
};
