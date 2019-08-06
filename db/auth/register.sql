insert into users(username, password, email, dob, city, state)
values (${username}, ${password}, ${email}, ${dob}, ${city}, ${state})
returning user_id, username