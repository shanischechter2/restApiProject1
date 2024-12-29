
    const s=document.getElementById('hello') as HTMLTextAreaElement;

    const data = localStorage.getItem('name'); 
    s.innerText = `welcome ${data}`;
    const idsp = localStorage.getItem('id');
    const bgetuser = document.getElementById('getsp') as HTMLUListElement;
    const baddsp = document.getElementById('baddsp') as HTMLUListElement;
    const delsp = document.getElementById('delsp') as HTMLUListElement;
    const transp = document.getElementById('transp') as HTMLUListElement;
    transp.addEventListener('click', () => {
      const list1 = document.getElementById('divtranmsp') as HTMLUListElement;
      list1.classList.toggle('hidden');
      
     if (getComputedStyle(list1).display === 'none') {

       list1.style.display = 'block';
       serchtsp(localStorage.getItem('id') as string);
      
     } else {
     
      list1.style.display = 'none';
     
   }
 });
    bgetuser.addEventListener('click', () => {
        const list1 = document.getElementById('usersp') as HTMLUListElement;
        list1.classList.toggle('hidden');
        
       if (getComputedStyle(list1).display === 'none') {

         list1.style.display = 'block';
         serchtsp(localStorage.getItem('id') as string);
        
       } else {
       
        list1.style.display = 'none';
       
     }
   });

   baddsp.addEventListener('click', () => {
    const divaddapsp = document.getElementById('divaddapsp') as HTMLUListElement;
  ;
   if (getComputedStyle(divaddapsp).display === 'none') {

    divaddapsp.style.display = 'block';
    
    
   } else {
    serchtsp(localStorage.getItem('id') as string);
    divaddapsp.style.display = 'none';
   
 }
});
delsp.addEventListener('click', () => {
    const divdelapsp = document.getElementById('divdelapsp') as HTMLUListElement;
   
   if (getComputedStyle(divdelapsp).display === 'none') {

    divdelapsp.style.display = 'block';
    
    
   } else {
    serchtsp(localStorage.getItem('id') as string);
    divdelapsp.style.display = 'none';
   
 }
});
function tranadminfunsp() {

  const inputbid2=document.getElementById("userid2sp") as HTMLInputElement;;
  const inputtoadd=document.getElementById("amuonttotrancsp") as HTMLInputElement;;

      if(inputbid2.value==='')
          {
          
              inputbid2.setCustomValidity("Tyou need to fill the second id");
              inputbid2.reportValidity()
              return;
          }else {
              inputbid2.setCustomValidity(""); 
          }
          if(inputbid2.value===localStorage.getItem('id'))
            {
            
                inputbid2.setCustomValidity("you cant transfer to yourself");
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
  axios.patch('http://localhost:3001/items', { id1: localStorage.getItem('id') ,id2: inputbid2.value, balance: Number(inputtoadd.value) }) 
      .then(response => {
         
      })
      .catch(error => {
    
              const errorMessage = error.response?.data?.error || error.message || "An unknown error occurred";
              alert(`${errorMessage}`);
       
         
      });

}
function deleteusersp()
{
    const inputbid=document.getElementById("delusersp") as HTMLInputElement;
    if(inputbid.value==='')
    {
        inputbid.setCustomValidity("Tyou need to fill the id");
            inputbid.reportValidity()
            return;
            
    }else{
        inputbid.setCustomValidity(""); 
    }
    if(inputbid.value != (localStorage.getItem('id') as string))
    {
       alert("you cant delete user that is not you");
       return;
    }

    
     axios.delete('http://localhost:3001/items', {
        data: { id: inputbid.value.trim() } 
    } as any)  
    .then(response => {
      
        window.location.href = 'login.html';
      

    })
    .catch(error => {
        const errorMessage = error.response?.data?.error || error.message || "An unknown error occurred";
        alert(`${errorMessage}`);
        
    });
}

function addMoneyusersp() {

    const inputbadd=document.getElementById("useraddmsp") as HTMLInputElement;;
 
        if(inputbadd.value==='')
            {
              
             inputbadd.setCustomValidity("you need to fill the id");
               inputbadd.reportValidity()
               return;
            }else {
                inputbadd.setCustomValidity(""); 
            }

            {
                 axios.post('http://localhost:3001/items/put', { id: localStorage.getItem('id'), balance: Number(inputbadd.value) }) 
        .then(response => {
    
        })
        .catch(error => {
        
                const errorMessage = error.response?.data?.error || error.message || "An unknown error occurred";
                alert(`${errorMessage}`);
      
        });
            }
   

}
   function serchtsp(id:string) {
   
  
    axios
      .post('http://localhost:3001/items/get', { id})
      .then(response => {
        const items = response.data as any[];
  
        if(!items){
            alert("there is no users");
        }
 
  
        const list = document.getElementById('usersp') as HTMLUListElement;
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
