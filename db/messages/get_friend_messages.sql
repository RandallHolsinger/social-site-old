select user_id, message from messages as m
join users as u on u.user_id = m.user_id
where m.user_id2 = $1
union 
select user_id2, message from messages as m 
join users as u on u.user_id = m.user_id2
where m.user_id = $1