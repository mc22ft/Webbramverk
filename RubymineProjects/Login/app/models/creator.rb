class Creator < ActiveRecord::Base

  before_save { email.downcase! }

  validates :name,
            :presence => {:message => 'Du måste ange ett namn!'},
            :length => {:minimum => 3, :message => 'Du måste ange minst 3 tecken!'}

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email,
            :presence => {:message => 'Du måste ange en email!'},
            :length => {:minimum => 5, maximum: 255, :message => 'Du måste ange minst 5 tecken' },
            :format => { with: VALID_EMAIL_REGEX, :message => 'Fel format på mailen!' },
            :uniqueness => { case_sensitive: false, :message => 'Mailen finns redan registrerad' }


end
