select * from comments as c
join users as u on u.user_id = c.user_id
join posts as p on p.post_id = c.post_id
where c.post_id = $1