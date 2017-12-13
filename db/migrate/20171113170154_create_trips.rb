class CreateTrips < ActiveRecord::Migration[5.1]
  def change
    create_table :trips do |t|
      t.integer :owner_id
      t.string :title
      t.string :description
      t.string :location
      t.integer :lng
      t.integer :lat
      t.integer :image_id

      t.timestamps
    end
  end
end
