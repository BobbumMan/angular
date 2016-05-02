function AuthConfig($stateProvider, $httpProvider) {
  'ngInject';

  $stateProvider
    .state('app.login', {
      url: '/login',
      templateUrl: 'auth/auth.html',
      controller: 'AuthCtrl as $ctrl',
      title: 'Sign in',
      resolve: {
        auth: function(User) {
          return User.ensureAuthIs(false);
        }
      }
    })
    .state('app.register', {
      url: '/register',
      templateUrl: 'auth/auth.html',
      controller: 'AuthCtrl as $ctrl',
      title: 'Sign up',
      resolve: {
        auth: function(User) {
          return User.ensureAuthIs(false);
        }
      }
    });
};

export default AuthConfig
