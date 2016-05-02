export default class User {
  constructor(JWT, AppConstants, $http) {
    'ngInject';
    this.current = null;
    this._AppConstants = AppConstants;
    this._$http = $http;
    this._JWT = JWT;
  }
  attemptAuth(type, credentials) {
    let route = (type === 'login') ? '/login': '';
    return this._$http({
      url: this._AppConstants.api + '/users' + route,
      method: 'POST',
      data: credentials
    }).then(res => {
      this._JWT.save(res.data.user.token);
      this.current = res.data.user;
      return res;
    })
  }
}
