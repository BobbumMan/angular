function SettingsConfig($stateProvider) {
  'ngInject';

  $stateProvider.state('app.settings', {
    url: '/settings',
    templateUrl: 'settings/settings.html',
    controller: 'SettingsCtrl',
    controllerAs: '$ctrl',
    title: 'Settings',
    resolve: {
      auth: function(User) {
        return User.ensureAuthIs(true);
      }
    }
  })
}

export default SettingsConfig;
