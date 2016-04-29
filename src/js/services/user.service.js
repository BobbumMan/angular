class User {
  constructor(AppConstants, $http) {
    'ngInject';
    this.current = null;
    this._AppConstants = AppConstants;
    this._$http = $http;
  }
  attemptAuth(type, credentials) {
    let route = (type === 'login') ? '/login': '';
    return this._$http({
      url: this._AppConstants.api + '/users' + route,
      method: 'POST',
      data: {
        user: credentials
      }
    }).then(res => {
      this.current = res.data.user;
      return res;
    })
  }
}

export default User;
