class UsersController < ApplicationController
  ##before_action :current_user
  before_action :logged_in_user
  #before_action :logged_in_user, only: [:edit, :update] #not visit this pages
  before_action :correct_user,   only: [:edit, :update]
  before_action :admin_user,     only: :destroy

  def index
    @users = User.paginate(page: params[:page], :per_page => 10)
    #@users = User.all
    redirect_to(root_url) unless current_user.admin?
  end

  def show
    @user = User.find(params[:id])
    @userapps = current_user.feed.paginate(page: params[:page], :per_page => 5)
    redirect_to(root_url) unless current_user.admin?
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
        log_in @user
        flash[:success] = 'Welcome to the Sample App!'
        #Redirect till user
        redirect_to @user
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
      flash[:success] = 'Profile updated'
      redirect_to @user
    else
      render 'edit'
    end
  end

  def destroy
    User.find(params[:id]).destroy
    flash[:success] = 'User deleted'
    redirect_to users_url
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

  # Before filters

  # Confirms the correct user.
  def correct_user
    @user = User.find(params[:id])
    redirect_to(root_url) unless current_user?(@user)
  end

  #Confirms an admin user.
  def admin_user
    redirect_to(root_url) unless current_user.admin?
  end

  private

  def require_login
    unless logged_in?
      #flash[:error] = 'You must be logged in to access this section'
      redirect_to(root_url)
      #redirect_to new_login_url # halts request cycle
    end
  end
end
