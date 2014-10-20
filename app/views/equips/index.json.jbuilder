json.array!(@equips) do |equip|
  json.extract! equip, :id, :name, :model, :patrimony_id, :cost
  json.url equip_url(equip, format: :json)
end
