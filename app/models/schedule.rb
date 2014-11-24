class Schedule < ActiveRecord::Base
  belongs_to :user, dependent: :destroy
  belongs_to :equip, dependent: :destroy
  validates :user_id, presence: true
  validates :equip_id, presence: true
end
