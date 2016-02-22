class AddReferenceForeignKeyToEvent < ActiveRecord::Migration
  def change

    add_reference :events, :creator
    add_foreign_key :events, :creator

    add_reference :events, :position
    add_foreign_key :events, :position

    #t.references :creator, foreign_key: true
    #t.references :position, foreign_key: true

  end
end
