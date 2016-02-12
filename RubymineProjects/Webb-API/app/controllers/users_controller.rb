class UsersController < ApplicationController
  before_action :require_login, only: [:edit, :update]
  before_action :logged_in_user, only: [:edit, :update]
  before_action :correct_user,   only: [:edit, :update]
  before_action :admin_user,     only: :destroy

  def index
    @users = User.paginate(page: params[:page], :per_page => 10)
    #@users = User.all
    redirect_to(root_url) unless current_user.admin?
  end

  def show
    @user = User.find(params[:id])
    @userapps = @user.feed.paginate(page: params[:page], :per_page => 5)
    redirect_to(root_url) unless current_user.admin?
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
        log_in @user
        flash[:success] = 'Välkommen till min applikation!!'
        #Redirect till user
        #redirect_to @user
        redirect_to(root_url)
      else
        render 'new'
    end

  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      # Handle a successful update.
      flash[:success] = 'Du har sparat dina ändringar'
      redirect_to @user
    else
      render 'edit'
    end
  end

  def destroy
    User.find(params[:id]).destroy
    flash[:success] = 'Du har raderat en användare'
    redirect_to users_url
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

  # Before filters

  private

end
