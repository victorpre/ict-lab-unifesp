Rails.application.routes.draw do
  resources :equips
  resources :scheduling
  devise_for :users, :skip => [:sessions, :registrations], :controllers => { :registrations => "users/registrations", :sessions => "users/sessions" }
  resources :users, only: [:index, :unlock, :delete, :cancel]
  as :user do
    # devise/sessions
    get 'login' => 'users/sessions#new', :as => :new_user_session
    post 'login' => 'users/sessions#create', :as => :user_session
    delete 'logout' => 'users/sessions#destroy', :as => :destroy_user_session

    #devise/registrations
    get 'signup' => 'users/registrations#new', :as => :new_user_registration
    post 'signup' => 'users/registrations#create'

    get 'users/show/:id' => 'users#show', :as => :user
    get 'users/index' => 'users#index', :as => :user_index
    get 'edit_profile/:id' => 'users/registrations#edit', :as => :edit_user_registration
    put 'update_profile/:id' => 'users/registrations#update', :as => :update_user_registration

    #delete 'users/:id' => 'users/#destroy'
    #get 'cancel/:id' => 'users/#cancel', :as => :cancel_user_registration
  end
  
  delete 'users/:id' => 'users#destroy', :as => :admin_destroy_user


  root to: "home#index"

  get 'new_equip' => 'equips#new', :as => :new_equip_registration
  post 'new_equip' => 'equips#create', :as => :equip_registration

  get 'edit_equip' => 'equips/registrations#edit', :as => :edit_equip_registration
  put 'edit_equip' => 'equips/registrations#update'

  get 'users/:id' => 'users#unlock', :as => :unlock_registration
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
