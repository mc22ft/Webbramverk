class Position < ActiveRecord::Base

  has_many :events


  validates :long, presence: true
            #:presence => {:message => 'Du måste ange ett namn!'},
            #:length => {:minimum => 3, :message => 'Du måste ange minst 3 tecken!'}

  validates :lat, presence: true
            #:presence => {:message => 'Du måste ange ett namn!'},
            #:length => {:minimum => 3, :message => 'Du måste ange minst 3 tecken!'}


end
