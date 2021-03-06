require_relative 'boot'

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
# require "sprockets/railtie"
require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module TripsApp
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1
    config.generators do |g| 
      g.orm :active_record 
    end
    config.assets.paths << Rails.root.join('vendor', 'assets', 'bower_components')
    # config.autoload_paths << Rails.root.join('lib')
    config.eager_load_paths << Rails.root.join('lib')
    config.api_only = true
  end
end
