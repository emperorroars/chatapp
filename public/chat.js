window.addEventListener("DOMContentLoaded",()=>{
  console.log("reloaded")
  const token = localStorage.getItem('token');
  axios.get("/chat/get", {
    headers: { "Authorization": token }})
  .then((response) => {
    console.log(" i am the user",response)
    for(var i=0;i<response.data.length;i++)
    renderExpenseList(response.data[i])
    
  })
  .catch((err) => {
    console.log(err)
  })
})
var SendButton = document.getElementById('send')
SendButton.addEventListener("click",addchat)

function addchat(event) {
    event.preventDefault()
    console.log("addchat is working")
    const message = document.getElementById('message').value;
  const body= {
    message:message
    };
 
    if(message!='')
    {
    const token = localStorage.getItem('token');
    axios.post("/chat/",body, {
      headers: { "Authorization": token }
    })
    .then((response) => {
     // window.location.reload();
      //renderExpenseList(expense) 
      //console.log("render is working")
      console.log(response)
    })
    .catch((err) => {
      console.log("FAILED")
    })
    }}
    function renderExpenseList(chat) {
      console.log("render is working")
      //const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
      const itemsList = document.getElementById('chats');
     // itemsList.innerHTML = ''; // Clear previous list items
    
      //expenses.forEach((expense, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = `${chat.message}`;
    
        /*const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm float-right delete';
        deleteButton.textContent = 'X';
        deleteButton.addEventListener('click', () => deleteExpense(expense,listItem));
    
        const editButton = document.createElement('button');
        editButton.className = 'btn btn-primary btn-sm float-right edit';
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editExpense(expense,listItem));
    
        listItem.appendChild(deleteButton);
        listItem.appendChild(editButton);*/
        itemsList.appendChild(listItem);
      //});
    }