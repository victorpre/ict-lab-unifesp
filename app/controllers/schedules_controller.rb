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
    if (schedule_params["end_date"].to_time - schedule_params["start_date"].to_time) < 2 && !user.two_hours_in_day?(schedule_params["start_date"])
      @schedule = Schedule.new(schedule_params)
      if @schedule.save
        render json: @schedule.id
      else
        render :json => { :errors => @schedule.errors.full_messages }
      end
    else
      # Não pode agendar mais que duas horas em um dia
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
