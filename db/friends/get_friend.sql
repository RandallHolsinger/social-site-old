select * from friends as f
join users as us on f.user_id = u.user_id
where friend_id = $1