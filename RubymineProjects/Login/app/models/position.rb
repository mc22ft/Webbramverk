class Position < ActiveRecord::Base

  has_many :events

  validates :lat, presence: true
  #:presence => {:message => 'Du måste ange ett namn!'},
  #:length => {:minimum => 3, :message => 'Du måste ange minst 3 tecken!'}

  validates :long, presence: true
            #:presence => {:message => 'Du måste ange ett namn!'},
            #:length => {:minimum => 3, :message => 'Du måste ange minst 3 tecken!'}



    #geocoded_by :address
    #after_validation :geocode # auto-fetch latitude, longitude

    reverse_geocoded_by :lat, :long
    after_validation :reverse_geocode  # auto-fetch address


end
