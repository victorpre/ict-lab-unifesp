class SchedulesController < ApplicationController
  before_action :set_schedule, only: [:show, :edit, :update, :destroy]
  respond_to :html, :xml, :json

  def index
    respond_with(@schedules)
  end

  def show
    respond_with(@schedule)
  end

  def new
    @schedule = Schedule.new
    respond_with(@schedule)
  end

  def edit
  end

  def create
    user = User.find(schedule_params["user_id"])
    if schedule_params["equip_id"] == nil
      render :json => { :errors => "Equipamento não selecionado!" }
      return
    end

    equip = Equip.find(schedule_params["equip_id"])
    selected_day = schedule_params["start_date"].to_date

    # Tempo do agendamento em minutos
    schedule_length = (schedule_params["end_date"].to_time - schedule_params["start_date"].to_time)/60
    if(schedule_length > 0)
      # Verifica se horario esta disponivel
      if (!equip.scheduled?(selected_day,schedule_params["start_date"].to_time..schedule_params["end_date"].to_time))
        # Verifica se duração é menor que 2 hrs,
        if (schedule_length <= 120 )
           # Verifica se o usuário não tem mais de 2 horas agendadas no dia
          if (!user.two_hours_in_day?(selected_day) && (schedule_length + user.minutes_in_day(selected_day) <= 120))
            if (!user.four_hours_in_week?(selected_day) && (schedule_length + user.minutes_in_week(selected_day) <= 240))
              @schedule = Schedule.new(schedule_params)
              @schedule.user_name = user.name
              if @schedule.save
                render json: @schedule.id
              else
                render :json => { :errors => @schedule.errors.full_messages }
              end
             else
              render :json => { :errors => "Usuário não pode agendar mais do que quatro horas em uma semana." }
             end
          else
            render :json => { :errors => "Usuário não pode agendar mais de duas horas em um dia." }
          end
        else
         render :json => { :errors => "Impossível realizar um agendamento com duração maior do que duas horas." }
        end
      else
        render :json => { :errors => "Horario indisponivel!" } # Horario indisponivel
      end
    else
      render :json => { :errors => "Horário não permitido." }
    end
  end

  def update
    @schedule.update(schedule_params)
    respond_with(@schedule)
  end

  def destroy
    @schedule.destroy
    render status: 200, json: @controller.to_json
  end

  def list
    @schedules = Schedule.where(equip_id: params[:equip_id])
    render :json => @schedules
  end

  private
    def set_schedule
      @schedule = Schedule.find(params[:id])
    end

    def schedule_params
      params.require(:schedule).permit(:start_date, :end_date, :user_id, :equip_id, :user_name)
    end
end
