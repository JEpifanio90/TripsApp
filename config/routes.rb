Rails.application.routes.draw do
  root 'ui#index'
  scope :api, defaults: {format: :json} do
    resources :images
    resources :trips
    resources :users #, except: [:new, :edit]
    post 'login', to: 'authentication#authenticate'
  end
end
