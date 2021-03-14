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

## Offline singleplayer

If you clone this repo and start as instructed in [Project setup](#project-setup),
you will use offline mode by default.

In this mode, there are only you and other AI players.
It is useful when developing an AI.

## Online multiplayer

If you create a `.env.local` file and fill like below, you can create an application that can play with other players.
You need a Firebase account and Firestore database instance.


```
VUE_APP_API_KEY=obtained from firebase account
VUE_APP_AUTH_DOMAIN=obtained from firebase account
VUE_APP_PROJECT_ID=obtained from firebase account
VUE_APP_STORAGE_BUCKET=obtained from firebase account
VUE_APP_MESSAGING_SENDER_ID=obtained from firebase account
VUE_APP_APP_ID=obtained from firebase account
VUE_APP_MEASUREMENT_ID=obtained from firebase account
```

## Debug mode

You can enable "debug mode" check by putting the line below to `.env.local`.

```
VUE_APP_ENABLE_DEBUG=1
```

This will enable you to see your own cards and also remaining cards on the deck.
It can be useful in debugging an AI.

## Project setup

This project uses [Vue.js](https://v3.vuejs.org/) and its
[composition API](https://v3.vuejs.org/guide/composition-api-introduction.html#why-composition-api).
You can start developing by following instructions below.

First, install npm and initialize the dependencies.

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
