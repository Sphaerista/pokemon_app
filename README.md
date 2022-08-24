# How to open this project online

https://63065a80130b8403d2ad3eb7--spectacular-gumption-fc49f7.netlify.app/

## How to open this project locally

Just clone the project and run with docker:
docker build -t 'app_name' .
docker run -dp 3000:3000 'app_name'


Alternatively, you can just npm start.

## Used libraries

Only Redux toolkit was used as a library to simplify the app’s state especially the pokemon’s list.

## Challenges

The main difficulty was to construct pokemon object as its different aspects are located in different APIs, so it was necessary to use multiple functions in data-action js to combine all the data in one pokemon object. That's why it takes time to load the data for the first time.

## Extra features

Deleting pokemons from the favourite list

## Room for improvement

Posibility to add colors while comparing pokemons's stats, so it would be easier to understand which pokemon is better.

Refactoring dispatch actions to avoid some duplications in several components.

Refactoring some of the pages to folloew the separation of concern rule.

Make better responsiveness and smoother interface.

Move some of the functions from the components to the global redux state.

Implement better search function (for example extended search).
