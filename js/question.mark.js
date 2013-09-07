/*
    QuestionMark.js by Louis Lazaris
    http://impressivewebs.github.io/QuestionMark.js/
    Use it for whatever you want, no credit needed.
    This script should work everywhere, including IE8.
    If you want IE8 support, include the following 
    polyfill for addEventListener() at the top:
    https://gist.github.com/jonathantneal/2415137
    (included in the repo as attachevent.js).
    This would probably work in IE6/7 if you find a
    polyfill or alternate method for querySelector.
*/

(function () {

    'use strict';

    function removeModal(helpUnderlay) {
        helpUnderlay.className = helpUnderlay.className.replace(/help-isVisible*/g, '');
        helpUnderlay.className = helpUnderlay.className.trim();
    }

    function doQuestionMark() {

        var helpUnderlay = document.getElementById('helpUnderlay'),
            helpModal = document.getElementById('helpModal'),
            helpClose = document.getElementById('helpClose'),
            helpListWrap = document.getElementById('helpListWrap'),
            helpList = document.querySelector('.help-list'),
            helpLists = document.querySelectorAll('.help-list'),
            helpColsTotal = 0,
            helpListsHeights = [],
            charCode, charStr, classCol, i, maxHeight;

        function getWindowWidth() {
            var w = window,
                d = document,
                e = d.documentElement,
                g = d.getElementsByTagName('body')[0],
                x = w.innerWidth || e.clientWidth || g.clientWidth;
                //y = w.innerHeight || e.clientHeight || g.clientHeight;
            return x;
        }

        // Find out how many columns there are, create array of heights
        for (i = 0; i < helpLists.length; i += 1) {
            if (helpLists[i].className.indexOf('help-list') !== -1) {
                helpColsTotal += 1;
            }
            helpListsHeights[i] = helpLists[i].offsetHeight;
        }

        // get the tallest column from the array of heights
        maxHeight = Math.max.apply(Math, helpListsHeights);

        // Quasi-responsive
        if (getWindowWidth() <= 1180 && getWindowWidth() > 630 && helpColsTotal > 2) {
            helpColsTotal = 2;
            maxHeight = maxHeight * helpColsTotal;
        }

        if (getWindowWidth() <= 630) {
            maxHeight = maxHeight * helpColsTotal;
            helpColsTotal = 1;
        }

        // Change the width/height of the modal and wrapper to fit the columns
        // Sorry for the magic numbers. Whatevs.
        helpListWrap.style.offsetWidth = (helpList.offsetWidth * helpColsTotal) + 'px';
        helpListWrap.style.height = maxHeight + 'px';
        helpModal.style.width = (helpList.offsetWidth * helpColsTotal) + 60 + 'px';
        helpModal.style.height = maxHeight + 100 + 'px';

        document.addEventListener('keypress', function (e) {
            // find which key was pressed
            e = e || window.event;
            charCode = e.keyCode || e.which;
            charStr = String.fromCharCode(charCode);

            // 63 = '?' key
            // '?' key toggles the modal
            if (charCode === 63) {
                classCol = document.getElementById('helpUnderlay').className;
                if (classCol.indexOf('help-isVisible') === -1) {
                    document.getElementById('helpUnderlay').className += ' help-isVisible';
                }

            }

        }, false);

        document.addEventListener('keyup', function (e) {
            // find which key was pressed
            e = e || window.event;
            charCode = e.keyCode || e.which;
            charStr = String.fromCharCode(charCode);

            // 27 = ESC key
            if (charCode === 27) {
                removeModal(helpUnderlay);
            }
        }, false);

        // Modal is removed if the background is clicked
        helpUnderlay.addEventListener('click', function () {
            removeModal(helpUnderlay);
        }, false);

        helpModal.addEventListener('click', function (e) {
            // this prevents click on modal from removing the modal
            e.stopPropagation();
        }, false);

        // the close button
        helpClose.addEventListener('click', function () {
            removeModal(helpUnderlay);
        }, false);

    }

    function getXhrObject() {
        var xhrObject = false;
        // All browsers (except IE6) use the 3 lines below
        if (window.XMLHttpRequest) {
            xhrObject = new XMLHttpRequest();
        }
        // If you need IE6 support, uncomment the following else/if:
        /*else if (window.ActiveXObject) {
            try {
                    xhrObject = new ActiveXObject("Msxml2.XMLHTTP");
                } catch(err) {
                    try {
                        xhrObject = new ActiveXObject("Microsoft.XMLHTTP");
                    } catch(err) {
                        xhrObject = false;
                    }
            }
        }*/
        return xhrObject;
    }

    function insertHelp(respText, callback) {
        // Opera kept inserting the content multiple times
        // so I added a check to insert it just once... bug??
        if (!document.getElementById('helpUnderlay')) {
            document.getElementsByTagName('body')[0].innerHTML += respText;
            callback();
        }
    }

    function checkServerResponse(ajaxCapable) {
        if (ajaxCapable.readyState === 4) {
            if (ajaxCapable.status === 200 || ajaxCapable.status === 304) {
                var respText = ajaxCapable.responseText;
                // here's where the help modal is inserted
                insertHelp(respText, function () {
                    doQuestionMark();
                });
            }
        }
    }

    function doAjax() {
        var ajaxCapable = getXhrObject();
        if (ajaxCapable) {
            ajaxCapable.onreadystatechange = function () {
                checkServerResponse(ajaxCapable);
            };
            ajaxCapable.open("POST", "question.mark.html", true);
            ajaxCapable.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            ajaxCapable.send(null);
        } else {
            // Browser does not support ajax
            document.getElementsByTagName('body')[0].innerHTML += 'Your browser does not support Ajax';
        }
    }

    // This fires all the Ajax stuff,
    // so the content is ready to be accessed
    doAjax();

    // If the window is resized, the main function runs again, to resize the content.
    // If your menu includes only a single column of keyboard shortcuts,
    // then you won't need this. Remove it unless you have 2 columns or more.
    var timeOut = null;
    window.onresize = function () {
        if (timeOut !== null) {
            clearTimeout(timeOut);
        }
        timeOut = setTimeout(doQuestionMark, 100);
    };

}());
