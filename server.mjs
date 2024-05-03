import express from "express";

global.__appdir = ''

const PORT = process.argv[2] || process.env.PORT || 5000;;
const app = express();


app.use(express.json());

app.use('/api/v1/blockchain', () => { }); // Blockchain's endpoint
app.use('/api/v1/members', () => { }); // Members's endpoint

app.all('*', () => { })

app.use(() => { })

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));