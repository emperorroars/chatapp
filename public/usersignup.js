let signupbutton=document.getElementById("submit")
signupbutton.addEventListener("click",details)
const url='http://localhost:4000'
function details(event)
{
    event.preventDefault();
    let name=document.getElementById("name").value
    let email=document.getElementById("email").value
    let password=document.getElementById("password").value
    let phoneno=document.getElementById("phone").value
    const user={
        name:name,
        password:password,
        email:email,
        phoneno:phoneno
    }
    console.log(user)
    axios.post(`/user/signup`, user)
    .then((response)=>{
        console.log("posted")
        alert(response.data.message);
        window.location.href = "/login";
    })
    .catch((err)=>{
       const failuremessage=document.getElementById("failuremessage")
       failuremessage.innerHTML="User Already exists"
  
    })
}