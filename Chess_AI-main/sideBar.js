//  slide show function   
var slideIndex =0;
let dot = document.querySelectorAll(".dot");
let slides = document.querySelectorAll(".mySlides");
let setting = document.querySelector(".setting");
const sideBar = document.getElementById("sidebar");

showSlides(slideIndex);
document.querySelector(".container").addEventListener("click",()=>{
    
})
function showSlides(n){
    var i;
    

    if(n >=slides.length){
        slideIndex = 0;
    }
    if(n < 0){
        slideIndex = slides.length-1;
    }
    for( i=0 ; i<slides.length ; i++){
        slides[i].style.display = "none";
        dot[i].classList.remove("active");
    }
    slides[slideIndex].style.display = "block";
    dot[slideIndex].classList.add("active");
}
document.querySelector(".arrow-prev").addEventListener("click",()=>{
    showSlides(slideIndex -=1);
});
document.querySelector(".arrow-next").addEventListener("click",()=>{
    showSlides(slideIndex+=1);
});
function currentSlide(n){
    showSlides(slideIndex =n);
}




document.getElementById("button").addEventListener('click',changeBoard);

        function changeBoard(e){
        e.preventDefault();
        let boardGame = document.querySelector('.board-b72b1');


        // let num = document.getElementById("number");
        // let boardColor = document.getElementById("board-color");
         let border = document.getElementById("border-color");
         let border_Color = border.options[border.selectedIndex].value;
        
        
            
       
        let image = slides[slideIndex].children[1];
        console.log(image.getAttribute("src"));
        document.body.style.background = "url("+image.getAttribute("src")+")";
        document.body.style.backgroundBlendMode ="multiply";
        document.body.style.backgroundColor = "rgb(189, 179, 179)";
        document.body.style.backgroundAttachment = "fixed"; 
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundSize = "cover";
        boardGame.style.border = `4px solid ${border_Color}`;
       
        game.move(bestMove);
        }

document.getElementById("menu-btn").addEventListener("click", ()=>{
  
   sideBar.style.transform = "translateX(1000px)";
   setting.style.display = "block";
});

document.querySelector(".setting").addEventListener("click",()=>{
    
    setting.style.display = "none";
    sideBar.style.transform = "translateX(0px)";
})

function newGame() {
    window.location = "index.html";
}

let icon = document.getElementById("setting");
function Animation(){
   icon.classList.add("fa-spin");
   icon.style.color = "#fcc603";
   
}
function RemoveAnimation(){
    icon.classList.remove("fa-spin");
    icon.style.color = "white";
}





// choice box
var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("group");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}
    
function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      
      y[i].classList.remove("select-arrow-active");     
     
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);



