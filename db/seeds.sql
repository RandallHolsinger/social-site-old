create table users(
  user_id serial primary key not null,
  username varchar(100),
  password varchar(100),
  email text,
  dob varchar(10),
  city varchar(50),
  state varchar(50),
  profile_img text,
  about_me text,
  date TIMESTAMP
)

create table posts (
  post_id serial primary key not null,
  user_id integer,
  post text,
  date TIMESTAMP,
  image_id integer,
  likes integer
)

create table comments (
  comment_id serial primary key not null,
  user_id integer,
  post_id integer
  comment text,
  likes integer,
  date TIMESTAMP
)

create table friends (
  friend_id serial primary key not null,
  user_id integer,
  user_id2 integer,
  confirmed integer
)

create table messages(
  message_id serial primary key not null,
  user_id integer,
  user_id2 integer,
  message text,
  date TIMESTAMP
)

insert into posts (user_id, post, image_id, likes)
values ($1, $2, $3, 0)