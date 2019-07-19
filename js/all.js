let newItem = document.querySelector(".newItem");
let data = JSON.parse(localStorage.getItem("list")) || [];
let listUl = document.querySelector(".listUl");
let allBtn = document.querySelector(".allBtn");
let activeBtn = document.querySelector(".activeBtn");
let completeBtn = document.querySelector(".completeBtn");
let nowStatus = "all";
completeBtn.addEventListener("click", () => {
  nowStatus = "complete";
  updateList();
});

allBtn.addEventListener("click", () => {
  nowStatus = "all";
  updateList();
});

activeBtn.addEventListener("click", () => {
  nowStatus = "active";
  updateList();
});

/*新增事項 */
addItem = item => {
  let newItemObj = {};
  newItemObj.item = item;
  newItemObj.status = "active";
  data.push(newItemObj);
  saveStorage();
  newItem.value = "";
  updateList();
};

saveStorage = () => {
  localStorage.setItem("list", JSON.stringify(data));
};

/*更新待辦事項*/
updateList = () => {
  let txt = "";
  for (let i = 0; i < data.length; i++) {
    if (nowStatus == "all" ? true : data[i].status == nowStatus)
      txt += `
        <li data-status=${data[i].status}>
          <div class="liBox">
          <input type="checkbox" data-index="${i}" class="complete" 
          onchange="completeItem(${i})"
          ${data[i].status == "complete" ? "checked" : ""}
          >
            <span class="sp${i}" onclick="modifyItem(${i})"
            ${
              data[i].status == "complete"
                ? 'style="text-decoration:line-through"'
                : ""
            }>
            ${
              data[i].item
            }</span><button data-index="${i}" class="remove" onclick="removeItem(${i})">X</button>
            </div>
        </li>`;
  }
  listUl.innerHTML = txt;
};

/*刪除事項*/
removeItem = index => {
  data.splice(index, 1);
  saveStorage();
  updateList();
};

/*事項完成*/
completeItem = dataIndex => {
  if (data[dataIndex].status === "complete") {
    data[dataIndex].status = "active";
  } else {
    data[dataIndex].status = "complete";
  }
  saveStorage();
  updateList();
};

/*修改事項 */
modifyItem = dataIndex => {
  let spanLi = document.querySelector(".sp" + dataIndex);
  let inputeEl = document.createElement("input");
  inputeEl.className = "input" + dataIndex;
  inputeEl.style.fontSize = "25px";
  inputeEl.style.width = "100%";
  inputeEl.style.height = "30px";
  inputeEl.style.color = "#3E3A39";
  inputeEl.value = data[dataIndex].item;
  listUl.appendChild(inputeEl);
  spanLi.parentNode.replaceChild(inputeEl, spanLi);

  inputeEl.focus();

  inputeEl.addEventListener("keydown", e => {
    let inputStr = inputeEl.value.trim();
    if (e.keyCode === 13 && inputeEl.length !== 0) {
      data[dataIndex].item = inputStr;
      saveStorage();
      updateList();
    }
  });

  inputeEl.onblur = function() {
    let inputStr = inputeEl.value.trim();
    if (inputStr.length == 0) {
      alert("內容不得為空");
    } else {
      data[dataIndex].item = inputStr;
      saveStorage();
    }
    updateList();
  };
};

/*監聽input*/
newItem.addEventListener("keydown", e => {
  let newItemStr = newItem.value.trim();
  if (e.keyCode === 13 && newItemStr.length !== 0) {
    addItem(newItemStr);
  }
});

updateList();
