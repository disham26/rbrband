var SETTINGSCSh = {
            navBarTravellingCSh: false,
            navBarTravelDirectionCSh: "",
             navBarTravelDistanceCSh: 335
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
       var pnAdvancerLeftCSh = document.getElementById("pnAdvancerLeftCSh");
       var pnAdvancerRightCSh = document.getElementById("pnAdvancerRightCSh");

       // var pnAdvancerLeft = document.getElementsByName("pnAdvancerLeft");
       // var pnAdvancerRight = document.getElementsByName("pnAdvancerRight");

        // the indicator
        var pnIndicatorCSh = document.getElementById("pnIndicatorCSh");

        var pnProductNavCSh = document.getElementById("pnProductNavCSh");
        var pnProductNavContentsCSh = document.getElementById("pnProductNavContentsCSh");

        pnProductNavCSh.setAttribute("data-overflowing", determineOverflowCSh(pnProductNavContentsCSh, pnProductNavCSh));

        // Set the indicator
        moveIndicatorCSh(pnProductNavCSh.querySelector("[aria-selected=\"true\"]"), colours[0]);

        // Handle the scroll of the horizontal container
        var last_known_scroll_positionCSh = 0;
        var tickingCSh = false;

        function doSomethingCSh(scroll_pos) {
            pnProductNavCSh.setAttribute("data-overflowing", determineOverflowCSh(pnProductNavContentsCSh, pnProductNavCSh));
        }

        pnProductNavCSh.addEventListener("scroll", function() {
            last_known_scroll_positionCSh = window.scrollY;
            if (!tickingCSh) {
                window.requestAnimationFrame(function() {
                    doSomethingCSh(last_known_scroll_positionCSh);
                    tickingCSh = false;
                });
            }
            tickingCSh = true;
        });


        pnAdvancerLeftCSh.addEventListener("click", function() {
            // If in the middle of a move return
            if (SETTINGSCSh.navBarTravellingCSh === true) {
                return;
            }
            // If we have content overflowing both sides or on the left
            if (determineOverflowCSh(pnProductNavContentsCSh, pnProductNavCSh) === "left" || determineOverflowCSh(pnProductNavContentsCSh, pnProductNavCSh) === "both") {
                // Find how far this panel has been scrolled
                var availableScrollLeftCSh = pnProductNavCSh.scrollLeft;
                // If the space available is less than two lots of our desired distance, just move the whole amount
                // otherwise, move by the amount in the settings
                if (availableScrollLeftCSh < SETTINGSCSh.navBarTravelDistanceCSh * 2) {
                    pnProductNavContentsCSh.style.transform = "translateX(" + availableScrollLeftCSh + "px)";
                } else {
                    pnProductNavContentsCSh.style.transform = "translateX(" + SETTINGSCSh.navBarTravelDistanceCSh + "px)";
                }
                // We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
                pnProductNavContentsCSh.classList.remove("pn-ProductNav_Contents-no-transitionCSh");
                // Update our settings
                SETTINGSCSh.navBarTravelDirectionCSh = "left";
                SETTINGSCSh.navBarTravellingCSh = true;
            }
            // Now update the attribute in the DOM
            pnProductNavCSh.setAttribute("data-overflowing", determineOverflowCSh(pnProductNavContentsCSh, pnProductNavCSh));
        });

        pnAdvancerRightCSh.addEventListener("click", function() {
            // If in the middle of a move return
            if (SETTINGSCSh.navBarTravellingCSh === true) {
                return;
            }
            // If we have content overflowing both sides or on the right
            if (determineOverflowCSh(pnProductNavContentsCSh, pnProductNavCSh) === "right" || determineOverflowCSh(pnProductNavContentsCSh, pnProductNavCSh) === "both") {
                // Get the right edge of the container and content

                var navBarRightEdgeCSh = pnProductNavContentsCSh.getBoundingClientRect().right;
                var navBarScrollerRightEdgeCSh = pnProductNavCSh.getBoundingClientRect().right;
                // Now we know how much space we have available to scroll
                var availableScrollRightCSh = Math.floor(navBarRightEdgeCSh - navBarScrollerRightEdgeCSh);
                // If the space available is less than two lots of our desired distance, just move the whole amount
                // otherwise, move by the amount in the settings
                if (availableScrollRightCSh < SETTINGSCSh.navBarTravelDistanceCSh * 2) {
                    pnProductNavContentsCSh.style.transform = "translateX(-" + availableScrollRightCSh + "px)";
                } else {
                    pnProductNavContentsCSh.style.transform = "translateX(-" + SETTINGSCSh.navBarTravelDistanceCSh + "px)";
                }
                // We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
                pnProductNavContentsCSh.classList.remove("pn-ProductNav_Contents-no-transitionCSh");
                // Update our settings
                SETTINGSCSh.navBarTravelDirectionCSh = "right";
                SETTINGSCSh.navBarTravellingCSh = true;
            }
            // Now update the attribute in the DOM
            pnProductNavCSh.setAttribute("data-overflowing", determineOverflowCSh(pnProductNavContentsCSh, pnProductNavCSh));
        });

        pnProductNavContentsCSh.addEventListener(
            "transitionend",
            function() {
                // get the value of the transform, apply that to the current scroll position (so get the scroll pos first) and then remove the transform
                var styleOfTransformCSh = window.getComputedStyle(pnProductNavContentsCSh, null);
                var trCSh = styleOfTransformCSh.getPropertyValue("-webkit-transform") || styleOfTransformCSh.getPropertyValue("transform");
                // If there is no transition we want to default to 0 and not null
                var amountCSh = Math.abs(parseInt(trCSh.split(",")[4]) || 0);
                pnProductNavContentsCSh.style.transform = "none";
                pnProductNavContentsCSh.classList.add("pn-ProductNav_Contents-no-transitionCSh");
                // Now lets set the scroll position
                if (SETTINGSCSh.navBarTravelDirectionCSh === "left") {
                    pnProductNavCSh.scrollLeft = pnProductNavCSh.scrollLeft - amountCSh;
                } else {
                    pnProductNavCSh.scrollLeft = pnProductNavCSh.scrollLeft + amountCSh;
                }
                SETTINGSCSh.navBarTravellingCSh = false;
            },
            false
        );

        // Handle setting the currently active link
        pnProductNavContentsCSh.addEventListener("click", function(e) {
            var linksCSh = [].slice.call(document.querySelectorAll(".pn-ProductNav_LinkCSh"));
            linksCSh.forEach(function(item) {
                item.setAttribute("aria-selected", "false");
            })
            e.target.setAttribute("aria-selected", "true");
            // Pass the clicked item and it's colour to the move indicator function
            moveIndicatorCSh(e.target, colours[links.indexOf(e.target)]);
        });

        // var count = 0;
        function moveIndicatorCSh(item, color) {
            var textPosition = item.getBoundingClientRect();
            var container = pnProductNavContentsCSh.getBoundingClientRect().left;
            var distance = textPosition.left - container;
             var scroll = pnProductNavContentsCSh.scrollLeft;
            pnIndicatorCSh.style.transform = "translateX(" + (distance + scroll) + "px) scaleX(" + textPosition.width * 0.01 + ")";
            // count = count += 100;
            // pnIndicator.style.transform = "translateX(" + count + "px)";
            
      /*      if (color) {
                pnIndicatorCSh.style.backgroundColor = color;
            }*/
        }

        function determineOverflowCSh(content, container) {
            var containerMetrics = container.getBoundingClientRect();
            var containerMetricsRight = Math.floor(containerMetrics.right);
            var containerMetricsLeft = Math.floor(containerMetrics.left);
            var contentMetrics = content.getBoundingClientRect();
            var contentMetricsRight = Math.floor(contentMetrics.right);
            var contentMetricsLeft = Math.floor(contentMetrics.left);
             if (containerMetricsLeft > contentMetricsLeft && (containerMetricsRight+2) < contentMetricsRight) {
                  console.log('containermetricsRight is'+containerMetricsRight);
                console.log('contentMetricsRight is'+contentMetricsRight);
                console.log("Its both");
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
