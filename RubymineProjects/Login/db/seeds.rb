# encoding: utf-8

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


l1 = Userapp.create(:url => 'www.myapi.com', :apikey => '2fe461adb2b4b3493d4426e99b40ba8fc53517645e155cf1')
l2 = Userapp.create(:url => 'www.nomore.com', :apikey => '2fe461adb2b4b3493d4426e99b40ba8fc53517645e155cf1')
l3 = Userapp.create(:url => 'www.testingpage.com', :apikey => '2fe461adb2b4b3493d4426e99b40ba8fc53517645e155cf1')
l4 = Userapp.create(:url => 'www.all.com', :apikey => '2fe461adb2b4b3493d4426e99b40ba8fc53517645e155cf1')

u1 = User.create(:name => 'Mathias', :email => 'Mathias@mail.com',
                 :password => '111111', :password_confirmation => '111111',
                 :admin => true)
u2 = User.create(:name => 'Neo', :email => 'Neo@mail.com',
                 :password => '654321', :password_confirmation => '654321')
u3 = User.create(:name => 'Lou', :email => 'Lou@mail.com',
                 :password => '000000', :password_confirmation => '000000')

u1.userapps << l1
u2.userapps << l2
u3.userapps << l3

u1.userapps << l4
