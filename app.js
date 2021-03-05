const express = require('express');
const dotenv = require('dotenv');

// dotenv - Load config
dotenv.config({ path: './config.env' });

const app = express();

// Startup
require('./startup/db')();
require('./startup/parser-and-override')(app);
require('./startup/session')(app);
require('./startup/auth')(app);
require('./startup/logger')(app);
require('./startup/templating')(app);
require('./startup/routes')(app);

const PORT = 3000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
