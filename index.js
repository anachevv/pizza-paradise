let slideTimeout; // Declare a global variable to store the timeout ID

function currentSlide(n, userClick = false) {
    let backgroundImage;

    const quoteContainer = document.querySelector('.quote');
    const quoteParagraph = document.createElement('p');
    quoteContainer.innerHTML = "";

    if (n === 1) {
        backgroundImage = "url('./bg.png')";
        quoteParagraph.innerHTML = "Pizza isn't just a dish; it's a slice of life.";
        quoteContainer.style.marginLeft = "30%";
    } else if (n === 2) {
        backgroundImage = "url('./bg2.jpg')";
        quoteParagraph.innerHTML = "Pizza isn't just a meal; it's a journey through flavor,<br> a celebration of tradition, and a testament to craftsmanship.";
        quoteContainer.style.marginLeft = "25%";
    } else if (n === 3) {
        backgroundImage = "url('./bg3.jpg')";
        quoteParagraph.innerHTML = "Bite by bite, our pizzas tell a story of passion, creativity,<br>and dedication to quality.";
        quoteContainer.style.marginLeft = "25%";
    }
    
    quoteContainer.appendChild(quoteParagraph);
    document.body.style.backgroundImage = backgroundImage;
    
    // Apply the "active" class to the clicked dot
    let dots = document.getElementsByClassName("dot");
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    dots[n - 1].classList.add("active");

    // If the function was called by a user click, clear any existing timeout
    if (userClick) {
        clearTimeout(slideTimeout);
    }

    // Automatically slide to the next image after 3 seconds, unless function was called by a user click
    if (!userClick) {
        slideTimeout = setTimeout(function() {
            let nextSlide = n % 3 + 1; // Calculate the next slide index
            currentSlide(nextSlide); // Call currentSlide with the next index
        }, 3000); // 3000 milliseconds = 3 seconds
    }
}

// Add event listeners to dots to handle user clicks
let dots = document.getElementsByClassName("dot");
for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", function() {
        currentSlide(i + 1, true); // Call currentSlide with the clicked dot's index + 1
    });
}

currentSlide(1); // Start the slideshow
