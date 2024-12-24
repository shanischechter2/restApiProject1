 function gets(){
    
        axios.get('http://localhost:3001/items') 
            .then(response => {
            
                const items = response.data as any[];
                const list = document.getElementById('list') as HTMLUListElement;
                list.innerHTML = ''; 
    
                items.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = `ID: ${item.id}, Name: ${item.name}, balance: ${Number(item.balance)}`;
                    list.appendChild(li);
                });
            })
            .catch(error => {
                console.error('Error fetching items:', error);
            });
    
}

function getsumall() {
    axios.get('http://localhost:3001/items/getsum') 
        .then(response => {
        
            const items = response.data as any[];
            const list = document.getElementById('list2') as HTMLUListElement;
            list.innerHTML = ''; 
            console.log(items);
            const l='SUM(balance)';
     
            items.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `the sum of all users balances is:  ${item['SUM(balance)']}`;
                console.log(li); 
                list.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching items:', error); 
        });

}
function adduser(){
    const inputbid=document.getElementById("useridadd") as HTMLInputElement;;
    const inputbname=document.getElementById("useradd") as HTMLInputElement;;
    if(inputbid.value==='')
    {
       alert("you need to fill the id");
        
    }
    if(inputbname.value==='')
    {
           alert("you need to fill the name");
            
    }else{
        axios.post('http://localhost:3001/items', { id: inputbid.value, name: inputbname.value }) 
        .then(response => {
    
        })
        .catch(error => {
            console.error('Error fetching items:', error); 
        });
    }
    

}
function addMoneyuser() {
    const inputbid=document.getElementById("useridaddm") as HTMLInputElement;;
    const inputbadd=document.getElementById("useraddm") as HTMLInputElement;;
    if(inputbid.value==='')
        {
           alert("you need to fill the id");
            
        }
        if(inputbadd.value==='')
            {
               alert("you need to fill the amount you want to add to the user");
                
            }
            else{
                 axios.post('http://localhost:3001/items/put', { id: inputbid.value, balance: Number(inputbadd.value) }) 
        .then(response => {
    
        })
        .catch(error => {
            console.error('Error fetching items:', error);
        });
            }
   

}
function tran() {
    const inputbid1=document.getElementById("userid1m") as HTMLInputElement;;
    const inputbid2=document.getElementById("userid2m") as HTMLInputElement;;
    const inputtoadd=document.getElementById("amuonttotranc") as HTMLInputElement;;
    if(inputbid1.value==='')
        {
         
            inputbid1.setCustomValidity("Tyou need to fill the id");
            inputbid1.reportValidity()
        }else {
            inputbid1.setCustomValidity(""); 
        }
        if(inputbid2.value==='')
            {
            
                inputbid2.setCustomValidity("Tyou need to fill the second id");
                inputbid2.reportValidity()
            }else {
                inputbid2.setCustomValidity(""); 
            }
     if(inputtoadd.value==='')
         {
            inputtoadd.setCustomValidity("Tyou need to fill the amuont you want to transfere");
            inputtoadd.reportValidity() 
                    
        }else {
            inputtoadd.setCustomValidity(""); 
        }
    axios.patch('http://localhost:3001/items', { id1: inputbid1.value ,id2: inputbid2.value, balance: Number(inputtoadd.value) }) 
        .then(response => {
     
        })
        .catch(error => {
            console.error('Error fetching items:', error); 
        });

}
function deleteuser()
{
    const inputbid=document.getElementById("deluser") as HTMLInputElement;
    if(inputbid.value==='')
        {
           alert("you need to fill the id");
            
        };
     axios.delete('http://localhost:3001/items', {
        data: { id: inputbid.value.trim() } 
    } as any)  
    .then(response => {

    })
    .catch(error => {
        console.error('Error fetching items:', error);
    });
}
(window as any).gets = gets;
(window as any).getsumall = getsumall;
(window as any).adduser = adduser;
(window as any).addMoneyuser = addMoneyuser;
(window as any).tran = tran;
(window as any).deleteuser = deleteuser;
