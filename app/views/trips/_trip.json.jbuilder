json.extract! trip, :id, :owner_id, :title, :description, :location, :image_id, :created_at, :updated_at
json.url trip_url(trip, format: :json)
