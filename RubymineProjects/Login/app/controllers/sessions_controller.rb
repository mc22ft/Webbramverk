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
    user = Creator.find_by(email: params[:email].downcase)
    if user && user.authenticate(params[:password])



      #TEST login current_user
      #@current_user = User.find_by(id: payload['user_id'])


      #token = encodeJWT(user)

      #response.headers['Authorization'] = token ?? angularJS?
      render json: { auth_token: encodeJWT(user) }
    else
      render json: { error: 'Invalid username or password' }, status: :unauthorized
    end
  end

  # This method is for encoding the JWT before sending it out
  def encodeJWT(user, exp=2.hours.from_now)
    # add the expire to the payload, as an integer
    payload = { user_id: user.id }
    payload[:exp] = exp.to_i
    # Encode the payload whit the application secret, and a more advanced hash method (creates header with JWT gem)
    JWT.encode( payload, Rails.application.secrets.secret_key_base, "HS512")

  end

  # When we get a call we have to decode it - Returns the payload if good otherwise false
  def decodeJWT(token)
    # puts token
    payload = JWT.decode(token, Rails.application.secrets.secret_key_base, "HS512")
    # puts payload
    if payload[0]["exp"] >= Time.now.to_i
      payload
    else
      puts "time fucked up"
      false
    end
      # catch the error if token is wrong
  rescue => error
    puts error
    nil
  end

end
