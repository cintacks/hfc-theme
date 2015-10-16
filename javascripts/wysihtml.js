//= require bootstrap-wysihtml5

$(document).ready(function(){
	initializeWYSIWYG();
});

function initializeWYSIWYG(){
  $('.wysiwyg5').each(function(){
    $(this).wysihtml5();
    $('a[data-wysihtml5-command=small]').remove();
  });
}
