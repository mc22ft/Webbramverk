class Event < ActiveRecord::Base

  belongs_to :creator
  belongs_to :position
  has_and_belongs_to_many :tags

  validate :name

  validate :description

end
