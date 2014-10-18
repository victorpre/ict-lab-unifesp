class UsersController < ApplicationController
  before_action :authenticate_user!
  
  def new
    @user = User.new
  end

  def create
    @user = User.new(params[:user])
    if @user.save
      redirect_to root_url,
                  notice: 'Cadastro criado com sucesso!'
    else
      render action: :new
    end
  end 
end
