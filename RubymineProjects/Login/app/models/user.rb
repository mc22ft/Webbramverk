class User < ActiveRecord::Base
  has_many :apps

  before_save { email.downcase! }

  validates :name,
            :presence => {:message => 'Du måste ange ett namn!'},
            :length => {:minimum => 3, :message => 'Du måste ange minst 3 tecken!'}


  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email,
            :presence => {:message => 'Du måste ange en email!'},
            :length => {:minimum => 5, maximum: 255 },
            :format => { with: VALID_EMAIL_REGEX, :message => 'Fel format på mailen!' },
            :uniqueness => { case_sensitive: false, :message => 'Mailen finns redan registrerad' }

  has_secure_password
  validates :password,
            :presence => {:message => 'Du måste ange ett lösenord!'},
            :length => {:minimum => 6, :message => 'Du måste ange minst 6 tecken i lösenordet!'}


end
