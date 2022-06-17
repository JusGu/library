let myLibrary = [];
const myCurLibrary = [];
const content = document.querySelector('.content');
const addBook = document.querySelector('.plus');
const select = document.querySelector('.select');
const modal = document.querySelector('.modal');
const cancel = document.querySelector('.cancel');
const modalTitle = document.querySelector('#title');
const modalAuthor = document.querySelector('#author');
const modalPages = document.querySelector('#pages');
const modalDesc = document.querySelector('#desc');
const modalTags = document.querySelectorAll('.modaltag');
const addButton = document.querySelector('.add');
const optionsButton = document.querySelectorAll('.fa-ellipsis');
const deleteButton = document.querySelector('.options-delete');
const editButton = document.querySelector('.options-edit');
const errorTitle = document.querySelector('.error-title');
const errorPage = document.querySelector('.error-page')
const tColor = 'rgb(105, 102, 92);'






let curFilter = null;
let curFilterElement = null;
// handleFilter handles when a filter is clicked
function handleFilter(e) {
  let filterID = Number(e.id.slice(0, -1));
  if (filterID == curFilter) {

    e.style = '';
    e.firstChild.style = '';
    for (let i = 0; i < content.childElementCount; i++) {
      content.children[i].style = "opacity: 0; transform: translateY(-0.5rem); transition: ease 0.15s all";
    }

    curFilter = null;
    setTimeout(function () {
      content.innerHTML = null;
      for (let i = 0; i < myLibrary.length; i++) {
        if ((myLibrary[i] != null && !(myLibrary[i].read && hideReadInput.checked))) {
          displayBook(myLibrary[i], i);
        }
      }

    }, 150);

  } else {
    if (curFilterElement) {
      curFilterElement.style = '';
      curFilterElement.firstChild.style = '';
    }

    e.style = 'background-color: rgba(0,0,0,0.1);';
    e.firstChild.style.border = '2px solid rgb(105, 102, 92)';
    for (let i = 0; i < content.childElementCount; i++) {
      content.children[i].style = "opacity: 0; transform: translateY(-0.5rem); transition: ease 0.15s all";
    }
    setTimeout(function () {
      content.innerHTML = null;
      for (let i = 0; i < myLibrary.length; i++) {
        if ((myLibrary[i] != null) && myLibrary[i].tags.includes(filterID) && !(myLibrary[i].read && hideReadInput.checked)) {
          displayBook(myLibrary[i], i);
        }
      }

    }, 150);

    curFilter = filterID;
    curFilterElement = e;
  }
}
// handleHideRead Hides all read books
function handleHideRead(e) {
  for (let i = 0; i < content.childElementCount; i++) {
    content.children[i].style = "opacity: 0; transform: translateY(-0.5rem); transition: ease 0.1s all";
  }
  setTimeout(function () {
    content.innerHTML = null;
    for (let i = 0; i < myLibrary.length; i++) {
      if ((myLibrary[i] != null) && !(myLibrary[i].read && e.checked)) {
        if (curFilter == null) {
          displayBook(myLibrary[i], i);
        } else if (myLibrary[i].tags.includes(curFilter)) {
          displayBook(myLibrary[i], i);
        }
      }
    }
  }, 100);
}
// handleRead toggles a books read / unread status
function handleRead(e) {
  const index = e.parentElement.parentElement.parentElement.id;
  myLibrary[index].read = !myLibrary[index].read;
  if (hideReadInput.checked && myLibrary[index].read) {
    const remove = e.parentElement.parentElement.parentElement;
    remove.style = "opacity: 0; transform: translateY(-0.5rem); transition: ease 0.2s all";
    setTimeout(function () {
      remove.remove();
    }, 300);

  }
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

// MENU CONTROLS
// Controls the opening and closing of the menu on the cards
let menuOpen = false; 
let curMenu = null;

function handleOptionsButton(e) {
  const optionsSibling = e.nextElementSibling;
  if (curMenu != null) {
    closeMenu();
  }
  if (!optionsSibling.style.opacity) {
    optionsSibling.style = "visibility: visible; opacity: 1; transform: scaleY(1); translateY(0)";
    menuOpen = true;
    curMenu = optionsSibling;
  }
}

window.addEventListener('click', e => {
  if (!e.target.classList.contains('menu') && menuOpen) {
    closeMenu();
  }
})

function closeMenu() {
  menuOpen = false;
  curMenu.style = "transition: all 0.3s ease";
  curMenu = null;
}

// handles the delete button on the menu
function handleDeleteButton(e) {
  const index = e.parentElement.parentElement.parentElement.parentElement.id;
  const remove = e.parentElement.parentElement.parentElement.parentElement;
  remove.style = "opacity: 0; transform: translateY(-0.5rem); transition: ease 0.2s all";
  setTimeout(function () {
    remove.remove();
  }, 300);
  myLibrary[index] = null;
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  
}

let curEdit = -1;
// handles the edit button on the menu
function handleEditButton(e){
  closeMenu();
  addButton.innerHTML = "Edit";
  const index = e.parentElement.parentElement.parentElement.parentElement.id;
  const edit = e.parentElement.parentElement.parentElement.parentElement;
  curEdit = index;
  let updateBook = myLibrary[curEdit];
  // render modal with current values
  modalTitle.value = updateBook.title;
  modalAuthor.value = updateBook.author;
  modalPages.value = updateBook.pages;
  modalDesc.value = updateBook.desc;
  const tags = updateBook.tags;
  for (let i = 0; i < tags.length; i++) {
    modalTags[i].classList.toggle('filterselect');
    modalTags[i].firstChild.style = "border: 2px solid " + tColor;
  }
  select.style = "visibility: visible; opacity: 1;";
  modal.style = "";
}

// MODAL CONTROLS

// Adds hovering effect on each modal when selected
modalTags.forEach(item => {
  item.addEventListener('click', e => {
    e.target.firstChild.style = e.target.firstChild.style.border == "" ? "border: 2px solid " + tColor : null;
    e.target.classList.toggle('filterselect');

  })
})
addButton.addEventListener('click', handleAddButton);

// handleAddButton handles when the user clicks the add button on the modal
function handleAddButton() {
  const tags = [];
  for (let i = 0; i < modalTags.length; i++) {
    if (modalTags[i].classList.contains('filterselect')) {
      tags.push(i + 1);
    }

  }
  if (Number.isInteger(Number(modalPages.value)) && modalPages.value >= 0 && modalTitle.value != "") {
    if(curEdit == -1){
      console.log("ADDING NEW BOOK");
      newBook = new Book(modalTitle.value, modalAuthor.value, modalPages.value, modalDesc.value, tags, false);
      addBookToLibrary(newBook);
      displayBooks(myLibrary);
      handleCancel();
    } else {
      console.log("UPDATING BOOK");
      let updateBook = myLibrary[curEdit];
      // update library item
      updateBook.title = modalTitle.value;
      updateBook.author =  modalAuthor.value;
      updateBook.pages = modalPages.value;
      updateBook.desc = modalDesc.value;
      updateBook.tags = tags;

      const editItem = document.getElementById(curEdit);
      const title = displayTitle(updateBook);
      const top = displayTop(updateBook);
      const desc = document.createElement("p");
      desc.innerText = updateBook.desc;
      const bottom = displayBottom(updateBook);
      editItem.innerHTML = '';
      editItem.appendChild(title);
      editItem.appendChild(top);
      editItem.appendChild(desc);
      editItem.appendChild(bottom);
      editItem.style = "opacity: 0; transform: translateY(-0.5rem); transition: ease 0.2s all";
      setTimeout(function () {
        editItem.style = "transition: ease 0.2s all";
      }, 100);
      curEdit = -1;
      console.log("MY LIBRARY");
      console.log(myLibrary);
      console.log("MY CUR LIBRARY")
      console.log(myCurLibrary);
      
      handleCancel();
      
    }
  } else {
    handleError();
  }
}

// resetModal resets the modal to an empty state;
function resetModal() {
  modalTitle.classList.remove("error");
  errorTitle.style.display = "none";
  modalPages.classList.remove("error");
  errorPage.style.display = "none";
  modalTitle.value = "";
  modalAuthor.value = "";
  modalPages.value = "";
  modalDesc.value = "";
  for (let i = 0; i < modalTags.length; i++) {
    if (modalTags[i].classList.contains('filterselect')) {
      modalTags[i].classList.toggle('filterselect');
    }
    modalTags[i].firstChild.style.border = "";
  }
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

}

// handleError handles the displaying of error when a user inputs an invalid input
function handleError() {
  if (modalTitle.value == "") {
    console.log(modalTitle);
    modalTitle.classList.add("error");
    errorTitle.style.display = "inline";
  } else {
    modalTitle.classList.remove("error");
    errorTitle.style.display = "none";
  }

  if (!Number.isInteger(Number(modalPages.value)) || modalPages.value < 0) {
    modalPages.classList.add("error");
    errorPage.style.display = "inline";
  } else {
    modalPages.classList.remove("error");
    errorPage.style.display = "none";
  }
}

// Handle clicking plus sign and cancel on modal
select.style = "visibility: hidden; opacity: 0;";
modal.style = " transform: translateY(-3rem);";
addBook.addEventListener('click', handleAddBook);
function handleAddBook() {
  addButton.innerHTML = "Add";
  select.style = "visibility: visible; opacity: 1;";
  modal.style = "";
}
select.addEventListener('mousedown', e => handleSelectUp(e));
let selectvalid = false;
function handleSelectUp(e) {
  if (e.target.classList.contains('select')) {
    selectvalid = true;
    setTimeout(function () {
      selectvalid = false;
    }, 1000);
  }
}
select.addEventListener('mouseup', e => handleSelect(e));


function handleSelect(e) {
  if (e.target.classList.contains('select') && selectvalid) {
    selectvalid = false;
    handleCancel();
  }
}
cancel.addEventListener('click', handleCancel);
function handleCancel() {
  select.style = "visibility: hidden; opacity: 0;";
  modal.style = "transform: translateY(-3rem);";
  setTimeout(function () {
    resetModal()
  }, 400);
}

function Book(title, author, pages, desc, tags, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.desc = desc;
  this.tags = tags.sort();
  this.read = read;
}
// Book.prototype.info = function(){
//     read = this.read ? "read" : "not read yet";
//     return(this.title + " by " + this.author + ", " + this.pages + " pages, " + read);
// }
// hello = new Book("The Hobbit","Hello","Hello","true");
// console.log(hello.info());
function addBookToLibrary(myBook) {
  myLibrary.push(myBook);
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}
function displayBooks(myLibrary) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (!myCurLibrary.includes(myLibrary[i]) && myLibrary[i]) {
      displayBook(myLibrary[i], i);
      myCurLibrary.push(myLibrary[i]);
      
    }
  }
}
function displayBook(myBook, num) {
  const title = displayTitle(myBook);
  const top = displayTop(myBook);
  const desc = document.createElement("p");
  if(myBook.read){
    desc.innerHTML = myBook.desc;
  } else { // default option unless I want to add links on card
    desc.innerText = myBook.desc;
  }
  const bottom = displayBottom(myBook);
  const item = document.createElement("div");
  item.classList.add("item");
  item.appendChild(title);
  item.appendChild(top);
  item.appendChild(desc);
  item.appendChild(bottom);
  item.style = "opacity: 0; transform: translateY(-0.5rem); transition: ease 0.2s all";
  item.id = num;
  content.appendChild(item);
  setTimeout(function () {
    item.style = "transition: ease 0.2s all";
  }, 100);
}

