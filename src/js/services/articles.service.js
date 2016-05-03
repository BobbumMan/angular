class Articles {
  constructor(AppConstants, $http, $q) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$q = $q;

  }

  save(article) {
    if (article._id) {
      return this._$http({
        url: `${this._AppConstants.api}/articles/${article._id}`,
        method: 'PUT',
        data: article
      }).then(res => {
        return res.data.article;
      });
    } else {
      return this._$http({
        url: `${this._AppConstants.api}/articles`,
        method: 'POST',
        data: article
      }).then(res => {
        return res.data.article;
      });
    }
  }

  get(slug) {
    let deferred = this._$q.defer();
    if (!slug.replace(" ","")) {
      deferred.reject("Article slug is empty");
      return deferred.promise;
    }
    this._$http({
      url: `${this._AppConstants.api}/articles/${slug}`,
      method: 'GET'
    }).then(res => {
      deferred.resolve(res.data.article);
    }, err => {
      deferred.reject(err);
    });
    return deferred.promise;
  }

  destroy(slug) {
    return this._$http({
      url: `${this._AppConstants.api}/articles/${slug}`,
      method: 'DELETE'
    }).then(res => {
      return res;
    }, err => {
      return err;
    })
  }

}

export default Articles;
