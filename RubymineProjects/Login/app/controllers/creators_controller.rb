class CreatorsController < ApplicationController

  #before_action :restrict_access

  def index
    @creators = Creator.all

    #respond_to do |format|
    #  format.json { render :json => @creators.to_json}
    #  format.json { render :xml => @creators.to_xml}
    #end
  end

  def new
    @Creator = Creator.new
  end

  def create
    @Creator = Creator.new(user_params)
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

  def user_params
    params.require(:creator).permit(:name, :email)
    #params.require(:creators).permit(:name, :email)#Ändrade namn på vyn, ville ändra på creator + s
  end


end
