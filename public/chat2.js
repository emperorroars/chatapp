var currentGroupId;
let currentgroup;
const socket = io(window.location.origin);
socket.on('group-message', (currentGroupId) => {
    
        getMessageById(currentGroupId)
    
})

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
window.addEventListener("DOMContentLoaded", () => {getGroupList();})
async function getGroupList(e) {
  
  //console.log(list);
 
    const data = await axios.get(`/group/grouplist`, {
      headers: { Authorization: localStorage.getItem("token"), }
    });
    //console.log(data);
    data?.data?.groupList[0]?.groups?.map((list) => displayGroup(list));
    let div = document.getElementsByClassName("side__lower-contact");
    console.log(div);
    for (let i = 0; i < div.length; i++) {
      div[i].addEventListener("click", () => {
        console.log(div[i]);
        const id = div[i].id;
        console.log(id);
        let groupId = id.match(/(\d+)/);
        console.log(groupId);
        currentGroupId = Number(groupId[0]);
        console.log(currentGroupId);
        localStorage.setItem("currentgroup",currentGroupId)
        getMessageById(groupId[0]);
      });
    }
  
}

async function displayGroup(list) {
  console.log(list);
   const div = document.createElement("div")
  //console.log(groupList);
  const boxgroups = document.getElementById("boxgroups");
  div.className = `side__lower-contact`;
  div.id = `group${list?.id}`;
div.innerHTML = `
<div class="d-flex flex-row align-items-center">
  <img src="https://picsum.photos/seed/${list.id}/200" alt="Profile Picture" style="width: 50px; height: 50px; border-radius: 50%;">
<strong>${list.groupname}</strong>
</div>
`;
  boxgroups.appendChild(div);
}
const sendMessage = document.getElementById("sendMessage");
sendMessage.addEventListener("click", async (e) => {
  e.preventDefault();
  const inputChat = document.getElementById("inputChat");
  console.log(inputChat.value);
  const message = {
    message: inputChat?.value,
    groupId: currentGroupId,
  };
  /*const messageList = document.getElementById("messageList");
  let id = 1;
  if (messageList.lastElementChild !== null)
    id = messageList.lastElementChild.id;
  await getMessageById(currentGroupId, id);*/
  const data = await axios.post(`/chat`, message, {
    headers: { Authorization: localStorage.getItem("token") },
  });
  // getMessageById(message.groupId);
  // let messages = [];
  // if (isMessage()) {
  //     messages = localStorage.getItem('messages');
  //     messages = JSON.parse(messages);
  // }
  // messages.push({ id: data?.data?.data?.id, name: "You", message: data?.data?.data?.message })
  //displayMessage("You", data?.data?.data?.message, data?.data?.data?.id);
  inputChat.value = "";
  socket.emit('new-group-message', currentGroupId)
  {
    getMessageById(currentGroupId)
    console.log("hi socket")

  }
                
            

  //inputChat.focus();
});


async function getMessageById(groupId) {
  console.log("this is groupid",groupId)

    let id;
    let localmessage = [];
    let index;
    const messageList = document.getElementById('boxchats');
    const groupName = document.getElementById("boxheader");
    const token = localStorage.getItem("token");
    const decodetoken = parseJwt(token);
    //groupName.addEventListener('click',getAdmin);
   messageList.innerHTML = "";
   
    const data = await axios.get(`/chat/groupdetails?groupId=${groupId}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    groupName.innerHTML = `${data?.data?.groupname}`;
    if (decodetoken.userId===data.data.createdby) 
    { console.log(decodetoken.userId); 
      console.log(data.data.createdby);
      const action = document.getElementById("action");
    action.style.display = "flex";
  }
    else {
      console.log(decodetoken.userId);
      console.log(data.data.createdby);
      const action = document.getElementById("action");
      action.style.display = "none";
    }
   console.log("find the group details", data);
      if (!localmessage.data || localmessage.data.length === 0) {
        id = 0;
        console.log("haihello");
        const data = await axios.get(
          `/chat?groupId=${groupId}&id=${id}`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );

        console.log("this is response", data);
        localStorage.setItem("localmessage", JSON.stringify(data));
        console.log(localmessage);
       // groupName.innerHTML = `${data?.data[0]?.group?.groupname}`;
        console.log(groupName)
        for(let i=0;i<data.data.length;i++)
        {
 
               const obj = {
                 id: data.data[i].id,
                 name: data.data[i].name,
                 message: data.data[i].message,
               };
               console.log(obj);
                displayMessage(obj.name, obj.message, obj.id);    
        }
     
      } 
      else {
        let localmessage = JSON.parse(localStorage.getItem("localmessage"));
        console.log("plingu", localmessage);
        console.log("find local message", localmessage);
        index = localmessage.data.length - 1;
        console.log("find index", index);
        id = localmessage.data[index].id;
        console.log("find the id", id);
      const data = await axios.get(
          `chat?groupId=${groupId}&id=${id}`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
          
               console.log("this is response", data);
               localStorage.setItem("localmessage", JSON.stringify(data));
               console.log(localmessage);
              // groupName.innerHTML = `${data?.data?.data[0]?.group?.groupname}`;
               for (let i = 0; i < data.data.length; i++) {
                 const obj = {
                   id: data.data[i].id,
                   name: data.data[i].name,
                   message: data.data[i].message,
                 };
                 console.log(obj);
                displayMessage(obj.name, obj.message, obj.id);    
               }
         
      }
}

  const displayMessage = (name, message, id) => {
     const token = localStorage.getItem("token");
    const decodetoken = parseJwt(token);
    const messageList = document.getElementById("boxchats");
    let element = document.createElement("div");
    element.id = id;
    if (name === decodetoken.name)
      element.className = "chat__main-msg chat__main-msg-me";
    else element.className = "chat__main-msg chat__main-msg-user";
    element.innerHTML = `${name}: ${message}`;
    messageList.appendChild(element);
  };
  

   
