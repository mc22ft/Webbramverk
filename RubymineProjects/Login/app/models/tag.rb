class Tag < ActiveRecord::Base

  has_and_belongs_to_many :events

  validates :name, presence: true





  def self.search(search)
    where("name LIKE ?", "%#{search}%")
  end
end
