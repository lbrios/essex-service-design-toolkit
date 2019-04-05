function renderCurrentNavigationMenu()
{
	var crumbsSelector = "#crumbs ul li span span a";
	var leftNavOuterContainer = "#sidenav";
	var leftNavTemplate = "<ul></ul>"
	var homeLinkTemplate = "<li class='ecc-nav-home-link'><div>{HOME_LINK}</div></li>";
	var siteLinkTemplate = "<li class='ecc-nav-site-link'><div>{CURRENT_SITE}</div></li>";
	var currentSiteNavMenuTemplate = "<li class='ecc-nav-current'><ul>{CURRENT_SITE_NAVMENU}</ul></li></ul>";
	
	if(jQuery(crumbsSelector).length < 1)
	{
		return false;
	}
	
	if(jQuery(leftNavOuterContainer ).find("ul").eq(0).length < 1)
	{
		return false;
	}

	// get crumbs		
	var crumbsItems = jQuery(crumbsSelector);
	
	if(crumbsItems.length > 1)
	{		
		// nav content 
		var navigationMenuContent = "";
		
		// home link
		var homeLink = jQuery("<a>").attr("href", crumbsItems[0].href).text(crumbsItems[0].text);	
		navigationMenuContent += homeLinkTemplate.replace("{HOME_LINK}", homeLink[0].outerHTML);
		
		var siteCrumbPath = "";
		var siteCrumbHref = "";
		var siteCrumbText = "";
		var currentSiteLinkUrl = "";
		var currentSiteLinkText = "";
		
		// current site link
		jQuery(crumbsItems.get().reverse()).each(function(){
			var currentHref = jQuery(this).attr("href");
			var currentPath = currentHref.substring(0,currentHref.lastIndexOf("/")+1);
				
			if(siteCrumbPath == "")
			{
				siteCrumbPath = currentPath;
				siteCrumbHref = currentHref;
				siteCrumbText = jQuery(this).text();
			}
			
			if(siteCrumbPath == currentPath)
			{
				siteCrumbPath = currentPath;
				siteCrumbHref = currentHref;
				siteCrumbText = jQuery(this).text();
			}
			else
			{
				currentSiteLinkUrl = siteCrumbHref ;
				currentSiteLinkText = siteCrumbText;
				return false;
			}
		});
						
		var currentSiteLink = jQuery("<a>").attr("href", currentSiteLinkUrl).text(currentSiteLinkText);
		navigationMenuContent += siteLinkTemplate.replace("{CURRENT_SITE}", currentSiteLink[0].outerHTML);

		// current nav
		var leftNavElement = jQuery(leftNavOuterContainer).find("ul").eq(0);
		var leftNavContent = jQuery(leftNavElement).html();
		navigationMenuContent += currentSiteNavMenuTemplate.replace("{CURRENT_SITE_NAVMENU}", leftNavContent);
	
		navigationMenuContent =  jQuery(navigationMenuContent).wrap(leftNavTemplate);
	
		leftNavElement.replaceWith(navigationMenuContent);
	}
	
}