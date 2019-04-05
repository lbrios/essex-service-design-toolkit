function cookieAcknowledgementCheck()
{
	var cookieName = "ecc_www_cookie";
	var currentCookieVersion = "1.1";	
	var cookieExpiryDays = "30";
	var cookieAcknowledgementMessage = "Our website uses cookies, these are small files of letters and numbers that are put on your device to improve your experience on the site. To find out more about our use of cookies please visit our <a href='/privacy-notices/Pages/Default.aspx'>Privacy and cookies policy</a>. By clicking any link on this page you are giving your consent for us to set cookies.";	
	var cookieAcknowledgementControlConfirmButtonText = "I understand";
	var cookieAcknowledgementControlConfirmBgColor = "#192a66";	
	var cookieAcknowledgementControlConfirmForeColor = "#ffffff";
	var cookieAcknowledgementControlConfirmLinkColor = "#ffffff";
	var cookieAcknowledgementControlConfirmButtonBgColor = "#d9d9d9";		
	var cookieAcknowledgementControlConfirmButtonForeColor = "#000000";
				
	if(!cookieName || cookieName == "")
	{
		if (window.console) {
			console.log("cookieName undefined");
		}		
	}
	else
	{							
		if(!acknowledgementCookieIsSet(cookieName, currentCookieVersion))
		{
			var cookieAcknowledgementControlId = "cookie-acknowledgement-control"
			var cookieAcknowledgementControlConfirmButtonId = "cookie-acknowledgement-control-button";
		
			// remove any existing controls hidden in the DOM
			if(jQuery("#"+cookieAcknowledgementControlId).length>0)
			{
				jQuery("#"+cookieAcknowledgementControlId).remove();
			}
			
			var cookieAcknowledgementMessageContainer = "<div id='" + cookieAcknowledgementControlId + "' class='cc-control'>" +
					"<div class='cc-container'>" +
						"<div class='cc-row'>" +
							"<div class='cc-col-8'>" +
								"<p class='cc-content'>" +
									cookieAcknowledgementMessage +
								"</p>" +
							"</div>" +
							"<div class='cc-col-4'>" +
								"<button class='cc-btn-confirm' id='" + cookieAcknowledgementControlConfirmButtonId + "' type='button' aria-label='Agree'>" +
									cookieAcknowledgementControlConfirmButtonText +
								"</button>" +
							"</div>" +
						"</div>" +
					"</div>" +
				"</div>";

		var cookieControlCss = "<style>.cc-control { background-color: " + cookieAcknowledgementControlConfirmBgColor + "; z-index:1000; position: fixed; bottom:0; left:0; }" +
				".cc-container { padding: 0px 0; } " +
				".cc-row {	margin: 10px; }" +
				".cc-col-8, .cc-col-4 { width: 100%; float: none; position: relative; min-height: 1px; }" +
				".cc-content { font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: " + cookieAcknowledgementControlConfirmForeColor + "; margin: 16px 0; }" +
				".cc-content a, .cc-content a:visited { color: " + cookieAcknowledgementControlConfirmLinkColor + "; text-decoration: underline; }" +
				".cc-btn-confirm { color: " + cookieAcknowledgementControlConfirmButtonForeColor + " !important; text-decoration: none  !important; cursor: pointer  !important; background-color: " + cookieAcknowledgementControlConfirmButtonBgColor + " !important; border: 1px solid transparent  !important; border-color: rgba(0,89,153,0)  !important; padding:10px  !important; font-size:18px  !important; font-weight:bold  !important; margin-left: 0px !important; font-family: Arial, Helvetica, sans-serif; /*border-radius: 10px  !important;*/}" +
				".cc-btn-confirm:hover { text-decoration: underline !important; }" +
				".cc-btn-confirm:focus { outline: none; }" +
				"/* Medium Devices, Desktops */" +
				"@media only screen and (min-width : 992px) { .cc-control { width:100%; } 	" +
				"	.cc-container { max-width: 970px; margin: 10px auto; } 	" +
				"	.cc-row { display: table; } 	 " +
				"	.cc-col-8	{	width: 83.33333333%; display: table-cell; }	" +
				"	.cc-col-4 {	width: 16.66666667%; display: table-cell; vertical-align: middle;	text-align: right; }}</style>"
		
			jQuery("body").append(cookieControlCss);
			jQuery("body").append(cookieAcknowledgementMessageContainer);
			
			// event handler for agree button	
			jQuery("#"+cookieAcknowledgementControlConfirmButtonId).on('click', function(){	
				setCookie(cookieName, currentCookieVersion, cookieExpiryDays);			
				if(acknowledgementCookieIsSet(cookieName, currentCookieVersion))
				{
						jQuery("#"+cookieAcknowledgementControlId).fadeOut("slow");		
				}		
			});				
		}			
	}
}

function getCookiesCollection()
{       
    if (document.cookie && document.cookie != '')
  	{
  		var decodedCookie = decodeURIComponent(document.cookie);
    	return decodedCookie.split(';');
    }
    
    return null;
}

function acknowledgementCookieIsSet(cookieName, version) 
{	
	  var cookieNameToFind = cookieName + "=";
    var cookieList = getCookiesCollection();
    
    if(cookieList != null)
    {
			for(var i = 0; i <cookieList.length; i++) 
	    {
        var thisCookie = cookieList[i];
        
        while (thisCookie.charAt(0) == ' ') 
        {
            thisCookie = thisCookie.substring(1);
        }
        
        if (thisCookie.indexOf(cookieNameToFind) == 0) 
        {
        	var thisCookieVersion = thisCookie.substring(cookieNameToFind.length, thisCookie.length);
        	
        	if(thisCookieVersion == version)
        	{
        		return true;
        	}    
        	else
        	{
						resetCookies(cookieName); // an older version cookie has been found so clean up
						return false;
        	}        
        }
	    }
    }            
    return false;
}

function resetCookies(cookieName)
{	
	var cookieNameToFind = cookieName + "=";
  var cookieList = getCookiesCollection();
  
  if(cookieList != null)
  {
		for(var i = 0; i <cookieList.length; i++) 
    {
        var thisCookie = cookieList[i];
        
        while (thisCookie.charAt(0) == ' ') 
        {
            thisCookie = thisCookie.substring(1);
        }
        
        if (thisCookie.indexOf(cookieNameToFind) == 0) 
        {
        	var thisCookieVersion = thisCookie.substring(cookieNameToFind.length, thisCookie.length);
        	deleteCookie(cookieName, thisCookieVersion)
        }
    }
  }
}

function setCookie(n, v, expiredays)
{	
		manageCookie(n, v, expiredays);
}

function deleteCookie(n, v) 
{
		manageCookie(n, v, 0);
}

function manageCookie(n, v, expiredays)
{	
	  var d = new Date();
 		
 		if(expiredays > 0)
 		{
 			d.setTime(d.getTime() + (expiredays*24*60*60*1000));
 		}
 		else
 		{
 			d.setTime(d.getTime() - 86400 * 1000);
 		}
 
    var expires = "expires="+ d.toUTCString(); 
    document.cookie = n + "=" + v + ";" + expires + ";path=/";
}

jQuery().ready(function() {	
	cookieAcknowledgementCheck();	
});