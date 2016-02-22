class Event < ActiveRecord::Base

  belongs_to :creator
  belongs_to :position
  has_and_belongs_to_many :tags

  #validates :creator_id, presence: true
  #validates :position_id, presence: true

  validates :name, presence: true

  validates :description, presence: true

end
