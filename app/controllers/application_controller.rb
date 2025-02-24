class ApplicationController < ActionController::Base
  
    before_action :configure_permitted_parameters, if: :devise_controller?
    before_action :authenticate_user! 
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_in, keys: [:name, :password, :remember_me])
    end

     protected

     def after_sign_in_path_for(resource)
       request.env['omniauth.origin'] || stored_location_for(resource) || root_path
     end
end
