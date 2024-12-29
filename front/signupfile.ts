function areAllNumberssignup(num: string): boolean {
    for (let i = 0; i < num.length; i++) {
        const charCode = num.charCodeAt(i);
        if ( charCode < 48 || charCode > 57)  {
            return false; 
        }
    }
    return true; 
}
function addusersignup(){
    const signupid=document.getElementById("signupid") as HTMLInputElement;;
    const signupname=document.getElementById("signupname") as HTMLInputElement;;
    if(signupid.value==='')
    {
       
        signupid.setCustomValidity("you need to fill the id");
        signupid.reportValidity();
       
        return;
        
    }else {
        signupid.setCustomValidity(""); 
    }
    if(signupid.value.length>4)
        {
       
            signupid.setCustomValidity("the id need to be 4 chars max");
            signupid.reportValidity();
          
            return;
            
        }else {
            signupid.setCustomValidity(""); 
        }
        if(!(areAllNumberssignup(signupid.value)))
            {
           
                signupid.setCustomValidity("the id need to be numbers only");
                signupid.reportValidity();
             
                return;
                
            }else {
                signupid.setCustomValidity(""); 
            }
    
    if(signupname.value==='')
    {
       
        signupname.setCustomValidity("Tyou need to fill the id");
        signupname.reportValidity();
        return;
            
    }else {
        signupname.setCustomValidity(""); 
    }
        axios.post('http://localhost:3001/items', { id: signupid.value, name: signupname.value }) 
        .then(response => {
            const name = signupname.value;
            localStorage.setItem('name', name);
            const id2 = signupid.value;
            localStorage.setItem('id', id2);
           
              window.location.href = 'main.html';
            
          
        })
        .catch(error => {
          
             if (error.response?.status === 400) {
                 alert("the id is in use by anather user");
       
               } else {
                const errorMessage = error.response?.data?.error || error.message || "An unknown error occurred";
                alert(`${errorMessage}`);
              }
       
        });
    }
  