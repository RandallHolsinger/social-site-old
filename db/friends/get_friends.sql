select * from friends as f
join users as u on u.user_id = f.user_id
where user_id2 = $1 and confirmed = 1