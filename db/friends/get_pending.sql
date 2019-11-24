select * from friends as f
join users as u on u.user_id = f.user_id1
where f.user_id2 = $1 and f.confirmed = 0