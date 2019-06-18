createuser -P lighthouse
(password: lighthouse)

createdb w4d2 -O lighthouse

psql w4d2 < pgseed.sql

node index.js "Explosions in the Sky"

node index2.js "Explosions in the Sky"




not necessary, but if you need to add privileges for an existing user to an existing database:

GRANT ALL PRIVILEGES on OUR_DB to OUR_USER;
GRANT ALL ON ALL IN SCHEMA PUBLIC to OUR_USER;