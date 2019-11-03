update friends 
set confirmed = 1 
where user_id = $1 and user_id2 = $2