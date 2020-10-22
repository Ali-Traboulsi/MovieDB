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


app.get('/movies/get', (req, res) => {
    res.send({
        status: 200,
        data: movies
    })
});

app.get('/movies/get/by-date', (req, res) => {
    let moviesOrdered = movies;
    moviesOrdered.sort((a,b) =>{
        return a.year - b.year;
    });

    res.send({
        status: 200,
        data: moviesOrdered
    })
});

app.get('/movies/get/by-rating', (req, res) => {
    let ratedMovies = movies;
    ratedMovies.sort((a,b) => {
        return b.rating - a.rating;
    });

    res.send({
        status: 200,
        data: ratedMovies
    })
});

app.get('/movies/get/by-title', (req, res) => {
    let titledMovies = movies;
    titledMovies.sort((a,b) => {
        if (a.title < b.title){ return -1 };
        if (a.title > b.title){ return 1 };
        return 0;
    });

    res.send({
        status: 200,
        data: titledMovies
    })
});

app.get('/movies/get/id/:movieID', (req, res) => {
    if (req.params.movieID <= movies.length -1){
        res.send({
            status: 200,
            data: movies[req.params.movieID]
        });        
    }
    else {
        res.send({
            status: 404,
            error: true,
            message: 'the movie with id: ' + req.params.movieID + ' do not exist'
        })
    }
});

app.get('/movies/add', (req, res) => {
    let movieTitle = req.query.title;
    let movieYear = parseInt(req.query.year);
    let movieRating = parseInt(req.query.rating);

    if(movieRating < 4 ){ movieRating = 4; }

    if (movieTitle == "" || isNaN(movieYear) ){
        res.send({
            status: 403,
            error: true,
            message: 'you cannot create a movie without providing a title and a year'
        })
    }

    else{
        movies.push({
            title: movieTitle,
            year: movieYear,
            rating: movieRating
        });
        res.send({
            status: 200,
            data: movies
        });
    }        
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