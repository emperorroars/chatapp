window.addEventListener("DOMContentLoaded", () => {findusers();})
const addgroupList = [];
const deletegrouplist=[]
let groupId=localStorage.getItem("currentgroup")
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
const searchBtn = document.getElementById("search");
const updateGroupBtn = document.getElementById("submit");
const token = localStorage.getItem("token");
  const decodetoken = parseJwt(token);


searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
 
  const searchName = document.getElementById("user").value;
   console.log("find the search value",searchName)
   if(searchName===decodetoken.name)
   console.log("cannot remove this user")
else{
    
  const data = await axios.get(`/group?name=${searchName}`);
  const listofusers = document.getElementById("listofusers");
   listofusers.style.display = "flex";
  listofusers.innerHTML = "";
  console.log(data);
  data?.data?.data.map((ele) => {
    console.log(ele)
    displayUserList(ele);
  });

}
});
updateGroupBtn.addEventListener("click", async (e) => {
  e.preventDefault();
   
  if(addgroupList.length===0)
  console.log("nothing to add")
else{
    const obj1 = {
   
    addgroupList: addgroupList,
    groupId:groupId
  };


  const data1 = await axios.post(`/group/update`, obj1, {headers: {
    Authorization: localStorage.getItem("token"),
  }});
}
if(deletegrouplist.length===0)
console.log("nothing to delete")
  else{
   
for(let i=0;i<deletegrouplist.length;i++){
  const data2 = await axios.delete(`/group/remove?userId=${deletegrouplist[i]}&groupId=${groupId}`, {headers: {
    Authorization: localStorage.getItem("token"),
  }});
   console.log(data2);

  }
}
  location = `/pagechat`;
});

function displayUserList({ id, name }) {
  console.log(id);
  console.log(name);
  const listofusers = document.getElementById("listofusers");
  /*listofusers.innerHTML +=`<li id=`+`${id}`+`>`+`${name}`+
    `<button id=`+`btn${id}`+` onclick=`+`addtogroup(`+`${id}`+`)`+`>Add</button>`*/
listofusers.innerHTML += `<li id="${id}">${name}<button id="btn${id}" onclick="addtogroup(${id})">Add</button><button id="btn${id}" onclick="deletefromgroup(${id})">Delete</button></li>`;
   
}

function addtogroup(id) {
  addgroupList.push(id);
  console.log(addgroupList);
}
function deletefromgroup(id) {
  deletegrouplist.push(id);
  console.log(deletegrouplist);
}
async function findusers()
{
 let listofmembers= document.getElementById("listofmembers")
   const data1 = await axios.get(`/group/update/finduser`,{headers: {
    Authorization: localStorage.getItem("token"),
  }});
  console.log(data1)
  const data2=await axios.get (`/group/update/findmember?groupId=${groupId}`,{headers: {
    Authorization: localStorage.getItem("token"),
  }});
  console.log(data2)
   const memberIds = new Set(data2.data.data.map(user => user.userId));
   data1?.data?.data.map((list) => {

// Now map through data1.data.data

  const listItem = document.createElement('li');

  // Check if the user ID is in the memberIds set
  if (memberIds.has(list.id)) {
    listItem.innerHTML = `${list.name}-Member: Yes<br>`;
  } else {
    listItem.innerHTML = `${list.name}-Member: No<br>`;
  }
  listofmembers.appendChild(listItem)
    
   });
}