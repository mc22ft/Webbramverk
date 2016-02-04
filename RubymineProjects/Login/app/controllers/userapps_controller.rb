class UserappsController < ApplicationController
  before_action :logged_in_user, only: [:create, :destroy]

  def create
    @userapp = current_user.userapps.build(userapp_params)

    #create api key
    @userapp.apikey = SecureRandom.hex(24)

    if @userapp.save
      flash[:success] = 'Micropost created!'
      redirect_to root_url
    else
      @feed_items = []
      render 'static_pages/home'
    end
  end

  def destroy
    @userapp = Userapp.find(params[:id])
    if @userapp.present?
      @userapp.destroy
      flash[:success] = 'Micropost deleted'
    end
    redirect_to(:back)
  end


  private

  def userapp_params
    params.require(:userapp).permit(:url)
  end
end
