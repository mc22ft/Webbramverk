object @tag

attributes :name

child :events do
  attributes :name, :description, :created_at

  child :creator do
    attributes :name, :email
  end

  child :position do
    attributes :long, :lat
  end


  child :tags do
    attributes :name
  end

  node(:url){ |event| event_url(event)}

end



