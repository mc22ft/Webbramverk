class UserappsController < ApplicationController
  before_action :logged_in_user, only: [:create, :destroy]

  def create
    @userapp = current_user.userapps.build(userapp_params)

    #create api key?
    @userapp.apikey = 'Detta ska vara en nyckel = 23u038uj3gnv3o4th'

    if @userapp.save
      flash[:success] = 'Micropost created!'
      redirect_to root_url
    else
      render 'static_pages/home'
    end
  end

  def destroy
  end

  private

  def userapp_params
    params.require(:userapp).permit(:url)
  end
end
