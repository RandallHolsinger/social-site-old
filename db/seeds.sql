CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

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
  user_id1 integer not null,
  user_id2 integer not null,
  confirmed integer default 0
)

create table messages (
   message_id serial primary key not null,
   user_id1 integer,
   user_id2 integer,
   subject varchar(40),
   message text,
   date TIMESTAMP
)

create table Message (
  messages_id serial primary key not null,
  user_id integer not null,
  message_id integer not null,
  reply text,
  date TIMESTAMP
 )
