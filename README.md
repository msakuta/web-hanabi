# web-hanabi

A [Hanabi card game](https://en.wikipedia.org/wiki/Hanabi_(card_game)) on the web browser.

Try it now on your browser! https://msakuta.github.io/web-hanabi/

## What is this?

Hanabi is a coorperative playing card game.
There is also excellent web site at [hanabi.cards](https://hanabi.cards/en) that you can play with your friends or AIs.
Then why would I reimplement it?

Implementing a game by yourself improves the understanding of the game mechanics and
hopefully we can implement an AI by ourselves, which is not possible with hanabi.cards.


## AI development

Currently you can play against AIs, but they are very, very stupid.
Feel free to clone the repo and edit [src/player.ts](src/player.ts) to improve the AI.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## External Libraries

This application uses following libraries.

* [Google Firebase / Firestore](https://firebase.google.com/?hl=ja) to store score statistics.
