# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

usr = User.new()
usr.first_name = 'test'
usr.last_name = 'subject'
usr.email = 'test.subject01@gmail.com'
usr.password = 'asdqwe123'
usr.password_confirmation = 'asdqwe123'
usr.role = 'master'
usr.access_to_module_8 = true
usr.save
