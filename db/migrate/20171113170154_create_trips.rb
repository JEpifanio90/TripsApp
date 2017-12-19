class CreateTrips < ActiveRecord::Migration[5.1]
  def change
    create_table :trips do |t|
      t.integer :owner_id
      t.string :title
      t.string :description
      t.string :location
      t.float :lng
      t.float :lat
      t.string :image_name

      t.timestamps
    end
  end
end
