function gets(){
        axios.get('http://localhost:3001/items') // Ensure this URL matches your backend
            .then(response => {
            
                const items = response.data; // Access the response data
                const list = document.getElementById('list');
                list.innerHTML = ''; // Clear existing content
    
                items.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = `ID: ${item.id}, Name: ${item.name}, balance: ${Number(item.balance)}`; // Adjust to match your item structure
                    list.appendChild(li);
                });
            })
            .catch(error => {
                console.error('Error fetching items:', error); // Log any errors
            });
    
}
function getsumall(){
    axios.get('http://localhost:3001/items/getsum') // Ensure this URL matches your backend
        .then(response => {
        
            const items = response.data; // Access the response data
            const list = document.getElementById('list2');
            list.innerHTML = ''; // Clear existing content
            console.log(items);
            const l='SUM(balance)';
     
            items.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `the sum of all users balances is:  ${item['SUM(balance)']}`;
                console.log(li); // Adjust to match your item structure
                list.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching items:', error); // Log any errors
        });

}
function adduser(){
    const inputbid=document.getElementById("useridadd");
    const inputbname=document.getElementById("useradd");
    axios.post('http://localhost:3001/items', { id: inputbid.value, name: inputbname.value }) // Ensure this URL matches your backend
        .then(response => {
    
        })
        .catch(error => {
            console.error('Error fetching items:', error); // Log any errors
        });

}
function addMoneyuser(){
    const inputbid=document.getElementById("useridaddm");
    const inputbname=document.getElementById("useraddm");
    axios.post('http://localhost:3001/items/put', { id: inputbid.value, balance: Number(inputbname.value) }) // Ensure this URL matches your backend
        .then(response => {
    
        })
        .catch(error => {
            console.error('Error fetching items:', error); // Log any errors
        });

}
function tran(){
    const inputbid=document.getElementById("userid1m");
    const inputbname=document.getElementById("userid2m");
    const input=document.getElementById("m");

    axios.patch('http://localhost:3001/items', { id1: inputbid.value ,id2: inputbname.value, balance: Number(input.value) }) // Ensure this URL matches your backend
        .then(response => {
    
        })
        .catch(error => {
            console.error('Error fetching items:', error); // Log any errors
        });

}
function deleteuser()
{
    const inputbid=document.getElementById("deluser");
    axios.delete('http://localhost:3001/items', {
        data: { id: inputbid.value.trim() }
    }) // Ensure this URL matches your backend
    .then(response => {

    })
    .catch(error => {
        console.error('Error fetching items:', error); // Log any errors
    });
}

