exports.config = {
  allScriptsTimeout: 11000,
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['e2e/*.js'],
  capabilities: {'browserName' :'firefox'},
  chromeOnly: true,
  baseUrl: 'http://localhost:4444/wd/hub/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
