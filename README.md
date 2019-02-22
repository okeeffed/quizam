# Quizam

> Like Shazam for CLI quizzes but without the wizardry

## Install

```sh
npm i -g quizam
```

## Usage

```sh
$ quizam help


```

## Basic Example

`quizam init` to initialise a `quizam.yaml` base file.

```yaml
name: Hello Quizam!
author: Dennis O'Keeffe
quiz:
  - type: select
    question: What is the best CLI app?
    choices:
      - Quiz Gon Gin
      - Quizam
      - Quizalicious
      - Quiztacular
    answer: Quizam
  - type: select
    question: Where is Melbourne?
    choices:
      - USA
      - England
      - Australia
      - New Calidonia
    answer: Australia
  - type: confirm
    question: Is Quizam your favourite?
    answer: true
  - type: multi
    question: What equals 17?
    choices:
      - 10 + 7
      - 20 - 4
      - 1 + 17
      - 5 + 5 + 5 + 2
    answer:
      - 10 + 7
      - 5 + 5 + 5 + 2
  - type: input
    question: Spell "quizam"?
    answer: quizam
```

`quizam run` to run the quiz CLI.

## Types

### Input

Compares user input to answer.

```yaml
name: Hello Quizam!
author: Dennis O'Keeffe
quiz:
  - type: input
    question: Spell "quizam"?
    answer: quizam
```

### Select

Gives list to select single option.

```yaml
name: Hello Quizam!
author: Dennis O'Keeffe
quiz:
  - type: select
    question: What is the best CLI app?
    choices:
      - Quiz Gon Gin
      - Quizam
      - Quizalicious
      - Quiztacular
    answer: Quizam
```

### Multiselect

Gives list to select multiple options.

```yaml
name: Hello Quizam!
author: Dennis O'Keeffe
quiz:
  - type: multi
    question: What equals 17?
    choices:
      - 10 + 7
      - 20 - 4
      - 1 + 17
      - 5 + 5 + 5 + 2
    answer:
      - 10 + 7
      - 5 + 5 + 5 + 2
```

### Confirm

Y/n response to a question.

```yaml
name: Hello Quizam!
author: Dennis O'Keeffe
quiz:
  - type: confirm
    question: Is Quizam your favourite?
    answer: true
```

## License

MIT © [Dennis O'Keeffe](https://dennisokeeffe.com)