// todo: support super long title

const sanitizeHTML = function (str) {
  return str.replace(/[^\w. ]/gi, function (c) {
    return '&#' + c.charCodeAt(0) + ';';
  });
};

function displayTitle(myBook) {
  const title = document.createElement("h3");
  let titleText = sanitizeHTML(myBook.title);
  if (titleText.length > 30) {
    titleText = titleText.slice(0, 27);
    titleText += "...";
  }
  title.innerHTML = titleText;
  const wrapper = document.createElement("div");
  wrapper.classList.add("title");
  wrapper.appendChild(title);
  const insertWrapper = `
    <div class="options-container">
        <i onclick={handleOptionsButton(this)} class="fa-solid fa-ellipsis menu"></i>
        <div class="options menu">
            <p onclick={handleEditButton(this)} class="options-edit menu">Edit ...</p>
            <hr class="menu">
            <p onclick={handleDeleteButton(this)} class="options-delete menu">Delete</p>
        </div>
    </div>
  `
  wrapper.innerHTML += insertWrapper;
  return wrapper;
}

function displayTop(myBook) {
  const top = document.createElement("div");
  top.classList.add("top");
  if (myBook.author) {
    const author = document.createElement("p");
    author.classList.add("author");
    author.innerHTML = `By <b>${sanitizeHTML(myBook.author)}</b>`;
    top.append(author);
  }
  if (myBook.pages) {
    const pages = document.createElement("p");
    pages.classList.add("pages");
    pages.innerHTML = ` <b>${sanitizeHTML(myBook.pages)}</b> Pages `;
    top.appendChild(pages);
  }
  return top;
}

