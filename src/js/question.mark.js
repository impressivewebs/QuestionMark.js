/*
  QuestionMark.js 2.0 by Louis Lazaris
  http://impressivewebs.github.io/QuestionMark.js/
  Use it for whatever you want, no credit needed.
  This script should work everywhere, including IE9+.
*/

(function (d) {
  'use strict';

  function removeModal(helpUnderlay) {
    helpUnderlay.classList.remove('help-isVisible');
  }

  function doWhichKey(e) {
    let charCode = e.keyCode;
    // String.fromCharCode(charCode) gets the keycode if you want
    return charCode;
  }

  // Primary function, called in checkServerResponse()
  function doQuestionMark() {
    let helpUnderlay = d.getElementById('helpUnderlay'),
        helpModal = d.getElementById('helpModal'),
        helpClose = d.getElementById('helpClose'),
        classCol;

    d.addEventListener('keydown', function (e) {
      // 191 = '?' key
      // '?' key toggles the modal
      if (doWhichKey(e) === 191 && e.shiftKey === true) {
        helpUnderlay.classList.add('help-isVisible');
      }
    }, false);

    d.addEventListener('keyup', function (e) {
      // 27 = ESC key
      if (doWhichKey(e) === 27) {
        removeModal(helpUnderlay);
      }
    }, false);

    // Modal is removed if the background is clicked
    helpUnderlay.addEventListener('click', function () {
      removeModal(helpUnderlay);
    }, false);

    // this prevents click on modal from removing the modal
    helpModal.addEventListener('click', function (e) {
      e.stopPropagation();
    }, false);

    // the close button
    helpClose.addEventListener('click', function () {
      removeModal(helpUnderlay);
    }, false);
  }

  function doFetch() {
    fetch('question.mark.html')
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        d.body.innerHTML += data;
        doQuestionMark();
      });
  }

  // This fires the Fetch request and, in turn,
  // the primary function for the modal.
  doFetch();
}(document));