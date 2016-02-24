class EventsController < ApplicationController

  respond_to :json

  #check for api key
  before_action :api_key

  #check if api key is valid
  #before_action :restrict_access

  # Checking if user want own limit/offset - definied in application_controller
  # for wider reach
  before_action :offset_params, only: [:index, :nearby]


  def index
    if params[:search]

      @events = Event.search(params[:search])

        #for search tags
      #tags = Tag.search(params[:search])
      #events = []
      #tags.each do |t|
      #  events << t.events
      #end
      #@events = events

    else
      @events = Event.limit(@limit).offset(@offset).order('created_at DESC')#.includes(:tags)
    end

  end

  def new
    @event = Event.new
  end

  def create
    @event = Event.new(user_params)
  end

  def show
    @event = Event.find(params[:id])#, location: teams_path(@team)

      # render or error message
    rescue ActiveRecord::RecordNotFound
    error = ErrorMessage.new('Could not find any resources. Bad parameters?', 'Could not find any event!' )
    render json: { error: error }, status: :bad_request # just json in this example
  end

  # This method is using the geocoder and helps with searching near a specific position
  def nearby

    # Check the parameters
    if params[:long].present? && params[:lat].present?

      # using the parameters and offset/limit
      t = Position.near([params[:lat].to_f, params[:long].to_f], 20).limit(@limit).offset(@offset)
      respond_with t, status: :ok
    else

      error = ErrorMessage.new('Could not find any resources. Bad parameters?', 'Could not find any event!' )
      render json: { error: error }, status: :bad_request # just json in this example
    end
  end

  private

  def restrict_access
    authenticate_or_request_with_http_token do |token, options|
      Userapp.exists?(apikey: token)
    end
  end

  def user_params
    params.require(:event).permit(:name, :description)
    #params.require(:creators).permit(:name, :email)#Ändrade namn på vyn, ville ändra på creator + s
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
