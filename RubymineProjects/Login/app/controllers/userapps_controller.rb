class UserappsController < ApplicationController
  before_action :require_login
  before_action :logged_in_user, only: [:create, :destroy]
  before_action :correct_user,   only: :destroy
  before_action :admin_user,     only: :destroy

  def create
    @userapp = current_user.userapps.build(userapp_params)

    #create api key
    @userapp.apikey = SecureRandom.hex(24)

    if @userapp.save
      flash[:success] = 'Du har registrerat en applikation och fått en API nyckel!'
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
      flash[:success] = 'Du har raderat en API nyckel!'
    end
    redirect_to(:back)
  end


  private
  def userapp_params
    params.require(:userapp).permit(:url)
  end

  def correct_user
    @userapp = current_user
    redirect_to root_url if @userapp.nil?
  end

end
