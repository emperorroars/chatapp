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