

const myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
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

