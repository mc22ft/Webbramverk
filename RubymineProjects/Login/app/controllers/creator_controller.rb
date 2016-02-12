class CreatorController < ApplicationController


  before_action :restrict_access

  def index
    @creators = Creator.all

    #respond_to do |format|
    #  format.json { render :json => @creators.to_json}
    #  format.json { render :xml => @creators.to_xml}
    #end
  end


  def show
    #@creator = Creator.find_by_id(params[:id])
    @creator = Creator.find(params[:id])
  end


  private
  def restrict_access
    authenticate_or_request_with_http_token do |token, options|
    Userapp.exists?(apikey: token)

    end
  end

end