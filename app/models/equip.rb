class Equip < ActiveRecord::Base
  validates :name, presence: true
  validates :model, presence: true
  validates :patrimony_id, presence: true, :uniqueness => {:case_sensitive => false}
  validates :cost, presence: true

  has_many :schedules
end
