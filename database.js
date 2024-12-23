const sqlite3 = require('sqlite3').verbose();
var poin=false;

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error("Could not open database:", err);
    } else {
        console.log("Connected to the SQLite database.");
    }
});

db.serialize(() => {

 db.run("CREATE TABLE IF NOT EXISTS items (id TEXT PRIMARY KEY, name TEXT, balance INTEGER DEFAULT 0)");
});

//פעולה שמחזירה את כל האנשים בבנק עם id שם והיתרה 
function getItems(callback) {
    db.all("SELECT * FROM items", [], (err, rows) => {
        if (err) {
            console.error("Error getting items:", err);
            return callback(err, null);
        }
        console.log(rows);
        callback(null, rows); 
    });
}
function getusersover(balance,callback) {
    db.all("SELECT * FROM items WHERE balance > ?", [balance], (err, rows) => {
        console.log(rows);
        if (err) {
            console.error("Error getting items:", err);
            return callback(err, null);
        }
        console.log(rows);
        callback(null, rows); 
    });
}
//פעולה שמחזירה את סכום כל היתרות בבנק
function getsumallItems(callback) {
    db.all("SELECT SUM(balance) FROM items", [], (err, row) => {
        if (err) {
            console.error("Error getting items:", err);
            return callback(err, null);
        }
        
        console.log(row);
        callback(null, row); 
    });
}
//פעולה שמוסיפה אדם למערכת
function addItem(id, name, callback) {
    const stmt = db.prepare("INSERT INTO items (id, name, balance) VALUES (?, ?, 0)");
    stmt.run(id, name, function (err) {
        if (err) {
            console.error("Error adding item:", err);
            return callback(err, null);
        }
        callback(null, { id, name, balance: 0});
    });
    
    stmt.finalize();
}
//פעולה שמוסיפה סכום כסף למשתמש
function addBlanToSpcUser(id, balance, callback) {
    db.get("SELECT balance FROM items WHERE id = ?", [id], (err, row) => {
        if (err) {
            console.error("Error fetching balance:", err);
            return callback(err, null);
        }
        if (!row) {
            return callback(new Error("No user found with the specified ID."), null);
        }

        let mavar = row.balance;
        let zover = mavar + balance;

        const stmt = db.prepare("UPDATE items SET balance = ? WHERE id = ?");
        stmt.run(zover, id, function (err) {
            if (err) {
                console.error("Error updating balance:", err);
                return callback(err, null);
            }

            callback(null, { id, balance: zover });
        });
        stmt.finalize();
    });
}
//פעולה שמעבירה כסף מאדם אחד לאחר
function transBlanToSpcUser(id1,id2, balance, callback) {
    let get1;
    db.get("SELECT balance FROM items WHERE id = ?", [id1], (err, row) => {
        if (err) {
            console.error("Error fetching balance:", err);
            return callback(err, null);
        }
        if (!row) {
            return callback(new Error("No user found with the specified ID."), null);
        }
        db.get("SELECT balance FROM items WHERE id = ?", [id2], (err, row1) => {
            if (err) {
                console.error("Error fetching balance:", err);
                return callback(err, null);
            }
            if (!row1) {
                return callback(new Error("No user found with the specified ID."), null);
            }
           
            let mavar = row.balance;
            let getb = row1.balance;
        
        if(mavar==0){
            return callback(new Error("No"), null);
        }
        getb=getb+balance;
        console.log(mavar);
        mavar=mavar-balance;
        console.log(mavar);
        
        const stmt = db.prepare("UPDATE items SET balance = ? WHERE id = ?");
        stmt.run(mavar, id1, function (err) {
            if (err) {
                console.error("Error updating balance:", err);
                return callback(err, null);
            }

            callback(null);
        });
        const stmt2 = db.prepare("UPDATE items SET balance = ? WHERE id = ?");
        stmt2.run(getb, id2, function (err) {
            if (err) {
                console.error("Error updating balance:", err);
                return callback(err, null);
            }

            callback(null);
        });
        }); 
       
       
    });
}
//פעולה שמוחקת אדם ספציפי רק עם היתרה שלו היא 0
function deleteItem(id,callback) 
{
    db.get("SELECT balance FROM items WHERE id = ?", [id], (err, row) => {
        if (err) {
            console.error("Error fetching balance:", err);
            return callback(err, null);
        }
        if (!row) {
            return callback(new Error("No user found with the specified ID."), null);
        }

        let mavar = row.balance;
        if(mavar==0)
        {
             const stmt = db.prepare("DELETE FROM items WHERE id = ?");
              stmt.run(id, function (err) {
                 if (err) {
                console.error("Error updating balance:", err);
                return callback(err, null);
                }

            callback(null,"delteded");
        });
    }else{
            console.error("the balance isnt0");
            return callback(null,"the balance isnt 0");
        }
       
    });
}


function deleteAllItems(callback) 
{
 
    db.run("DELETE FROM items", function (err) {
        if (err)
       {
            console.error("Error deleting all items:", err);
            return callback(err);
        }
           poin=true;
 
          
      
        callback(null); 
       
    });    
        
}

module.exports = { getItems, addItem ,deleteAllItems,addBlanToSpcUser,deleteItem,transBlanToSpcUser,getsumallItems,getusersover};
