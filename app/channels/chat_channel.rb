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

    askBot(data["body"])

  end

  private

  def askBot(message)
    case
    when message.match(/hvem er jeg/i)
      answer("vet ikke")
    when message.match(/hvem er du/i)
      answer("en robot")
    when message.match(/hvor er jeg/i)
      answer("i himmelen")
    end
  end

  def answer(text)
    bot = User.find_or_create_by!(email: "robot@bot.com", nickname: "Robot")
    msg = bot.messages.create!(body: text)
    ActionCable.server.broadcast "chat", { message: msg.as_json(include: :user) }
  end
end
