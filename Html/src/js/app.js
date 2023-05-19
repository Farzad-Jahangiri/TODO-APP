const main = document.getElementById("main");
// const rowToPage = document.getElementById("rowToPage");
const toast = document.getElementById("toast-delet")
const toastupdate = document.getElementById("toast")
const modal = document.getElementById("modal")
const modaldelet = document.getElementById("modal-delet")
let idedit = undefined;
let parnete = undefined;

let id_card;
let title;
let caption;
let data;

let sortPageCard = []

const cards = []

let countToDo = 0;
const listToDo = [];
async function fetchData(target) {
  let data;
  try {
  await $.ajax({
    url: 'http://127.0.0.1:8000/members/'+target,
    type: 'GET',
    dataType: 'json',
    success: function (response) {
      data = response;
    },
    error: function (error) {
      console.log('خطا در دریافت داده ها:', error);
    }
  });



      const json = data
      listToDo.push(json);

      listToDo[0].forEach(item => {
        
        id_card=item["id"];
        title=item['title'];
        date=item['date']
        caption=item['caption']
        const card=`<div id=${id_card} class="card border w-96 h-32 editClear overflow-auto mt-5">
<div class="flex m-2">
  <div class="flex flex-grow space-x-2">
    <div class="border border-black rounded-full w-5 h-5"></div>
    <h4 id="title">${title}</h4>
    <p id="date">${date}</p>
  </div>

  <div class="flex space-x-2 edit">
    <div onclick="edit(this)"><span class="material-symbols-outlined pointer-hand" >edit</span></div>
    <div onclick="delet(this)"><span class="material-symbols-outlined pointer-hand">delete</span></div>
  </div>
</div>

<div class="p-3" id="discription">
    ${caption}
</div>

</div>`
        cards.push(card);
        // main.insertAdjacentHTML("afterend",card);

      });

    } catch (error) {
      console.log('خطا در دریافت داده ها:', error);
    }

sortPageCard=[...cards]
insertCard()
}

fetchData("all");

function insertCard() {
  sortPageCard.forEach(element => {
    main.insertAdjacentHTML("afterend", element);
  });
}

async function deletitem(target, id) {
  try {
    await $.ajax({
      url: `http://127.0.0.1:8000/members/${target}`,
      type: 'POST',
      data: {
        'id': id,
      },
      success: function(response) {
        console.log(response);
      },
      error: function(error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log("خطا در دریافت داده ها:", error);
  }
}

async function update(target, id, discription) {
  try {
    $.ajax({
      url: `http://127.0.0.1:8000/members/${target}`,
      type: 'POST',
      data: {
        'id': id,
        'caption': discription,
      },
      success: function(response) {
        return 1;
      },
      error: function(error) {
        return 0;
      }
    });
  } catch (error) {
    console.log("خطا در دریافت داده ها:", error);
  }
}
function edit(ev) {
  modal.style.display = "block";
  modaldelet.style.display = "none";
  let textaria = document.getElementById("textaria");
  let titeledit = document.getElementById("titeledit");
  let dateedit = document.getElementById("dateedit");
  let res = ev.parentNode.parentNode.parentNode;
  parnete = res;
  idedit = res.id;
  titeledit.innerHTML = res.querySelector("#title").innerHTML;
  dateedit.innerHTML = res.querySelector("#date").innerHTML;
  textaria.value = res.querySelector("#discription").innerHTML;
}

function submitedit() {
  let newDescription = document.getElementById("textaria").value;
  update("update", idedit, newDescription);
  modal.style.display = "none";
  parnete.querySelector("#discription").innerHTML = newDescription;
  toastupdate.innerHTML = "update sucess"
  toastupdate.style.opacity = 1;
  setTimeout(() => {
    toastupdate.style.opacity = 0;
  }, 3000);
}

function canceledit() {
  modal.style.display = "none";
}

function canceldelet() {
  modaldelet.style.display = "none";
}

function submitdelet() {
  deletitem("delete", parnete.id);
  parnete.remove();
  modaldelet.style.display = "none";
  toast.style.opacity = 1;
  setTimeout(() => {
    toast.style.opacity = 0;
  }, 3000);
}
function delet(ev) {
  let titeldelet = document.getElementById("titeldelet");
  modaldelet.style.display = "block";
  modal.style.display = "none";
  const parentcard = ev.parentNode.parentNode.parentNode;
  titeldelet.innerHTML = parentcard.querySelector("#title").innerHTML;
  parnete = parentcard;
}

// rowToPage.addEventListener("change", function() {
//   const selectedIndex = rowToPage.selectedIndex;
//   const selectedOption = rowToPage.options[selectedIndex].value;
//   console.log(selectedOption);
// });
