var SETTINGSISe = {
            navBarTravellingISe: false,
            navBarTravelDirectionISe: "",
             navBarTravelDistanceISe: 250
        }

        var colours = {
            0: "#867100",
            1: "#7F4200",
            2: "#99813D",
            3: "#40FEFF",
            4: "#14CC99",
            5: "#00BAFF",
            6: "#0082B2",
            7: "#B25D7A",
            8: "#00FF17",
            9: "#006B49",
            10: "#00B27A",
            11: "#996B3D",
            12: "#CC7014",
            13: "#40FF8C",
            14: "#FF3400",
            15: "#ECBB5E",
            16: "#ECBB0C",
            17: "#B9D912",
            18: "#253A93",
            19: "#125FB9",
        }

        document.documentElement.classList.remove("no-js");
        document.documentElement.classList.add("js");

        // Out advancer buttons
       var pnAdvancerLeftISe = document.getElementById("pnAdvancerLeftISe");
       var pnAdvancerRightISe = document.getElementById("pnAdvancerRightISe");

       // var pnAdvancerLeft = document.getElementsByName("pnAdvancerLeft");
       // var pnAdvancerRight = document.getElementsByName("pnAdvancerRight");

        // the indicator
        var pnIndicatorISe = document.getElementById("pnIndicatorISe");

        var pnProductNavISe = document.getElementById("pnProductNavISe");
        var pnProductNavContentsISe = document.getElementById("pnProductNavContentsISe");

        pnProductNavISe.setAttribute("data-overflowing", determineOverflowISe(pnProductNavContentsISe, pnProductNavISe));

        // Set the indicator
        moveIndicatorISe(pnProductNavISe.querySelector("[aria-selected=\"true\"]"), colours[0]);

        // Handle the scroll of the horizontal container
        var last_known_scroll_positionISe = 0;
        var tickingISe = false;

        function doSomethingISe(scroll_pos) {
            pnProductNavISe.setAttribute("data-overflowing", determineOverflowISe(pnProductNavContentsISe, pnProductNavISe));
        }

        pnProductNavISe.addEventListener("scroll", function() {
            last_known_scroll_positionISe = window.scrollY;
            if (!tickingISe) {
                window.requestAnimationFrame(function() {
                    doSomethingISe(last_known_scroll_positionISe);
                    tickingISe = false;
                });
            }
            tickingISe = true;
        });


        pnAdvancerLeftISe.addEventListener("click", function() {
            // If in the middle of a move return
            if (SETTINGSISe.navBarTravellingISe === true) {
                return;
            }
            // If we have content overflowing both sides or on the left
            if (determineOverflowISe(pnProductNavContentsISe, pnProductNavISe) === "left" || determineOverflowISe(pnProductNavContentsISe, pnProductNavISe) === "both") {
                // Find how far this panel has been scrolled
                var availableScrollLeftISe = pnProductNavISe.scrollLeft;
                // If the space available is less than two lots of our desired distance, just move the whole amount
                // otherwISe, move by the amount in the settings
                if (availableScrollLeftISe < SETTINGSISe.navBarTravelDistanceISe * 2) {
                    pnProductNavContentsISe.style.transform = "translateX(" + availableScrollLeftISe + "px)";
                } else {
                    pnProductNavContentsISe.style.transform = "translateX(" + SETTINGSISe.navBarTravelDistanceISe + "px)";
                }
                // We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
                pnProductNavContentsISe.classList.remove("pn-ProductNav_Contents-no-transitionISe");
                // Update our settings
                SETTINGSISe.navBarTravelDirectionISe = "left";
                SETTINGSISe.navBarTravellingISe = true;
            }
            // Now update the attribute in the DOM
            pnProductNavISe.setAttribute("data-overflowing", determineOverflowISe(pnProductNavContentsISe, pnProductNavISe));
        });

        pnAdvancerRightISe.addEventListener("click", function() {
            // If in the middle of a move return
            if (SETTINGSISe.navBarTravellingISe === true) {
                return;
            }
            // If we have content overflowing both sides or on the right
            if (determineOverflowISe(pnProductNavContentsISe, pnProductNavISe) === "right" || determineOverflowISe(pnProductNavContentsISe, pnProductNavISe) === "both") {
                // Get the right edge of the container and content

                var navBarRightEdgeISe = pnProductNavContentsISe.getBoundingClientRect().right;
                var navBarScrollerRightEdgeISe = pnProductNavISe.getBoundingClientRect().right;
                // Now we know how much space we have available to scroll
                var availableScrollRightISe = Math.floor(navBarRightEdgeISe - navBarScrollerRightEdgeISe);
                // If the space available is less than two lots of our desired distance, just move the whole amount
                // otherwISe, move by the amount in the settings
                if (availableScrollRightISe < SETTINGSISe.navBarTravelDistanceISe * 2) {
                    
                    pnProductNavContentsISe.style.transform = "translateX(-" + availableScrollRightISe + "px)";
                } else {
                    pnProductNavContentsISe.style.transform = "translateX(-" + SETTINGSISe.navBarTravelDistanceISe + "px)";
                }
                // We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
                pnProductNavContentsISe.classList.remove("pn-ProductNav_Contents-no-transitionISe");
                // Update our settings
                SETTINGSISe.navBarTravelDirectionISe = "right";
                SETTINGSISe.navBarTravellingISe = true;
            }
            // Now update the attribute in the DOM
            pnProductNavISe.setAttribute("data-overflowing", determineOverflowISe(pnProductNavContentsISe, pnProductNavISe));
        });

        pnProductNavContentsISe.addEventListener(
            "transitionend",
            function() {
                // get the value of the transform, apply that to the current scroll position (so get the scroll pos first) and then remove the transform
                var styleOfTransformISe = window.getComputedStyle(pnProductNavContentsISe, null);
                var trISe = styleOfTransformISe.getPropertyValue("-webkit-transform") || styleOfTransformISe.getPropertyValue("transform");
                // If there is no transition we want to default to 0 and not null
                var amountISe = Math.abs(parseInt(trISe.split(",")[4]) || 0);
                pnProductNavContentsISe.style.transform = "none";
                pnProductNavContentsISe.classList.add("pn-ProductNav_Contents-no-transitionISe");
                // Now lets set the scroll position
                if (SETTINGSISe.navBarTravelDirectionISe === "left") {
                    pnProductNavISe.scrollLeft = pnProductNavISe.scrollLeft - amountISe;
                } else {
                    pnProductNavISe.scrollLeft = pnProductNavISe.scrollLeft + amountISe;
                }
                SETTINGSISe.navBarTravellingISe = false;
            },
            false
        );

        // Handle setting the currently active link
        pnProductNavContentsISe.addEventListener("click", function(e) {
            var linksISe = [].slice.call(document.querySelectorAll(".pn-ProductNav_LinkISe"));
            linksISe.forEach(function(item) {
                item.setAttribute("aria-selected", "false");
            })
            e.target.setAttribute("aria-selected", "true");
            // Pass the clicked item and it's colour to the move indicator function
            moveIndicatorISe(e.target, colours[links.indexOf(e.target)]);
        });

        // var count = 0;
        function moveIndicatorISe(item, color) {
            var textPosition = item.getBoundingClientRect();
            var container = pnProductNavContentsISe.getBoundingClientRect().left;
            var distance = textPosition.left - container;
             var scroll = pnProductNavContentsISe.scrollLeft;
            pnIndicatorISe.style.transform = "translateX(" + (distance + scroll) + "px) scaleX(" + textPosition.width * 0.01 + ")";
            // count = count += 100;
            // pnIndicator.style.transform = "translateX(" + count + "px)";
            
           /* if (color) {
                pnIndicatorISe.style.backgroundColor = color;
            }*/
        }

        function determineOverflowISe(content, container) {
            var containerMetrics = container.getBoundingClientRect();
            var containerMetricsRight = Math.floor(containerMetrics.right);
            var containerMetricsLeft = Math.floor(containerMetrics.left);
            var contentMetrics = content.getBoundingClientRect();
            var contentMetricsRight = Math.floor(contentMetrics.right);
            var contentMetricsLeft = Math.floor(contentMetrics.left);
             if (containerMetricsLeft > contentMetricsLeft && (containerMetricsRight+1) < contentMetricsRight) {
                return "both";
            } else if (contentMetricsLeft < containerMetricsLeft) {
                return "left";
            } else if (contentMetricsRight > containerMetricsRight) {
                return "right";
            } else {
                return "none";
            }
        }

        /**
         * @fileoverview dragscroll - scroll area by dragging
         * @version 0.0.8
         * 
         * @license MIT, see http://github.com/asvd/dragscroll
         * @copyright 2015 asvd <heliosframework@gmail.com> 
         */


        (function (root, factory) {
            if (typeof define === 'function' && define.amd) {
                define(['exports'], factory);
            } else if (typeof exports !== 'undefined') {
                factory(exports);
            } else {
                factory((root.dragscroll = {}));
            }
        }(this, function (exports) {
            var _window = window;
            var _document = document;
            var mousemove = 'mousemove';
            var mouseup = 'mouseup';
            var mousedown = 'mousedown';
            var EventListener = 'EventListener';
            var addEventListener = 'add'+EventListener;
            var removeEventListener = 'remove'+EventListener;
            var newScrollX, newScrollY;

            var dragged = [];
            var reset = function(i, el) {
                for (i = 0; i < dragged.length;) {
                    el = dragged[i++];
                    el = el.container || el;
                    el[removeEventListener](mousedown, el.md, 0);
                    _window[removeEventListener](mouseup, el.mu, 0);
                    _window[removeEventListener](mousemove, el.mm, 0);
                }

                // cloning into array since HTMLCollection is updated dynamically
                dragged = [].slice.call(_document.getElementsByClassName('dragscroll'));
                for (i = 0; i < dragged.length;) {
                    (function(el, lastClientX, lastClientY, pushed, scroller, cont){
                        (cont = el.container || el)[addEventListener](
                            mousedown,
                            cont.md = function(e) {
                                if (!el.hasAttribute('nochilddrag') ||
                                    _document.elementFromPoint(
                                        e.pageX, e.pageY
                                    ) == cont
                                ) {
                                    pushed = 1;
                                    lastClientX = e.clientX;
                                    lastClientY = e.clientY;

                                    e.preventDefault();
                                }
                            }, 0
                        );

                        _window[addEventListener](
                            mouseup, cont.mu = function() {pushed = 0;}, 0
                        );

                        _window[addEventListener](
                            mousemove,
                            cont.mm = function(e) {
                                if (pushed) {
                                    (scroller = el.scroller||el).scrollLeft -=
                                        newScrollX = (- lastClientX + (lastClientX=e.clientX));
                                    scroller.scrollTop -=
                                        newScrollY = (- lastClientY + (lastClientY=e.clientY));
                                    if (el == _document.body) {
                                        (scroller = _document.documentElement).scrollLeft -= newScrollX;
                                        scroller.scrollTop -= newScrollY;
                                    }
                                }
                            }, 0
                        );
                     })(dragged[i++]);
                }
            }

              
            if (_document.readyState == 'complete') {
                reset();
            } else {
                _window[addEventListener]('load', reset, 0);
            }

            exports.reset = reset;
        }));
