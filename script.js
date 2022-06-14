

const myLibrary = [];
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
const tColor = 'rgb(105, 102, 92);'

modalTags.forEach(item => {
  item.addEventListener('click', e => {
    e.target.firstChild.style = e.target.firstChild.style.border == "" ? "border: 2px solid " + tColor : null;
    e.target.classList.toggle('filterselect');
    
  })
})
addButton.addEventListener('click',handleAddButton);

function handleAddButton() {
  const tags = [];
  for(let i = 0; i < modalTags.length; i++){
    if(modalTags[i].classList.contains('filterselect')){
      tags.push(i + 1);
    }
    
  }
  if( Number.isInteger(Number(modalPages.value)) &&  modalPages.value >= 0 && modalTitle.value != ""){
    newBook = new Book(modalTitle.value, modalAuthor.value, modalPages.value, modalDesc.value, tags, false);
    modalTitle.value = "";
    modalAuthor.value = "";
    modalPages.value = "";
    modalDesc.value="";
    modalTags.forEach(item => item.classList.remove('filterselect'))
    addBookToLibrary(newBook);
    displayBooks(myLibrary);
    handleCancel();
  }

}
// Handle clicking plus sign and cancel on modal
select.style = "visibility: hidden; opacity: 0;";
modal.style = " transform: translateY(-3rem);";
addBook.addEventListener('click', handleAddBook);
function handleAddBook(){
  select.style = "visibility: visible; opacity: 1;";
  modal.style = "";
}
select.addEventListener('mousedown', e => handleSelectUp(e));
let selectvalid = false;
function handleSelectUp(e){
  if(e.target.classList.contains('select')){
    selectvalid = true;
    setTimeout(function() {
      selectvalid = false;
    }, 1000);
  }
}
select.addEventListener('mouseup', e => handleSelect(e));


function handleSelect(e) {
  if(e.target.classList.contains('select') && selectvalid){
    selectvalid = false;
    handleCancel();
  }
}
cancel.addEventListener('click', handleCancel);
function handleCancel(){
  select.style = "visibility: hidden; opacity: 0;";
  modal.style = "transform: translateY(-3rem);";
}

function Book(title, author, pages, desc, tags, read){
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
}
function displayBooks(myLibrary){
  for(let i = 0; i < myLibrary.length; i++){
    if(!myCurLibrary.includes(myLibrary[i])){
      displayBook(myLibrary[i]);
      myCurLibrary.push(myLibrary[i]);
    }
  }
}
function displayBook(myBook){
  const title = displayTitle(myBook);
  const top = displayTop(myBook);
  const desc = document.createElement("p");
  desc.innerText = myBook.desc;
  const bottom = displayBottom(myBook);
  const item = document.createElement("div");
  item.classList.add("item");
  item.appendChild(title);
  item.appendChild(top);
  item.appendChild(desc);
  item.appendChild(bottom);
  item.style="opacity: 0; transform: translateY(-0.5rem); transition: ease 0.2s all";
  content.appendChild(item);
  setTimeout(function() {
    item.style="transition: ease 0.2s all";
  }, 100);
}

// todo: support super long title
function displayTitle(myBook){
  const title = document.createElement("h3");
  title.innerHTML = myBook.title;
  const icon = document.createElement("i");
  icon.classList.add("fa-solid");
  icon.classList.add("fa-ellipsis");
  const wrapper = document.createElement("div");
  wrapper.classList.add("title");
  wrapper.appendChild(title);
  wrapper.appendChild(icon);
  return wrapper;
}

function displayTop(myBook){
  const top = document.createElement("div");
  top.classList.add("top");
  if(myBook.author){
    const author = document.createElement("p");
    author.classList.add("author");
    author.innerHTML = `By <b>${myBook.author}</b>`;
    top.append(author);
  }
  if(myBook.pages){
    const pages = document.createElement("p");
    pages.classList.add("pages");
    pages.innerHTML = ` <b>${myBook.pages}</b> Pages `;
    top.appendChild(pages);
  }
  return top;
}

function displayBottom(myBook){
  const labels = document.createElement("div");
  for(let i = 0; i < myBook.tags.length; i++){
    labels.innerHTML += `<div class="color color${myBook.tags[i]}"></div>`;
  }
  labels.classList.add("labels");
  const bottom = document.createElement("bottom");
  bottom.classList.add("bottom");
  bottom.appendChild(labels);
  bottom.innerHTML += '<div class="read"><input type="checkbox" class="read-box"><div>Finished</div></div>';
  return bottom;
}


