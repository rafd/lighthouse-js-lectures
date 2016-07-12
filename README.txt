IMPORT:
 sqlite3 music.db < seed.sql

OPEN REPL:
  sqlite3 music.db

LIST TABLES:
  .tables

CHECK SCHEMA:
  .schema "table"

TURN ON COLUMNS AND HEADERS:
  .mode column
  .headers on


you can copy/paste queries from queries.sql
