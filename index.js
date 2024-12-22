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


app.get('/items/getsum', (req, res) => {
    getsumallItems((err, items) => {
        if (err) {
            return res.status(500).json({ error: "Failed items." });
        }
        res.json(items);
    });
});
app.get('/items/getb', (req, res) => {
    const { blan } = req.body; 

    if (!blan) { 
        return res.status(400).json({ error: "blan is required." });
    }

    getusersover(blan,(err, items) => {
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
    const { blan,id } = req.body; 

    if (!blan) { 
        return res.status(400).json({ error: "blan is required." });
    }
    if (!id) { 
        return res.status(400).json({ error: "id is required." });
    }

    addBlanToSpcUser(id,blan, (err, item) => {
        if (err) {
            return res.status(500).json({ error: "Failed to add blan" });
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
            return res.status(500).json({ error: "Failed to add blan" });
        }
        res.status(201).json(item);
    });
});
app.patch('/items', (req, res) => {
    const { id1,id2,blan } = req.body; 

    if (!blan) { 
        return res.status(400).json({ error: "blan is required." });
    }
    if (!id1) { 
        return res.status(400).json({ error: "id1 to trans from is required." });
    }
    if (!id2) { 
        return res.status(400).json({ error: "id2 to trans to required." });
    }

    transBlanToSpcUser(id1,id2,blan, (err, item) => {
        if (err) {
            return res.status(500).json({ error: "Failed to add blan" });
        }
        res.status(201).json(item);
    });
});





const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
