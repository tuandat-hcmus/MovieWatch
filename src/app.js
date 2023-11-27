const express = require('express');
require('dotenv').config();
const path = require('path');
const app = express();
const td = require('./21430');
const port = process.env.PORT;

app.engine('td', td.engine);

app.set('views', path.join(__dirname, 'resources', 'views'));
app.set('view engine', 'td');

app.get('/', (req, res) => {
    res.render('home', data = {detail: 'This is my home page',
    x: 1, sub: 'this is another text',
    arr: [1, 2, 3]});
});

app.listen(port, () => {
    console.log(`App listening on localhost:${port}`);
})
