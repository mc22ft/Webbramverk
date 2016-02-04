class Userapp < ActiveRecord::Base
  belongs_to :user
  default_scope -> { order(created_at: :desc) }

  validates :user_id, presence: true

  validates :url, presence: true, length: { maximum: 140 }

  #not need? I will set
  validates :apikey, presence: true

end
