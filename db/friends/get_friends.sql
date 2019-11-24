select * from friends as f
join users as u on u.user_id = f.user_id1
where f.confirmed = 1 and f.user_id2 = $1
union
select * from friends as f 
join users as u on u.user_id = f.user_id2
where f.confirmed = 1 and f.user_id1 = $1





