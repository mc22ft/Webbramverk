class CreateApps < ActiveRecord::Migration
  def change
    create_table :apps do |t|

      t.references :user

      t.string 'url', :null => false
      t.string 'key', :null => false

      t.timestamps null: false
    end
  end
end
