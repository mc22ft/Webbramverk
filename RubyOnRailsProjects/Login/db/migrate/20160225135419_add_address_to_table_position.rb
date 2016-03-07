class AddAddressToTablePosition < ActiveRecord::Migration
  def change
    add_column :positions, :address, :string
  end
end
