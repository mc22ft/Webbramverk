module Api
    module V1
        class CreatorController < ApplicationController

        respond_to :json

              def index
                respond_with Creator.all
              end

              def show
                respond_with Creator.find(params[:id])
              end

              def create
                #respond_with Creator.create(params[:product])
              end

              def update
                #respond_with Creator.update(params[:id], params[:product])
              end

              def destroy
                #respond_with Creator.destroy(params[:id])
              end


        end
    end
end