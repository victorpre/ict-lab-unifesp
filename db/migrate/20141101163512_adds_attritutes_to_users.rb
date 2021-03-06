class AddsAttritutesToUsers < ActiveRecord::Migration
  def change
    change_table :users do |t|
      t.integer :ra
      t.integer :role, default: 3
      t.integer :type
      t.boolean :internal
      t.string :institution
      t.boolean :locked, default: true
    end
  end
end
