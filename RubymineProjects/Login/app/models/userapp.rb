class Userapp < ActiveRecord::Base
  belongs_to :user
  default_scope -> { order(created_at: :desc) }

  validates :user_id, presence: true

  validates :url,
            :presence => {:message => 'Du måste ange en url!'},
            :length => {:minimum => 3, :maximum => 50, :message => 'Du måste ange minst 3 tecken!'}


  #not need? I will set
  validates :apikey, presence: true

end
