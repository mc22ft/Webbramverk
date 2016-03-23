class Tag < ActiveRecord::Base

  has_and_belongs_to_many :events
  before_save { name.downcase! }

  validates :name, presence: true



  def self.search(tag_search)
    where("name LIKE ?", "%#{tag_search}%")
  end
end
