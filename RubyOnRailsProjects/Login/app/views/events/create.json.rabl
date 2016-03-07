object @event

attributes :name, :description, :id, :created_at

child :creator do
  attributes :name, :email
end

child :position do
  attributes :address, :long, :lat
end


child :tags do
  attributes :name
end

node(:url){ |event| event_url(event)}


