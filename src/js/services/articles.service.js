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
        url: `${this._AppConstants.api}/article/${article._id}`,
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
      url: `${this._AppConstants.api}/article/${slug}`,
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
      url: `${this._AppConstants.api}/article/${slug}`,
      method: 'DELETE'
    }).then(res => {
      return res;
    }, err => {
      return err;
    })
  }

  favorite(slug) {
    return this._$http({
      url: `${this._AppConstants.api}/article/${slug}/favorite`,
      method: 'POST'
    }).then(res => {
      return res;
    }, err => {
      return err;
    })
  }

  unfavorite(slug) {
    return this._$http({
      url: `${this._AppConstants.api}/article/${slug}/favorite`,
      method: 'DELETE'
    }).then(res => {
      return res;
    }, err => {
      return err;
    })
  }

  query(config) {
    return this._$http({
      url: `${this._AppConstants.api}/articles${(config.type === 'feed') ? '/feed' : ''}`,
      method: 'GET',
      params: config.filters ? config.filters : null
    }).then(res => res.data);
  }

}

export default Articles;
