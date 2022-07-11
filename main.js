//all answer options
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

//all our option
const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question');

const numberOfQuestion = document.getElementById('number-of-question'),
      numberOfAllQuestions = document.getElementById('number-of-all-questions');

let indexOfQuestion,
    indexOfPage = 0;

const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');

let score = 0;//итоговый результат викторины

//модальное окно
const correctAnswer = document.getElementById('correct-answer'),
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'),
      btnTryAgain = document.getElementById('btn-try-again');

const questions = [
    {
    question: 'При каком условии elem.scrollHeight == elem.clientHeight ?',
    options: [
        'Содержимое элемента полностью прокручено вниз.',
        'Страница прокручена так, что элемент полностью видим и находится в границах окна.',
        'Высота элемента равна высоте полосы прокрутки.',
        'Содержимое элемента полностью видимо, в нём нет прокрутки.',
    ],
        rightAnswer: 3
    },
    {
    question: 'Чем отличаются стандарты DOM Level 2 и DOM Level 3?',
    options: [
        'DOM Level 2 – это свойства второго уровня, а DOM Level 3 – третьего.',
        'DOM Level 3 появился позже чем DOM Level 2, он доопределяет DOM-свойства и события.',
        'DOM Level 3 работает в 3 раза быстрее, чем DOM Level 1, а DOM Level 2 – только в 2 раза.',
        'DOM Level 3 описывает новые свойства, которых нет в DOM Level 2.',
    ],
        rightAnswer: 1
    },
    {
    question: 'Может ли скрипт во время работы страницы подключить к ней другие внешние js-файлы?',
    options: [
        'Да, но только один раз.',
        'Да, но только до полной загрузки страницы.',
        'Да, сколько угодно файлов когда угодно.',
        'Не знаю',
    ],
        rightAnswer: 2
    }
];

numberOfAllQuestions.innerHTML = questions.length;

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question;

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1;
    indexOfPage++;
};

let completedAnswers = [];

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false;//якорь для проверки одинаковых вопросов

    if(indexOfPage == questions.length){
        quizOver();
    }else{
        if(completedAnswers.length > 0){
            completedAnswers.forEach(item => {
                if(item == randomNumber){
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate){
                randomQuestion();
            }else{
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length == 0){
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer){
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    }else{
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
}

for(option of optionElements){
    option.addEventListener('click', e => checkAnswer(e));
}

const disabledOptions = () =>{
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer){
            item.classList.add('correct');
        }
    })
}

//удаление всех классов со всех ответов
const enableOptions = () =>{
    optionElements.forEach(item =>{
        item.classList.remove('disabled', 'correct', 'wrong');
    })
}

const answerTracker = () =>{
    questions.forEach(() =>{
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
};

const updateAnswerTracker = status =>{
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () =>{
    if(!optionElements[0].classList.contains('disabled')){
        alert('Вам нужно выбрать один из вариантов ответа');
    }else{
        randomQuestion();
        enableOptions();
    }
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
}

const tryAgain = () =>{
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
})

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});
