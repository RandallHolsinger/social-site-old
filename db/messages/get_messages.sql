-- select * from messages as m 
-- join users as u on u.user_id = m.user_id1
-- where m.user_id2 = $1 or m.user_id1 = $1
-- union
-- select * from messages as m 
-- join users as u on u.user_id = m.user_id2
-- where m.user_id1 = $1 or m.user_id2 = $1

select * from messages as m 
join users as u2 on u2.user_id = m.user_id2
join users as u on u.user_id = m.user_id1
where m.user_id1 = $1 or m.user_id2 = $1