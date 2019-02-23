#!/usr/bin/env node

/**
 * Quizam. A no-fuss yaml CLI quiz runner.
 *
 * @author
 * Dennis O'Keeffe
 */

var fs = require('fs');
var argv = require('yargs-parser')(process.argv.slice(2));
var cwd = process.cwd();
const prompts = require('prompts');
const yaml = require('js-yaml')
const recursive = require('recursive-readdir');
const chalk = require('chalk');
const path = require('path');

const help = `
    Quizam

    Quiz yourself using yaml files!

    Command                 Exec
    ---------------         ---------------

    quizam help             Display help
    quizam init [file]      Initialise quizam.yaml file at base or designated [file] path (must include quizam.yaml)
    quizam run [file]       Generate doc files or pass [file] as file/to/path to generate doc for specific file 

    Flags                   Function
    ---------------         ---------------
    -i                      Ignore folders (paths as folders/files divided by commas)
    -v                      Verbose errors

    Examples
    ---

    $ quizam run
    > # recursively searches for *quizam.yaml files
    > # runs quiz

    $ quizam run -i=build, dist
    > # recursively searches for *quizam.yaml files ignoring build and dist dir
    > # runs quiz

    $ quizam run path/to/quizam.yaml
    > # runs path/to/quizam.yaml quiz

    $ quizam init
    > # create quizam.yaml in current directory
    
    $ quizam init path/to/custom-quizam.yaml
    > # create quiz at path/to/custom-quizam.yaml

    Built by Dennis O'Keeffe

    Twitter: @dendribbles
    Github: https://github.com/okeeffed
`;

/**
 * Initialise a quiz. Asks for name and author then writes ./quizam.yaml.
 *
 */
const init = async() => {
    try {
        const base = {
            name: 'Hello Quizam!',
            author: 'Unknown',
            quiz: [
                {
                    type: 'select',
                    question: 'What is the best CLI app?',
                    choices: [
                        "Quiz Gon Gin", "Quizam", "Quizalicious", "Quiztacular"
                    ],
                    answer: "Quizam"
                }
            ]
        }

        // Set output path destination
        let dest = typeof argv._[1] !== 'undefined'
            ? path.resolve(argv._[1])
            : path.resolve('quizam.yaml');

        if (!dest.includes('quizam.yaml')) {
            const err = 'You must provided a destination with quizam.yaml at the end of the path';
            console.error(chalk.red(err));
            throw new Error(err);
        }

        if (!argv.y) {
            const name = await input({question: "Quiz name?"});
            base.name = name.answer;
            const author = await input({question: "Author?"});
            base.author = author.answer;
        }

        fs.writeFileSync(dest, yaml.safeDump(base));
    } catch (err) {
        if (argv.v) {
            console.error(err);
        }

        console.error('An error occured. Exiting program. Use -v flag for more info.');
        process.exit();
    }
}

/**
 * Helper function to clean strings for comparisons.
 *
 * @param {*} str
 */
const cleanse = str => str
    .toLowerCase()
    .trim()
    .replace(/[^a-zA-Z0-9]/g, '');

/**
 * Select handles a question with option set and one answer.
 *
 * @param {*} quiz Select question object
 * @returns {Object} Prompts function
 */
const select = quiz => {
    const choices = quiz
        .choices
        .map(d => ({title: d, value: d}))
    return prompts({type: 'autocomplete', name: 'answer', message: quiz.question, choices: choices});
}

/**
 * Handles a multiselect question.
 *
 * @param {*} quiz Multiselect question object
 * @returns {Object} Prompts function
 */
const multi = quiz => {
    const choices = quiz
        .choices
        .map(d => ({title: d, value: d}))
    return prompts({type: 'multiselect', name: 'answer', message: quiz.question, choices: choices});
}

/**
 * Handle question requiring input.
 *
 * @param {*} quiz Input question object
 * @returns {Object} Prompts object
 */
const input = quiz => {
    return prompts({type: 'text', name: 'answer', message: quiz.question});
}

const confirm = quiz => {
    return prompts({type: 'confirm', name: 'answer', message: quiz.question});
}

/**
 * The main run function. It will pass for all .js files
 * in the recursive function and not in the folders specified
 * and generate documentation if it can.
 */
const run = async() => {
    try {
        const isFile = typeof argv._[1] !== 'undefined'
            ? !fs
                .lstatSync(argv._[1])
                .isDirectory()
            : false;

        let target = cwd;
        if (!isFile && typeof argv._[1] !== 'undefined') {
            target = path.resolve(argv._[1]);
        }

        let ignoreFiles = [];
        if (argv.i) {
            ignoreFiles = argv
                .i
                .split(',');
        }

        let files = isFile
            ? [path.resolve(argv._[1])]
            : await recursive(target, [
                'node_modules', ...ignoreFiles,
                '!*quizam.yaml'
            ]);

        if (files.length === 0) {
            throw new Error('No quizzes found!');
        }

        let quizFile = files[0];
        let res = null;
        if (files.length > 1) {
            const choices = files.map((d, i) => {
                const dArr = d.split(cwd);
                return {title: dArr[1], value: i}
            })
            res = await prompts({type: 'select', name: 'file', message: 'Which quiz to run?', choices: choices});

            quizFile = files[res.file];
        }

        const quizam = yaml.safeLoad(fs.readFileSync(quizFile, 'utf8'));
        console.log(`\nQuiz: ${quizam.name}`);
        if (quizam.author) {
            console.log(`Author: ${quizam.author}`);
        }

        console.log(`\nRunning quiz...\n`);

        const quizTotal = quizam.quiz.length;
        let correct = 0;

        for (let quiz of quizam.quiz) {
            switch (quiz.type) {
                case 'select':
                    res = await select(quiz);
                    break;
                case 'input':
                    res = await input(quiz);
                    break;
                case 'confirm':
                    res = await confirm(quiz);
                    break;
                case 'multi':
                    res = await multi(quiz);
                    break;
                default:
                    console.error('Invalid type provided for question');
                    process.exit();
            }

            if (typeof res.answer === 'undefined') {
                res.answer = quiz.choices[0]
            }

            if (argv.v) {
                console.log('Your answer:', res.answer);
            }

            const logCorrect = (quiz) => {
                correct++;
                console.log(chalk.green('Correct!\n'));
            }

            const logIncorrect = (quiz) => {
                console.log(chalk.red('Incorrect.'));
                console.log('Correct answer:', quiz.answer, '\n');
            }

            if (quiz.type === 'multi') {
                const isCorrect = quiz
                    .answer
                    .every(d => res.answer.includes(d));
                isCorrect
                    ? logCorrect(quiz)
                    : logIncorrect(quiz);
            } else if (quiz.type === 'confirm') {
                res.answer === quiz.answer
                    ? logCorrect()
                    : logIncorrect(quiz);
            } else if (cleanse(res.answer) === cleanse(quiz.answer)) {
                correct++;
                console.log(chalk.green('Correct!\n'));
            } else {
                logIncorrect(quiz);
            }
        }
        console.log(`Score: ${correct} out of ${quizTotal}!`);
    } catch (err) {
        console.error('An error occured, closing app...');
        if (argv.v) {
            console.error(err.message);
        }
        process.exit();
    }
}

switch (argv._[0]) {
    case 'run':
        run();
        break;
    case 'init':
        init();
        break;
    default:
        console.log(help);
}