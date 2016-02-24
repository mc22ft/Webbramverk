class Event < ActiveRecord::Base

  belongs_to :creator
  belongs_to :position
  has_and_belongs_to_many :tags

  validates :name, presence: true

  validates :description, presence: true

  def self.search(search)
    where("name LIKE ?", "%#{search}%")
  end

end
