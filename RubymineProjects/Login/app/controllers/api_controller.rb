class ApiController < ApplicationController
  require 'ErrorMessage'

  respond_to :json

  #not important for API part
  skip_before_action :verify_authenticity_token

  #check if api key is valid API KEY
  before_action :api_key, only: [:index, :show]

  # Checking if user want own limit/offset - definied in application_controller
  # for wider reach
  before_action :offset_params, only: [:index]


  def index

    # Check the parameters
    if params[:long].present? && params[:lat].present?

      # searching by long lat (near by position)
      positions = Position.near([params[:lat].to_f, params[:long].to_f], 30, units: :km).limit(@limit).offset(@offset)
      @events = positions.flat_map(&:events)

      # Check the parameters
    elsif params[:search].present?

      # searching by event name
      @events = Event.search(params[:search]).limit(@limit).offset(@offset).order('created_at DESC')
      # Check the parameters
    elsif params[:tag_search].present?

      # searching by tags name
      tags = Tag.search(params[:tag_search]).limit(@limit).offset(@offset).order('created_at DESC')
      @events = tags.flat_map(&:events)

    else
      @events = Event.limit(@limit).offset(@offset).order('created_at DESC')
    end

  end


  def new
    @event = Event.new
  end


  def show
    @event = Event.find(params[:id])


      # render or error message
  rescue ActiveRecord::RecordNotFound
    error = ErrorMessage.new('Could not find any resources. Bad parameters?', 'Could not find any event!' )
    render json: { error: error }, status: :bad_request # just json in this example
  end

  private


end

