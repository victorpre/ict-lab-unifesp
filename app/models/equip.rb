class Equip < ActiveRecord::Base
  validates :name, presence: true
  validates :model, presence: true
  validates :patrimony_id, presence: true, :uniqueness => {:case_sensitive => false}
  validates :cost, presence: true

  has_many :schedules, dependent: :destroy

  def scheduled?(day,date_range)
    schedules_today = Schedule.where("equip_id = ? AND start_date BETWEEN ? AND ?", self.id, day.beginning_of_day, day.end_of_day)
    return false if schedules_today.count == 0
    schedules_today.each do |schedule|
      if date_range.cover?(schedule.start_date)
        return true
      else
        return false
      end
    end
  end
end
