class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|

      t.string 'user_name', :limit => 20, :null => false
      t.string 'password', :limit => 20, :null => false
      t.string 'email', :default => '', :null => false

      t.timestamps null: false
    end
  end
end
