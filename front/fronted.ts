



 const bgetall = document.getElementById('clicktogetall') as HTMLUListElement;
 const bgetsum = document.getElementById('clicktogetsum') as HTMLUListElement;

    bgetall.addEventListener('click', () => {
                    const list = document.getElementById('list') as HTMLUListElement;
                    if (getComputedStyle(list).display === 'none') {
   
                          list.style.display = 'block';
                         
                         
                        } else {
                         list.style.display = 'none';
                        
                      }
                    });



    bgetsum.addEventListener('click', () => {
                      
                        
                         const list = document.getElementById('list2') as HTMLUListElement;
                        getsumall();
                         if (getComputedStyle(list).display === 'none') {
       
                              list.style.display = 'block';
                             
                             
                             } else {

                             list.style.display = 'none';
                            
                          }
                          });

                 
                    

      
                  
                       
 function gets(){
    
        axios.get('http://localhost:3001/items') 
            .then(response => {
            
                const items = response.data as any[];
                const list = document.getElementById('list') as HTMLUListElement;
           
                list.innerHTML = ''; 
                 
                if(items.length==0)
                {
                    const li = document.createElement('li');
                    li.textContent = 'there is no users yet';
                    list.appendChild(li); 
                
                }
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

function sercht() {
    const inputbid = document.getElementById("n") as HTMLInputElement;
  
    if (inputbid.value === '') {
      inputbid.setCustomValidity("You need to fill in the ID.");
      inputbid.reportValidity();
      return;
    } else {
      inputbid.setCustomValidity("");
    }
  
    axios
      .post('http://localhost:3001/items/get', { id: inputbid.value })
      .then(response => {
        const items = response.data as any[];
  
        if(!items){
            alert("there is no users");
        }

  
        const list = document.getElementById('listbysh') as HTMLUListElement;
        list.innerHTML = ''; 
  
        items.forEach(item => {
          const li = document.createElement('li');
          li.textContent = `ID: ${item.id}, Name: ${item.name}, Balance: ${Number(item.balance).toFixed(2)}`;
          list.appendChild(li);
        });
      })
      .catch(error => {
        console.error(error.message);

        if (error.response?.status === 404) {
          alert("Item not found. Please check the ID and try again.");
        } else {
          const errorMessage = error.response?.data?.error || error.message || "An unknown error occurred";
          alert(`${errorMessage}`);
        }
      });
  }


function getsumall() {
    axios.get('http://localhost:3001/items/getsum') 
        .then(response => {
        
            const items = response.data as any[];
            const list = document.getElementById('list2') as HTMLUListElement;
            list.innerHTML = ''; 
            console.log(items);
           
            const it=items[0];
             console.log( it['SUM(balance)']);
     
            if( it['SUM(balance)']==null) 
                {
                    const li = document.createElement('li');
                    li.textContent = 'there is no users yet';
                    list.appendChild(li); 
                    return;
                }
           
            items.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `the sum of all users balances is:  ${item['SUM(balance)']}`;
          
                list.appendChild(li);
                
            });
          
        })
        .catch(error => {
         
            const errorMessage = error.response?.data?.error || error.message || "An unknown error occurred";
            alert(`${errorMessage}`);
        });

}
function areAllNumbers(num: string): boolean {
    for (let i = 0; i < num.length; i++) {
        const charCode = num.charCodeAt(i);
        if ( charCode < 48 || charCode > 57)  {
            return false; 
        }
    }
    return true; 
}
function adduser(){
    const inputbid=document.getElementById("useridadd") as HTMLInputElement;;
    const inputbname=document.getElementById("useradd") as HTMLInputElement;;
    if(inputbid.value==='')
    {
       
        inputbid.setCustomValidity("you need to fill the id");
        inputbid.reportValidity();
       
        return;
        
    }else {
        inputbid.setCustomValidity(""); 
    }
    if(inputbid.value.length>4)
        {
       
            inputbid.setCustomValidity("the id need to be 4 chars max");
            inputbid.reportValidity();
          
            return;
            
        }else {
            inputbid.setCustomValidity(""); 
        }
        if(!(areAllNumbers(inputbid.value)))
            {
           
                inputbid.setCustomValidity("the id need to be numbers only");
                inputbid.reportValidity();
             
                return;
                
            }else {
                inputbid.setCustomValidity(""); 
            }
    
    if(inputbname.value==='')
    {
       
        inputbname.setCustomValidity("Tyou need to fill the id");
        inputbname.reportValidity();
        return;
            
    }else {
        inputbname.setCustomValidity(""); 
    }
        axios.post('http://localhost:3001/items', { id: inputbid.value, name: inputbname.value }) 
        .then(response => {
    
        })
        .catch(error => {
      
                const errorMessage = error.response?.data?.error || error.message || "An unknown error occurred";
                alert(`${errorMessage}`);
        
        });
    }
    


function addMoneyuser() {
    const inputbid=document.getElementById("useridaddm") as HTMLInputElement;;
    const inputbadd=document.getElementById("useraddm") as HTMLInputElement;;
    if(inputbid.value==='')
        {
           
           inputbid.setCustomValidity("Tyou need to fill the id");
           inputbid.reportValidity()
           return;
            
        }else {
            inputbid.setCustomValidity(""); 
        }
        if(inputbadd.value==='')
            {
              
             inputbadd.setCustomValidity("Tyou need to fill the id");
               inputbadd.reportValidity()
               return;
            }else {
                inputbadd.setCustomValidity(""); 
            }

            {
                 axios.post('http://localhost:3001/items/put', { id: inputbid.value, balance: Number(inputbadd.value) }) 
        .then(response => {
    
        })
        .catch(error => {
         
             if (error.response?.status === 404) {
                alert("user not found. Please check the ID and try again.");
              } else {
                const errorMessage = error.response?.data?.error || error.message || "An unknown error occurred";
                alert(`${errorMessage}`);
              }
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
            return;
        }else {
            inputbid1.setCustomValidity(""); 
        }
        if(inputbid2.value==='')
            {
            
                inputbid2.setCustomValidity("Tyou need to fill the second id");
                inputbid2.reportValidity()
                return;
            }else {
                inputbid2.setCustomValidity(""); 
            }
     if(inputtoadd.value==='')
         {
            inputtoadd.setCustomValidity("Tyou need to fill the amuont you want to transfere");
            inputtoadd.reportValidity() 
            return;    
                    
        }else {
            inputtoadd.setCustomValidity(""); 
        }
    axios.patch('http://localhost:3001/items', { id1: inputbid1.value ,id2: inputbid2.value, balance: Number(inputtoadd.value) }) 
        .then(response => {
           
        })
        .catch(error => {
       
                const errorMessage = error.response?.data?.error || error.message || "An unknown error occurred";
                alert(`${errorMessage}`);
             
           
        });

}
function deleteuser()
{
    const inputbid=document.getElementById("deluser") as HTMLInputElement;
    if(inputbid.value==='')
    {
        inputbid.setCustomValidity("Tyou need to fill the id");
            inputbid.reportValidity()
            return;
            
    }else{
        inputbid.setCustomValidity(""); 
    }

    
     axios.delete('http://localhost:3001/items', {
        data: { id: inputbid.value.trim() } 
    } as any)  
    .then(response => {

    })
    .catch(error => {
        const errorMessage = error.response?.data?.error || error.message || "An unknown error occurred";
        alert(`${errorMessage}`);
        
    });
}
(window as any).gets = gets;
(window as any).getsumall = getsumall;
(window as any).adduser = adduser;
(window as any).addMoneyuser = addMoneyuser;
(window as any).tran = tran;
(window as any).deleteuser = deleteuser;
(window as any).sercht = sercht;

