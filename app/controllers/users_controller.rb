class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy, :unlock]
  respond_to :html, :xml, :json
  before_filter :verify_is_admin, only: [:index]


  # GET /users
  # GET /users.json
  def index
    @users = User.where("id != ?" , current_user.id).order('name ASC')
    respond_with(@users)
  end

  # GET /users/1
  # GET /users/1.json
  def show
    @user = User.find(params[:id])
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
    @user = User.find(params[:id])
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        format.html { redirect_to @user, notice: 'Usuário criado com sucesso!' }
        format.json { render :show, status: :created, location: @user }
      else
        format.html { render :new }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  # def update
  #   respond_to do |format|
  #     if @user.update(user_params)
  #     else
  #       format.html { render :edit }
  #       format.json { render json: @user.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    if current_user.admin?
      @user = User.find(params[:id])
      @user.destroy
      render status: 200, json: @controller.to_json
    else
      render status: 500, json: @controller.to_json
    end
  end

  def unlock
    if current_user.unlock(@user)
      render status: 200, json: @controller.to_json
    else
      render status: 500, json: @controller.to_json
    end
  end

  private

  def verify_is_admin
    (current_user.nil?) ? redirect_to(root_path) : (redirect_to(root_path) unless current_user.admin?)
  end

    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:name, :ra, :role, :type, :internal, :institution, :email, :password, :password_confirmation, :current_password)
    end
end
