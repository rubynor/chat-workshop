module Chat
  class Bot
    def initialize(message)
      @message = message
    end

    def talk
      case
      when @message.match(/hvem er jeg/i)
        response("vet ikke")
      when @message.match(/hvem er du/i)
        response("en robot")
      when @message.match(/hvor er jeg/i)
        response("i himmelen")
      end
    end

    private

    def response(text)
      bot = User.find_or_create_by!(email: "robot@bot.com", nickname: "Robot")
      msg = bot.messages.create!(body: text)
      ActionCable.server.broadcast "chat", { message: msg.as_json(include: :user) }
    end
  end
end
