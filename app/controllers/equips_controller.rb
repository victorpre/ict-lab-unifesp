class EquipsController < ApplicationController
  before_action :set_equip, only: [:show, :edit, :update, :destroy]
  respond_to :html, :xml, :json

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
    @equip = Equip.new(equip_params)
    @equip.save
    redirect_to :action => 'index'
  end

  def update
    @equip.update(equip_params)
    respond_with(@equip)
  end

  def destroy
    @equip.destroy
    render status: 200, json: @controller.to_json
  end

  private
    def set_equip
      @equip = Equip.find(params[:id])
    end

    def equip_params
      params.require(:equip).permit(:name, :model, :patrimony_id, :cost)
    end
end
