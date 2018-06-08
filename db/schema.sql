DROP DATABASE IF EXISTS ramen_db;
create database ramen_db;
use ramen_db;

create table ramens (
    id int not null auto_increment,
    name varchar(100) not null,
    made boolean default false,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (id)
);

