Rails.application.routes.draw do

  get 'comments/create'
  get 'comments/destroy'
  root to: "posts#index"

  resources :posts do 
    resources :comments, only: [:create, :destroy]
  end

end
