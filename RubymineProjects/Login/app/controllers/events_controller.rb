class EventsController < ApplicationController

  require 'ErrorMessage'

  respond_to :json

  # A better way to catch all the errors - Directing it to a private method
  rescue_from ActionController::UnknownFormat, with: :raise_bad_format


  #not in use for API part
  skip_before_action :verify_authenticity_token

  #JWT Json Web Tokens
  before_action :api_authenticate, only: [:new, :create, :edit, :update]

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

  def create

    #get curren_creator from token
    #get creator in db
    #logged in creator?
    creator = Creator.find_by_id(current_creator[0]['creator_id'])
    if creator
      event = Event.new(event_params.except(:tag, :position))
      if event
        event.creator = creator

        event.position = Position.new(event_params[:position])

        #tag
        tag = event_params[:tag]

        #loop if many
        tag_exist = Tag.find_by_name(tag[:name])
        if tag_exist
          event.tags << tag_exist
        else
          tag = Tag.new(event_params[:tag])
          event.tags << tag
        end

        if event.save
          @event = event
        else
          error = ErrorMessage.new('Could not save any resources. Event is empty', 'Could not save any event!' )
          render json: { message: error }, status: :bad_request # just json in this example
        end
      else
        error = ErrorMessage.new('Could not find any resources. Event is empty, nil?', 'Could not delete any event!' )
        render json: { message: error }, status: :bad_request # just json in this example
      end
    else
      error = ErrorMessage.new('Could not find any resources. Creator is empty, nil?', 'Could not delete any event!' )
      render json: { error: error }, status: :bad_request # just json in this example
    end
  end

  def edit
    creator = Creator.find_by_id(current_creator[0]['creator_id'])
    if creator
      event = Event.find_by_id(params[:id])
      if event
        if creator.id === event.creator.id
          @event = event
        else
        error = ErrorMessage.new('Could not find any resources. Id do not match?', 'Could not delete any event!' )
        render json: { error: error }, status: :unauthorized # just json in this example
        end
      else
        error = ErrorMessage.new('Could not find any resources. Event is empty, nil?', 'Could not delete any event!' )
        render json: { message: error }, status: :bad_request # just json in this example
      end
    else
      error = ErrorMessage.new('Could not find any resources. Creator is empty, nil?', 'Could not delete any event!' )
      render json: { error: error }, status: :bad_request # just json in this example
    end
  end

  def update
    creator = Creator.find_by_id(current_creator[0]['creator_id'])
    if creator
      event = Event.find_by_id(params[:id])
      if event
        if creator.id === event.creator.id
          # Handle a successful update.
          #update event: name and description
          event.update_attributes(event_params.except(:tag, :position))

          @event = event
        else
          error = ErrorMessage.new('Could not find any resources. Id do not match?', 'Could not delete any event!' )
          render json: { error: error }, status: :unauthorized # just json in this example
        end
      else
        error = ErrorMessage.new('Could not find any resources. Event is empty, nil?', 'Could not delete any event!' )
        render json: { message: error }, status: :bad_request # just json in this example
      end
    else
      error = ErrorMessage.new('Could not find any resources. Creator is empty, nil?', 'Could not delete any event!' )
      render json: { error: error }, status: :bad_request # just json in this example
    end
  end

  def destroy

    creator = Creator.find_by_id(current_creator[0]['creator_id'])
    if creator
      event = Event.find_by_id(params[:id])

      #destroy = all child included
      if event
        #check for id
        if creator.id === event.creator.id
          if event.destroy
            render json: { message: 'Event has been removed' }, status: :ok
          end
          # end
        else
          error = ErrorMessage.new('Could not find any resources. Id do not match?', 'Could not delete any event!' )
          render json: { error: error }, status: :unauthorized # just json in this example
        end
      else
        error = ErrorMessage.new('Could not find any resources. Event is empty, nil?', 'Could not delete any event!' )
        render json: { message: error }, status: :bad_request # just json in this example
      end
    else
      error = ErrorMessage.new('Could not find any resources. Creator is empty, nil?', 'Could not delete any event!' )
      render json: { error: error }, status: :bad_request # just json in this example
    end
  end

  private

  def raise_bad_format
    @error = ErrorMessage.new('The API does not support the requested format?', 'There was a bad call. Contact the developer!' )
    # See documentation for diffrent status codes
    render json: @error, status: :bad_request
  end

  def event_params
    # This is json
    json_params = ActionController::Parameters.new( JSON.parse(request.body.read) )
    json_params.require(:event).permit(:name, :description,
                                       position:[:long, :lat],
                                       tag:[:name])
  end

end
