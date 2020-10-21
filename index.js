 const express = require('express');

 const app = express();

 const PORT = 8080;

 app.get('/', (req, res) => {
     res.send('ok');
 });

 app.get('/about', (req, res) => {
     res.type('text/plain');
     res.send('About Hello World');
 });

 app.use((req, res) => {
     res.type('text/plain');
     res.status(404);
     res.send('404 - Not Found');
 });

 app.listen(PORT, () => {
     console.log(`Server running at: http://localhost:${PORT}/`);
 });