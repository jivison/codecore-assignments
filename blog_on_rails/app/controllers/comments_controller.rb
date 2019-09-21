class CommentsController < ApplicationController
  before_action :find_post
  before_action :authenticate_user!, only: [:create, :destroy]
  
  def create
    @comment = Comment.new comment_params.merge(post_id: @post.id)
    @comment.user = @current_user
    @comment.save
    redirect_to @post
  end

  def destroy
    @comment = Comment.find(params[:id]) 
    if !can?(:crud, @comment)
      redirect_to root_path, alert: "Not authorized"
    else
      @comment.destroy
      redirect_to @post
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:body)
  end

  def find_post
    @post = Post.find(params[:post_id])
  end

end