function displayBottom(myBook) {
  const labels = document.createElement("div");
  for (let i = 0; i < myBook.tags.length; i++) {
    labels.innerHTML += `<div class="color color${myBook.tags[i]}"></div>`;
  }
  labels.classList.add("labels");
  const bottom = document.createElement("bottom");
  bottom.classList.add("bottom");
  bottom.appendChild(labels);
  if (myBook.read) {
    bottom.innerHTML += '<div class="read"><input onclick={handleRead(this)} type="checkbox" class="read-box" style ="border: 0.15em solid rgb(105, 102, 92)"checked><div style="color: rgb(105, 102, 92)">Finished</div></div>';
  } else {
    bottom.innerHTML += '<div class="read"><input onclick={handleRead(this)} type="checkbox" class="read-box"><div>Finished</div></div>';
  }

  return bottom;
}

var storedBooks = JSON.parse(localStorage.getItem("myLibrary"));
var firstTime = localStorage.getItem("first_instance");
if(!firstTime) {
    localStorage.setItem("first_instance","1");
    let firstBookString = `
    Library is a great website for keeping track of all the books you've read!

    It helps you keep track of your reading progress, including the title, author, a small description, and number of pages for each book. You can add new books and edit existing entries at any time, as well as filter your books by genre. 
    
    Finally, Library allows you to hide finished books from your main view.
    `;
    firstBook = new Book("Welcome to Library!", "JusGu", "", firstBookString, [], false);
    secondBook = new Book("Visit my GitHub", "JusGu", "", `If you're interested in seeing more projects like this, please visit my GitHub at <a style='text-decoration: none; color: ${tColor}' target = '_blank'href='https://github.com/JusGu'> https://github.com/JusGu</a> `, [], true);
    myLibrary.unshift(secondBook);
    myLibrary.unshift(firstBook);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
} else {
  if (storedBooks) {
    for (let i = 0; i < storedBooks.length; i++) {
      if (storedBooks[i] !== null) {
        myLibrary.push(storedBooks[i]);
      }
    }
  }
}


console.log()
displayBooks(myLibrary);

