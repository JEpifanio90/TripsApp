json.extract! image, :id, :owner_id, :src, :created_at, :updated_at
json.url image_url(image, format: :json)
