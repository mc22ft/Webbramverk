class EventsController < ApplicationController

  respond_to :json

  skip_before_action :verify_authenticity_token #ta bort

  #check for api key
  #before_action :api_key
  before_action :api_authenticate, only: [:new, :create, :update]
  #check if api key is valid
  before_action :restrict_access, only: [:index, :show]

  # Checking if user want own limit/offset - definied in application_controller
  # for wider reach
  before_action :offset_params, only: [:index]


  def index

    # Check the parameters
    if params[:long].present? && params[:lat].present?

      # searching by long lat (near by position)
      positions = Position.near([params[:lat].to_f, params[:long].to_f], 20).limit(@limit).offset(@offset)
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
    #params.require(:event).permit(:name, :description)

  end


end

################################### Custom class
# This is a custom class for handling errors - Should be in another file!
# No support from rails base model
class ErrorMessage

  def initialize(dev_mess, usr_mess)
    # This is going to be json...camelcase
    @developerMessage = dev_mess
    @userMessage = usr_mess
  end

  # This is a custom class so we dont have the xml serializer included.
  # I wrote an own to_xml (will be called by framework)
  # There is probably a gem for that!?!
  def to_xml(options={})
    str = "<error>"
    str += "  <developerMessage>#{@developerMessage}</developerMessage>"
    str += "  <userMessage>#{@userMessage}</userMessage>"
    str += "</error>"
  end

end
