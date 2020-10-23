class User < ApplicationRecord
  include GravatarImageTag

  has_many :messages

  def avatar_url
    gravatar_image_url(self.email)
  end

  def attributes
    super.merge({'avatar_url' => avatar_url})
  end
end
