var SERVMETRIC_CDN_URL = 'https://dfsrovckda8bt.cloudfront.net/',
    WS2_CDN_URL = 'https://websurveys2.servmetric.com/',
    SERVMETRIC_VERSION = '2.2.0';
(function () {
    var snippet = document.createElement('script'),
		ws2_sources = [1156,1256,1283,1320,1405,1435,1444,1574,1601,1616,1619,1632,1639,1655,1686,1692,1696,1740,1771,1778,1788,1811,1827,1841,1850,1853,1860,1881,1884,1905,1906,1924,1937,1942,1945,1947,1961,1976,1982,1983,2098];
    try {
        var ws2_int = setInterval(function() {
            var links = document.getElementsByClassName('gm_sidebar_anchor');

            if(links.length) {
                var rPat = /theme\/(gm|sm|modal)\/(\d*)/;
            
                for (var i = 0; i < links.length; i++) {
					if(typeof links[i] !== "undefined") {
						var link = links[i],
							href = link.getAttribute('href'),
							rMatch = href.match(rPat);
						if (rMatch && rMatch.length >= 2) {
							if (ws2_sources.indexOf(parseInt(rMatch[2])) >= 0) {
								SERVMETRIC_CDN_URL = WS2_CDN_URL;
								link.setAttribute('href', href.replace('websurveys.', 'websurveys2.'));
							}
						}
					}
                }

                snippet.setAttribute('src', SERVMETRIC_CDN_URL + '/js/client/gm_intro.js?v=' + SERVMETRIC_VERSION);
                document.getElementsByTagName("head")[0].appendChild(snippet);

                clearInterval(ws2_int);
            }
        }, 100);
    } catch (e) { 
        clearInterval(ws2_int);
        snippet.setAttribute('src', SERVMETRIC_CDN_URL + '/js/client/gm_intro.js?v=' + SERVMETRIC_VERSION);
        document.getElementsByTagName("head")[0].appendChild(snippet); 
    }  
})();