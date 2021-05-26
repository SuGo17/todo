// -----------------------------------------Implementing-Theme-Toggle-----------------------------------
const addBtn = document.querySelector(".add-todo");
const themeTogglerBtn = document.querySelector(".toggle");
const todoFooterBack = document.querySelector(".todo-footer");
const todoInpBack = document.querySelector(".content-input");
const listContainer = document.querySelector(".todo-list");
const todoTextElement = document.querySelector("#todo-input");
const backgroundImg = document.querySelector(".top");
const todoFooter = document.querySelector(".todo-footer");
const itemsLeft = document.querySelector(".items-left");
let toggle = 0;
let elements = {
  listAll: [],
  listActive: [],
  listCompleated: [],
};
elements.activeArr = elements.listAll;
// declare and assign img src
const backgroundMobileImgLink = [
  "./images/bg-mobile-dark.jpg",
  "./images/bg-mobile-light.jpg",
];
const backgroundDeskImgLink = [
  "./images/bg-desktop-dark.jpg",
  "./images/bg-desktop-light.jpg",
];
const toggleImgLink = ["./images/icon-sun.svg", "./images/icon-moon.svg"];
const backgroundColorRGB = ["#161722", "#e4e5f1"];
const todoBackColor = ["#25273c", "#fafafa"];
const bodyTextColor = ["#cacde8c7", "#484b6a"];
const todoFooterHoverColor = ["#e4e5f1", "#000"];
const addBtnHoverColor = ["#fff", "#000"];
listContainer.innerHTML = "";
// -------------------------------------------reusing function-------------------------------------------
const backgroundPositioning = (ele) => {
  ele.style.backgroundPosition = "center";
  ele.style.backgroundSize = "cover";
  ele.style.backgroundRepeat = "no-repeat";
};

const backgroundChange = (ele, src) => {
  ele.style.background = src;
  backgroundPositioning(ele);
};

const common = () => {
  const movement = document.createElement("div");
  const tick = document.createElement("i");
  movement.classList.add("todo-movements");
  tick.classList.add(...["far", "fa-times-circle", "delete"]);
  movement.innerHTML = `<input type="checkbox" class="tick" /> <p class="movement-text">${todoTextElement.value}</p> `;
  todoTextElement.value = "";
  movement.append(tick);
  elements.listAll.push(movement);
  elements.listActive.push(movement);
  display(elements.activeArr);
};

const display = (list) => {
  listContainer.innerHTML = "";
  if (elements.listCompleated.length) {
    list.forEach((ele) => {
      if (elements.listCompleated.includes(ele)) {
        ele.children[0].checked = true;
        ele.style.textDecoration = "line-through";
      }
    });
  }
  list.forEach((ele) => {
    listContainer.append(ele);
  });
  itemsLeft.innerHTML = elements.listActive.length + " items left";
};
// --------------------------------------------------Implementing theme------------------------------
// implement onclick event listener
themeTogglerBtn.addEventListener("click", () => {
  toggle = toggle ? 0 : 1;
  themeTogglerBtn.src = toggleImgLink[toggle];
  backgroundImg.clientWidth <= 480
    ? backgroundChange(
        backgroundImg,
        `url('${backgroundMobileImgLink[toggle]}')`
      )
    : backgroundChange(
        backgroundImg,
        `url('${backgroundDeskImgLink[toggle]}')`
      );
  document.body.style.backgroundColor = backgroundColorRGB[toggle];
  document.body.style.color = todoTextElement.style.color =
    bodyTextColor[toggle];
  listContainer.style.backgroundColor =
    todoInpBack.style.backgroundColor =
    todoFooterBack.style.backgroundColor =
      todoBackColor[toggle];
});
//implementing onresize eventlistner
window.onresize = () => {
  if (backgroundImg.clientWidth <= 480) {
    backgroundChange(
      backgroundImg,
      `url('${backgroundMobileImgLink[toggle]}')`
    );
  } else {
    backgroundChange(backgroundImg, `url('${backgroundDeskImgLink[toggle]}')`);
  }
};
//implementing hover effect on footer-links and add btn
todoFooter.onmouseover = (e) => {
  target = e.target;
  if (target.classList.contains("todo-footer-link"))
    target.style.color = todoFooterHoverColor[toggle];
};
todoFooter.onmouseout = (e) => {
  target = e.target;
  if (target.classList.contains("todo-footer-link"))
    target.style.color = "#777a92";
};

addBtn.onmouseover = (e) => {
  e.target.style.color = addBtnHoverColor[toggle];
};
addBtn.onmouseout = (e) => {
  e.target.style.color = "#777a92";
};

// -------------------------------------------Implementing Adding -------------------------------------------
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (todoTextElement.value) common();
  todoTextElement.focus();
});
document.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && todoTextElement.value) common();
});

// -------------------------------------------Implementing compleate or delete -------------------------------------------

listContainer.addEventListener("click", (e) => {
  const target = e.target.closest(".todo-movements");
  const tick = target?.children[0];
  const deleteElement = target?.children[2];
  const allInd = elements.listAll.indexOf(target);
  const activeInd = elements.listActive.indexOf(target);
  const completeInd = elements.listCompleated.indexOf(target);
  if (tick) {
    tick.onchange = () => {
      if (tick.checked) {
        elements.listActive.splice(activeInd, 1);
        elements.listCompleated.push(target);
      } else {
        elements.listCompleated.splice(completeInd, 1);
        elements.listActive.push(target);
      }
      display(elements.activeArr);
    };
  }
  if (e.target === deleteElement) {
    elements.listAll.splice(allInd, 1);
    elements.listActive.splice(activeInd, 1);
    elements.listCompleated.splice(completeInd, 1);
    target.remove();
  }
});
// ---------------------------------------------------------Implementing-Footer-----------------------------------------------
todoFooter.onclick = (e) => {
  e.preventDefault();
  const target = e.target?.closest(".todo-footer-link");
  const filterArr = [...todoFooter.children[1].children];
  const activeFilter = (i) => {
    filterArr.forEach((ele) => {
      ele.classList.remove("active-link");
    });
    i.classList.add("active-link");
  };
  if (target.innerHTML === "All") {
    elements.activeArr = elements.listAll;
    activeFilter(target);
  } else if (target.innerHTML === "Active") {
    elements.activeArr = elements.listActive;
    activeFilter(target);
  } else if (target.innerHTML === "Completed") {
    elements.activeArr = elements.listCompleated;
    activeFilter(target);
  } else if (target.innerHTML === "Clear Completed") {
    elements.listCompleated = [];
    elements.listAll = [...elements.listActive];
    elements.activeArr = elements.listAll;
    activeFilter(filterArr[0]);
  }
  display(elements.activeArr);
};
