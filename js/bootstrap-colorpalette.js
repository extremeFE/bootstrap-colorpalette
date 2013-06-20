/**
 * bootstrap-colorpicker.js
 * (c) 2013~ Jiung Kang
 * Licensed under the Apache License, Version 2.0 (the "License");
 */

(function($) {
  "use strict";
  var aaColor = [
    ['#000000', '#424242', '#636363', '#9C9C94', '#CEC6CE', '#EFEFEF', '#EFF7F7', '#FFFFFF'],
    ['#FF0000', '#FF9C00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#9C00FF', '#FF00FF'],
    ['#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE'],
    ['#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD'],
    ['#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5'],
    ['#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#3984C6', '#634AA5', '#A54A7B'],
    ['#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842'],
    ['#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031']
  ];

  var createPaletteElement = function(element) {
//    if (!welTarget.parent().hasClass('btn-group')) {
//      var sDisplay = welTarget.css('display');
//      var welWrapper = welTarget.wrap('<div class="btn-group" />');
//      welWrapper.css('display', sDisplay);
//      welTarget.css('display', 'block');
//    }
    element.addClass('bootstrap-colorpalette');
    var aHTML = [];
    $.each(aaColor, function(i, aColor){
      aHTML.push('<div>');
      $.each(aColor, function(i, sColor) {
        var sButton = ['<button class="btn-color" style="background-color:', sColor,
          '" data-value="', sColor,
          '" title="', sColor,
          '"></button>'].join('');
        aHTML.push(sButton);
      });
      aHTML.push('</div>');
    });
    element.html(aHTML.join(''));
//    var welPalette = $(aHTML.join('')).prepend (welTarget);

//    welTarget.attr('data-toggle', 'dropdown');
//    welTarget.addClass('dropdown-toggle');
//    welTarget.dropdown();

//    return welPalette;
  };

  var EventHandler = function() {
    this.attach = function(palette) {
      palette.element.on('click', function(e) {
        var welTarget = $(e.target);
        var welBtn = welTarget.closest('.btn-color');

        if (welBtn[0]) {
          var value = welBtn.attr('data-value');
          palette.value = value;
          palette.element.trigger('selectColor', [palette]);
        }
      });
    };
  };

  var eventHandler = new EventHandler();

  var Palette = function(element, options) {
    if (options && options.target) {
      this.target = options.target;
    }
    this.element = element;
    createPaletteElement(element);
    eventHandler.attach(this);
  };

  $.fn.extend({
    colorPalette : function(options) {
      var data = this.data('colorpalette');
      if (!data) {
        this.data('colorpalette', data = new Palette(this, options));
      }
      return this;
    }
  });
})(jQuery);