class Users::RegistrationsController < Devise::RegistrationsController
# before_filter :configure_sign_up_params, only: [:create]
# before_filter :configure_account_update_params, only: [:update]
before_filter :verify_is_admin, only: [:admin_edit,:admin_update]

  # GET /resource/sign_up
  # def new
  #   super
  # end

  # POST /resource
  # def create
  #  super
  # end

  # GET /resource/edit
   # def edit
   #   @user = User.find(params[:id])
   # end

  # PUT /resource
  #def update
  # super
  #end

  def admin_edit
    @user = User.find(params[:id])
  end

  def admin_update
    if current_user.admin?
      respond_to do |format|
        @user = User.find(params[:id])
        if @user.update(account_update_params)
          format.html { redirect_to user_index_path, notice: 'Usuário editado com sucesso!' }
          format.json { render :show, status: :ok, location: @user }
        else
          format.html { render :admin_edit }
          format.json { render json: @user.errors, status: :unprocessable_entity }
        end
      end
    end  
  end 

  # DELETE /resource
  def destroy
    super
    @user = User.find(params[:id])
    @user.destroy
  end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  # You can put the params you want to permit in the empty array.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.for(:sign_up) << :name
  # end

  # def configure_permitted_parameters
  #   devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:name, :ra, :role, :type, :internal, :institution, :email, :password, :password_confirmation, :remember_me) }
  #   devise_parameter_sanitizer.for(:sign_in) { |u| u.permit(:name, :ra, :role, :type, :internal, :institution, :email, :password, :password_confirmation, :remember_me) }
  # end

  # You can put the params you want to permit in the empty array.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.for(:account_update) << :attribute
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
  private

  def verify_is_admin
    (current_user.nil?) ? redirect_to(root_path) : (redirect_to(root_path) unless current_user.admin?)
  end

  protected

  def after_update_path_for(resource)
    case resource
    when :user, User
      root_path
    else
      super
    end
  end

  def after_update_path_for(resource)
    root_path
  end

  def after_put_path_for(resource)
    root_path
  end

  def after_patch_path_for(resource)
    case resource
    when :user, User
      root_path
    else
      super
    end
  end
 
  def account_update_params
    params.require(:user).permit(:name, :ra, :role, :type, :internal, :institution, :email, :password, :password_confirmation, :current_password)
  end
end
