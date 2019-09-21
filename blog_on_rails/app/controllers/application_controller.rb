class ApplicationController < ActionController::Base

    before_action :current_user

    private
    def current_user
        if session[:user_id].present?
            @current_user ||= User.find_by(id: session[:user_id])    
        end
    end

    def authenticate_user!
        unless @current_user.present?
            flash[:danger] = "You need to be signed in to do this action!"
            redirect_to new_session_path
        end    
    end
end
