function toggleForm() {
  const quizForm = document.querySelector('.pizza-box');

  if (quizForm.style.display !== 'block') {
      quizForm.style.display = 'block';
    } else {
      quizForm.style.display = 'none';
  }
}


// function resetQuiz() {
//   currentQuestionIndex = 0;
//   userAnswers.fill(null);
//   updateQuestion();
// }


document.addEventListener("DOMContentLoaded", function() {
  const nextButton = document.getElementById('next-button');
  const backButton = document.getElementById('back-button');
  
  const questions = [
    "What is the origin of pizza?",
    "Which pizza topping is a must-have in a classic Margherita pizza?",
    "What is the main ingredient of a traditional Neapolitan pizza dough?",
    "What type of cheese is commonly used on a New York-style pizza?",
    "Which pizza style is known for its deep-dish crust and thick layer of toppings?",
    "What is the Italian term for a pizza with everything?",
    "What ingredient gives a pizza its characteristic bubbly crust?",
    "What is the name of the circular tool used to slice pizzas?",
    "What is the name of the Italian oven traditionally used to bake pizzas?",
    "Which famous pizza chain is known for its delivery service and \"30 minutes or less\" guarantee?",
  ]

  const answers = [
    [
      "Italy",
      "Greece",
      "Egypt",
      "China"
    ],
    [
      "Pepperoni",
      "Mushrooms",
      "Fresh basil",
      "Pineapple"
    ],
    [
      "All-purpose flour",
      "Whole wheat flour",
      "Bread flour",
      "Tipo 00 flour"
    ],
    [
      "Mozzarella",
      "Cheddar",
      "Provolone",
      "Parmesan"
    ],
    [
      "Neapolitan",
      "New York-style",
      "Chicago-style",
      "Sicilian"
    ],
    [
      "Marinara",
      "Margherita",
      "Capricciosa",
      "Quattro Stagioni"
    ],
    [
      "Baking powder",
      "Yeast",
      "Baking soda",
      "Water"
    ],
    [
      "Pizza slicer",
      "Pizza cutter",
      "Pizza wheel",
      "Pizza knife"
    ],
    [
      "Tandoor",
      "Grill",
      "Wood-fired oven",
      "Microwave oven"
    ],
    [
      "Domino's",
      "Pizza Hut",
      "Papa John's",
      "Little Caesars"
    ]
  ]

  const correctAnswers = [
    "Italy", 
    "Fresh basil",
    "Tipo 00 flour",
    "Mozzarella",
    "Chicago-style",
    "Quattro Stagioni",
    "Yeast",
    "Pizza cutter",
    "Wood-fired oven",
    "Domino's"
  ]

  var currentQuestionIndex = 0;
  var userAnswers = new Array(questions.length).fill(null);
  var userCorrectAnswers = 0;
  
  backButton.addEventListener('click', function(event) {
    event.preventDefault();

    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
    }

    updateQuestion();
  });


  nextButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission
    
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
    }
    
    updateQuestion();
  });

  function updateQuestion() {
    const questionHeader = document.querySelector('.quiz-content h2');
    const currentQuestion = document.querySelector('.quiz-content p');
    const answerContainer = document.querySelector('.quiz-content .answers');
    answerContainer.innerHTML = ""; // Clear previous answers

    // Display question header and content
    questionHeader.textContent = "Question " + (currentQuestionIndex + 1); // Display question number
    currentQuestion.textContent = questions[currentQuestionIndex]; // Display current question

    // Display answers for the current question
    for (let i = 0; i < answers[currentQuestionIndex].length; i++) {
        // Create radio button for each answer
        const radioInput = document.createElement('input');
        radioInput.setAttribute('type', 'radio');
        radioInput.setAttribute('name', 'answer');
        radioInput.setAttribute('value', answers[currentQuestionIndex][i]);
        radioInput.addEventListener('change', function() {
          userAnswers[currentQuestionIndex] = answers[currentQuestionIndex][i];
        })
        // Create label for the answer
        const label = document.createElement('label');
        label.appendChild(radioInput);
        label.appendChild(document.createTextNode(answers[currentQuestionIndex][i]));

        // Append label to the answer container
        answerContainer.appendChild(label);

        // Insert a line break after every 4 answers
        if ((i + 1) % 4 === 0) {
            answerContainer.appendChild(document.createElement('br'));
        }
        
        // Check if the current answer matches the user's saved answer
        if (answers[currentQuestionIndex][i] === userAnswers[currentQuestionIndex]) {
          radioInput.checked = true;
        }
    }

    // Calculate the count of correct answers
    userCorrectAnswers = 0;
    for (let i = 0; i < userAnswers.length; i++) {
        if (userAnswers[i] === correctAnswers[i]) {
            userCorrectAnswers++;
        }
    }

    const quizContent = document.querySelector('.quiz-content');
    quizContent.style.padding = '5px'; // Adjust as needed

    // Show/hide back and next buttons based on current question index
    if (currentQuestionIndex === 0) {
        backButton.style.display = 'none';
    } else {
        backButton.style.display = 'inline-block';
    }

    if (currentQuestionIndex === questions.length - 1) {
        nextButton.textContent = 'Submit'; // Change button text for the last question
        nextButton.addEventListener('click', submitQuiz);
      } else {
        nextButton.textContent = 'Next';
        nextButton.removeEventListener('click', submitQuiz); // Remove submitQuiz listener if present
        nextButton.addEventListener('click', updateQuestion); // Attach updateQuestion function
    }
  }

  function submitQuiz() {
    const quizContent = document.querySelector('.quiz-content');
    quizContent.innerHTML = '';
    // Display the result
    const resultContainer = document.createElement('div');
    resultContainer.classList.add('result-container');

    const resultHeader = document.createElement('h2');
    resultHeader.textContent = 'Quiz Result';

    const userCorrectAnswersHeader = document.createElement('h3');
    userCorrectAnswersHeader.textContent = `Correct Answers: ${userCorrectAnswers}/10 ${userCorrectAnswers >= 5 ? '🥳' : '😔'}`;
    const quizForm = document.querySelector('.pizza-box');
    quizForm.style.height = "150px";
    resultContainer.appendChild(resultHeader);
    resultContainer.appendChild(userCorrectAnswersHeader);
    quizContent.appendChild(resultContainer);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';

    resultContainer.appendChild(closeButton);

    closeButton.addEventListener('click', function() {
      const quizForm = document.querySelector('.pizza-box');
      quizForm.style.display = 'none';
    })

    // Gather user answers and submit the form
    // form.submit();
}

  // Initialize the quiz with the first question
  updateQuestion();
});