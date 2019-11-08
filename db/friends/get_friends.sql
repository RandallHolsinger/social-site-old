select * from friends as f
join users as u1 on f.user_id = u1.user_id
join users as u2 on f.user_id2 = u2.user_id
CASE when f.user_id = $1 and confirmed = 1 then f.user_id2
     when f.user_id2 = $1 and confirmed = 1 then f.user_id
END




