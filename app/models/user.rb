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

  has_many :schedules

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
    minutes_today
  end

  def two_hours_in_day?(day)
    minutes_today = minutes_in_day(day)
    if (minutes_today) >= 120
      return true
    else
      return false
    end
  end  
end
