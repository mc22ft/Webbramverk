# encoding: utf-8

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


#creates dev user and admin user (api key and url)
l1 = Userapp.create(:url => 'www.myapi.com', :apikey => '1fe461adb2b4b3493d4426e99b40ba8fc53517645e155cf1')
l2 = Userapp.create(:url => 'www.nomore.com', :apikey => '2fe461adb2b4b3493d4426e99b40ba8fc53517645e155cf2')
l3 = Userapp.create(:url => 'www.testingpage.com', :apikey => '3fe461adb2b4b3493d4426e99b40ba8fc53517645e155cf3')
l4 = Userapp.create(:url => 'www.all.com', :apikey => '4fe461adb2b4b3493d4426e99b40ba8fc53517645e155cf4')
l5 = Userapp.create(:url => 'www.myapis.com', :apikey => '5fe461adb2b4b3493d4426e99b40ba8fc53517645e155cf5')
l6 = Userapp.create(:url => 'www.nomores.com', :apikey => '6fe461adb2b4b3493d4426e99b40ba8fc53517645e155cf6')
l7 = Userapp.create(:url => 'www.testingpages.com', :apikey => '7fe461adb2b4b3493d4426e99b40ba8fc53517645e155cf7')
l8 = Userapp.create(:url => 'www.alls.com', :apikey => '8fe461adb2b4b3493d4426e99b40ba8fc53517645e155cf8')
l9 = Userapp.create(:url => 'www.myapin.com', :apikey => '9fe461adb2b4b3493d4426e99b40ba8fc53517645e155cf9')
l10 = Userapp.create(:url => 'www.nomoren.com', :apikey => '10fe461adb2b4b3493d4426e99b40ba8fc53517645e155cf10')
l11 = Userapp.create(:url => 'www.testingpagen.com', :apikey => '11fe461adb2b4b3493d4426e99b40ba8fc53517645e155cf11')
l12 = Userapp.create(:url => 'www.alln.com', :apikey => '12fe461adb2b4b3493d4426e99b40ba8fc53517645e155cf12')

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


#creates end user
creator1 = Creator.create(:name => 'Neo', :email => 'neo@mail.com',
                          :password => '111111', :password_confirmation => '111111')
creator2 = Creator.create(:name => 'Lou', :email => 'lou@mail.com',
                          :password => '111111', :password_confirmation => '111111')
creator3 = Creator.create(:name => 'Mathias', :email => 'mathias@mail.com',
                          :password => '111111', :password_confirmation => '111111')
creator4 = Creator.create(:name => 'Tolou', :email => 'tolou@mail.com',
                          :password => '111111', :password_confirmation => '111111')


event1 = Event.create(:name => 'Restaurang Food', :description => 'Otroligt god pizza som slår det mesta i Stockholm', :position_id => '1')
event2 = Event.create(:name => 'Burger Joint', :description => 'Bästa burgaren som finns!!! Ta den med extra allt den är grym!', :position_id => '2')
event3 = Event.create(:name => 'Pizza och Deli', :description => 'God kebab som slår det mesta', :position_id => '3')
event4 = Event.create(:name => 'Kaffe Med Mera', :description => 'Super god fika som slår det mesta i området', :position_id => '4')

position1 = Position.create(:long => '18.087702', :lat => '59.313177')
position2 = Position.create(:long => '18.06858', :lat => '59.32932')
position3 = Position.create(:long => '18.104439', :lat => '59.303452')
position4 = Position.create(:long => '18.035345', :lat => '59.333934')

tag1 = Tag.create(:name => 'Pizza')
tag2 = Tag.create(:name => 'Hamburgare')
tag3 = Tag.create(:name => 'Kebab')
tag4 = Tag.create(:name => 'Fika')

#add creator to event
#event1.creator = creator1
#event2.creator = creator2
#event3.creator = creator3
#event4.creator = creator4
creator1.events << event1
creator2.events << event2
creator3.events << event3
creator4.events << event4
#add position to event

#event1.position << position1
#event2.position << position2
#event3.position << position3
#event4.position << position4

#position1.event << event1
#position2.event << event2
#position3.event << event3
#position4.event << event4
#add tag to event (connections table, events_tags table)
event1.tags << tag1
event2.tags << tag2
event3.tags << tag3
event4.tags << tag4


