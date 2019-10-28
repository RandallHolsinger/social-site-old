select * from messages as m 
join users as u on m.user_id = u.user_id
where user_id = $1
