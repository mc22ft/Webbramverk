class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  #protect_from_forgery with: :null_session, :if => Proc.new { |c| c.request.format == 'application/json' }
  include SessionsHelper
  #before_action :default_format_json


  private

# Before filters

#default format at end of url string (API)
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

  ## ------------ API PART ------------- ##


  # default parameters, maby put i config-file?
  OFFSET = 0
  LIMIT = 20

  # check if user whants offset/limit
  def offset_params
    if params[:offset].present?
      @offset = params[:offset].to_i
    end
    if params[:limit].present?
      @limit = params[:limit].to_i
    end
    @offset ||= OFFSET
    @limit  ||= LIMIT
  end

  def api_key
    authenticate_or_request_with_http_token do |token, options|
      Userapp.exists?(apikey: token)
      end
  end


  # This is a callback which actions will call if protected
  def api_authenticate
    if request.headers["Authorization"].present?
      # Take the last part in The header (ignore Bearer)
      auth_header = request.headers['Authorization'].split(' ').last
      # Are we feeling alright!?
      @token_payload = decodeJWT auth_header.strip
      if !@token_payload
        render json: { error: 'The provided token wasn´t correct' }, status: :bad_request
      end
    else
      render json: { error: 'Need to include the Authorization header' }, status: :forbidden # The header isn´t present
    end
  end

end


#/dogs?limit=25&offset=50
#/search?q=fluffy+fur