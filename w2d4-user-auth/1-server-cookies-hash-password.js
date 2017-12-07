const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
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
app.use(cookieParser());

app.get('/', (req, res) => {
  const user = findUser(req.cookies.userId);
  res.render('index', { user: user });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = authenticateUser(email, password);

  if(user) {
    res.cookie('userId', user.id, { maxAge: 90000 });
    res.redirect('/');
  } else {
    res.send("Your email or password were incorrect");
  }

});

app.post('/logout', (req, res) => {
  res.clearCookie('userId');
  res.redirect('/');
});

app.post('/register', (req, res) => {
  const { email, password } = req.body;
  const user = registerUser(email, password);
  if(user) {
    res.cookie('userId', user.id, { maxAge: 90000 });
    res.redirect('/');
  } else {
    res.send('Registration failed');
  }
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});
