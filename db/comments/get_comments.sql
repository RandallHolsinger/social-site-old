select * from comments as c
join users as u on c.user_id = u.user_id
join posts as p on c.post_id = p.post_id 
where c.post_id = p.post_id