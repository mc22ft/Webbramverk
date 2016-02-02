class LoginController < ApplicationController

  def index
    @users = User.all
  end
end
