$.ajax({
  dataType: "json",
  url: "/getUser",
  data: data,
  success: success
});

var userObject = $.getJSON( "/getUser", function( data ) {
  return data;
});