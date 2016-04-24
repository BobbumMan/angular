exports.config = {
  allScriptsTimeout: 11000,
  specs: ['e2e/*.js'],
  capabilities: {'browserName' :'firefox'},
  chromeOnly: true,
  baseUrl: 'http://localhost:80/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
