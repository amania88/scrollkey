/*
 *  jQuery scrollkey - v1.0.0
 *  
 *  @author Antério vieira <anteriovieira@gmail.com>
 */
;(function($, window, document, undefined) {

    var pluginName = "scrollkey",
        defaults = {
            attrToKey: "target",
            firstKeyPressed: 17,
            codeASCII: true
        };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function() {
            this.keypress();
        },
        keypress: function(e) {

            var pressedCtrl = false,
                id = this.element.id,
                firstKey = this.options.firstKeyPressed;

            eval("var keyCode = this.element." + this.options.attrToKey);
            
            $(document).keyup(function(e) {
                if (e.which == firstKey)
                    pressedCtrl = false;
            });

            $(document).keydown(function(e) {
                
                if (e.which == firstKey)
                    pressedCtrl = true;

                if (e.which == keyCode && pressedCtrl == true) {
                    $('html, body').animate({
                        scrollTop: $('#' + id).offset().top
                    }, 2000);
                }
            });
        }

    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function(options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);
