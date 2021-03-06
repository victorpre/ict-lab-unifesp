class Schedule < ActiveRecord::Base
  belongs_to :user
  belongs_to :equip
  validates :user_id, presence: true
  validates :equip_id, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true

end
