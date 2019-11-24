select * from friends as f
join users as u on f.user_id = u.user_id
where f.user_id2 = $1 and f.confirmed = 0