# QuestionMark.js

When the user pushes the `?` key, QuestionMark.js triggers a modal window that displays keyboard shortcuts for your app &mdash; similar to what happens on Twitter, Gmail, GitHub, etc. The modal is removed when the `ESC` key is pushed or the user clicks behind the modal.

I think every app that has keyboard shortcuts should do this. This could also be a generic 'help' menu for the app, but that would require some tweaking to the code and the CSS. For now, this works primarily as a shortcut keys menu.

## Demo Page
For a demo of QuestionMark.js, [go here](https://www.impressivewebs.com/demo-files/question-mark-js/) or you can fiddle around with the version [on CodePen](https://codepen.io/impressivewebs/pen/eJzsw?editors=0010).



## Instructions
To install all the files as a dependency in your `node_modules` folder:

```
npm install questionmark-js
```

To make it work, it's pretty simple. Link the CSS file in the `<head>` and run the script on page load (or at the bottom). Make sure all the mandatory files are included (`question.mark.html`, `question.mark.css`, and `question.mark.js`).

To customize, edit the `question.mark.html` file to include your own keyboard shortcuts. For each `<ul>` included with a class of `help-list`, a new column will be created. If you want a single column, use a single `<ul>`. Longer columns will scroll vertically.

Within each `<ul>` a single key/definition combo is inside one `<li>`, within which there is more markup. Edit the text to include your own app's key combos. It should be pretty self-explanatory when you look at the example markup.



## Technical Info
The script is less than 1KB minified and gzip'd and it has no dependencies.

The content from `question.mark.html` (which also holds all the markup that builds the modal) is loaded via the Fetch API and inserted into the `<body>` element of the page. The modal starts out invisible and is displayed via CSS transitions.

This should work in all browsers that support the Fetch API. If you want older browser support, you'll have to use [version 1.0.0](https://github.com/impressivewebs/QuestionMark.js/tree/v1.0.0/js).



## MIT License

Copyright © 2013 – 2021 by Louis Lazaris

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.