module Api
    module V1
        class CreatorsController < ApplicationController

        #before_action :restrict_access

        respond_to :json

              def index
                #respond_with status: 200
                respond_with Creator.all
              end

              def show
                respond_with Creator.find(params[:id])
              end

              def create
                #@creator = Creator.new(user_params)
                #@creator.save
                #respond_with(@creator)
              end

              def update
                #respond_with Creator.update(params[:id], params[:product])
              end

              def destroy
                #respond_with Creator.destroy(params[:id])
              end


              def user_params
                  params.require(:creator).permit(:name, :email)
              end

              private

                  def restrict_access
                    authenticate_or_request_with_http_token do |token, options|
                    Userapp.exists?(apikey: token)

                  end
              end
        end
    end
end