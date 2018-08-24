const request = require('request');

var page = 'https://www.google.com.ar';

visitPage(page);

function getReleatedURLsList(body){
	var hrefPattern = /href="(.*?)"/g;

	var hrefs = body.match(hrefPattern);

	hrefs.forEach(function(element, index, array){
		element = element.replace(/href=/g, "");
		element = element.replace(/"/g, "");

		array[index] = element;
	});

	return hrefs;
}

function visitPage(page){
	request(page , (err, response, body) => {
	        if (err) { 
	        	return console.log(err);
	        }
	        console.log("Pagina: " + page);
	        console.log("Resultado: " + response.statusCode);
	        console.log("Data: " + getReleatedURLsList(body));
});
}