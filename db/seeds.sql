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

create table posts (
  post_id serial primary key not null,
  user_id integer,
  post text,
  date time,
  image_id integer,
  likes integer
)

insert into posts (user_id, post, image_id, likes)
values ($1, $2, $3, 0)