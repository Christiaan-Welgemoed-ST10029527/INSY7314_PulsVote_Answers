import express from "express";
const PORT = 3000;
const app = express();
const urlprefix = '/api';

app.use(express.json());

app.get('/', (req, res)=> {
res.send (' I am finally figuring this out, HAHAHAHAHA')
})
app.get('/test', (req, res)=> {res.send('this is the /test endpoint')})

app.get(urlprefix+'/orders', (req, res) => {
    const orders = [
        { id: "1", name: "Orange" },
        { id: "2", name: "Apple" },
        { id: "3", name: "Pear" }
    ];

    res.json({
        message: "Fruits",
        orders: orders
    });
}); 


app.listen(PORT);