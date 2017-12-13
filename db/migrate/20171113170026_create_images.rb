class CreateImages < ActiveRecord::Migration[5.1]
  def change
    create_table :images do |t|
      t.string  :name
      t.string  :content_type
      t.integer :file_size
      t.string  :location

      t.timestamps
    end
  end
end
