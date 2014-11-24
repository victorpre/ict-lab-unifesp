class CreateSchedules < ActiveRecord::Migration
  def change
    create_table :schedules do |t|
      t.datetime :start_date
      t.datetime :end_date
      t.belongs_to :user, index: true
      t.belongs_to :equip, index: true

      t.timestamps
    end
  end
end
