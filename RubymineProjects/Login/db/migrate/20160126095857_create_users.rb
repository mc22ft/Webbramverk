class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|

      t.string 'name', :limit => 50, :null => false
      t.string 'email', :default => '', :null => false
      t.string 'password', :limit => 50, :null => false

      t.timestamps null: false
    end
  end
end
