class AddReferenceForeignKeyToEvent < ActiveRecord::Migration
  def change

    add_reference :events, :creator
    add_foreign_key :events, :creator

    add_reference :events, :position
    add_foreign_key :events, :position

  end
end
