var SETTINGSCG = {
            navBarTravellingCG: false,
            navBarTravelDirectionCG: "",
             navBarTravelDistanceCG: 150
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
       var pnAdvancerLeftCG = document.getElementById("pnAdvancerLeftCG");
       var pnAdvancerRightCG = document.getElementById("pnAdvancerRightCG");

       // var pnAdvancerLeft = document.getElementsByName("pnAdvancerLeft");
       // var pnAdvancerRight = document.getElementsByName("pnAdvancerRight");

        // the indicator
        var pnIndicatorCG = document.getElementById("pnIndicatorCG");

        var pnProductNavCG = document.getElementById("pnProductNavCG");
        var pnProductNavContentsCG = document.getElementById("pnProductNavContentsCG");

        pnProductNavCG.setAttribute("data-overflowing", determineOverflowCG(pnProductNavContentsCG, pnProductNavCG));

        // Set the indicator
        moveIndicatorCG(pnProductNavCG.querySelector("[aria-selected=\"true\"]"), colours[0]);

        // Handle the scroll of the horizontal container
        var last_known_scroll_positionCG = 0;
        var tickingCG = false;

        function doSomethingCG(scroll_pos) {
            pnProductNavCG.setAttribute("data-overflowing", determineOverflowCG(pnProductNavContentsCG, pnProductNavCG));
        }

        pnProductNavCG.addEventListener("scroll", function() {
            last_known_scroll_positionCG = window.scrollY;
            if (!tickingCG) {
                window.requestAnimationFrame(function() {
                    doSomethingCG(last_known_scroll_positionCG);
                    tickingCG = false;
                });
            }
            tickingCG = true;
        });


        pnAdvancerLeftCG.addEventListener("click", function() {
            // If in the middle of a move return
            if (SETTINGSCG.navBarTravellingCG === true) {
                return;
            }
            // If we have content overflowing both sides or on the left
            if (determineOverflowCG(pnProductNavContentsCG, pnProductNavCG) === "left" || determineOverflowCG(pnProductNavContentsCG, pnProductNavCG) === "both") {
                // Find how far this panel has been scrolled
                var availableScrollLeftCG = pnProductNavCG.scrollLeft;
                // If the space available is less than two lots of our desired distance, just move the whole amount
                // otherwise, move by the amount in the settings
                if (availableScrollLeftCG < SETTINGSCG.navBarTravelDistanceCG * 2) {
                    pnProductNavContentsCG.style.transform = "translateX(" + availableScrollLeftCG + "px)";
                } else {
                    pnProductNavContentsCG.style.transform = "translateX(" + SETTINGSCG.navBarTravelDistanceCG + "px)";
                }
                // We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
                pnProductNavContentsCG.classList.remove("pn-ProductNav_Contents-no-transitionCG");
                // Update our settings
                SETTINGSCG.navBarTravelDirectionCG = "left";
                SETTINGSCG.navBarTravellingCG = true;
            }
            // Now update the attribute in the DOM
            pnProductNavCG.setAttribute("data-overflowing", determineOverflowCG(pnProductNavContentsCG, pnProductNavCG));
        });

        pnAdvancerRightCG.addEventListener("click", function() {
            // If in the middle of a move return
            if (SETTINGSCG.navBarTravellingCG === true) {
                return;
            }
            // If we have content overflowing both sides or on the right
            if (determineOverflowCG(pnProductNavContentsCG, pnProductNavCG) === "right" || determineOverflowCG(pnProductNavContentsCG, pnProductNavCG) === "both") {
                // Get the right edge of the container and content

                var navBarRightEdgeCG = pnProductNavContentsCG.getBoundingClientRect().right;
                var navBarScrollerRightEdgeCG = pnProductNavCG.getBoundingClientRect().right;
                // Now we know how much space we have available to scroll
                var availableScrollRightCG = Math.floor(navBarRightEdgeCG - navBarScrollerRightEdgeCG);
                // If the space available is less than two lots of our desired distance, just move the whole amount
                // otherwise, move by the amount in the settings
                if (availableScrollRightCG < SETTINGSCG.navBarTravelDistanceCG * 2) {
                    pnProductNavContentsCG.style.transform = "translateX(-" + availableScrollRightCG + "px)";
                } else {
                    pnProductNavContentsCG.style.transform = "translateX(-" + SETTINGSCG.navBarTravelDistanceCG + "px)";
                }
                // We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
                pnProductNavContentsCG.classList.remove("pn-ProductNav_Contents-no-transitionCG");
                // Update our settings
                SETTINGSCG.navBarTravelDirectionCG = "right";
                SETTINGSCG.navBarTravellingCG = true;
            }
            // Now update the attribute in the DOM
            pnProductNavCG.setAttribute("data-overflowing", determineOverflowCG(pnProductNavContentsCG, pnProductNavCG));
        });

        pnProductNavContentsCG.addEventListener(
            "transitionend",
            function() {
                // get the value of the transform, apply that to the current scroll position (so get the scroll pos first) and then remove the transform
                var styleOfTransformCG = window.getComputedStyle(pnProductNavContentsCG, null);
                var trCG = styleOfTransformCG.getPropertyValue("-webkit-transform") || styleOfTransformCG.getPropertyValue("transform");
                // If there is no transition we want to default to 0 and not null
                var amountCG = Math.abs(parseInt(trCG.split(",")[4]) || 0);
                pnProductNavContentsCG.style.transform = "none";
                pnProductNavContentsCG.classList.add("pn-ProductNav_Contents-no-transitionCG");
                // Now lets set the scroll position
                if (SETTINGSCG.navBarTravelDirectionCG === "left") {
                    pnProductNavCG.scrollLeft = pnProductNavCG.scrollLeft - amountCG;
                } else {
                    pnProductNavCG.scrollLeft = pnProductNavCG.scrollLeft + amountCG;
                }
                SETTINGSCG.navBarTravellingCG = false;
            },
            false
        );

        // Handle setting the currently active link
        pnProductNavContentsCG.addEventListener("click", function(e) {
            var linksCG = [].slice.call(document.querySelectorAll(".pn-ProductNav_LinkCG"));
            linksCG.forEach(function(item) {
                item.setAttribute("aria-selected", "false");
            })
            e.target.setAttribute("aria-selected", "true");
            // Pass the clicked item and it's colour to the move indicator function
            moveIndicatorCG(e.target, colours[links.indexOf(e.target)]);
        });

        // var count = 0;
        function moveIndicatorCG(item, color) {
            var textPosition = item.getBoundingClientRect();
            var container = pnProductNavContentsCG.getBoundingClientRect().left;
            var distance = textPosition.left - container;
             var scroll = pnProductNavContentsCG.scrollLeft;
            pnIndicatorCG.style.transform = "translateX(" + (distance + scroll) + "px) scaleX(" + textPosition.width * 0.01 + ")";
            // count = count += 100;
            // pnIndicator.style.transform = "translateX(" + count + "px)";
            
          /*  if (color) {
                pnIndicatorCG.style.backgroundColor = color;
            }*/
        }

        function determineOverflowCG(content, container) {
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
