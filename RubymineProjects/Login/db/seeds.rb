# encoding: utf-8

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


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


#creates end user
creator1 = Creator.create(:name => 'Neo', :email => 'neo@mail.com',
               :password => '111111', :password_confirmation => '111111')
creator2 = Creator.create(:name => 'Lou', :email => 'lou@mail.com',
               :password => '111111', :password_confirmation => '111111')
creator3 = Creator.create(:name => 'Neo', :email => 'neo@mail.com',
                          :password => '111111', :password_confirmation => '111111')
creator4 = Creator.create(:name => 'Neo', :email => 'neo@mail.com',
                          :password => '111111', :password_confirmation => '111111')
creator5 = Creator.create(:name => 'Neo', :email => 'neo@mail.com',
                          :password => '111111', :password_confirmation => '111111')


event1 = Event.create(:name => 'Kebaben', :description => 'Super god kebab som slår det mesta i området')
event2 = Event.create(:name => 'Pizzan', :description => 'Super god pizza som slår det mesta i området')
event3 = Event.create(:name => 'Kebaben', :description => 'Super god kebab som slår det mesta i området')
event4 = Event.create(:name => 'Pizzan', :description => 'Super god pizza som slår det mesta i området')

position1 = Position.create(:long => '12345678', :lat => '12345678')
position2 = Position.create(:long => '12345678', :lat => '12345678')
position3 = Position.create(:long => '12345678', :lat => '12345678')
position4 = Position.create(:long => '12345678', :lat => '12345678')

tag1 = Tag.create(:name => 'södermalm')
tag2 = Tag.create(:name => 'kungsholmen')
tag3 = Tag.create(:name => 'södermalm')
tag4 = Tag.create(:name => 'kungsholmen')



#add creator to event
creator1.events << event1
creator2.events << event2
creator3.events << event3
creator4.events << event4
#add position to event
position1.events << event1
position2.events << event2
position3.events << event3
position4.events << event4
#add tag to event (connections table, events_tags table)
event1.tags << tag1
event2.tags << tag2
event3.tags << tag3
event4.tags << tag4


