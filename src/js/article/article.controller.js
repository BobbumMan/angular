import marked from 'marked';

class ArticleCtrl {
  constructor(article, User, Comments, $sce, $rootScope) {
    'ngInject';

    this._Comments = Comments;

    this.currentUser = User.current;
    this.article = article;
    $rootScope.setPageTitle(this.article.title);
    this.article.body = $sce.trustAsHtml(marked(this.article.body, {sanitize: true}));
    this.resetCommentForm();
    Comments.getAll(this.article._id).then(
      (comments) => {
        this.comments = comments;
      }
    )
  }

  resetCommentForm() {
    this.commentForm = {
      isSubmitting: false,
      body: '',
      errors: []
    }
  }

  addComment() {
    this.commentForm.isSubmitting = true;
    this._Comments.add(this.article._id, this.commentForm.body).then(
      (comment) => {
        this.comments.unshift(comment);
        console.log(comment);
        this.resetCommentForm();
      },
      (err) => {
        this.commentForm.isSubmitting = false;
        this.commentForm.errors = err.data.errors;
      }
    );
  }

  destroyComment(commentId, index) {
    this.commentForm.isSubmitting = true;
    this._Comments.destroy(commentId, this.article._id).then((success) => {
      this.commentForm.isSubmitting = false;
      this.comments.splice(index, 1);
    });
  }

}


export default ArticleCtrl;
