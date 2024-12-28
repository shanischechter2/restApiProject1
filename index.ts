

import express, { Request, Response } from 'express';

//import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

//import { getItems, addItem, deleteAllItems,addBlanToSpcUser,deleteItem,transBlanToSpcUser,getsumallItems,getusersover} from './database';


const { getItems, addItem, deleteAllItems,addBlanToSpcUser,deleteItem,transBlanToSpcUser,getsumallItems,getusersover,serch} = require('./database'); 



const app = express();



app.use(bodyParser.json());
app.use(cors({
    origin: 'http://127.0.0.1:5500',
}));



app.get('/items', (req: Request, res: Response) => {
    getItems((err: Error | null, items: any[]) => {
        if (err) {
            return res.status(500).json({ error: "Failed to retrieve items." });
        }
        res.json(items);
    });
});
app.post('/items/get', (req: Request, res: Response) => {
    const { id } = req.body as { id: string }; // Use string for consistency
  
    serch(id, (err: Error | null, item: { id: string; name: string; balance: number }[] | null) => {
      if (err) {
       
        if (err.message === "Item not found") {
          return res.status(404).json({ error: "Item not found" });
        }
  
       
     //   console.error("Error in serch function:", err.message);
        return res.status(500).json({ error: err.message });
      }
  
      // Return the item if found
      res.status(200).json(item);
    });
  });

app.delete('/items/all', (req: Request, res: Response) => {
    deleteAllItems((err: Error | null, items: any) => {
        if (err) {
            return res.status(500).json({ error: "Failed to retrieve items." });
        }
        res.json(items);
    });
});


app.get('/items/getsum', (req: Request, res: Response) => {
    getsumallItems((err: Error | null, items: any[]) => {
        if (err) {
            if (err.message === "No") {
                return res.status(400).json({ error: err.message});
              }
            return res.status(500).json({ error: "Failed items." });
        }
        res.json(items);
    });
});
app.get('/items/getb', (req: Request, res: Response) => {
    const { balance } = req.body as { balance: Number } ; 

    // if (!balance) { 
    //     return res.status(400).json({ error: "balance is required." });
    // }
    getusersover(balance,(err: Error | null, items: any[]) => {
        if (err) {
            return res.status(500).json({ error: "Failed items." });
        }
        res.json(items);
    });
});

app.post('/items', (req: Request, res: Response) => {
    const { name,id } = req.body; 
    

     addItem(id, name , (err: Error | null, items: any) => {
        if (err) {
            if (err.message === "user exsist with the specified ID.") {
                return res.status(400).json({ error: err.message});
              }
        
            
              return res.status(500).json({ error: err.message });
            
            
          //  return res.status(500).json({ error: "Failed to add item." });
        }
        res.status(201).json(items);
    });
});
app.post('/items/put', (req: Request, res: Response) => {
    const { balance,id } = req.body; 


    addBlanToSpcUser(id,balance, (err: Error | null, item: any) => {
        if (err) {
            if (err.message ==="No user found with the specified ID." ) {
                return res.status(404).json({ error: err.message});
              }
        
            return res.status(500).json({ error: "Failed to add balance" });
        }
        res.status(201).json(item);
    });
});
app.delete('/items', (req: Request, res: Response) => {
    const { id } = req.body; 
     
    
    
    deleteItem(id,(err: Error | null, item: any) => {
        if (err) {
            if (err.message ==="No user found with the specified ID." ) {
                return res.status(404).json({ error: err.message});
              }
              if(err.message ==="the user balance isnt 0" )
              {
                return res.status(404).json({ error: err.message});
              }
            return res.status(500).json({ error: "Failed to add balance" });
        }
        res.status(201).json(item);
    });
});
app.patch('/items', (req: Request, res: Response) => {
    const { id1,id2,balance } = req.body; 


    transBlanToSpcUser(id1,id2,balance, (err: Error | null, item: any) => {
        if (err) {
            if (err.message ==="No user found to trans from with the specified ID.") {
                return res.status(403).json({ error: err.message});
              }
              if (err.message ==="No user found to trans to with the specified ID." ) {
                return res.status(404).json({ error: err.message});
              }

            return res.status(500).json({ error: "Failed to add balance" });
        }
        res.status(201).json(item);
    });
});





const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
