class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  include SessionsHelper

  private

# Before filters

# Confirms the correct user.
  def correct_user
    @user = User.find(params[:id])
    redirect_to(root_url) unless current_user?(@user)
  end

  # Confirms a logged-in user.
  def logged_in_user
    unless logged_in?
      store_location
      flash[:danger] = 'Du måste logga in.'
      redirect_to login_url
    end
  end

  def require_login
    unless logged_in?
      #flash[:error] = 'You must be logged in to access this section'
      redirect_to(root_url)
      #redirect_to new_login_url # halts request cycle
    end
  end

end
