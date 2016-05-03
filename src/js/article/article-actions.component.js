class ArticleActionsCtrl {
  constructor(User, Articles, $state) {
    'ngInject';

    if (User.current) {
      this.canModify = (User.current.username === this.article.author.username);
    } else {
      this.canModify = false;
    }
    this.isDeleting = false;
    this._Articles = Articles;
    this._$state = $state;

  }

  deleteArticle() {
    this.isDeleting = true;
    this._Articles.destroy(this.article._id).then(
      (success) => this._$state.go('app.home'),
      (err) => this._$state.go('app.home')
    );
  }

}

let ArticleActions = {
  bindings: {
    article: '='
  },
  controller: ArticleActionsCtrl,
  templateUrl: 'article/article-actions.html'
}

export default ArticleActions;
