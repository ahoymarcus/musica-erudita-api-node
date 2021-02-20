const express = require('express');
const expressHandlebars = require('express-handlebars');

const handlers = require('./lib/handlers');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

// configurando a View engine Handlebars
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

// página inicial
// O mét app desconsidera case, / e a querystring
// código 200 é default no Express
app.get('/', handlers.home);

// página About
// O mét app desconsidera case, / e a querystring
// código 200 é default no Express
app.get('/about', handlers.about);


// página 404 personalizada
app.use(handlers.notFound);

// página 500 personalizada
app.use(handlers.serverError);


app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` + `press Ctrl+C to terminate...`
));
