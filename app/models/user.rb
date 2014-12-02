class User < ActiveRecord::Base
  self.inheritance_column = nil
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  validates :name, presence: true
  validates :role, presence: true
  validates :internal, presence: true
  validates :type, presence: true
  validates :institution, presence: true

  has_many :schedules, dependent: :destroy

  def unlock(user)
    if self.admin? && user.locked?
      user.locked = false
      user.save
    else
      user.locked = true
      user.save
    end
  end

  def admin?
    return true if self.role == 1
    return false
  end

  def locked?
    self.locked
  end

  def active_for_authentication? 
    super && !locked? 
  end 

  def inactive_message 
    if locked? 
      :locked 
    else 
      super # Use whatever other message 
    end 
  end

  def minutes_in_day(day)
    schedules_today = Schedule.where("user_id = ? AND start_date BETWEEN ? AND ?", self.id, day.beginning_of_day, day.end_of_day)
    minutes_today = 0
    schedules_today.each do |schedule|
      minutes_today = minutes_today + (schedule.end_date - schedule.start_date)
    end
    minutes_today/60
  end

  def minutes_in_week(day)
    schedules_in_week = Schedule.where("user_id = ? AND start_date BETWEEN ? AND ?", self.id, day.beginning_of_week, day.end_of_week)
    minutes_in_week = 0
    schedules_in_week.each do |schedule|
      minutes_in_week = minutes_in_week + (schedule.end_date - schedule.start_date)
    end
    minutes_in_week/60
  end

  def two_hours_in_day?(day)
    minutes_today = minutes_in_day(day)
    if (minutes_today) > 120
      return true
    else
      return false
    end
  end

  def four_hours_in_week?(day)
    minutes_in_week = minutes_in_week(day)
    if (minutes_in_week) > 240
      return true
    else
      return false
    end
  end
end
