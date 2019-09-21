Rails.application.routes.draw do

  root to: "posts#index"

  resources :posts do 
    resources :comments, only: [:create, :destroy]
  end

  resources :users, only: [:new, :create, :edit, :update] do
    get "edit_password"
    post "update_password"
  end

  resources :sessions, only: [:new, :create] do 
    delete :destroy, on: :collection
  end

end
