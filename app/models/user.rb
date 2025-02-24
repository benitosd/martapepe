class User < ApplicationRecord
  devise :database_authenticatable,
         :rememberable,
         authentication_keys: [:name]

  validates :name, presence: true, uniqueness: true
end
