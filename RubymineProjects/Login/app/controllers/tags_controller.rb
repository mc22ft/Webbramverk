class TagsController < ApplicationController


  def index

    #search for tags name
    #if params[:search].present?
    #  @tags = Tag.search(params[:search]).limit(@limit).offset(@offset).order('created_at DESC')
    #else
    #  @tags = Tag.all
    #end
  end

  def show
   # @tag = Tag.find(params[:id])
  end

end
