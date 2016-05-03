function EditorConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.editor', {
      url: '/editor/:_id',
      controller: 'EditorCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'editor/editor.html',
      title: 'Editor',
      resolve: {
        auth: function(User) {
          return User.ensureAuthIs(true);
        },
        article: function(Articles, User, $state, $stateParams) {
          if ($stateParams._id) {
            return Articles.get($stateParams._id).then(article => {
              if (User.current.username === article.author.username) {
                return article;
              } else {
                $state.go('app.home');
              }
            }, err => {
              $state.go('app.home');
            });
          } else {
            return null;
          }
        }
      }
    })

}

export default EditorConfig;
