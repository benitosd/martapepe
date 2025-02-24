class Client < ActiveRecord::Base
belongs_to :method_of_payment
belongs_to :province
belongs_to :municipality
  
end
