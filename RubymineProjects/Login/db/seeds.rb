# encoding: utf-8

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


l1 = App.create(:url => 'www.myAPI.com', :key => '123456789')
l2 = App.create(:url => 'www.noMore.com', :key => '987654321')
l3 = App.create(:url => 'www.testingPage.com', :key => '00000000000')
l4 = App.create(:url => 'www.all.com', :key => '10101010101010')

u1 = User.create(:name => 'Mathias', :email => 'Mathias@mail.com',
                 :password => '111111', :password_confirmation => '111111',
                 :admin => true)
u2 = User.create(:name => 'Neo', :email => 'Neo@mail.com',
                 :password => '654321', :password_confirmation => '654321')
u3 = User.create(:name => 'Lou', :email => 'Lou@mail.com',
                 :password => '000000', :password_confirmation => '000000')

u1.apps << l1
u2.apps << l2
u3.apps << l3

u1.apps << l4
