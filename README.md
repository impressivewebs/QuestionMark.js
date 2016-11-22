# QuestionMark.js

When the user pushes the `?` key, QuestionMark.js triggers a modal window that displays keyboard shortcuts for your app &mdash; similar to what happens on Twitter, Gmail, GitHub, etc. [Hat tip to Robert Nyman](https://plus.google.com/u/0/118100898483063383963/posts/V12mRNmsiWg). The modal is removed when the `ESC` key is pushed or the user clicks behind the modal.

I think every app that has keyboard shortcuts should do this. This could also be a generic 'help' menu for the app, but that would require some tweaking to the code and the CSS. For now, this works primarily as a shortcut keys menu.

[View a demo here](http://www.impressivewebs.com/demo-files/question-mark-js/)

## Instructions
To make it work, it's pretty simple. Link the CSS file in the `<head>` and run the script on page load (or at the bottom). Make sure all the mandatory files are included (`question.mark.html`, `question.mark.css`, and `question.mark.js`).

To customize, edit the `question.mark.html` file to include your own keyboard shortcuts. For each `<ul>` included with a class of `help-list`, a new column will be created. If you want a single column, use a single `<ul>`. Longer columns will scroll vertically.

Within each `<ul>` a single key/definition combo is inside one `<li>`, within which there is more markup. Edit the text to include your own app's key combos. It should be pretty self-explanatory when you look at the example markup.

If you have only one column of keyboard shortcuts, then you should remove the `onwindowresize` section of code.

## Technical Info
The script is about 2KB minified and gzip'd and it has no dependencies. It's also more or less responsive (doing this via JavaScript).

The content from `question.mark.html` (which also holds all the markup that builds the modal) is loaded via Ajax and inserted into the `<body>` element of the page. The modal starts out invisible and is displayed via CSS transitions. Browsers that don't support transitions will display it instantly with no transition.

The script also uses `window.onresize` to manage width/height of the modal, which can have performance issues. If you find this is slowing down your app, just comment out the part of the code that looks for the window resize. The drawback to this is that it will display at full size on a small window. Of course, if you only have a small single column of keyboard shortcuts, you won't need the `window.onresize` part, so, as mentioned above, just remove it.

## Browser Support
This should work in all the normal browsers and IE8+. No IE6/7 support. If you want IE8 support, include attachevent.js before question.mark.js.

## Bugs? Suggestion?
The script is pretty new and I'm sure there will be reported issues and whatnot, so feel free to fork it and make it better. I don't know of any other scripts like this one, so you can help optimize the code and make this the go-to standard for including a shortcut key menu in web apps!

## Demo Page
For a demo of QuestionMark.js, [go here](http://www.impressivewebs.com/demo-files/question-mark-js/).

## MIT License

Copyright © 2013 by Louis Lazaris

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