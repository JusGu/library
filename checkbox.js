// This file handles colour changing of checkboxes

const hideReadInput = document.querySelector('.hide-read-checkbox');
const hideRead =  document.querySelector('.hide-read');
// const readBoxInput =  document.querySelector('.read-box');
// const read = document.querySelector('.read');
hideReadInput.addEventListener('change', handlehideReadInput);
function handlehideReadInput(){
  if (this.checked){
    hideReadInput.style.border = '0.15em solid rgb(105, 102, 92)';
    hideRead.style.color = 'rgb(105, 102, 92)';

  } else {
    hideReadInput.style.border = '';
    hideRead.style.color = '';
  }
}

window.addEventListener('click', handlereadBoxInput);
function handlereadBoxInput(){
    if(!this.event.target.classList.contains('read-box')){
        return;
    }
    const checkbox = this.event.target;
    const sibling = checkbox.nextElementSibling;
    if (checkbox.checked) {
        checkbox.style.border = '0.15em solid rgb(105, 102, 92)';
        sibling.style.color = 'rgb(105, 102, 92)';

    } else {
        checkbox.style.border = '';
        sibling.style.color = '';
    }
}