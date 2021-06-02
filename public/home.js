




document.addEventListener("click", (e) => {
  if (e.target.className == "profile-pic") {
    document.querySelector(".profile-menu").classList.add("unhide-profile");
  } else {
    document.querySelector(".profile-menu").classList.remove("unhide-profile");
  }
});
document.querySelector(".createCardBtn").addEventListener("click", () => {
  const li = document.createElement("li");
  li.className = "card";
  li.innerHTML += `<div class="options optionsnotopen"></div>
  <div class="options-container">
  <div class="options optionsopen"></div>
  
  
      <ul class="options-menu">
      <li class="openColors">Change Color</li>  
          
      <li class="delete-card">Delete Card</li>  
        </ul>
      
  </div>
  <div class="colors-container">
          <div class="colorsclose"></div>
          <div class="color" id = 'green' style="background-color: rgb(185, 255, 45);"></div>
                            <div class="color" id='purple' style="background-color: rgb(178, 106, 245);"></div>
                            <div class="color" id='blue' style="background-color: rgb(121, 221, 255);"></div>
                            <div class="color" id='orange' style="background-color: rgb(255, 212, 131);"></div>

      </div>
<input type="text" name="cardName" placeholder="Card Name" class="card-name">
<ul class="incard">
</ul>
<div>
  <input type="text" name="cardName" placeholder="Add Item"
id="input-item" class="card-name"><button class="itemAddBtn"></button>
</div>`;
  
  document.querySelector(".list-container").appendChild(li);
  li.children[0].focus();
  const x =
    document.querySelectorAll(".incard")[
      document.querySelector(".list-container").children.length-1
    ];
  
  new Sortable(x, {
    animation: 150,
    ghostClass: "blue-background-class",
    group: "shared",
  });
});
new Sortable(document.querySelector(".list-container"), {
  animation: 150,
  ghostClass: "blue-background-class",
});
var addBtns = document.querySelectorAll(".itemAddBtn");

function itemAdder(parent){
  if (parent.querySelector("#input-item").value.trim() == "") return;
  parent.querySelector(".incard").innerHTML += `<li>${
    parent.querySelector("#input-item").value
  } <button class='liDeleteBtn'></button></li>`;
  parent.querySelector("#input-item").value = "";
}

document.addEventListener("click", (e) => {
  if (e.target.className != "itemAddBtn") return;
  const parent = e.target.parentElement.parentElement;
  itemAdder(parent);
});

document.addEventListener("keydown", (e) => {
  const active = document.activeElement;
  if(active.id!='input-item' || e.key!='Enter') return;
  itemAdder(active.parentElement.parentElement);
});

document.addEventListener('click',(e) => {
  if(e.target.className!='liDeleteBtn') return;
  e.target.parentElement.parentElement.removeChild(e.target.parentElement);
})


document.querySelector('.list-container').innerHTML
const dataStatus = document.querySelector('.dataStatus')

document.querySelector('.saveBtn').addEventListener('click',()=>{
  db.collection('users').doc(auth.currentUser.uid).update({
    contents:document.querySelector('.list-container').innerHTML
  })
  setTimeout(()=>{
    dataStatus.textContent = "Changes Saved."
  dataStatus.style.color = "green"
  innerhtml = document.querySelector('.list-container').innerHTML
  },1000)
  
})
document.addEventListener('keydown',()=>{
  if(document.activeElement.className != 'card-name') return;
  setTimeout(()=>{
  document.activeElement.parentElement.querySelector('.card-name').setAttribute('value',document.activeElement.value);

  },0)
  // console.log(document.activeElement.parentElement)
})

var innerhtml = ''

auth.onAuthStateChanged(function (user) {
    if (user) {
      document.querySelector('.username').textContent = user.displayName
      db.collection('users').doc(auth.currentUser.uid).get('contents').then((boardData)=>{
        
        if(boardData.data().contents){
          document.querySelector('.list-container').innerHTML = boardData.data().contents;
          innerhtml =document.querySelector('.list-container').innerHTML ;
          document.querySelectorAll('.incard').forEach((incardx)=>{
            new Sortable(incardx, {
              animation: 150,
              ghostClass: "blue-background-class",
              group: "shared",
            });
          
          })
        }
      }).catch((err)=>{
        console.log(err)
      })
    } else {
      window.location.href="/"
    }
  });
  // document.querySelector('.list-container').addEventListener('change',()=>{
  //   dataStatus.textContent = "Changes are not saved"
  //   dataStatus.style.color = 'red';
  // });
  setInterval(()=>{
    if(innerhtml != document.querySelector('.list-container').innerHTML){
      dataStatus.textContent = "Changes are not saved"
      dataStatus.style.color = 'red';
    }
  },2000)


  document.addEventListener('click',(e)=>{
    if(e.target.className=="options optionsnotopen"){
      const optionsContainer =e.target.parentElement.querySelector('.options-container');
      optionsContainer.style.transform = "translateY(100vh)"
    }
    else if(e.target.className=="options optionsopen"){
      const optionsContainer =e.target.parentElement
      optionsContainer.style.transform = "translateY(-100vh)"
    }
    else if(e.target.className=='delete-card'){
      
      const card = e.target.parentElement.parentElement.parentElement
      document.querySelector('.list-container').removeChild(card)
    }
    else if(e.target.className == 'openColors'){
      
      const colorsContainer =e.target.parentElement.parentElement.parentElement.querySelector('.colors-container')
      colorsContainer.style.transform = "translateY(-100vh)"
    }
    else if(e.target.className == 'colorsclose'){
      const colorsContainer =e.target.parentElement
      colorsContainer.style.transform = "translateY(100vh)"
      const optionsContainer =e.target.parentElement.parentElement.querySelector('.options-container')
      optionsContainer.style.transform = "translateY(-100vh)"
    }
    else if(e.target.id=='green'){
      console.log(document.querySelector('#green').style.backgroundColor)
      e.target.parentElement.parentElement.style.backgroundColor = document.querySelector('#green').style.backgroundColor
      const colorsContainer =e.target.parentElement
      colorsContainer.style.transform = "translateY(100vh)"
      const optionsContainer =e.target.parentElement.parentElement.querySelector('.options-container')
      optionsContainer.style.transform = "translateY(-100vh)"
    }
    else if(e.target.id=='purple'){
      e.target.parentElement.parentElement.style.backgroundColor = document.querySelector('#purple').style.backgroundColor
      const colorsContainer =e.target.parentElement
      colorsContainer.style.transform = "translateY(100vh)"
      const optionsContainer =e.target.parentElement.parentElement.querySelector('.options-container')
      optionsContainer.style.transform = "translateY(-100vh)"
    }
    else if(e.target.id=='blue'){
      e.target.parentElement.parentElement.style.backgroundColor = document.querySelector('#blue').style.backgroundColor
      const colorsContainer =e.target.parentElement
      colorsContainer.style.transform = "translateY(100vh)"
      const optionsContainer =e.target.parentElement.parentElement.querySelector('.options-container')
      optionsContainer.style.transform = "translateY(-100vh)"
    }
    else if(e.target.id=='orange'){
      e.target.parentElement.parentElement.style.backgroundColor = document.querySelector('#orange').style.backgroundColor
      const colorsContainer =e.target.parentElement
      colorsContainer.style.transform = "translateY(100vh)"
      const optionsContainer =e.target.parentElement.parentElement.querySelector('.options-container')
      optionsContainer.style.transform = "translateY(-100vh)"
    }
  })
