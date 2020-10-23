module Chat
  class WikiBot
    def initialize(message)
      @message = message
    end

    def talk
      case @message
      when /wiki/i
        wiki_text = wiki_lookup(@message.gsub("wiki", "").strip)
        response(wiki_text.truncate(300))
      end
    end

    private

    def response(text)
      bot = User.find_or_create_by!(email: "robot@bot.com", nickname: "Robot")
      msg = bot.messages.create!(body: text)
      ActionCable.server.broadcast "chat", { message: msg.as_json(include: :user) }
    end

    def wiki_lookup(search_word)
      response = HTTP.get("https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts|pageimages&exintro&explaintext&generator=search&gsrsearch=intitle:#{URI.encode(search_word)}&gsrlimit=1&redirects=1")

      unless response.status == 200
        return 'Fant ikke noe :('
      end

      parsed_response = JSON.parse(response.to_s)

      parsed_response["query"]["pages"].first[1]["extract"]
    end
  end
end
