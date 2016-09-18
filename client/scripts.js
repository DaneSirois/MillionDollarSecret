
var userObject = $.getJSON( "/getUser", function( data ) {
  console.log(data);
  return data;
});