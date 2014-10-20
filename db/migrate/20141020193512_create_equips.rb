class CreateEquips < ActiveRecord::Migration
  def change
    create_table :equips do |t|
      t.string :name
      t.string :model
      t.string :patrimony_id
      t.float :cost

      t.timestamps
    end
  end
end
