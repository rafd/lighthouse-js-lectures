Rails.application.routes.draw do

  resources :users, only: [:show] do
    resources :posts, only: [] do
      resources :replies, only: [:create]
    end
  end

  resources :posts, only: [:index] do

  end
end
