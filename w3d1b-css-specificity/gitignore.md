.gitignore

a file in your git repo that tell git to completely ignore certain files

types of files you want ignore:
  - generated/compiled files
      ex. node_modules
  - passwords / sensitive information
     ex. .env   (but probably want a .env.sample)
  - IDE / editor configuration

.gitignore should be committed to your repo

useful templates:
  https://github.com/github/gitignore

if you've already added some file .gitignore will not remove it
  (you need to rm it, commit, then add the .gitignore)
