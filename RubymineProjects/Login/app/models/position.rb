class Position < ActiveRecord::Base

  has_many :event

  validates :event_id, presence: true


  validates :long
            #:presence => {:message => 'Du måste ange ett namn!'},
            #:length => {:minimum => 3, :message => 'Du måste ange minst 3 tecken!'}

  validates :lat
            #:presence => {:message => 'Du måste ange ett namn!'},
            #:length => {:minimum => 3, :message => 'Du måste ange minst 3 tecken!'}


end
