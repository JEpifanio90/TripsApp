# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(
    [
        {
            first_name: 'test',
            last_name: 'subject01',
            email: 'test.subject01@gmail.com',
            password: 'asdqwe123',
            password_confirmation: 'asdqwe123',
            role: 'master',
            image_name: '2asd.jpg'
        }, 
        {
            first_name: 'test',
            last_name: 'subject02',
            email: 'test.subject02@gmail.com',
            password: 'asdqwe123',
            password_confirmation: 'asdqwe123',
            role: 'Trips Advisor',
            image_name: '2asd.jpg'
        },
        {
            first_name: 'test',
            last_name: 'subject03',
            email: 'test.subject03@gmail.com',
            password: 'asdqwe123',
            password_confirmation: 'asdqwe123',
            role: 'Trips Manager',
            image_name: '2asd.jpg'
        },
        {
            first_name: 'test',
            last_name: 'subject04',
            email: 'test.subject04@gmail.com',
            password: 'asdqwe123',
            password_confirmation: 'asdqwe123',
            role: 'Trips Advisor',
            image_name: '2asd.jpg'
        },
        {
            first_name: 'test',
            last_name: 'subject05',
            email: 'test.subject05@gmail.com',
            password: 'asdqwe123',
            password_confirmation: 'asdqwe123',
            role: 'Trips Manager',
            image_name: '2asd.jpg'
        }
    ]
)

Trip.create(
    [
        {
            owner_id: 1,
            title: 'trip 01',
            description: 'trip description 01',
            location: 'Mexico',
            lat: 19.432608,
            lng: -99.133209,
            image_name: '1test.jpg'
        },
        {
            owner_id: 1,
            title: 'trip 02',
            description: 'trip description 02',
            location: 'EUA',
            lat: 37.0902,
            lng: 95.7129,
            image_name: '1test.jpg'
        },
        {
            owner_id: 1,
            title: 'trip 03',
            description: 'trip description 03',
            location: 'Rusia',
            lat: 61.5240,
            lng: 105.3188,
            image_name: '1test.jpg'
        },
        {
            owner_id: 1,
            title: 'trip 04',
            description: 'trip description 04',
            location: 'Mexico',
            lat: 25.2744,
            lng: 133.7751,
            image_name: '1test.jpg'
        }
    ]
)
