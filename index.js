 const express = require('express');
 const date = new Date(Date.now());
 const hour = date.getHours();
 const sec = date.getSeconds();
 const time = hour + ':' + sec;

//create array of movies
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
];


 const app = express();

 const PORT = 8080;

 app.get('/', (req, res) => {
     res.send('ok');
 });

 app.get('/about', (req, res) => {
     res.type('text/plain');
     res.send('About Hello World');
 });

 app.get('/test', (req, res) => {
    res.send({
        status: 200,
        message: "ok"
    });
});

app.get('/time', (req, res) => {
    res.send({
        status: 200,
        message: time
    });
});

app.get('/hello', (req, res) => {
    res.send({
        status: 200,
        message: "Hello" 
    });
});

app.get('/hello/:path*', (req, res) => {
    res.send({
        status: 200,
        message: "Hello, " + req.params.path
    });
});

app.get('/search', (req, res) => {
    const search = req.query.s;

    if (typeof search != 'undefined'){
        const response = {
            status: 200,
            message: "ok",
            data: search
        };
        res.send(response);
    }
    else {
        const response = {
            status: 500,
            error: true,
            message: "You have to provide a search"
        };
        res.status(500);
        res.send(response);
    }
});

app.get('/movies/add', (req, res) => {

});

app.get('/movies/get', (req, res) => {
    res.send({
        status: 200,
        data: movies
    })
});

app.get('/movies/edit', (req, res) => {

});

app.get('/movies/delete', (req, res) => {

});

 app.use((req, res) => {
     res.type('text/plain');
     res.status(404);
     res.send('404 - Not Found');
 });


 app.listen(PORT, () => {
     console.log(`Server running at: http://localhost:${PORT}/`);
 });