const { name } = require('ejs');
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
const knex = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'postgres',
        password: '1873',
        database: 'pastebin',
        port: 5432
    }
});
app.get('/', (req, res) => {
    res.render('index');
});
app.post('/', (req, res) => {
    let bTitle = req.body.title;
    let bText = req.body.text;
    knex('paste')
        .insert({ title: bTitle, text: bText })
        .then(result => { res.render('index') })
});

app.get('/pastes', (req, res) => {
    knex
        .select().from('paste').then(result => {
            res.render('pastes', { aPaste: result })
        });
})

app.listen(3000);