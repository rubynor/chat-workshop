module Chat
  class RaffleBot
    def initialize(message)
      @message = message
    end

    def talk
      case @message
      when /hvem er vinneren/i
        20.times do
          usr = User.all.sample

          sleep 0.2
          response("#{usr.nickname}, #{usr.email}")
        end
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
