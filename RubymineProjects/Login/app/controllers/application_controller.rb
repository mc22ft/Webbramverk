class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  include SessionsHelper
  #before_action :default_format_json


  private

# Before filters

#default format at end of url string
  def default_format_json
    if(request.headers['HTTP_ACCEPT'].nil? && params[:format].nil?) ||
        (request.headers['HTTP_ACCEPT'] != 'application/xml' && params[:format] != 'xml')
      request.format = 'json'
    end
  end

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

#Confirms an admin user.
  def admin_user
    redirect_to(root_url) unless current_user.admin?
  end



end
