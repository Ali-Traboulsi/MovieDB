 const express = require('express');
 const date = new Date(Date.now());
 const hour = date.getHours();
 const sec = date.getSeconds();
 const time = hour + ':' + sec;

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

 app.use((req, res) => {
     res.type('text/plain');
     res.status(404);
     res.send('404 - Not Found');
 });


 app.listen(PORT, () => {
     console.log(`Server running at: http://localhost:${PORT}/`);
 });