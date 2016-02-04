class StaticPagesController < ApplicationController

  def home
    @userapp = current_user.userapps.build if logged_in?
  end

  def help
  end

  def about
  end

  def contact
  end

end