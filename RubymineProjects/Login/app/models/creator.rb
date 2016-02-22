class Creator < ActiveRecord::Base
  
  has_many :events

  before_save { email.downcase! }

  validates :name,
            :presence => {:message => 'Du måste ange ett namn!'},
            :length => {:minimum => 3, :message => 'Du måste ange minst 3 tecken!'}

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email,
            :presence => {:message => 'Du måste ange en email!'},
            :length => {:minimum => 5, maximum: 255, :message => 'Du måste ange minst 5 tecken' },
            :format => { with: VALID_EMAIL_REGEX, :message => 'Fel format på mailen!' }
            #:uniqueness => { case_sensitive: false, :message => 'Mailen finns redan registrerad' }

  has_secure_password validations: false
  validates :password,
            :presence => {:message => 'Du måste ange ett lösenord!'},
            :length => {:minimum => 6, :message => 'Du måste ange minst 6 tecken i lösenordet!'}


  # Returns the hash digest of the given string.
  def Creator.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
        BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end

  # Returns a random token.
  def Creator.new_token
    SecureRandom.urlsafe_base64
  end

end
