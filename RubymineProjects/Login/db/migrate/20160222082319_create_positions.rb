class CreatePositions < ActiveRecord::Migration
  def change
    create_table :positions do |t|

      t.string 'long', :null => false
      t.string 'lat', :null => false

      t.timestamps null: false
    end
  end
end
