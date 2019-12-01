select * from message as m 
join users as u on u.user_id = m.user_id
join messages as m2 on m2.message_id = m.message_id
where m.message_id = $1 