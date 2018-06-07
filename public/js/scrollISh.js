var SETTINGSISh = {
            navBarTravellingISh: false,
            navBarTravelDirectionISh: "",
             navBarTravelDistanceISh: 150
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
       var pnAdvancerLeftISh = document.getElementById("pnAdvancerLeftISh");
       var pnAdvancerRightISh = document.getElementById("pnAdvancerRightISh");

       // var pnAdvancerLeft = document.getElementsByName("pnAdvancerLeft");
       // var pnAdvancerRight = document.getElementsByName("pnAdvancerRight");

        // the indicator
        var pnIndicatorISh = document.getElementById("pnIndicatorISh");

        var pnProductNavISh = document.getElementById("pnProductNavISh");
        var pnProductNavContentsISh = document.getElementById("pnProductNavContentsISh");

        pnProductNavISh.setAttribute("data-overflowing", determineOverflowISh(pnProductNavContentsISh, pnProductNavISh));

        // Set the indicator
        moveIndicatorISh(pnProductNavISh.querySelector("[aria-selected=\"true\"]"), colours[0]);

        // Handle the scroll of the horizontal container
        var last_known_scroll_positionISh = 0;
        var tickingISh = false;

        function doSomethingISh(scroll_pos) {
            pnProductNavISh.setAttribute("data-overflowing", determineOverflowISh(pnProductNavContentsISh, pnProductNavISh));
        }

        pnProductNavISh.addEventListener("scroll", function() {
            last_known_scroll_positionISh = window.scrollY;
            if (!tickingISh) {
                window.requestAnimationFrame(function() {
                    doSomethingISh(last_known_scroll_positionISh);
                    tickingISh = false;
                });
            }
            tickingISh = true;
        });


        pnAdvancerLeftISh.addEventListener("click", function() {
            // If in the middle of a move return
            if (SETTINGSISh.navBarTravellingISh === true) {
                return;
            }
            // If we have content overflowing both sides or on the left
            if (determineOverflowISh(pnProductNavContentsISh, pnProductNavISh) === "left" || determineOverflowISh(pnProductNavContentsISh, pnProductNavISh) === "both") {
                // Find how far this panel has been scrolled
                var availableScrollLeftISh = pnProductNavISh.scrollLeft;
                // If the space available is less than two lots of our desired distance, just move the whole amount
                // otherwise, move by the amount in the settings
                if (availableScrollLeftISh < SETTINGSISh.navBarTravelDistanceISh * 2) {
                    pnProductNavContentsISh.style.transform = "translateX(" + availableScrollLeftISh + "px)";
                } else {
                    pnProductNavContentsISh.style.transform = "translateX(" + SETTINGSISh.navBarTravelDistanceISh + "px)";
                }
                // We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
                pnProductNavContentsISh.classList.remove("pn-ProductNav_Contents-no-transitionISh");
                // Update our settings
                SETTINGSISh.navBarTravelDirectionISh = "left";
                SETTINGSISh.navBarTravellingISh = true;
            }
            // Now update the attribute in the DOM
            pnProductNavISh.setAttribute("data-overflowing", determineOverflowISh(pnProductNavContentsISh, pnProductNavISh));
        });

        pnAdvancerRightISh.addEventListener("click", function() {
            // If in the middle of a move return
            if (SETTINGSISh.navBarTravellingISh === true) {
                return;
            }
            // If we have content overflowing both sides or on the right
            if (determineOverflowISh(pnProductNavContentsISh, pnProductNavISh) === "right" || determineOverflowISh(pnProductNavContentsISh, pnProductNavISh) === "both") {
                // Get the right edge of the container and content

                var navBarRightEdgeISh = pnProductNavContentsISh.getBoundingClientRect().right;
                var navBarScrollerRightEdgeISh = pnProductNavISh.getBoundingClientRect().right;
                // Now we know how much space we have available to scroll
                var availableScrollRightISh = Math.floor(navBarRightEdgeISh - navBarScrollerRightEdgeISh);
                // If the space available is less than two lots of our desired distance, just move the whole amount
                // otherwise, move by the amount in the settings
                if (availableScrollRightISh < SETTINGSISh.navBarTravelDistanceISh * 2) {
                    pnProductNavContentsISh.style.transform = "translateX(-" + availableScrollRightISh + "px)";
                } else {
                    pnProductNavContentsISh.style.transform = "translateX(-" + SETTINGSISh.navBarTravelDistanceISh + "px)";
                }
                // We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
                pnProductNavContentsISh.classList.remove("pn-ProductNav_Contents-no-transitionISh");
                // Update our settings
                SETTINGSISh.navBarTravelDirectionISh = "right";
                SETTINGSISh.navBarTravellingISh = true;
            }
            // Now update the attribute in the DOM
            pnProductNavISh.setAttribute("data-overflowing", determineOverflowISh(pnProductNavContentsISh, pnProductNavISh));
        });

        pnProductNavContentsISh.addEventListener(
            "transitionend",
            function() {
                // get the value of the transform, apply that to the current scroll position (so get the scroll pos first) and then remove the transform
                var styleOfTransformISh = window.getComputedStyle(pnProductNavContentsISh, null);
                var trISh = styleOfTransformISh.getPropertyValue("-webkit-transform") || styleOfTransformISh.getPropertyValue("transform");
                // If there is no transition we want to default to 0 and not null
                var amountISh = Math.abs(parseInt(trISh.split(",")[4]) || 0);
                pnProductNavContentsISh.style.transform = "none";
                pnProductNavContentsISh.classList.add("pn-ProductNav_Contents-no-transitionISh");
                // Now lets set the scroll position
                if (SETTINGSISh.navBarTravelDirectionISh === "left") {
                    pnProductNavISh.scrollLeft = pnProductNavISh.scrollLeft - amountISh;
                } else {
                    pnProductNavISh.scrollLeft = pnProductNavISh.scrollLeft + amountISh;
                }
                SETTINGSISh.navBarTravellingISh = false;
            },
            false
        );

        // Handle setting the currently active link
        pnProductNavContentsISh.addEventListener("click", function(e) {
            var linksISh = [].slice.call(document.querySelectorAll(".pn-ProductNav_LinkISh"));
            linksISh.forEach(function(item) {
                item.setAttribute("aria-selected", "false");
            })
            e.target.setAttribute("aria-selected", "true");
            // Pass the clicked item and it's colour to the move indicator function
            moveIndicatorISh(e.target, colours[links.indexOf(e.target)]);
        });

        // var count = 0;
        function moveIndicatorISh(item, color) {
            var textPosition = item.getBoundingClientRect();
            var container = pnProductNavContentsISh.getBoundingClientRect().left;
            var distance = textPosition.left - container;
             var scroll = pnProductNavContentsISh.scrollLeft;
            pnIndicatorISh.style.transform = "translateX(" + (distance + scroll) + "px) scaleX(" + textPosition.width * 0.01 + ")";
            // count = count += 100;
            // pnIndicator.style.transform = "translateX(" + count + "px)";
            
          /*  if (color) {
                pnIndicatorISh.style.backgroundColor = color;
            }*/
        }

        function determineOverflowISh(content, container) {
            var containerMetrics = container.getBoundingClientRect();
            var containerMetricsRight = Math.floor(containerMetrics.right);
            var containerMetricsLeft = Math.floor(containerMetrics.left);
            var contentMetrics = content.getBoundingClientRect();
            var contentMetricsRight = Math.floor(contentMetrics.right);
            var contentMetricsLeft = Math.floor(contentMetrics.left);
             if (containerMetricsLeft > contentMetricsLeft && (containerMetricsRight) < contentMetricsRight) {
               
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
