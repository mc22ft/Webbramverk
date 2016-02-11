class CreatorController < ApplicationController




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





end
