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
  li.innerHTML += `<input type="text" name="cardName" placeholder="Card Name" class="card-name">
                    <ul class="incard">
                    </ul>
                    <div>
                        <input type="text" name="cardName" placeholder="Add Item"
                    id="input-item" class="card-name"><button class="itemAddBtn"></button>
                    </div>
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
