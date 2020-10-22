Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get :chat, to: 'chat#chat', as: 'chat'
  post :login, to: 'chat#login'
  root to: 'chat#init'
end
