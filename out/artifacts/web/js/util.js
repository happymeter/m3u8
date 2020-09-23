function parseQueryString(query) {
  var parts = query.split('&');
  var params = Object.create(null);

  for (var i = 0, ii = parts.length; i < ii; ++i) {
    var param = parts[i].split('=');
    var key = param[0].toLowerCase();
    var value = param.length > 1 ? param[1] : null;
    params[decodeURIComponent(key)] = decodeURIComponent(value);
  }

  return params;
}

function getParams(){
	var queryString = document.location.search.substring(1);
	return parseQueryString(queryString);
}