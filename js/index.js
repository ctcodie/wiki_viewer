// Empty global variable to store information later
var html = '';

function search() {
  // Use Ajax to query data from wikipedia API. Returns in JSON format. 
  $.ajax({
    // Concatenates URL for WikiAPI with whatever value is currently in the search box
    url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + $('#search').val(),
    dataType: 'jsonp',
    // JSONP because AJAX calling a different domain 
    type: 'POST',
    headers: {
      'Api-User-Agent': 'Example/1.0'
    },
    // If AJAX query works, runs a function passing in all the data returned
    success: function(data) {

      // This line clears any html appended by a previous search. Removes all child nodes.
      $('.results').empty();

      // data.query.search adds the newly returned data into the resArr array.
      var resArr = data.query.search;

      // For loops through every result returned, generating html, pulling out titles and snippets for each result.
      for (var result in resArr) {
        html = '<div id="articles"><a href="https://en.wikipedia.org/wiki/' + resArr[result].title + '"target="_blank"><h3>' + resArr[result].title + '</h3><p>' + resArr[result].snippet + '</p></a></div>';

        // Appends the new html to the page, one at a time, then loop runs again until no more results left
        $('.results').append(html);
      }
    }
  });
}
// After every keystroke, runs the search and returns results. 
$('#search').keyup(function() {
  search();
});