# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150220131704) do

  create_table "players", force: true do |t|
    t.string   "name"
    t.integer  "age"
    t.integer  "team_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "players", ["name"], name: "index_players_on_name"
  add_index "players", ["team_id"], name: "index_players_on_team_id"

  create_table "teams", force: true do |t|
    t.string   "name"
    t.string   "nickname"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "address"
    t.float    "longitude"
    t.float    "latitude"
  end

  create_table "users", force: true do |t|
    t.string   "email"
    t.string   "screenname"
    t.string   "password_digest"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
