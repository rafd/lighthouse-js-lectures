const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
};

function checkPassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

const app = express();

const users = [
  { 
    id: 1,
    email: 'alice@example.com',
    password: hashPassword('password')
  },
  { 
    id: 2,
    email: 'bob@example.com',
    password: hashPassword('notpassword')
  }
];

function findUser(id) {
  return users.find((user) => user.id == id);
}
 
function registerUser(email, password) {
  if(email === "" || password === "") {
    return null;
  } else if(users.find((user) => user.email === email)) {
    return null;
  } else {
    const user = { 
                   id: users.length + 1,
                   email: email, 
                   password: hashPassword(password)
                 };
    users.push(user);
    return user;
  }
}

function authenticateUser(email, password) {
  return users.find((user) => user.email === email && checkPassword(password, user.password));
}

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ name: 'w2d4-user-auth', 
                        secret: "THIS SHOULD BE READ FROM ENV, NOT COMMITTED",
                        maxAge: 900000 }));

app.get('/', (req, res) => {
  const user = findUser(req.session.userId);
  res.render('index', { user: user });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = authenticateUser(email, password);

  if(user) {
    req.session.userId = user.id;
    res.redirect('/');
  } else {
    res.send("Your email or password were incorrect");
  }

});

app.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

app.post('/register', (req, res) => {
  const { email, password } = req.body;
  const user = registerUser(email, password);
  if(user) {
    req.session.userId = user.id;
    res.redirect('/');
  } else {
    res.send('Registration failed');
  }
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});
