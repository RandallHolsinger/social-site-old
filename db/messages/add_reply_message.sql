insert into message (user_id, message_id, reply, date)
values($1, $2, $3, now())