require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

const sequelize = require('./database');
const tasksRouter = require('./routes/tasks');
const authRouter = require('./routes/auth');
const app = express();

const port = process.env.PORT || 8080;

sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.log('Error syncing database: ' + err));

app.use(cors({
  origin: process.env.CLIENT_HOST,
  credentials: true
}));
app.use(session({
  store: new pgSession({
    conObject: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: 5432,
      database: process.env.DB_NAME
    }
  }),
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
}));
app.use(bodyParser.json());

// routes
app.use('/tasks', tasksRouter);
app.use('/auth', authRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});