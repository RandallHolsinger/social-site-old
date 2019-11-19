select * from friends as f
join users as u on u.user_id = f.user_id
where u.user_id2 = $1
union 
select * from friends as f
join users as u on u.user_id = f.user_id2
where f.friend_id = $1