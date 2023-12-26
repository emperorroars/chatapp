let signupbutton=document.getElementById("submit")
signupbutton.addEventListener("click",details)
const url='http://localhost:4000'
console.log(url)
function details(event)
{
    event.preventDefault();
    let email=document.getElementById("email").value
    let password=document.getElementById("password").value
    const user={
        password:password,
        email:email
    }
    console.log(user)
    axios.post(`/user/login`, user)
    .then((response)=>{
        alert(response.data.message);
        console.log(response.data)
        localStorage.setItem('token',response.data.token)
        window.location.href="/pagechat"
        
       
    })
    .catch((err)=>{
      
          if (err.response && err.response.data && err.response.data.message) {
            alert(err.response.data.message);
          
          } else {
            //Generic error handling if the specific message is not available
           
            alert("An error occurred during login.");
          }
  
    })
}