insert into posts (user_id, post, likes)
values ($1, $2, 0);

select * from posts as p 
join users as u on p.user_id = u.user_id;
