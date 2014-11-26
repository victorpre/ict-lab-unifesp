class Schedule < ActiveRecord::Base
  belongs_to :user, dependent: :destroy
  belongs_to :equip, dependent: :destroy
  validates :user_id, presence: true
  validates :equip_id, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true

end
