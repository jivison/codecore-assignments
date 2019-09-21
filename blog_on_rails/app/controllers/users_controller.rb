class UsersController < ApplicationController
    before_action :authenticate_user!, only: [:edit, :update, :edit_password, :update_password]
    
    # Sign up
    def new
        @user = User.new
    end

    def create
        @user = User.new params.require(:user).permit(:name, :email, :password, :password_confirmation)
        if @user.save
            session[:user_id] = @user.id
            redirect_to posts_path
        else
            render :new
        end
    end     

    def edit
    end
  
    def update
      if @current_user.update params.require(:user).permit(:name, :email)
        redirect_to post_path(@current_user)
      else
        render :edit
      end
    end

    def edit_password
    end

    def update_password
        if params[:new_password] != params[:current_password] && params[:new_password] == params[:new_password_confirmation] && @current_user.authenticate(params[:current_password])
            @current_user.update({password: params[:new_password]})
            session[:user_id] = @current_user.id
            redirect_to edit_user_path(@current_user), notice: "Password Changed"
        else
            flash[:notice] = "Wrong password, or the new password fields don't match!"
            render :edit_password
        end
    end

end
