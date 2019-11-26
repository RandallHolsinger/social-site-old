select * from messages as m 
join users as u2 on u2.user_id = m.user_id2
join users as u on u.user_id = m.user_id1
where 
m.user_id1 = $1 and m.user_id2 = $2
or
m.user_id1 = $2 and m.user_id2 = $1