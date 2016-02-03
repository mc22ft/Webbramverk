class User < ActiveRecord::Base
  has_many :apps


  validates :name,
            :presence => {:message => 'Du måste ange ett namn!'},
            :length => {:minimum => 3, :message => 'Du måste ange mins 3 tecken!'}

  validates :password,
            :presence => {:message => 'Du måste ange ett lösenord!'},
            :length => {:minimum => 5, maximum: 50, :message => 'Du måste ange minst 5 tecken och max 50!'}


  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email,
            :presence => {:message => 'Du måste ange en email!'},
            :length => {:minimum => 5, maximum: 255 },
            :format => { with: VALID_EMAIL_REGEX, :message => 'Fel format på mailen!' },
            :uniqueness => { case_sensitive: false, :message => 'Mailen finns redan registrerad' }


end
