const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { getItems, addItem, deleteAllItems,addBlanToSpcUser,deleteItem,transBlanToSpcUser,getsumallItems,getusersover} = require('./database'); 



const app = express();




app.use(bodyParser.json());
app.use(cors({
    origin: 'http://127.0.0.1:5500',
}));



app.get('/items', (req, res) => {
    getItems((err, items) => {
        if (err) {
            return res.status(500).json({ error: "Failed to retrieve items." });
        }
        res.json(items);
    });
});
app.delete('/items/all', (req, res) => {
    deleteAllItems((err, items) => {
        if (err) {
            return res.status(500).json({ error: "Failed to retrieve items." });
        }
        res.json(items);
    });
});


app.get('/items/getsum', (req, res) => {
    getsumallItems((err, items) => {
        if (err) {
            return res.status(500).json({ error: "Failed items." });
        }
        res.json(items);
    });
});
app.get('/items/getb', (req, res) => {
    const { balance } = req.body; 

    if (!balance) { 
        return res.status(400).json({ error: "balance is required." });
    }

    getusersover(balance,(err, items) => {
        if (err) {
            return res.status(500).json({ error: "Failed items." });
        }
        res.json(items);
    });
});

app.post('/items', (req, res) => {
    const { name,id } = req.body; 
    

    if (!name) { 
        return res.status(400).json({ error: "Name is required." });
    }
    if (!id) { 
        return res.status(400).json({ error: "id is required." });
    }

    addItem(id, name , (err, newItem) => {
        if (err) {
            return res.status(500).json({ error: "Failed to add item." });
        }
        res.status(201).json(newItem);
    });
});
app.post('/items/put', (req, res) => {
    const { balance,id } = req.body; 

    if (!balance) { 
        return res.status(400).json({ error: "balance is required." });
    }
    if (!id) { 
        return res.status(400).json({ error: "id is required." });
    }

    addBlanToSpcUser(id,balance, (err, item) => {
        if (err) {
            return res.status(500).json({ error: "Failed to add balance" });
        }
        res.status(201).json(item);
    });
});
app.delete('/items', (req, res) => {
    const { id } = req.body; 

    if (!id) { 
        return res.status(400).json({ error: "id is required." });
    }
    
    deleteItem(id,(err, item) => {
        if (err) {
            return res.status(500).json({ error: "Failed to add balance" });
        }
        res.status(201).json(item);
    });
});
app.patch('/items', (req, res) => {
    const { id1,id2,balance } = req.body; 

    if (!balance) { 
        return res.status(400).json({ error: "balance is required." });
    }
    if (!id1) { 
        return res.status(400).json({ error: "id1 to trans from is required." });
    }
    if (!id2) { 
        return res.status(400).json({ error: "id2 to trans to required." });
    }

    transBlanToSpcUser(id1,id2,balance, (err, item) => {
        if (err) {
            return res.status(500).json({ error: "Failed to add balance" });
        }
        res.status(201).json(item);
    });
});





const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
