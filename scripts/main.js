var words = {text:["a","all","am","an","and","are","as","at","be","big","by","came","can","come",
                  "did","do","down","each","find","for","from","get","go","had","have","he",
                   "help","here","his","how","I",
                  "in","is","it","like","look","love","make","me","my","new","no","not","of","on",
                  "or","out","play","said","see","she","that","the","there","this","to","up","use",
                   "was","we","were","when","will","with","what","words","yes","you","your"],
             numbers:["(1) one","(2) two","(3) three","(4) four","(5) five","(6) six","(7) seven",
                      "(8) eight","(9) nine","(10) ten"],
             colors:["red","green","yellow","blue","black","brown","pink","purple","white","orange"]};

document.onload = buildPage("text");

//Get clicks on the tab icons
var tabs = document.querySelectorAll('nav ul li');
for (tab = 0; tab < tabs.length; tab++) {
    tabs[tab].onclick = TabClick;
}

function TabClick() {
    var clickedCategory = this.dataset.category;
    buildPage(clickedCategory);
}

//Main page building function
function buildPage(category) {
    var wordList = words[category];
    
    //Randomize the words
    for (i = (wordList.length - 1); i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = wordList[i];
        wordList[i] = wordList[j];
        wordList[j] = temp;
        }
        
    var x = document.getElementById('words');
    var biggestWord = 0;
    
    //Clear existing display
    while (x.hasChildNodes()) {
        x.removeChild(x.firstChild);
    }
    
    
    //Build the display list of words
    for (i in wordList) {
        var para = document.createElement('p');
        para.textContent = wordList[i];
        para.setAttribute('class','word');
        if (category == 'colors') {
            para.style.color = wordList[i];
            if (wordList[i] === "white") {
                console.log("white text");
                para.style.textShadow = '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000';
            }
        }
        x.appendChild(para);
        if (wordList[i].length > biggestWord) {
            biggestWord = wordList[i].length;
        } 
    }
    
    //Set font size according to the biggest word
    x.style.fontSize = (150/biggestWord) + "vw";
    
    //Highlight the correct tab
    var tabs = document.querySelectorAll('nav ul li');
    for (tab = 0; tab < tabs.length; tab++) {
        tabs[tab].style.color = 'gainsboro';
        if (tabs[tab].dataset.category == category) {
            tabs[tab].style.color = 'royalblue';
        }
    }
    
    //Reset the slideshow
    slideIndex = 1;
    showDivs(1,1);
}



//slideshow
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n, n);
}

function showDivs(n, dir) {
  var i;
  var x = document.getElementsByClassName("word");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length} ;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
    if (dir > 0) {
        x[slideIndex-1].setAttribute('class','word w3-animate-right');
    } else {
        x[slideIndex-1].setAttribute('class','word w3-animate-left');
    }
  x[slideIndex-1].style.display = "block";
    
    
}


//Functions for handling swipe events on touch

var swipeContainer = document.getElementsByTagName('body');
swipeContainer[0].addEventListener("touchstart", startTouch, false);
swipeContainer[0].addEventListener("touchmove", moveTouch, false);

  // Swipe Left / Right
  var initialX = null;
  
  function startTouch(e) {
    initialX = e.touches[0].clientX;
  };

  function moveTouch(e) {
    if (initialX === null) {
      return;
    }

    var currentX = e.touches[0].clientX;

    var diffX = initialX - currentX;
      
    if (diffX > 0) {
        // swiped left
        plusDivs(1);
      } else {
        // swiped right
        plusDivs(-1);
      }  

    initialX = null;
    initialY = null;

    e.preventDefault();
  };

