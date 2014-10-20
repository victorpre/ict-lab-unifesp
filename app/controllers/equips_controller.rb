class EquipsController < ApplicationController

  def new
    @equip = Equip.new
  end

  def create
    @equip = Equip.new(equip_params)
    if @equip.save
      redirect_to root_url,
                  notice: 'Equipamento criado com sucesso!'
    else
      render action: :new
    end
  end

  private
  
  def equip_params 
    params.require(:equip).permit(:name, :model, :patrimony_id, :cost)
  end
end
