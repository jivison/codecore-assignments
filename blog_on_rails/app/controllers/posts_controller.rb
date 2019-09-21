class PostsController < ApplicationController

  before_action :find_post, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, only: [:create, :destroy, :new, :edit, :update]
  before_action :authorize!, only: [:edit, :update, :destroy]

  def index
    @posts = Post.all.sort_by { |post| post.created_at }.reverse
  end

  def show
    @comment = Comment.new
    @comments = @post.comments
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new post_params
    @post.user = @current_user
    if @post.save
      redirect_to :posts
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @post.update post_params
      redirect_to post_path(@post)
    else
      render :edit
    end
  end

  def destroy
    @post.destroy
    redirect_to :posts
  end

  private
  def post_params
    params.require(:post).permit(:title, :body)
  end

  def find_post
    @post = Post.find(params[:id])
  end

  def authorize!
    redirect_to root_path, alert: "Not authorized" unless can?(:crud, @post)
  end

end
