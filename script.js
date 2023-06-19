const title = document.querySelector("#title")
const startButton = document.querySelector("#start-btn")
const nextButton = document.querySelector("#next-btn")
const questionContainerElement = document.querySelector("#question-container")
const questionElement = document.querySelector("#question")
const answerButtonElement = document.querySelector("#answer-buttons")
const submitButton = document.querySelector("#submit-btn")
const result = document.querySelector("#result")
let grade = 0
let numberOfCorrectAnswers, numberOfWrongAnswers
let shuffledQuestions, currentQuestionIndex

startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  title.innerText = " "
  questionContainerElement.classList.remove("hide")
  shuffledQuestions = questions.sort(() => Math.random() - 0.5)
  currentQuestionIndex = 0
  numberOfWrongAnswers = 0
  numberOfCorrectAnswers = 0
  startButton.classList.add("hide")
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestions(shuffledQuestions[currentQuestionIndex])
}

function showQuestions(question) {
  questionElement.innerText = question.question
  question.answers.forEach((answer) => {
    const button = document.createElement("button")
    button.innerText = answer.text
    button.classList.add("btn")
    if (answer.correct) {
      button.dataset.correct = answer.correct
    } else {
      button.dataset.wrong = answer.wrong
    }
    button.addEventListener("click", selectAnswer)
    answerButtonElement.appendChild(button)
  })
}

function resetState() {
  document.body.classList.remove("correct")
  document.body.classList.remove("wrong")
  nextButton.classList.add("hide")
  while (answerButtonElement.firstChild) {
    answerButtonElement.removeChild(answerButtonElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const wrong = selectedButton.dataset.wrong
  const correct = selectedButton.dataset.correct
  if (correct) {
    numberOfCorrectAnswers += 1
  }
  if (wrong) {
    numberOfWrongAnswers += 1
  }
  setStatusClass(document.body, correct, wrong)
  Array.from(answerButtonElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct, button.dataset.wrong)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide")
    console.log(numberOfCorrectAnswers, numberOfWrongAnswers)
  } else {
    submitButton.classList.remove("hide")
    submitButton.addEventListener("click", showResult)
    startButton.classList.add("hide")
    console.log(numberOfCorrectAnswers, numberOfWrongAnswers)
  }
}

function setStatusClass(element, correct, wrong) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add("correct")
  }
  if (wrong) {
    element.classList.add("wrong")
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct")
  element.classList.remove("wrong")
}

function showResult() {
  while (answerButtonElement.firstChild) {
    answerButtonElement.removeChild(answerButtonElement.firstChild)
  }
  questionElement.innerText = ""
  submitButton.classList.add("hide")
  grade = (numberOfCorrectAnswers / questions.length) * 100
  const showResult = document.createElement("div")
  showResult.innerText = `Your score is ${numberOfCorrectAnswers}/${
    questions.length
  }
                                                        Your grade is: ${Math.round(
                                                          grade
                                                        )}%`
  result.append(showResult)
}

const questions = [
  {
    question: "What is 1 + 1?",
    answers: [
      { text: "2", correct: true },
      { text: "4", correct: false },
      { text: "10", correct: false },
      { text: "6", correct: false },
    ],
  },
  {
    question: "What does DNA stand for?",
    answers: [
      { text: "DaNationalAnthem", correct: false },
      { text: "DelicateNameAnalyze", correct: false },
      { text: "Deoxyribonucleic Acid", correct: true },
      { text: "Trinitrotoluene", correct: false },
    ],
  },
  {
    question: "Who is the prime minister of India?",
    answers: [
      { text: "Aneesh", correct: false },
      { text: "Monkey", correct: false },
      { text: "Unknown", correct: true },
      { text: "Samsung", correct: false },
    ],
  },
  {
    question: "Who is the best at coding?",
    answers: [
      { text: "Google", correct: false },
      { text: "Vijay", correct: false },
      { text: "Aneesh", correct: false },
      { text: "Apple", correct: true },
    ],
  },
  {
    question: "what color is this: 🟦?",
    answers: [
      { text: "Light-Blue", correct: false },
      { text: "Alpha-Blue", correct: false },
      { text: "White-Blue", correct: false },
      { text: "Dark-Blue", correct: true },
    ],
  },
  {
    question: "What is Aneesh's favorite Hobby 'Currently?'",
    answers: [
      { text: "Playing Tennis", correct: false },
      { text: "Unknown", correct: true },
      { text: "Playing VideoGames", correct: false },
      { text: "Watching Youtube", correct: false },
    ],
  },
]
