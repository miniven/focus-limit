# Focus Limit

A Javascript library that limits the area the elements can be focused in.

## Installation and Usage

Install the library with `npm install --save focus-limit` or `yarn add focus-limit`.

Import the library to your project:

```js
import focusLimit from 'focus-limit';
```

Initialize the limiter on any node:

```js
const formLimiter = focusLimit(document.querySelector('.form'));

// Call method 'limit'

formLimiter.limit();

// Call method 'unlimit' when you don't need limitation

formLimiter.unlimit();
```

## Methods

|Method|Description|
|---|---|
|limit()|Limits the aria of focus|
|unlimit()|Unlimits the aria of focus|