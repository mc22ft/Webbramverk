class CreateUserapps < ActiveRecord::Migration
  def change
    create_table :userapps do |t|
      t.string :url
      t.string :apikey

      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
    add_index :userapps, [:user_id, :created_at]
  end
end
