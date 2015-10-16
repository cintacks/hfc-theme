//= require jquery
//= require jquery_ujs
//= require jquery.ui.all
//= require select2
//= require vendor/bootstrap
//= require vendor/bootstrap_select
//= require vendor/jquery.tableSorter
//= require bootstrap-timepicker
//= require vendor/bootstrap-datepicker.min
//= require readmore

// User agent sniffing.  I know I know, I hate it too.  But we have to do it.
jQuery.browser={};(function(){jQuery.browser.msie=false;
jQuery.browser.version=0;if(navigator.userAgent.match(/MSIE ([0-9]+)\./)){
jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();

// Constructor Class
// Usage: TBD
window.Application = function () { };

$(document).ready(function () {

  $('.timepicker').timepicker();
  $('.read-more').readmore();

  // ADD SLIDEDOWN ANIMATION TO DROPDOWN //
  $('.dropdown-left').on('show.bs.dropdown', function(e){
    $(this).find('.dropdown-menu').first().stop(true, true).show("slide", { direction: "left" }, 500);
  });

  // ADD SLIDEUP ANIMATION TO DROPDOWN //
  $('.dropdown-left').on('hide.bs.dropdown', function(e){
    $(this).find('.dropdown-menu').first().stop(true, true).hide("slide", { direction: "left" }, 500);
  });

  $('.btn.btn-dashtoggle').on('click', function () {
    var path = $(this).children('a').attr('href');

    if(typeof path != 'undefined')
      window.location.href = path;
  })

  if (window.location.hash && window.location.hash == '#_=_') {
    if (window.history && history.pushState) {
      window.history.pushState("", document.title, window.location.pathname);
    } else {
      var scroll = {
        top: document.body.scrollTop,
        left: document.body.scrollLeft
      };
      window.location.hash = '';
      document.body.scrollTop = scroll.top;
      document.body.scrollLeft = scroll.left;
    }
  }

  if ($('body#registrations_new').length !== 0 || $('#profiles_new').length !== 0) {
    $('.right-homepage').addClass('gray');
    $('.right-homepage').addClass('black');
  }

  $('[data-validate]').blur(function() {
      $this = $(this);
        $.get($this.data('validate'), {
          user: $this.val()
      }).success(function() {
        $(".signup-notice-wrapper").hide();
      }).error(function() {
        $(".signup-notice-wrapper").show();
        $(".signup-notice-wrapper").addClass("alert").addClass("alert-danger").text("Email taken, try again.")
      });
  });

  function removeClass() {
    $(".lighthouse-nav-list div").each(function (i) {
      $(this).removeClass("li-active");
    });
  }

  if ($('body').hasClass('dashboard_index')) {
    removeClass();
    $(".dashboard").addClass("li-active");
    $(".lighthouse-blue.header").text("Dashboard");
  } else if ($('body').hasClass('health_fairs_index') || $('body').hasClass('health_fairs_show')) {
    removeClass();
    $(".hf").addClass("li-active");
    $(".lighthouse-blue.header").text("Health Fair Information");
  } else if ($('body').hasClass('lighthouse_users_show') || $('body').hasClass('lighthouse_profiles_edit') || $('body').hasClass('office_locations_index') || $('body').hasClass('office_locations_edit') || $('body').hasClass('office_locations_new')) {
    removeClass();
    $('.profile').addClass('li-active');
    $(".lighthouse-blue.header").text("Profile");
  } else if ($("body").hasClass("clients_index")) {
    removeClass();
    $(".hf").addClass("li-active");
    $(".lighthouse-blue.header").text("Clients");
  }

  $("#distance_away___").on("change", function () {
    $.ajax({
      url: '/events/',
      data: { distance_away: $("#distance_away_ :selected").val(),
              search: $("#search").val() },
      dataType: "JSON",
      async: false,
      success: function (data, status, response) {
        $("li.event-list").html("");
        for (var i = 0; i <= data.length; i += 1) {
          $("#container ul").append(template(data[i]))
        }
        $("#container ul")
      },
      error: function (err) {
        throw new Error(err);
      }
    });
  });

  function template (data) {

    return "" +
    "<li class='event-list'>" +
      "<img src='http://placehold.it/150x100' class='pull-left' />" +
      "<div class='image-seperator-on-event'>" +
        "<a href='/events/" + data.id + "'>" + data.name + "</a>" +

        "<div class='event-start-date'>" +
          data.event_date +
        "</div>" +

        "<div class='event-location'>" +
          data.city + ", " + data.state +
        "</div>" +

        "<div class='event-admin-actions'>" +
          "<a href='/events/" + data.id + "/edit/'>Edit</a>" +
          "<a href='/events/" + data.id + "' data-method='DELETE' rel='nofollow'>Edit</a>" +
        "</div>" +

      "</div>" +
    "</li><div class='clearfix'></div><hr />"
  }

    initializeRsvpForm();

    initializeItemCheckboxes();

  // Initialize the required tooltips for the /profile/new and /users/new
  // views.  This is when people click "Sign up via email", or after
  // they come back from FB/Google for the first time.
  initializeRegistrationTooltips();

  // We use select2 a lot.  In the account management areas, and on events.
  initializeSelect2ThroughoutApp();

  // We use data tables on account and vendor management areas.
  initializeTableSorterDataTables();

  // We want our select menus to look good.
  initializePrettySelectMenus();

  // We have a 'select all' button that dynamically will place all of the possible data
  // within the Primary Service categories select 2, into the select2, readying it for submission.
  initializeSelectAllPrimaryServiceCategoriesOnEvents();

  // We love date pickers
  initializeDatePickers();

  // This helps hide the alert/notice container in a more pleasing way.
  initializeAlertContainerHide();

  // These are TBD.  Placeholder function.
  initializeNavBarActions();

  initializeVendorProfileOfferingsListing();

  initializeSidebarCategories();

  initializePagination();

  // Here we have a method that helps us dynamically select the office locations
  // for the account, after you choose said account from a drop down list on event/new
  initializeDynamicSelectMenusOnEventForAccountandAccountOfficeLocation();


  // ============================================================ //
  // ============================================================ //
  // ============================================================ //
  // ============================================================ //

  // ----- FUNCTIONS BELOW THIS LINE - INSTANTIATION ABOVE ------ //

  // ============================================================ //
  // ============================================================ //
  // ============================================================ //
  // ============================================================ //

  // -----------------------
  // Lighthouse
  // -----------------------
  $(".lighthouse-step-two").hide();
  $(".lighthouse-step-three").hide();

  $(".on-to-step-two").click(function () {
    $(".lighthouse-step-one").hide();
    $(".lighthouse-step-two").show();
  });

  $(".on-to-step-three").click(function () {
    $(".lighthouse-step-two").hide();
    $(".lighthouse-step-three").show();
  });

  $("#past, #drafts").hide();

  $('.offerings-screenings').hide();

  $(".btn-dashtoggle").click(function() {
    if(!$(this).hasClass("active")) {
      $(".event-table").hide();
      $("#" + $(this).attr("rel")).show();
    }
  });

  equalizeHeights();

});

  function initializeSelect2ThroughoutApp () {
    $(".insurance-providers-select").attr("multiple", true);
    $(".insurance-providers-select").select2();

    $("#lighthouse_lighthouse_user_benefits_brokers").attr("multiple", true);
    $("#lighthouse_lighthouse_user_benefits_brokers").select2();

    $("#event_primary_service_ids").attr("multiple", true).css("width", "300px");
    $("#event_primary_service_ids").select2();
  }

  function initializeTableSorterDataTables () {
    $("#admin-users-management").tablesorter();
    $("#lighthouse-user-management").tablesorter();
    $("#primary-service-listing").tablesorter();
  }

  function initializePrettySelectMenus () {
    $("#distance_away").selectpicker();
    $("#category_event_user_user_id").selectpicker();
    $("#category_event_user_primary_service_id").selectpicker();
    $("#category_event_user_discount").selectpicker();
    $(".vendor_comp_select").selectpicker();
    $(".primary_service_comp_select").selectpicker();
    $(".primary_service_comp_select").css("float", "left").css("margin-left", '2px');
    $(".needs-electricity").css("float", "left").css("margin-left", '2px');
    $("#distance_away").next().css("width", "130px");
  }

  function initializeSelectAllPrimaryServiceCategoriesOnEvents () {
    $("#event_cats_all").click(function(){
      if ($("#event_cats_all").is(':checked')) {
          $("#event_primary_service_ids > option").prop("selected","selected");
          $("#event_primary_service_ids").trigger("change");
      } else {
          $("#event_primary_service_ids > option").removeAttr("selected");
           $("#event_primary_service_ids").trigger("change");
       }
    });
  }

  function initializeDatePickers () {
    $("input.date_picker").datepicker();

    $("input.date_picker_formatted").each(function() {
      $(this).datepicker({ format: 'yyyy-mm-dd' });
    });

    $("input.date_picker_short").each(function() {
      $(this).datepicker({ format: 'mm/dd/yy' });
    });

    $('input.request-date').datepicker({
	format: 'mm/dd/yy',
	startDate: 'today',
	orientation: 'bottom auto',
	daysOfWeekDisabled: '0,6',
	autoclose: true,
	todayHighlight: true
    });
  }

  function initializeAlertContainerHide () {
    $(".alert-container .close").on("click", function () {
      $(this).parents('.alert-container').fadeOut();
    });
  }

  function initializeNavBarActions () {
    $("ul.nav.navbar-nav li a").on("click", function () {
      $(this).parent().addClass("active");
    });
  }


  function initializeDynamicSelectMenusOnEventForAccountandAccountOfficeLocation () {
    $("#event_lighthouse_user_location_id").hide();
    var locations = $("#event_lighthouse_user_location_id").html();
    $("#event_lighthouse_user_id").on("change", function () {
      var account = $("#event_lighthouse_user_id :selected").text();
      var options = $(locations).filter("optgroup[label='" + account + "']").html();
      if (options) {
        $("#event_lighthouse_user_location_id").html(options);
        $("#event_lighthouse_user_location_id").show();
        $("#error-location").hide();
      } else {
        $("#event_lighthouse_user_location_id").empty();
        $("#event_lighthouse_user_location_id").hide();
        $("#error-location").show();
        $("#error-location").html("There is no locations for that account in database")
      }
    })
  }

function initializeRsvpForm() {
  $('.rsvp-status-box').each(function() {
    $(this).parent().find('form').hide();

    $(this).find('.rsvp-toggle').click(function() {
      $(this).parent().hide();
      $(this).parent().parent().find('form').fadeIn();
      return false;
    });
  });
}

function initializeRegistrationTooltips() {
  var arrLabels = [
    'label[for="user_last_name"] > abbr',
    'label[for="user_first_name"] > abbr',
    'label.email.required > abbr',
    'label.password.required > abbr',
    'label[for="user_company_name"] > abbr',
    'label[for="user_street_address"] > abbr',
    'label[for="user_zip_code"] > abbr',
    'label[for="user_city"] > abbr',
    'label[for="user_state"] > abbr',
    'label[for="user_primary_service_category"] > abbr',
    'label[for="profile_company_name"] > abbr',
    'label[for="profile_street_address"] > abbr',
    'label[for="profile_zip"] > abbr',
    'label[for="profile_city"] > abbr',
    'label[for="profile_state"] > abbr',
    'label[for="profile_primary_service_category"] > abbr'
  ]

  for (var i = 0; i < arrLabels.length; i += 1) {
    $(arrLabels[i]).hover(function () {
      $(this).tooltip({ title: 'required', placement: 'left' })
    })
  }
}

function isValid(pw) {
  if (!pw) return false;

  var rgx = [ /.{6}/ ];

  for (var i = 0; i < rgx.length; i++) {
      if (rgx[i].test(pw) === false) {
        console.log(pw);
          return false;
      }
  } return true;
}

function initializeItemCheckboxes() {
  $('.todo-list-item input[type=checkbox]').change(function() {
    $(this).parent().submit();

    if ($(this).prop('checked')) {
      $(this).parent().parent().addClass('completed');
    } else {
      $(this).parent().parent().removeClass('completed');
    }
  });
}

function initializeVendorProfileOfferingsListing() {
  $('.vp-offerings .bottom').hide();

  $('.vp-offerings .toggle').click(function(){
    $('.vp-offerings .bottom').toggle();

    if($(this).text() == "VIEW ALL")
      $(this).text("VIEW LESS");
    else
      $(this).text("VIEW ALL");

    return false;
  });
}

function initializeSidebarCategories() {
  $('.all-vendors .all-categories').hide();

  $('.all-vendors .toggle').click(function() {
    $(this).parent().find('.all-categories').toggle();
    return false;
  });
}

function equalizeHeights() {
  var height = 0;

  $('.equal-height').each(function() {
    if ($(this).height() > height) {
      height = $(this).height();
    }
  });

  $('.equal-height').height(height);
}

function initializePagination() {
  $('#events_index .pagination a').each(function() {
    var url = $(this).attr('href');
    url = url.replace('/?','/events/?');
    $(this).attr('href',url);
  });
}
