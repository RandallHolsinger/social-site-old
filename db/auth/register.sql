insert into users(username, password, email, profile_img, date)
values (${username}, ${password}, ${email}, ${defaultImage}, now())
returning user_id, username, email, profile_img