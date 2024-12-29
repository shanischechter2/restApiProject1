const n=document.getElementById('a2') as HTMLTextAreaElement;

const data1 = localStorage.getItem('name'); 
n.innerText = `welcome back admin ${data1}`;


const badminall = document.getElementById('clicktogetalladmin') as HTMLUListElement;
const badminsum = document.getElementById('clicktogetsumadmin') as HTMLUListElement;
const bdiposit = document.getElementById('bdiposit') as HTMLUListElement;
const bdelete = document.getElementById('bdeleteadmin') as HTMLUListElement;
const tranadmin = document.getElementById('tranadmin') as HTMLUListElement;
const adduseradmin = document.getElementById('adduseradmin') as HTMLUListElement;



badminall.addEventListener('click', () => {
                   const listusers = document.getElementById('listusers') as HTMLUListElement;
            
                  if (getComputedStyle(listusers).display === 'none') {
   
                    listusers.style.display = 'block';
                   
                   
                  } else {
                    listusers.style.display = 'none';
                  
                }
              });
            
           



badminsum.addEventListener('click', () => {
                       
                       
                        const listsum = document.getElementById('listsum') as HTMLUListElement;
                      
                         getsumalladmin();
                         if (getComputedStyle(listsum).display === 'none') {
   
                            listsum.style.display = 'block';
                           
                           
                          } else {
                            listsum.style.display = 'none';
                          
                        }
                      });
 bdiposit.addEventListener('click', () => {
                       
                        
                         const divaddm = document.getElementById('divaddm') as HTMLUListElement;
                         divaddm.classList.toggle('hidden');
                         
                          if (getComputedStyle(divaddm).display === 'none') {
    
                            divaddm.style.display = 'block';
                            
                            
                           } else {
                          divaddm.style.display = 'none';
                           
                         }
                       });
                        
bdelete.addEventListener('click', () => {
                       
                        
                         const divdelete = document.getElementById('divdelm') as HTMLUListElement;
                         divdelete.classList.toggle('hidden');
                         
                          if (getComputedStyle(divdelete).display === 'none') {
    
                             divdelete.style.display = 'block';
                            
                            
                           } else {
                      
                            divdelete.style.display = 'none';
                           
                         }
                       });
tranadmin.addEventListener('click', () => {
                     
                        
                         const dvtran = document.getElementById('divtranm') as HTMLUListElement;
                         
                         dvtran.classList.toggle('hidden');
                         
                          if (getComputedStyle(dvtran).display === 'none') {
    
                            dvtran.style.display = 'block';
                            
                            
                           } else {
                     
                             dvtran.style.display = 'none';
                           
                         }
                       });
adduseradmin.addEventListener('click', () => {
                       
                        
                         const divadd = document.getElementById('divadd') as HTMLUListElement;
                        
                         
                          if (getComputedStyle(divadd).display === 'none') {
    
                            divadd.style.display = 'block';
                
                            
                           } else {
                             divadd.style.display = 'none';
                           
                         }
                       });
                       
                    
                 
                      
function getall(){
   
       axios.get('http://localhost:3001/items') 
           .then(response => {
           
               const items = response.data as any[];
               const list = document.getElementById('listusers') as HTMLUListElement;
          
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

function serchtalladmin() {
   const inputbid = document.getElementById("idtos") as HTMLInputElement;
 
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
 
   
         const errorMessage = error.response?.data?.error || error.message || "An unknown error occurred";
         alert(`${errorMessage}`);
       
     });
 }
 function areAllNumbersadmin(num: string): boolean {
    for (let i = 0; i < num.length; i++) {
        const charCode = num.charCodeAt(i);
        if ( charCode < 48 || charCode > 57)  {
            return false; 
        }
    }
    return true; 
}
 function adduseradminfun2(){
  const inputbidadd=document.getElementById("useridaddadmina") as HTMLInputElement;;
  const inputbnameadd=document.getElementById("useraddadmina") as HTMLInputElement;;
  if(inputbidadd.value==='')
  {
     
      inputbidadd.setCustomValidity("you need to fill the id");
      inputbidadd.reportValidity();
     
      return;
      
  }else {
      inputbidadd.setCustomValidity(""); 
  }
  if(inputbidadd.value.length>4)
      {
     
          inputbidadd.setCustomValidity("the id need to be 4 chars max");
          inputbidadd.reportValidity();
        
          return;
          
      }else {
          inputbidadd.setCustomValidity(""); 
      }
      if(!(areAllNumbersadmin(inputbidadd.value)))
          {
         
              inputbidadd.setCustomValidity("the id need to be numbers only");
              inputbidadd.reportValidity();
           
              return;
              
          }else {
              inputbidadd.setCustomValidity(""); 
          }
  
  if(inputbnameadd.value==='')
  {
     
      inputbnameadd.setCustomValidity("Tyou need to fill the id");
      inputbnameadd.reportValidity();
      return;
          
  }else {
      inputbnameadd.setCustomValidity(""); 
  }
      axios.post('http://localhost:3001/items', { id: inputbidadd.value, name: inputbnameadd.value }) 
      .then(response => {
  
      })
      .catch(error => {
    
              const errorMessage = error.response?.data?.error || error.message || "An unknown error occurred";
              alert(`${errorMessage}`);
        
      });
  }


function getsumalladmin() {
   axios.get('http://localhost:3001/items/getsum') 
       .then(response => {
       
           const items = response.data as any[];
           const listsum = document.getElementById('listsum') as HTMLUListElement;
           listsum.innerHTML = ''; 
         
          
           const it=items[0];
          
         
           if( it['SUM(balance)']==null) 
               {
                   const li = document.createElement('li');
                   li.textContent = 'there is no users yet';
                   listsum.appendChild(li); 
                   return;
               }
          
           items.forEach(item => {
               const li = document.createElement('li');
               li.textContent = `the sum of all users balances is:  ${item['SUM(balance)']}`;
        
               listsum.appendChild(li);
               
           });
         
       })
       .catch(error => {
       
           const errorMessage = error.response?.data?.error || error.message || "An unknown error occurred";
           alert(`${errorMessage}`);
       });

}

function addMoneyuseradmin() {
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
         
       
                const errorMessage = error.response?.data?.error || error.message || "An unknown error occurred";
                alert(`${errorMessage}`);
             
        });
            }
   

}
function deleteuseradmin()
{
    const inputbid=document.getElementById("deluseradmin") as HTMLInputElement;
    if(inputbid.value==='')
    {
        inputbid.setCustomValidity("Tyou need to fill the id");
            inputbid.reportValidity()
            return;
            
    }else{
        inputbid.setCustomValidity(""); 
    }
    if(inputbid.value==='222')
    {
      alert("you cant delete the admin");
      return;
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

function tranadminfun() {
  const inputbid1=document.getElementById("userid1adminm") as HTMLInputElement;;
  const inputbid2=document.getElementById("userid2adminm") as HTMLInputElement;;
  const inputtoadd=document.getElementById("amuonttotrancadmin") as HTMLInputElement;;
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
          if(inputbid2.value==inputbid1.value)
            {
            
                inputbid2.setCustomValidity("you cant transfere to the same user");
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

