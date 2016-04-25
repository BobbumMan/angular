exports.config = {
  allScriptsTimeout: 11000,
  specs: ['e2e/*.js'],
  capabilities: {'browserName' :'firefox'},
  framework: 'jasmine',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
