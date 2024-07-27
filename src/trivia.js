import client from '../index.js';
import fetch from 'node-fetch';

/**************trivia quiz***********/
export default (client) => {
client.onText(/^[\/!#]trivia$/, async msg => {
    try {
        const dataFetch = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
        const json = await dataFetch.json();
        const data = json.results[0];

        // Decode HTML entities and format text
        let question = data.question
            .replace(/&quot;/g, '"')
            .replace(/&eacute;/g, 'e')
            .replace(/&#039;/g, "'");

        let incorrect = data.incorrect_answers[0]
            .replace(/&quot;/g, '"')
            .replace(/&eacute;/g, 'e')
            .replace(/&#039;/g, "'");
        let incorrectTwo = data.incorrect_answers[1]
            .replace(/&quot;/g, '"')
            .replace(/&eacute;/g, 'e')
            .replace(/&#039;/g, "'");
        let incorrectThree = data.incorrect_answers[2]
            .replace(/&quot;/g, '"')
            .replace(/&eacute;/g, 'e')
            .replace(/&#039;/g, "'");
        let correct = data.correct_answer
            .replace(/&quot;/g, '"')
            .replace(/&eacute;/g, 'e')
            .replace(/&#039;/g, "'");

        // Prepare options for the quiz
        let options = [incorrect, incorrectTwo, incorrectThree, correct];
        options.sort(() => Math.random() - 0.5); // Shuffle options

        // Determine correct answer's index
        let correctAns = options.indexOf(correct);

        // Send the poll
        await client.sendPoll(msg.chat.id, question, options, {
            open_period: 60,
            is_anonymous: false,
            type: 'quiz',
            correct_option_id: correctAns
        });

    } catch (err) {
        console.error('Error fetching trivia question:', err);
        await client.sendMessage(msg.chat.id, 'Something went wrong while fetching trivia. Please try again later.');
    }
});
}
