class SessionsController < ApplicationController

  def new
    if logged_in?
      redirect_to root_url
    end
  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      params[:session][:remember_me] == '1' ? remember(user) : forget(user)
      #redirect_back_or user
      log_in user
      #remember user
      redirect_to user
      # Log the user in and redirect to the user's show page.
    else
      # Create an error message.
      flash.now[:danger] = 'Fel email/lösenord kombination'
      render 'new'
    end
  end

  def destroy
    log_out if logged_in?
    redirect_to root_url
  end

  #JWT Web Token
  ## This is called from a client who wish to authenticate and get a JSON Web Token back
  def api_auth
    # output the APIkey from the header
    # puts request.headers["X-APIkey"];
    creator = Creator.find_by(email: params[:email].downcase)
    if creator && creator.authenticate(params[:password])
      #response.headers['Authorization'] = token ?? angularJS?
      render json: { auth_token: encodeJWT(creator), creator_id: creator.id }
    else
      render json: { error: 'Invalid username or password' }, status: :unauthorized
    end
  end

end
