const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extened: true }));

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
});