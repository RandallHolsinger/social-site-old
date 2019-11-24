select * from messages as m 
join users as u on u.user_id = m.user_id1
where m.user_id2 = $1 and m.user_id1 = $2
union 
select * from messages as m 
join users as u on u.user_id = m.user_id2
where m.user_id1 = $1 and m.user_id2 = $2