insert into messages(user_id1, user_id2, subject, message, date)
values($1, $2, $3, $4, now())