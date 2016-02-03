class UsersController < ApplicationController


  def index

  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      render :action => 'index'
        #Session för login
        session[:userid] = @user.id

        flash[:success] = 'Welcome to the Sample App!'
        #Redirect till user
        redirect_to @user
      else
        render :action => 'new'
    end

  end


  private

  def user_params
    params.require(:user).permit(:user_name, :email, :password, :password_confirmation)
  end

end
