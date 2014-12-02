class EquipsController < ApplicationController
  before_action :set_equip, only: [:show, :edit, :update, :destroy]
  respond_to :html, :xml, :json
  before_filter :verify_is_admin, :except => [:index]

  def index
    @equips = Equip.all
    respond_with(@equips)
  end

  def show
    respond_with(@equip)
  end

  def new
    @equip = Equip.new
    respond_with(@equip)
  end

  def edit
  end

  def create
    parsed_params = parse_cost(equip_params)
    @equip = Equip.new(parsed_params)
    if @equip.save
      redirect_to :action => 'index'
    else
      render :json => { :errors => @equip.errors.full_messages }
    end
  end

  def update
    parsed_params = parse_cost(equip_params)
    @equip.update(parsed_params)
    if @equip.save
      render status: 200, json: @controller.to_json
    else
      render :json => { :errors => @equip.errors.full_messages }
    end
  end

  def destroy
    @equip.destroy
    render status: 200, json: @controller.to_json
  end

  private

  def verify_is_admin
    (current_user.nil?) ? redirect_to(root_path) : (redirect_to(root_path) unless current_user.admin?)
  end

  def parse_cost(params)
    new_params=params
    new_params["cost"] = new_params["cost"].to_s.gsub(",",".")
    new_params
  end

  def set_equip
    @equip = Equip.find(params[:id])
  end

  def equip_params
    params.require(:equip).permit(:name, :model, :patrimony_id, :cost)
  end
end
