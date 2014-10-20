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
    respond_with(@equip)
  end

  def update
    @equip.update(equip_params)
    respond_with(@equip)
  end

  def destroy
    @equip.destroy
    respond_with(@equip)
  end

  private
    def set_equip
      @equip = Equip.find(params[:id])
    end

    def equip_params
      params.require(:equip).permit(:name, :model, :patrimony_id, :cost)
    end
end
