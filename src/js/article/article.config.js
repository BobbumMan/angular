function ArticleConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.article', {
    url: '/article/:_id',
    controller: 'ArticleCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'article/article.html',
    title: 'Article',
    resolve: {
      article: function(Articles, $state, $stateParams) {
        return Articles.get($stateParams._id).then(article => {
          return article;
        }, err => {
          $state.go('app.home');
        });
      }
    }
  });

};

export default ArticleConfig;
