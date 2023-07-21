# React Combobox

React combobox is a simple implementation of a combobox component.

Stack:

- ReactJS
- Typescript
- Vite

## Run locally

```
pnpm install
pnpm run dev
```

[http://localhost:3000](http://localhost:3000)

## Some decisions

Why not use a debounced solution? - Making requests for every query change could not be too much performance, but I believe it should be done out of the component scope.

- Async and sync - I decided to use both, I think it's better to have a component that can handle both.
- Rudmentar cache - To deal with async data, I decided to use a cache. It means that the component will not run the async function again if the internal options state has almost one option that matches the query.

## Demo version

A demo version is deployed on Vercel [combobox-react](https://react-combobox-bice.vercel.app/)

## Questions

[Questions](questions.md)
