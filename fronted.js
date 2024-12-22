function gets(){
        axios.get('http://localhost:3001/items') // Ensure this URL matches your backend
            .then(response => {
                console.log('Response data:', response.data); // Debugging step
                const items = response.data; // Access the response data
                const list = document.getElementById('list');
                list.innerHTML = ''; // Clear existing content
    
                items.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = `ID: ${item.id}, Name: ${item.name}, Blan: ${item.blan}`; // Adjust to match your item structure
                    list.appendChild(li);
                });
            })
            .catch(error => {
                console.error('Error fetching items:', error); // Log any errors
            });
    
}
