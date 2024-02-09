const client = require('../index.js');

const fetch = require('node-fetch');
// /**************trivia quiz***********/

client.onText(/^[\/!#]trivia$/, async msg => {
    let trivia = '/trivia';

    const dataFetch = await fetch(`https://opentdb.com/api.php?amount=1&type=multiple`)
    const json = await dataFetch.json();
    const data = json.results[0];

    //get answer and question by var
    let question = data.question.replace(/&quot;/g, '"').replace(/&eacute;/g, 'e').replace(/&#039;/g, "'")
    let incorrect = data.incorrect_answers[0]
    let incorrectTwo = data.incorrect_answers[1]
    let incorrectThree = data.incorrect_answers[2]
    let correct = data.correct_answer.replace(/&quot;/g, '"').replace(/&eacute;/g, 'e').replace(/&#039;/g, "'")

    let options = [incorrect, incorrectTwo, incorrectThree], n;

    //push correct value
    options.push(correct)
    //gets random value of quiz
    options.sort(() => Math.random() - Math.random()).slice(0, n);
    //get correct ans 's index
    let index = options.indexOf(correct) + 1;
    //  console.log(index)

    //position of wrong ans
    let wrongOne = options.indexOf(incorrect) + 1;
    let wrongTwo = options.indexOf(incorrectTwo) + 1;
    let wrongThree = options.indexOf(incorrectThree) + 1;

    //index of correct answer
    let correctAns = options.indexOf(correct);
    //create poll
    client.sendPoll(msg.chat.id, question, options, { open_period: 60, is_anonymous: false, type: 'quiz', correct_option_id: correctAns })

});
