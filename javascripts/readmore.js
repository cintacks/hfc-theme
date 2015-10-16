(function ( $ ) {

  $.fn.readmore = function( options ) {

    var settings = $.extend({
      moreText: "Read More",
      lessText: "Read Less",
      height: 64
    }, options );

    function moreLink() {
      return "<a href='#' class='readmore-toggle readmore-more' >"
        + settings.moreText + "</a>";
    }

    function lessLink() {
      return "<a href='#' class='readmore-toggle readmore-less' >"
        + settings.lessText + "</a>";
    }

    return this.each(function() {
      var container = $(this);

      // Don't bother setting it up unless the text is long enough
      if(container.height() < settings.height)
        return false;

      // Wrap the content in a div
      container.html(
        "<div class='readmore-content'>" + $(this).html() + "</div>"
      );


      // Add a fadeout to the bottom
      container.append("<div class='fadeout'></div>");

      // Add the toggle links
      container.append(
        "<div class='readmore-toggle-container'>" + moreLink() + lessLink()
        + "</div>");

      $('.readmore-more').click(function(){
        container.find('.readmore-content').css('height', 'auto');
        container.find('.readmore-toggle').toggle();
        container.find('.fadeout').hide();
        return false;
      });

      $('.readmore-less').click(function(){
        container.find('.readmore-content').css('height', settings.height + "px")
        container.find('.readmore-toggle').toggle();
        container.find('.fadeout').show();
        return false;
      });

      container.find('.readmore-more').hide();
      container.find('.readmore-content').css('overflow', 'hidden');
      container.find('.readmore-less').trigger('click');
    });

  };

}( jQuery ));
