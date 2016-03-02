class CreatorsController < ApplicationController


  def index
    @creators = Creator.all
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

  def user_params
    params.require(:creator).permit(:name, :email)
    #params.require(:creators).permit(:name, :email)#Ändrade namn på vyn, ville ändra på creator + s
  end


end
