const express = require('express');
const path = require('path');
const app = express();


app.use(express.static(__dirname));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});
const port = process.env.PORT || 3000;
app.listen(port);