insert into comments (user_id, post_id, comment, likes, date)
values($1, $2, $3,  0, now())