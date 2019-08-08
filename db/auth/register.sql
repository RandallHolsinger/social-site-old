insert into users(username, password, email, dob, city, state, profile_img)
values (${username}, ${password}, ${email}, ${dob}, ${city}, ${state}, ${defaultImage})
returning user_id, username