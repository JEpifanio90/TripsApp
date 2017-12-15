class ImagesController < ApplicationController
  before_action :authenticate_request
  before_action :set_image, only: [:show, :update, :destroy]

  # GET /images
  def index
    @images = Image.all

    render json: @images, status: :ok
  end

  # GET /images/1
  def show
    render json: @image, status: :ok
  end

  # POST /images
  def create
    image = Image.new
    image_object = params[:image]
    image.name = image_object.original_filename
    image.content_type = image_object.content_type
    image.file_size = image_object.size
    if image.save
      file_name_system = image.id.to_s + image_object.original_filename
      image.location = Rails.root.join('public', 'images', file_name_system) 
      File.open(image.location, 'wb') do |file|
        file.write(image_object.read)
      end

      image.save
      render json: image, status: :ok
    else
      render json: image.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /images/1
  def update
    if @image.update(image_params)
      render json: @image, status: :created
    else
      render json: @image.errors, status: :unprocessable_entity
    end
  end

  # DELETE /images/1
  def destroy
    @image.destroy
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def image_params
      params.require(:image).permit(:format, :controller, :action)
    end
end
