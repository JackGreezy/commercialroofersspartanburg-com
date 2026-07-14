jQuery(function() {
  jQuery('.form-check-input').on('click', function(e) {
      applyFilters();
  });
  jQuery('#portfolio-clear-filters').click(function(e) {
    e.preventDefault();
    clearAllFilters(applyFilters);
    history.pushState(null, '', '/portfolio');
  });
});

function updateURLWithFilters() {
  var queryString = "";
  var locationsIsSet = false;
  var locationsString = "locations_tax=";
  jQuery('input[name="locations_tax[]"]:checked').each(function() {
      if(locationsIsSet) {
          locationsString += ",";
      }
      locationsString += jQuery(this).val();
      locationsIsSet = true;
  });

  var clientsIsSet = false;
  var clientsString = "clients_tax=";
  jQuery('input[name="clients_tax[]"]:checked').each(function() {
      if(clientsIsSet) {
          clientsString += ",";
      }
      clientsString += jQuery(this).val();
      clientsIsSet = true;
  });

  var industryIsSet = false;
  var industryString = "industry_tax=";
  jQuery('input[name="industry_tax[]"]:checked').each(function() {
      if(industryIsSet) {
          industryString += ",";
      }
      industryString += jQuery(this).val();
      industryIsSet = true;
  });

  var scopeOfServicesIsSet = false;
  var scopeOfServicesString = "scope_of_services_tax=";
  jQuery('input[name="scope_of_services_tax[]"]:checked').each(function() {
      if(scopeOfServicesIsSet) {
          scopeOfServicesString += ",";
      }
      scopeOfServicesString += jQuery(this).val();
      scopeOfServicesIsSet = true;
  });

  var deliveryMethodIsSet = false;
  var deliveryMethodString = "delivery_method_tax=";
  jQuery('input[name="delivery_method_tax[]"]:checked').each(function() {
      if(deliveryMethodIsSet) {
          deliveryMethodString += ",";
      }
      deliveryMethodString += jQuery(this).val();
      deliveryMethodIsSet = true;
  });

  var selfPerformIsSet = false;
  var selfPerformString = "self_perform_tax=";
  jQuery('input[name="self_perform_tax[]"]:checked').each(function() {
      if(selfPerformIsSet) {
          selfPerformString += ",";
      }
      selfPerformString += jQuery(this).val();
      selfPerformIsSet = true;
  });

  var architectsIsSet = false;
  var architectsString = "architects_tax=";
  jQuery('input[name="architects_tax[]"]:checked').each(function() {
      if(architectsIsSet) {
          architectsString += ",";
      }
      architectsString += jQuery(this).val();
      architectsIsSet = true;
  });

  if(locationsIsSet) { 
      queryString += locationsString; 
  }

  if(clientsIsSet) { 
      if(queryString !== "") {
          queryString += "&";
      }
      queryString += clientsString; 
  }

  if(industryIsSet) {
    if(queryString !== "") {
      queryString += "&";
    }
    queryString += industryString;
  }

  if(scopeOfServicesIsSet) {
    if(queryString !== "") {
      queryString += "&";
    }
    queryString += scopeOfServicesString;
  }

  if(deliveryMethodIsSet) {
    if(queryString !== "") {
      queryString += "&";
    }
    queryString += deliveryMethodString;
  }

  if(selfPerformIsSet) {
    if(queryString !== "") {
      queryString += "&";
    }
    queryString += selfPerformString;
  }

  if(architectsIsSet) {
    if(queryString !== "") {
      queryString +="&";
    }
    queryString += architectsString;
  }

  console.log(queryString);
  var newRelativePathQuery = window.location.pathname
  if(queryString != "") {
      newRelativePathQuery += '?' + queryString;
  }
  history.pushState(null, '', newRelativePathQuery);
}

function applyFilters(callback) {
  jQuery('#current-filter-list').empty();
  jQuery('#posts-listing').fadeOut();
  jQuery('#pagination-nav').fadeOut();
  jQuery('.portfolio-filter__results').fadeOut();

  jQuery('#filter-message').html('Applying filters...');
  jQuery('#filter-message').fadeIn();

  jQuery('.filter-button').removeClass('open');
  jQuery('.filter-window').removeClass('show');
  console.log('form data:');
  console.log(jQuery('#filter-form').serialize());
  var ajaxData = {
      'action': 'return_portfolio_filtered_posts',
      'form': jQuery('#filter-form').serialize()
  };
  request = jQuery.ajax({
      url: ajax_handler_object.ajax_url,
      type: "post",
      data: ajaxData
  });
  request.done(function(response, textStatus, jqXHR) {
      response = JSON.parse(response);
      jQuery('#filter-message').fadeOut();
      updateURLWithFilters();
      if(response.postCount == 0) {
          jQuery('#filter-message').html('No posts found. Please adjust filter parameters and try again.');
          jQuery('#filter-message').fadeIn();
      } else {
          jQuery('#posts-listing').empty();
          jQuery('#posts-listing').append(response.cardHTML);
          jQuery('#posts-listing').append(response.paginationHTML);
          jQuery('.portfolio-filter__results').empty();
          jQuery('.portfolio-filter__results').append(response.postCount + ' Results');
          
          jQuery('#posts-listing').fadeIn();
          jQuery('.portfolio-filter__results').fadeIn();
      }
  });
  if(callback) { callback(); }
}

function clearAllFilters(callback) {
  jQuery('#filter-form input:checked').each(function() {
      jQuery(this).prop( "checked", false );
  });
  if(callback) { callback(); }
}

var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};
function escapeHtml (string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
      return entityMap[s];
  });
}