class AddUserNameToSchedules < ActiveRecord::Migration
  def change
    add_column :schedules, :user_name, :string
  end
end
