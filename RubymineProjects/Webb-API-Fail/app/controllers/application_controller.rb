class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  #http_basic_authenticate_with name: "admin", password: "secret"

  before_action :default_format_json


  #default format at end of url string
  def default_format_json
    if(request.headers['HTTP_ACCEPT'].nil? && params[:format].nil?) ||
      (request.headers['HTTP_ACCEPT'] != 'application/xml' && params[:format] != 'xml')
      request.format = 'json'
    end
  end

  private

  def restrict_access
    authenticate_or_request_with_http_token do |token, option|
      ApiKey.exists?(access_token == token)
      end
  end

end
