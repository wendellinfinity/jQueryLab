/*
* Simple Tree Extender
* 
* Author: Tox Capili
*
*/

; (function ($) {
    // some constants not  yet used
    var CONSTANTS = {
        cstree: "cstree"
    };
    $.extend($.fn, {
        // extender
        cstree: function (settings) {
            var $this = $(this); // shortcut

            setup($this);
            applyBehavior($this);

            // setup the tree
            function setup(tree) {
                // start with roo
                tree.addClass("treeview");
                tree.children("ul").each(function() {
                    var ul;
                    ul=$(this);
                    ul.detach(); // detach the UL and prepare rendering
                    createNodes(ul,tree); // recursively create nodes
                });
            }

            function createNodes(node,root) {
                var nodecount,nodetotal;
                nodecount=0;
                nodetotal=node.children("li").length-1;
                node.children("li").each(function() {
                    var childnode,header,icon,title,children;
                    // create the node elements
                    childnode=$("<div />").addClass("node");
                    header=$("<div />").addClass("nodeheader");
                    icon=$("<span />").addClass("icon");
                    // place determinant for icon here
                    // create the title
                    title=$("<span />").addClass("nodetitle").html($(this).children("span").html());
                    // adjust based on node position
                    if(nodecount==0 && !(nodecount==nodetotal)) {
                        header.addClass("topnode");
                        childnode.addClass("nodes");
                    } else if(nodecount==nodetotal) {
                        header.addClass("lastnode");
                    } else {
                        header.addClass("normalnode");
                        childnode.addClass("nodes");
                    }
                    // assemble the nodes
                    icon.appendTo(header);
                    title.appendTo(header);
                    header.appendTo(childnode);
                    // recurse the child UL
                    children=$(this).children("ul");
                    if(children.length>0) {
                        // nodes with children
                        var childrencontainer;
                        childrencontainer=$("<div />").addClass("children");
                        if(children.hasClass("expanded")) {
                            icon.addClass("minusicon");
                        } else {
                            childrencontainer.addClass("collapsed");
                            icon.addClass("plusicon");
                        }
                        $(children).each(function() {
                            createNodes($(this),childrencontainer);
                        });
                        childrencontainer.appendTo(childnode);
                    } else {
                        // for those w/o children
                        if(nodecount==nodetotal) {
                            // last node
                            icon.addClass("lastbranch");
                        } else {
                            icon.addClass("normalbranch");
                        }
                    }
                    childnode.appendTo(root);
                    nodecount++;
                });
            }

            // apply behavior of all interactive elements
            function applyBehavior(tree) {
                tree.find(".nodetitle")
                   .hover(
                        function () { $(this).addClass("hover"); },
                        function () { $(this).removeClass("hover"); })
                   .click(
                        function () {
                            $(this).addClass("selected");
                            $(".treeview .nodetitle").not(this).removeClass("selected");
                        });


                tree.find(".icon")
                   .click(
                        function () {
                            var node;
                            node = $(this);
                            if (node.hasClass("plusicon")) {
                                expand(node);
                            } else {
                                collapse(node);
                            }
                        });
            }

            function expand(node) {
                node.removeClass("plusicon").addClass("minusicon");
                node.closest(".node").children(".children").removeClass("collapsed");
            }

            function collapse(node) {
                node.removeClass("minusicon").addClass("plusicon");
                node.closest(".node").children(".children").addClass("collapsed");                
            }
        }
    });

})(jQuery);

