create table users(
  user_id serial primary key not null,
  username varchar(100),
  password varchar(100),
  email text,
  dob varchar(10),
  city varchar(50),
  state varchar(50),
  profile_img text,
  about_me text
)