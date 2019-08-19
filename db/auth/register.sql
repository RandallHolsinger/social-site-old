insert into users(username, password, email, profile_img)
values (${username}, ${password}, ${email}, ${defaultImage})
returning user_id, username, email, profile_img