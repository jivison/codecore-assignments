class User < ApplicationRecord
    has_secure_password
    
    validates :email, presence: true
    validate :validate_email


    private
    def validate_email
        valid_email_regex = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
        errors.add(:email, "is not valid email") unless valid_email_regex.match?(self.email)
    end 

end
