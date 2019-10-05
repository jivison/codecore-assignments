class CommentsController < ApplicationController
  before_action :find_post
  
  def create
    @comment = Comment.new comment_params.merge(post_id: @post.id)
    @comment.save
    redirect_to @post
  end

  def destroy
    @comment = Comment.find(params[:id]) 
    @comment.destroy
    redirect_to @post
  end

  private
  def comment_params
    params.require(:comment).permit(:body)
  end

  def find_post
    @post = Post.find(params[:post_id])
  end
end
