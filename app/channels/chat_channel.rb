class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    user = User.find_by(email: data["email"])

    if user.blank?
      raise "No user found"
    end


    msg = user.messages.create!(body: data["body"])

    ActionCable.server.broadcast "chat", { message: msg.as_json(include: :user) }

    Chat::Bot.new(data["body"]).talk

  end
end
