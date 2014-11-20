class User < ActiveRecord::Base
  self.inheritance_column = nil
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  validates :name, presence: true

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
end
