json.array!(@schedules) do |schedule|
  json.extract! schedule, :id, :start_date, :end_date, :user_id, :equip_id
  json.url schedule_url(schedule, format: :json)
end
