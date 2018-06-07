var SETTINGSIG = {
            navBarTravellingIG: false,
            navBarTravelDirectionIG: "",
            navBarTravelDistanceIG: 335,
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
       var pnAdvancerLeftIG = document.getElementById("pnAdvancerLeftIG");
       var pnAdvancerRightIG = document.getElementById("pnAdvancerRightIG");

       // var pnAdvancerLeft = document.getElementsByName("pnAdvancerLeft");
       // var pnAdvancerRight = document.getElementsByName("pnAdvancerRight");

        // the indicator
        var pnIndicatorIG = document.getElementById("pnIndicatorIG");

        var pnProductNavIG = document.getElementById("pnProductNavIG");
        var pnProductNavContentsIG = document.getElementById("pnProductNavContentsIG");

        pnProductNavIG.setAttribute("data-overflowing", determineOverflowIG(pnProductNavContentsIG, pnProductNavIG));

        // Set the indicator
        moveIndicatorIG(pnProductNavIG.querySelector("[aria-selected=\"true\"]"), colours[0]);

        // Handle the scroll of the horizontal container
        var last_known_scroll_positionIG = 0;
        var tickingIG = false;

        function doSomethingIG(scroll_pos) {
            pnProductNavIG.setAttribute("data-overflowing", determineOverflowIG(pnProductNavContentsIG, pnProductNavIG));
        }

        pnProductNavIG.addEventListener("scroll", function() {
            last_known_scroll_positionIG = window.scrollY;
            if (!tickingIG) {
                window.requestAnimationFrame(function() {
                    doSomethingIG(last_known_scroll_positionIG);
                    tickingIG = false;
                });
            }
            tickingIG = true;
        });


        pnAdvancerLeftIG.addEventListener("click", function() {
            // If in the middle of a move return
            if (SETTINGSIG.navBarTravellingIG === true) {
                return;
            }
            // If we have content overflowing both sides or on the left
            if (determineOverflowIG(pnProductNavContentsIG, pnProductNavIG) === "left" || determineOverflowIG(pnProductNavContentsIG, pnProductNavIG) === "both") {
                // Find how far this panel has been scrolled
                var availableScrollLeftIG = pnProductNavIG.scrollLeft;
                // If the space available is less than two lots of our desired distance, just move the whole amount
                // otherwIG, move by the amount in the settings
                if (availableScrollLeftIG < SETTINGSIG.navBarTravelDistanceIG * 2) {
                    pnProductNavContentsIG.style.transform = "translateX(" + availableScrollLeftIG + "px)";
                } else {
                    pnProductNavContentsIG.style.transform = "translateX(" + SETTINGSIG.navBarTravelDistanceIG + "px)";
                }
                // We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
                pnProductNavContentsIG.classList.remove("pn-ProductNav_Contents-no-transitionIG");
                // Update our settings
                SETTINGSIG.navBarTravelDirectionIG = "left";
                SETTINGSIG.navBarTravellingIG = true;
            }
            // Now update the attribute in the DOM
            pnProductNavIG.setAttribute("data-overflowing", determineOverflowIG(pnProductNavContentsIG, pnProductNavIG));
        });

        pnAdvancerRightIG.addEventListener("click", function() {
            // If in the middle of a move return
            if (SETTINGSIG.navBarTravellingIG === true) {
                return;
            }
            // If we have content overflowing both sides or on the right
            if (determineOverflowIG(pnProductNavContentsIG, pnProductNavIG) === "right" || determineOverflowIG(pnProductNavContentsIG, pnProductNavIG) === "both") {
                // Get the right edge of the container and content

                var navBarRightEdgeIG = pnProductNavContentsIG.getBoundingClientRect().right;
                var navBarScrollerRightEdgeIG = pnProductNavIG.getBoundingClientRect().right;
                // Now we know how much space we have available to scroll
                var availableScrollRightIG = Math.floor(navBarRightEdgeIG - navBarScrollerRightEdgeIG);
                // If the space available is less than two lots of our desired distance, just move the whole amount
                // otherwIG, move by the amount in the settings
                if (availableScrollRightIG < SETTINGSIG.navBarTravelDistanceIG * 2) {
                    
                    pnProductNavContentsIG.style.transform = "translateX(-" + availableScrollRightIG + "px)";
                } else {
                    pnProductNavContentsIG.style.transform = "translateX(-" + SETTINGSIG.navBarTravelDistanceIG + "px)";
                }
                // We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
                pnProductNavContentsIG.classList.remove("pn-ProductNav_Contents-no-transitionIG");
                // Update our settings
                SETTINGSIG.navBarTravelDirectionIG = "right";
                SETTINGSIG.navBarTravellingIG = true;
            }
            // Now update the attribute in the DOM
            pnProductNavIG.setAttribute("data-overflowing", determineOverflowIG(pnProductNavContentsIG, pnProductNavIG));
        });

        pnProductNavContentsIG.addEventListener(
            "transitionend",
            function() {
                // get the value of the transform, apply that to the current scroll position (so get the scroll pos first) and then remove the transform
                var styleOfTransformIG = window.getComputedStyle(pnProductNavContentsIG, null);
                var trIG = styleOfTransformIG.getPropertyValue("-webkit-transform") || styleOfTransformIG.getPropertyValue("transform");
                // If there is no transition we want to default to 0 and not null
                var amountIG = Math.abs(parseInt(trIG.split(",")[4]) || 0);
                pnProductNavContentsIG.style.transform = "none";
                pnProductNavContentsIG.classList.add("pn-ProductNav_Contents-no-transitionIG");
                // Now lets set the scroll position
                if (SETTINGSIG.navBarTravelDirectionIG === "left") {
                    pnProductNavIG.scrollLeft = pnProductNavIG.scrollLeft - amountIG;
                } else {
                    pnProductNavIG.scrollLeft = pnProductNavIG.scrollLeft + amountIG;
                }
                SETTINGSIG.navBarTravellingIG = false;
            },
            false
        );

        // Handle setting the currently active link
        pnProductNavContentsIG.addEventListener("click", function(e) {
            var linksIG = [].slice.call(document.querySelectorAll(".pn-ProductNav_LinkIG"));
            linksIG.forEach(function(item) {
                item.setAttribute("aria-selected", "false");
            })
            e.target.setAttribute("aria-selected", "true");
            // Pass the clicked item and it's colour to the move indicator function
            moveIndicatorIG(e.target, colours[links.indexOf(e.target)]);
        });

        // var count = 0;
        function moveIndicatorIG(item, color) {
            console.log('Inside moveIndicatorIG');
            var textPosition = item.getBoundingClientRect();
            var container = pnProductNavContentsIG.getBoundingClientRect().left;
            var distance = textPosition.left - container;
             var scroll = pnProductNavContentsIG.scrollLeft;
            pnIndicatorIG.style.transform = "translateX(" + (distance + scroll) + "px) scaleX(" + textPosition.width * 0.01 + ")";
            // count = count += 100;
            // pnIndicator.style.transform = "translateX(" + count + "px)";
            
           /* if (color) {
                pnIndicatorIG.style.backgroundColor = color;
            }*/
        }

        function determineOverflowIG(content, container) {
            var containerMetrics = container.getBoundingClientRect();
            var containerMetricsRight = Math.floor(containerMetrics.right);
            var containerMetricsLeft = Math.floor(containerMetrics.left);
            var contentMetrics = content.getBoundingClientRect();
            var contentMetricsRight = Math.floor(contentMetrics.right);
            var contentMetricsLeft = Math.floor(contentMetrics.left);
            console.log('Hi, I am being called');
             if (containerMetricsLeft > contentMetricsLeft && (containerMetricsRight+1) < contentMetricsRight) {
                 console.log('containermetricsRight is'+containerMetricsRight);
                console.log('contentMetricsRight is'+contentMetricsRight);
                console.log("Its both");
                return "both";
            } else if (contentMetricsLeft < containerMetricsLeft) {
                 console.log('containermetricsRight is'+containerMetricsRight);
                console.log('contentMetricsRight is'+contentMetricsRight);
                console.log("Its left");
                return "left";
            } else if (contentMetricsRight > containerMetricsRight) {
                console.log('Its right');
                return "right";
            } else {
                console.log('Its none');
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
