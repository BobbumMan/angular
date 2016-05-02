function authInterceptor(JWT, AppConstants, $window, $q) {
  'ngInject';

  return {
    //attach auth header
    request: function(config) {
      if(config.url.indexOf(AppConstants.api) === 0 && JWT.get()) {
        config.headers.Authorization = 'Bearer ' + JWT.get();
      }
      return config;
    },

    //handle 401 errors
    responseError: function(rejection) {
      if (rejection.status === 401) {
        JWT.destroy();
        $window.location.reload();
      }
      return $q.reject(rejection);
    }
  }
}

export default authInterceptor;
