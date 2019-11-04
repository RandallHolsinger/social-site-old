select * from friends as f
join users as u on f.user_id = u.user_id
where confirmed = 1 
and (f.user_id = $1 or f.user_id2 = $1)

