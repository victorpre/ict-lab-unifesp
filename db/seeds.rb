# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(:name => "System Admin",
              :email => "admin@gmail.com",
              :password => "123123123",
              :institution => "Unifesp",
              :role => 1,
              :internal => true,
              :type => 1,
              :internal => true,
              :locked => false
              )

1.upto(10) do |i|
  User.create(:name => "User#{i}",
              :email => "user#{i}@gmail.com",
              :password => "123123123",
              :institution => "Unifesp",
              :internal => true,
              :type => 1,
              :locked => false
              )
end

 1.upto(10) do |i|
  Equip.create(:name => "Equipamento #{i}",
              :model => "Modelo #{i}",
              :patrimony_id => "123.123.#{i}",
              :cost => 50+i
              )
end