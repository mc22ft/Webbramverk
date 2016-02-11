class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :default_format_json


  #default format at end of url string
  def default_format_json

    if((request.headers['HTTP_ACCEPT'].nil? && params[:format].nil?) ||
      (request.headers['HTTP_ACCEPT'] != 'application/xml' && params[:format] != 'xml') )
      request.format = 'json'

    end
  end


end
