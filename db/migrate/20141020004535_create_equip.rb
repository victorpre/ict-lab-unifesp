class CreateEquip < ActiveRecord::Migration
  def change
    create_table :equips do |t|
      t.string :name
      t.string :model
      t.string :patrimony_id
      t.float :cost
    end
  end
end
