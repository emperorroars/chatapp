let id
let localmessage=[]
window.addEventListener("DOMContentLoaded",()=>{
  console.log("reloaded")
  const token = localStorage.getItem('token');
  
  let index;
  //if (localmessage.data == [] || localmessage.data === null)
  if (!localmessage.data || localmessage.data.length === 0)
  { index=0 
    console.log("haihello")
    axios.get(`/chat/get/${id}`, {
      headers: { "Authorization": token }})
    .then((response) => {
      console.log("this is response",response)
     // let mergedData = localmessage.data.concat(response.data)
      localStorage.setItem('localmessage',JSON.stringify(response))
       console.log(localmessage)
      console.log(" i am the user",response)
      for(var i=0;i<response.data.length;i++)
      renderExpenseList(response.data[i])   
    })
    .catch((err) => {
      console.log(err)
    })
  }
   
else{
  let localmessage=JSON.parse(localStorage.getItem('localmessage'))
  console.log("plingu",localmessage)
  console.log("find local message",localmessage)
  index = localmessage.data.length - 1;
  console.log("find index",index)
   id=localmessage.data[index].id
  console.log("find the id",id)
  axios.get(`/chat/get/${id}`, {
    headers: { "Authorization": token }})
  .then((response) => {
    console.log("this is response",response)
    let mergedData = localmessage.data.concat(response.data)
    localStorage.setItem('localmessage',JSON.stringify(mergedData))
     console.log(localmessage)
    console.log(" i am the user",response)
    for(var i=0;i<localmessage.data.length;i++)
    renderExpenseList(localmessage.data[i])   
  })
  .catch((err) => {
    console.log(err)
  })

}
})
/*setTimeout(() =>{  
  window.location.reload()
  
}, 1000)*/
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
        listItem.textContent = `${chat.name}:${chat.message}`;
    
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