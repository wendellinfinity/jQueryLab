/*
* Simple Slider Extender
* 
* Author: Wendell
*
*/

; (function($) {
    // some constants not  yet used
    var CONSTANTS = {
        simpleslider: "simpleslider",
        slidemasterclass: "slidemaster",
        slidecontainerclass: "slidecontainer",
        slideclass: "slide",
        slidenavigationclass: "slidernavigation",
        slidebuttonclass: "sliderbutton",
        slideleftbuttonclass: "sliderleft",
        sliderightbuttonclass: "sliderright"
    };
    var LOCALS = {
        slidemasterid: "",
        speed: "", // can be "slow" or "fast"
        slidecount: 0,
        currentslide: 0,
        width: 0,
        height: 0
    }
    var source, slidemaster, leftbutton, rightbutton;
    $.extend($.fn, {
        // extender
        simpleslider: function(settings) {
            var $this = $(this); // shortcut
            // get the settings
            LOCALS.slidemasterid = settings.slidemasterid;
            LOCALS.speed = settings.speed;
            LOCALS.width = settings.width;
            LOCALS.height = settings.height;
                        
            setup($this);
            renderSlides();
            applyBehavior($this);

            // setup the tree
            function setup() {
                source = $("#"+LOCALS.slidemasterid);
                
            }
            
            // create the slide set
            function renderSlides() {
                // find all img inside the source master and append to the slide
                LOCALS.slidecount = $("#"+LOCALS.slidemasterid).find("img").length;
                if(LOCALS.slidecount > 0) {
                    // container for slides, no width
                    var slidecontainer = $("<div />").addClass(CONSTANTS.slidecontainerclass)
                                       .css("height",LOCALS.height + "px").css("width",LOCALS.slidecount*LOCALS.width + "px"); 
                    // slide template
                    var slide = $("<div />").addClass(CONSTANTS.slideclass).css("left","0px")
                              .css("width",LOCALS.width + "px").css("height",LOCALS.height + "px");

                    $("#"+LOCALS.slidemasterid).find("img").each(function(){
                        var newslide = slide.clone();
                        $(this).appendTo(newslide);
                        newslide.appendTo(slidecontainer);
                    });
                    // create the navigation
                    var slidenavi = $("<div />").addClass(CONSTANTS.slidenavigationclass)
                                  .css("width",LOCALS.width + "px").css("top",((LOCALS.height/2)-11)*-1 + "px");
                    leftbutton = $("<div>&nbsp;</div>").addClass(CONSTANTS.slidebuttonclass).addClass(CONSTANTS.slideleftbuttonclass).appendTo(slidenavi);
                    rightbutton = $("<div>&nbsp;</div>").addClass(CONSTANTS.slidebuttonclass).addClass(CONSTANTS.sliderightbuttonclass).appendTo(slidenavi);
                    // final slide master
                    slidemaster = $("<div />").addClass(CONSTANTS.slidemasterclass)
                                .css("width",LOCALS.width + "px").css("height",LOCALS.height + "px");
                    // insert the new master after the source
                    slidecontainer.appendTo(slidemaster);
                    slidenavi.appendTo(slidemaster);                    
                    slidemaster.insertAfter(source);
                    // remove the source and replace it with the master
                    source.remove();
                    slidemaster.attr("id",LOCALS.slidemasterid);
                }
            }

            // apply behavior of all interactive elements
            function applyBehavior() {
                leftbutton.click(function(){
                    slideleft();
                });
                
                rightbutton.click(function(){
                    slideright();
                });
            }

            function slideleft() {
                if(LOCALS.currentslide > 0) {
                    $(slidemaster).find(".slidecontainer .slide").each(function(){
                        $(this).animate({"left": "+="+LOCALS.width+"px"}, LOCALS.speed);
                    });
                    LOCALS.currentslide--;
                }
            }

            function slideright() {
                if(LOCALS.currentslide < LOCALS.slidecount-1) {
                    $(slidemaster).find(".slidecontainer .slide").each(function(){
                        $(this).animate({"left": "-="+LOCALS.width+"px"}, LOCALS.speed);
                    });
                    LOCALS.currentslide++;
                }
            }
        }
    });

})(jQuery);

