
function login(){
    const loginid = document.getElementById('loninid') as  HTMLInputElement;
    const loginname = document.getElementById('loginname') as HTMLInputElement;

    
    if (loginid.value === '') {
        loginid.setCustomValidity("You need to fill in the ID.");
        loginid.reportValidity();
        return;
      } else {
        loginid.setCustomValidity("");
      }
      
    if (loginname.value === '') {
        loginname.setCustomValidity("You need to fill in the name.");
        loginname.reportValidity();
        return;
      } else {
        loginname.setCustomValidity("");
      }
      
  
      axios.post('http://localhost:3001/items/login', { id: loginid.value, name: loginname.value }) 
      .then(response => {
        
           const name = loginname.value;
           localStorage.setItem('name', name);
           const id2 = loginid.value;
           localStorage.setItem('id', id2);
           if(loginid.value=='222')
           {
            window.location.href = 'mainadmin.html';
           }
           else{
             window.location.href = 'main.html';
           }
          
      })
      .catch(error => {
                if (error.response?.status === 404) {
                alert("the user not found");
       
              } else {
            const errorMessage = error.response?.data?.error || error.message || "An unknown error occurred";
             alert(`${errorMessage}`);
              }
      
      });
    
    
}
function gotosingup()
{
  window.location.href = 'signup.html';
}