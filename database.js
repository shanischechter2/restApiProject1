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
 db.run("CREATE TABLE IF NOT EXISTS items (id TEXT PRIMARY KEY, name TEXT, blan INTEGER DEFAULT 0)");
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
//פעולה שמחזירה את סכום כל היתרות בבנק
function getsumallItems(callback) {
    db.all("SELECT SUM(blan) FROM items", [], (err, row) => {
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
    const stmt = db.prepare("INSERT INTO items (id, name, blan) VALUES (?, ?, 0)");
    stmt.run(id, name, function (err) {
        if (err) {
            console.error("Error adding item:", err);
            return callback(err, null);
        }
        callback(null, { id, name, blan: 0 });
    });
    
    stmt.finalize();
}
//פעולה שמוסיפה סכום כסף למשתמש
function addBlanToSpcUser(id, blan, callback) {
    db.get("SELECT blan FROM items WHERE id = ?", [id], (err, row) => {
        if (err) {
            console.error("Error fetching balance:", err);
            return callback(err, null);
        }
        if (!row) {
            return callback(new Error("No user found with the specified ID."), null);
        }

        let mavar = row.blan;
        let zover = mavar + blan;

        const stmt = db.prepare("UPDATE items SET blan = ? WHERE id = ?");
        stmt.run(zover, id, function (err) {
            if (err) {
                console.error("Error updating balance:", err);
                return callback(err, null);
            }

            callback(null, { id, blan: zover });
        });
        stmt.finalize();
    });
}
//פעולה שמעבירה כסף מאדם אחד לאחר
function transBlanToSpcUser(id1,id2, blan, callback) {
    let get1;
    db.get("SELECT blan FROM items WHERE id = ?", [id1], (err, row) => {
        if (err) {
            console.error("Error fetching balance:", err);
            return callback(err, null);
        }
        if (!row) {
            return callback(new Error("No user found with the specified ID."), null);
        }
        db.get("SELECT blan FROM items WHERE id = ?", [id2], (err, row1) => {
            if (err) {
                console.error("Error fetching balance:", err);
                return callback(err, null);
            }
            if (!row1) {
                return callback(new Error("No user found with the specified ID."), null);
            }
           
            let mavar = row.blan;
            let getb = row1.blan;
        
        if(mavar==0){
            return callback(new Error("No"), null);
        }
        getb=getb+blan;
        console.log(mavar);
        mavar=mavar-blan;
        console.log(mavar);
        
        const stmt = db.prepare("UPDATE items SET blan = ? WHERE id = ?");
        stmt.run(mavar, id1, function (err) {
            if (err) {
                console.error("Error updating balance:", err);
                return callback(err, null);
            }

            callback(null);
        });
        const stmt2 = db.prepare("UPDATE items SET blan = ? WHERE id = ?");
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
    db.get("SELECT blan FROM items WHERE id = ?", [id], (err, row) => {
        if (err) {
            console.error("Error fetching balance:", err);
            return callback(err, null);
        }
        if (!row) {
            return callback(new Error("No user found with the specified ID."), null);
        }

        let mavar = row.blan;
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
            console.error("the blans isnt0");
            return callback(null,"the blance isnt 0");
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

module.exports = { getItems, addItem ,deleteAllItems,addBlanToSpcUser,deleteItem,transBlanToSpcUser,getsumallItems};
