class EventsController < ApplicationController

  require 'ErrorMessage'

  respond_to :json

  #not in use for API part
  skip_before_action :verify_authenticity_token

  #JWT Json Web Tokens
  before_action :api_authenticate, only: [:index, :show, :new, :create, :edit, :update]


  # Checking if user want own limit/offset - definied in application_controller
  # for wider reach
  before_action :offset_params, only: [:index]


  def index
      @events = Event.limit(@limit).offset(@offset).order('created_at DESC')
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


  def create
    event = Event.new(event_params.except(:tag, :position))

    position = Position.new(event_params[:position])

    tag = Tag.new(event_params[:tag])

    position.events << event
    event.tags << tag

    if event.save
      @event = event
    end

      # render or error message
  rescue ActiveRecord::RecordNotFound
    error = ErrorMessage.new('Could not find any resources. Bad parameters?', 'Could not save any event!' )
    render json: { error: error }, status: :bad_request # just json in this example
  end

  def edit
    event = Event.find(params[:id])
    if event.present?
      @event = event
    end

      # render or error message
  rescue ActiveRecord::RecordNotFound
    error = ErrorMessage.new('Could not find any resources. Bad parameters?', 'Could not edit any event!' )
    render json: { error: error }, status: :bad_request # just json in this example

  end

  def update
    event = Event.find(params[:id])
    if event.present?
      # Handle a successful update.

      #update event: name and description
      event.update_attributes(event_params.except(:tag, :position))

      @event = event
    end

    # render or error message
      rescue ActiveRecord::RecordNotFound
      error = ErrorMessage.new('Could not find any resources. Bad parameters?', 'Could not update any event!' )
      render json: { error: error }, status: :bad_request # just json in this example
    end

  def destroy
    event = Event.find(params[:id])

    #destroy = all child included
    if event.present?
      if event.destroy
        @event = event
      end
    end

                # render or error message
  rescue ActiveRecord::RecordNotFound
    error = ErrorMessage.new('Could not find any resources. Bad parameters?', 'Could not delete any event!' )
    render json: { error: error }, status: :bad_request # just json in this example
  end

  private

  def restrict_access
    authenticate_or_request_with_http_token do |token, options|
      Userapp.exists?(apikey: token)
    end
  end

  def event_params
    # This is json
    json_params = ActionController::Parameters.new( JSON.parse(request.body.read) )
    json_params.require(:event).permit(:creator_id, :name, :description,
                                       position:[:long, :lat],
                                       tag:[:name])
  end

end
