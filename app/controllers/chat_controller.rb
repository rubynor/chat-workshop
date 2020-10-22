class ChatController < ApplicationController
  def init
    email = session[:email] || ""
    nickname = session[:nickname] || ""

    render component: 'chat/Login', props: { email: email, nickname: nickname }, tag: 'div', class: 'chat', prerender: false
  end

  def chat
    email = session[:email]
    nickname = session[:nickname]

    ActionCable.server.broadcast "ChatChannel", { hey: 'ya' }

    unless (email.present? && nickname.present?)
      redirect_to root_path
      return
    end

    render(
      component: 'chat/Chat',
      props: { email: email, nickname: nickname, messages: Message.all.as_json(include: :user) },
      tag: 'div',
      class: 'chat',
      prerender: false
    )
  end

  def login
    user = User.find_or_create_by!(email: user_attributes[:email])
    user.update!(user_attributes)

    session[:email] = user_attributes[:email]
    session[:nickname] = user_attributes[:nickname]

    render json: { redirect_path: chat_path }
  end

  private

  def user_attributes
    params.require(:user).permit([:email, :nickname])
  end
end
