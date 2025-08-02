const lessons = {
  lesson1: [
    {
      type: 'mcq',
      question: "What does 'Guten Morgen' mean?",
      options: ['Good Night', 'Good Morning', 'Goodbye', 'Thank you'],
      answer: 'Good Morning'
    },
    {
      type: 'fill',
      question: "Translate to German: Hello",
      answer: 'Hallo'
    },
    {
      type: 'mcq',
      question: "What does 'Tschüss' mean?",
      options: ['Bye', 'Hi', 'Yes', 'No'],
      answer: 'Bye'
    },
    {
      type: 'fill',
      question: "Fill in the blank: Guten ____ (Evening)",
      answer: 'Abend'
    },
    {
      type: 'mcq',
      question: "'Danke' means?",
      options: ['Please', 'Sorry', 'Thanks', 'Hi'],
      answer: 'Thanks'
    }
  ],
  lesson2: [
    {
      type: 'fill',
      question: "Translate to German: How are you?",
      answer: 'Wie geht es dir'
    },
    {
      type: 'mcq',
      question: "'Ich heiße' means?",
      options: ['I eat', 'I walk', 'My name is', 'Good day'],
      answer: 'My name is'
    },
    {
      type: 'fill',
      question: "Fill in the blank: Ich ____ Chaitanya.",
      answer: 'heiße'
    },
    {
      type: 'mcq',
      question: "'Guten Tag' means?",
      options: ['Good afternoon', 'Hello', 'Good day', 'See you'],
      answer: 'Good day'
    },
    {
      type: 'fill',
      question: "Translate: See you soon",
      answer: 'Bis bald'
    }
  ]
};

let currentIndex = 0;
let currentLesson = 'lesson1';

window.onload = function () {
  document.getElementById('lessonSelect').addEventListener('change', (e) => {
    currentLesson = e.target.value;
    currentIndex = 0;
    renderQuestion();
  });

  document.getElementById('nextBtn').addEventListener('click', nextQuestion);

  renderQuestion();
};

function renderQuestion() {
  const container = document.getElementById('questionContainer');
  container.innerHTML = '';

  const q = lessons[currentLesson][currentIndex];
  const questionElem = document.createElement('p');
  questionElem.textContent = q.question;
  container.appendChild(questionElem);

  if (q.type === 'mcq') {
    q.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.textContent = opt;
      btn.onclick = () => {
        btn.className = opt === q.answer ? 'correct' : 'incorrect';
      };
      container.appendChild(btn);
      container.appendChild(document.createElement('br'));
    });
  } else if (q.type === 'fill') {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = "Your answer";
    input.style.margin = "10px";
    container.appendChild(input);

    const checkBtn = document.createElement('button');
    checkBtn.textContent = 'Check';
    checkBtn.onclick = () => {
      input.className = input.value.trim().toLowerCase() === q.answer.toLowerCase() ? 'correct' : 'incorrect';
    };
    container.appendChild(checkBtn);
  }
}

function nextQuestion() {
  if (currentIndex < lessons[currentLesson].length - 1) {
    currentIndex++;
    renderQuestion();
  } else {
    alert('🎉 End of lesson!');
  }
}
