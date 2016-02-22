# encoding: utf-8

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


drop_table Creator
drop_table Userapp
drop_table Creator
drop_table Event
drop_table Position
drop_table Tag
drop_table Events_Tags

#creates end user
Creator.create(:name => 'Mathias Claesson', :email => 'mathias@mail.com')
Creator.create(:name => 'Tolou OSkooei', :email => 'tolou@mail.com')

#creates dev user and admin user (api key and url)
l1 = Userapp.create(:url => 'www.myapi.com', :apikey => '2fe461adb2b4b3493d4426e99b40ba8fc53517645e155cf1')
l2 = Userapp.create(:url => 'www.nomore.com', :apikey => '2fe461adb2b4b3493d4426e99b40ba8fc53517645e155cf1')
l3 = Userapp.create(:url => 'www.testingpage.com', :apikey => '2fe461adb2b4b3493d4426e99b40ba8fc53517645e155cf1')
l4 = Userapp.create(:url => 'www.all.com', :apikey => '2fe461adb2b4b3493d4426e99b40ba8fc53517645e155cf1')
l5 = Userapp.create(:url => 'www.myapis.com', :apikey => '2fe461adb2b4b3493d4426e99b40ba8fc53517645e155cf1')
l6 = Userapp.create(:url => 'www.nomores.com', :apikey => '2fe461adb2b4b3493d4426e99b40ba8fc53517645e155cf1')
l7 = Userapp.create(:url => 'www.testingpages.com', :apikey => '2fe461adb2b4b3493d4426e99b40ba8fc53517645e155cf1')
l8 = Userapp.create(:url => 'www.alls.com', :apikey => '2fe461adb2b4b3493d4426e99b40ba8fc53517645e155cf1')
l9 = Userapp.create(:url => 'www.myapin.com', :apikey => '2fe461adb2b4b3493d4426e99b40ba8fc53517645e155cf1')
l10 = Userapp.create(:url => 'www.nomoren.com', :apikey => '2fe461adb2b4b3493d4426e99b40ba8fc53517645e155cf1')
l11 = Userapp.create(:url => 'www.testingpagen.com', :apikey => '2fe461adb2b4b3493d4426e99b40ba8fc53517645e155cf1')
l12 = Userapp.create(:url => 'www.alln.com', :apikey => '2fe461adb2b4b3493d4426e99b40ba8fc53517645e155cf1')

u1 = User.create(:name => 'Administratören', :email => 'admin@mail.com',
                 :password => 'qwerty', :password_confirmation => 'qwerty',
                 :admin => true)
u2 = User.create(:name => 'Användaren', :email => 'user@mail.com',
                 :password => '123456', :password_confirmation => '123456')

u1.userapps << l1
u1.userapps << l2
u1.userapps << l3
u2.userapps << l4
u2.userapps << l5
u2.userapps << l6
u2.userapps << l7
u2.userapps << l8
u2.userapps << l9
u2.userapps << l10
u2.userapps << l11
u2.userapps << l12

