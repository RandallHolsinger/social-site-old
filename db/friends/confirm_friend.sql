update friends
set confirmed = 1
where user_id2 = $1 and user_id = $2