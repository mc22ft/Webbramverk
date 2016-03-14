class TagsController < ApplicationController

  require 'ErrorMessage'

  respond_to :json

  # A better way to catch all the errors - Directing it to a private method
  rescue_from ActionController::UnknownFormat, with: :raise_bad_format


  #not in use for API part
  skip_before_action :verify_authenticity_token


  #check if api key is valid API KEY
  before_action :api_key, only: [:index, :show]

  # Checking if user want own limit/offset - definied in application_controller
  # for wider reach
  before_action :offset_params, only: [:index]


  def index
    @tags = Tag.all.order('name ASC')
  end

  def show
    @tag = Tag.find_by_id(params[:id])
    #@tag = Tag.find(params[:id])
  end

end
