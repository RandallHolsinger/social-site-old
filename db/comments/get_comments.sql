select * from comments as c
join users as u on c.user_id = u.user_id 
where post_id = $1