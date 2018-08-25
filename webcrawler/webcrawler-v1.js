const request = require('request');

var page = 'https://www.google.com.ar';

visitPage(page, "");

function getReleatedURLsList(body){
	var hrefPattern = /href="(.*?)"/g;

	var hrefs = body.match(hrefPattern);

	var links = {
		absolutes : [],
		relatives : []
	}

	if(hrefs){
		hrefs.forEach(function(element, index, array){
			element = element.replace(/href=/g, "");
			element = element.replace(/"/g, "");

			if(element.startsWith("/") && element.length > 1 && !element.startsWith("//")){
				links.relatives.push(element);
			}
			else{
				links.absolutes.push(element);	
			}
		});
	}

	return links;
}

function visitPage(rootPage, relative){
	var page = rootPage + relative;

	request(page, (err, response, body) => {
					if(err){
		        console.log("Pagina: " + page);
		        console.log("Resultado: Error");
		        console.log("Links Relativos: 0");
		        console.log("Links Absolutos: 0");

		        return;
					}

	        var links = getReleatedURLsList(body);

	        console.log("Pagina: " + page);
	        console.log("Resultado: " + response.statusCode);
	        console.log("Links Relativos: " + links.relatives.length);
	        console.log("Links Absolutos: " + links.absolutes.length);

	        if(links.relatives.length > 0){
	        	links.relatives.forEach(function(element, index, array){
							visitPage(rootPage, element);
						});
	        }
	});
}