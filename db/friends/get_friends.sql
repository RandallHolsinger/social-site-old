-- select * from friends as f 
-- join users as u on u.user_id = f.user_id
-- where f.confirmed = 1 and f.user_id2 = $1
-- union
-- select * from friends as f 
-- join users as u on u.user_id = f.user_id2
-- where f.confirmed = 1 and f.user_id = $1

select user_id, confirmed from friends
where confirmed  = 1 and user_id2 = $1
union 
select user_id2, confirmed from friends
where confirmed = 1 and user_id = $1 