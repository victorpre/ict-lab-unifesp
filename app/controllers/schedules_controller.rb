class SchedulesController < ApplicationController
  before_action :set_schedule, only: [:show, :edit, :update, :destroy]
  respond_to :html, :xml, :json

  def index
    @schedules = Schedule.all
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
    equip = Equip.find(schedule_params["equip_id"])
    binding.pry
    # Tempo do agendamento em minutos
    schedule_length = (schedule_params["end_date"].to_time - schedule_params["start_date"].to_time)/60

    # Verifica se horario esta disponivel
    if (!equip.scheduled?(schedule_params["start_date"].to_date,schedule_params["start_date"].to_time..schedule_params["end_date"].to_time))
      # Verifica se duração é menor que 2 hrs, se o usuário não tem mais de 2 horas agendadas no dia e se o agendamento atual mais os outros agendamento não ultrapassam 2 hrs
      if (schedule_length < 120 && !user.two_hours_in_day?(schedule_params["start_date"].to_date) && (schedule_length + user.minutes_in_day(schedule_params["start_date"].to_date) < 120))
        @schedule = Schedule.new(schedule_params)
        binding.pry
        if @schedule.save
          render json: @schedule.id
        else
          render :json => { :errors => @schedule.errors.full_messages }
        end
      else
       render :json => { :errors => "" }, :status => 422 # Não pode agendar mais que duas horas em um dia
      end
    else
      render :json => { :errors => "" }, :status => 422 # Horario indisponivel
    end
  end

  def update
    @schedule.update(schedule_params)
    respond_with(@schedule)
  end

  def destroy
    @schedule.destroy
    respond_with(@schedule)
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
      params.require(:schedule).permit(:start_date, :end_date, :user_id, :equip_id)
    end
end
