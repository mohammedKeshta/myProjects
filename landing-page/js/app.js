/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/
const sections = document.querySelectorAll('section'); //getting all sections and put it in a variable

const navList = document.getElementById('navbar__list'); //define a variable that will construct my Unordered list

const fragment = document.createDocumentFragment(); // adding a fragment to add all the changes to it in one time.(for good performance to minimize the reflow)
//the coming for loop is used to iterate over sctions.length to create new elements and append them to a fragment
for (let i=0; i< sections.length;i++){
  let newListElemnt = document.createElement('li'); //adding new section

  let listELementName = sections[i].getAttribute('data-nav'); //getting the name from the creatd section

  let linkName = document.createTextNode(listELementName); //putting the test into at text node to append to link

  let linkToSection = document.createElement('a'); // creating a link to the new section

  linkToSection.appendChild(linkName); // naming the link with the name of the section

  newListElemnt.appendChild(linkToSection); // link the element to the section

  linkToSection.addEventListener('click',function smoothScroll (){
    sections[i].scrollIntoView({behavior: "smooth"}); // add an event listener to scroll smoothly to the required section
  });

  fragment.appendChild(newListElemnt); //adding the elemnts to the fragment
}
navList.appendChild(fragment); //adding all the list items to the navigation list all in one time

//adding an eventListener to detect the active section when scrolling
window.addEventListener('scroll', function setActiveSection (){
  //The coming for loop is to iterate over sections to get the section at the view port and set it as the active section and highlight it
  for (let j=0; j< sections.length;j++ ) {
    const view = sections[j].getBoundingClientRect(); // getting the active section in viewport
    sections[j].classList.remove('your-active-class'); // highlighting the active section
    //the coming if-statement is to get the active section at the viewport and also to get the corresponding link
    if (view.top >=0 && view.top <= 300){
      const currentSecLink = sections[j].getAttribute('data-nav'); //get the active sectionLink name
      sections[j].classList.add('your-active-class');//adding the active class from the active section

      const navItems = document.querySelectorAll('a'); //getting all the navigation bar items
      // The coming loop is to iterate over navigation bar items to highlight the navigation bar item corresponding to the active section
      for (let l=0; l<navItems.length;l++){
        //the coming if-statement is to set the corresponding link to be highlighted by comparing its name with the section name
        if (currentSecLink == navItems[l].innerText){
          navItems[l].classList.add('item-active-class');//removing the "item active class" to remove any highlighting at the page
        }
        else{
            navItems[l].classList.remove('item-active-class'); //adding the "item active class" to add highliting to the active section item
        }
      }
    }
    else {
      sections[j].classList.remove('your-active-class'); //remove the active class from the active section to remove special effects and highlighting.
    }
  }
}); //end of scroll eventListener
