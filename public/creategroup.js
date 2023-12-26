const groupList = [];
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
const createGroupBtn = document.getElementById("submit");

searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
 
  const searchName = document.getElementById("user").value;
   console.log("find the search value",searchName)
  const data = await axios.get(`/group?name=${searchName}`);
  const listofusers = document.getElementById("listofusers");
   listofusers.style.display = "flex";
  listofusers.innerHTML = "";
  console.log(data);
  data?.data?.data.map((ele) => {
    console.log(ele)
    displayUserList(ele);
  });
});

createGroupBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const decodetoken = parseJwt(token);
  console.log(decodetoken);
  addtogroup(decodetoken.userId);
  
  const groupName = document.getElementById("name").value;
  const obj = {
    groupname: groupName,
    userList: groupList,
  };
  const data = await axios.post(`/group`, obj, {headers: {
    Authorization: localStorage.getItem("token"),
  }});
  console.log(data);
  const stringData = JSON.stringify(data?.data?.data);
  localStorage.setItem("groups", stringData);
  location = `/pagechat`;
});

function displayUserList({ id, name }) {
  console.log(id);
  console.log(name);
  const listofusers = document.getElementById("listofusers");
  /*listofusers.innerHTML +=`<li id=`+`${id}`+`>`+`${name}`+
    `<button id=`+`btn${id}`+` onclick=`+`addtogroup(`+`${id}`+`)`+`>Add</button>`*/
listofusers.innerHTML += `<li id="${id}">${name}<button id="btn${id}" onclick="addtogroup(${id})">Add</button></li>`;
   
}

function addtogroup(id) {
  groupList.push(id);
  console.log(groupList);
}
