// If Local Storage Item Has Value, Active Class Will Be Added To The Targeted Element
function CheckIfLocalDataHasValue(localItemName, listOfElementsSelector) {
  let localItemData = localStorage.getItem(localItemName);
  if (localItemData !== null) {
    document.querySelectorAll(listOfElementsSelector).forEach((element) => {
      element.classList.remove("active");
      if (element.dataset.local === localItemData) {
        element.classList.add("active");
      }
    });
  }
  return localItemData;
}

// Check If There Is Local Storage Color
let localData = CheckIfLocalDataHasValue("color_option", ".colors-list li");
if (localData !== null) {
  document.documentElement.style.setProperty("--main-Color", localData);
}

// Check if there is local storage background change
CheckIfLocalDataHasValue("background_option", ".random-backgrounds span");

// Check if there is local storage Bullets Option
localData = CheckIfLocalDataHasValue("bullets_option", ".bullets-option span");
if (localData !== null) {
  ChangeBulletsShowOption(localData, document.querySelector(".nav-bullets"));
}

// Taggle spin class on icon
document.querySelector(".settings-box .settings-icon .fa-gear").onclick =
  function () {
    this.classList.toggle("fa-spin");
    document.querySelector(".settings-box").classList.toggle("open");
  };

function HandleActiveClass(e) {
  // Remove active class from all childrens
  e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // Add active class on targeted element
  e.target.classList.add("active");
}

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    const color = e.target.dataset.local;
    // Set color on root
    document.documentElement.style.setProperty("--main-Color", color);
    // Set color on local storage
    localStorage.setItem("color_option", color);

    HandleActiveClass(e);
  });
});

// Background Interval
let backgroundInterval;
// Random Background Option
let isBackgroundChange = true;
// Switch Random Background Option
const randomBackgroundElement = document.querySelectorAll(
  ".random-backgrounds span"
);
randomBackgroundElement.forEach((span) => {
  span.addEventListener("click", (e) => {
    HandleActiveClass(e);

    let backgroundChangeOption = e.target.dataset.local;
    isBackgroundChange = backgroundChangeOption === "yes";
    // Set background change option on local storage
    localStorage.setItem("background_option", backgroundChangeOption);
    clearInterval(backgroundInterval);
    RandomizeImages();
  });
});

// Select landing page element
let landingPage = document.querySelector(".landing-page");
// Get array of images
let imgArray = ["L1.jpg", "L2.jpg", "L3.jpg", "L4.jpg", "L5.jpg"];

// Function To Randomize Images
function RandomizeImages() {
  if (isBackgroundChange) {
    backgroundInterval = setInterval(() => {
      // Get random number
      let randomNumber = Math.floor(Math.random() * imgArray.length);

      // Change background image url
      landingPage.style.backgroundImage = `url("Images/${imgArray[randomNumber]}")`;
    }, 10000);
  }
}
RandomizeImages();

//Get Skill Selector
let ourSkills = document.querySelector(".skills");
//Get Progress selector
let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
window.onscroll = function () {
  //Skill offset top
  let skillOffsetTop = ourSkills.offsetTop;

  //Skills outer height
  let skillOuterHeight = ourSkills.offsetHeight;

  //Window Height
  let windowHeight = this.innerHeight;

  //Window Scroll Top
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop + 10 > skillOffsetTop + skillOuterHeight - windowHeight) {
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  } else {
    allSkills.forEach((skill) => {
      skill.style.width = "0%";
    });
  }
};

// Create Popup With Image
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay Element
    let overlay = document.createElement("div");
    // Add Class To Overlay
    overlay.className = "popup-overlay";
    // Append Overlay To the body
    document.body.appendChild(overlay);
    // Create The Popup
    let popupBox = document.createElement("div");
    // Add Class To the Poopup Box
    popupBox.className = "popup-box";

    // Create Headding
    if (img.alt !== null) {
      let imageHeadding = document.createElement("h3");
      // Create Text For Headding
      let imgText = document.createTextNode(img.alt);
      //Append The To The Headding
      imageHeadding.appendChild(imgText);
      //Append The Headding To Th Popup Box
      popupBox.appendChild(imageHeadding);
    }

    // Create The Image
    let popupImage = document.createElement("img");
    // Set The Source Of The Clicked Images
    popupImage.src = img.src;
    //Add Image To Popup Box
    popupBox.appendChild(popupImage);
    /// Append Tthe Popup Box To Body
    document.body.appendChild(popupBox);

    // Create The Close Span
    let closeButton = document.createElement("span");
    // Create The Close Button Text
    let closeButtonText = document.createTextNode("X");
    // Append Text To Close Button
    closeButton.appendChild(closeButtonText);
    // Add Class To Close Button
    closeButton.className = "close-button";
    //Add Close Button To The Popup Box
    popupBox.appendChild(closeButton);
  });
});
// Add Close Function To Close Button
document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    // Remove The Button Parent (this parent is the popup box)
    e.target.parentNode.remove();
    // Remove The Overlay Div
    document.querySelector(".popup-overlay").remove();
  }
});

// Navigation Function
function MakeSmoothNavigation(itemsArr) {
  itemsArr.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelector(e.target.dataset.section)
        .scrollIntoView({ behavior: "smooth" });
    });
  });
}

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
// Make Naviggation on billets
MakeSmoothNavigation(allBullets);

// Select All Links
const allLinks = document.querySelectorAll(
  ".landing-page .header-area .links li a"
);
// Make Naviggation on billets
MakeSmoothNavigation(allLinks);

let bulletSpan = document.querySelectorAll(".bullets-option span");
function ChangeBulletsShowOption(option, bulletsContainer) {
  if (option === "yes") {
    bulletsContainer.style.display = "block";
  } else {
    bulletsContainer.style.display = "none";
  }
}
bulletSpan.forEach((s) => {
  s.addEventListener("click", (e) => {
    ChangeBulletsShowOption(
      s.dataset.local,
      document.querySelector(".nav-bullets")
    );
    localStorage.setItem("bullets_option", s.dataset.local);
    HandleActiveClass(e);
  });
});

//Reset Button
document.querySelector(".reset-options").onclick = function () {
  localStorage.clear();
  // localStorage.removeItem('bullets_option')
  // localStorage.removeItem('color_option')
  // localStorage.removeItem('background_option')

  window.location.reload();
};

// Toggle Menu
const toggleButton = document.querySelector(".header-area .toggle-menu");
const toggleLinks = document.querySelector(".links");
toggleButton.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  toggleLinks.classList.toggle("open");
};
// Stop Propagation On Menu
toggleLinks.onclick = function (e) {
  e.stopPropagation();
};

// Click Anywere outside Menu and Toggle Button
document.addEventListener("click", (e) => {
  if (e.target !== toggleButton && e.target !== toggleLinks) {
    // Check If Menu Is Open
    if (toggleLinks.classList.contains("open")) {
      toggleButton.classList.remove("menu-active");
      toggleLinks.classList.remove("open");
    }
  }
});
