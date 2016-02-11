object @creator

attributes :name, :email, :created_at

node(:edit_url){ |creator| edit_creator_url(creator)}


