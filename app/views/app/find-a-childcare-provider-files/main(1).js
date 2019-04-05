// create an empty associative array (in JavaScript it is called ... Object)
var locationsDictionary = {};   // huh? {} is a shortcut for "new Object()"
var categoriesDictionary = {};
var shortlistDictionary = {};
var iconsDictionary = {};
var resourceGroup = null;
//debugger;

var settings =
	{
	    position:
		{
		    lat: 51.734964,
		    lng: 0.4761971
		},
	    zoom: 10,
	    minSearchRadius: 1,
	    maxSearchRadius: 50,
	    initialSearchRadius: 8,
	    initialCategories: [],
	    infoWindowWidth: 300,
	    groups: [],
	    categories: [],
	    defaultMapHeight: 'med',
	    mapHeights: {
	        'xsml': 150,
	        'sml': 300,
	        'med': 450,
	        'lrg': 600,
	        'xlrg': 750
	    },
	    defaultListLength: 20,
	    listLengths: [[10, 20, 50, 100, -1], [10, 20, 50, 100, "All"]],
	    enableCategoryPanel: true,
	    enableFilterPanel: true,
	    enableResultsPanel: true,
	    enableSearchPanel: true,
	    enableSearchRadiusPanel: true,
	    enableUnitSystemPanel: true,
	    enableMarkerPlacement: false,

	    enableStreetView: true,
	    enableDrivingDirections: true,

	    webServiceEndpoint: "http://localhost:90/Services/MappingService.svc",
	    mapImageFolderUrl: "",
	    debug: true,
        btnDownloadPdfSelector: '#btnDownloadPdf', //Nov10
        siteColUrl:""
	};
//var dataUrl1 = '/_vti_bin/ResourceMapping/Mapping.svc/map/resource?lat=51.734964&lng=0.4761971000000358&radius=4.828032&categoryId=ccr-btg&groupId=2';
//var dataUrl2 = '/_vti_bin/ResourceMapping/Mapping.svc/map/resource?lat=51.734964&lng=0.4761971000000358&radius=4.828032&categoryId=ccr-asc&groupId=2';
//var dataUrl = settings.webServiceEndpoint + '/map/resource?lat=51.7347934&lng=0.47003589999997075&radius=4.828032&categoryId=ccr-asc%2Cccr-btg%2Cccr-brk%2Cccr-chc%2Cccr-chm%2Cccr-cre%2Cccr-dyn%2Cccr-hol%2Cccr-mns%2Cccr-nis%2Cccr-pre%2Cccr-psn&groupId=2';
var dataUrl;


var d = new Date();
var timeStamp = d.getTime();    //No. of millisecons sinc Jan 1 1970
var allCategoriesUrl;
var resourceGroupUrl;


var tabsObject = null;
var resultsTable = null;
var resultsTableSelector = '#resultsTable';
var mapPanelId = 'map-mappanel';
var mapImageFolderUrl;
var map = null;
var geocoder = null;
var marker = null; //Used for marker placement
var infoWindow = null;
var markersArray = [];
var searchPosition = null;
var messagDialogBox = null;
var debug;

var ajaxMessage = 'Please wait ...';
var ajaxActionStatus = '';

//Search Panel
var searchPanel = null;

//Category Panel
var categoryPanel = null;

// Search Radius Selectors
var _sSearchRadiusPanel = '#map-radiuspanel';  // Selector for the search radius panel
var _sSearchRadiusText = '#map-radius-text';   // Selector for the search radius text box (displays numeric value of slider)
var _sSearchRadiusUnitSelector = '#map-radius-unit'; //Selector for the search radius unit
var _sSearchRadiusIncreaseSelector = '#map-radius-increase'; //Selector for the search radius unit
var _sSearchRadiusDecreaseSelector = '#map-radius-decrease'; //Selector for the search radius unit
var _sSearchRadiusSlider = '#map-radius-slider'; // Selector for the search radius slider control

var unitLabel = "Miles";    // The text which will be added after distances (miles / kilometres)
var searchRadius;


var _sEmailDialog = '#map-dlg-email'; // Selector for email dialog

var _sMapSizePanel = '#map-sizepanel'; // Selector for the map size panel
var _sMapSizeButtons = '#map-sizepanel input[type="radio"]';   // Selector expression for the radio buttons in the map size panel

//Shortlist Panel
var shortListSectionHeaderId = 'map-report-section';
var shortListContainer = '#map-shortlistpanel';
var shortListPanelSelector = '#map-report';  // Selector for container element used to display the shortlist of selected locations 
var shortListHeaderSelector = '#map-shortlistpanel > h3';
var shortListTitleSelector = '#map-shortlistpanel > h3 a';
var shortListClearButtonSelector = '#map-shortlist-clear-button';
var shortListPrintButtonSelector = '#map-shortlist-print-button';
var shortListBackButtonSelector = '#map-shortlist-back-button';
var shortListEmailButtonSelector = '#map-button-email';
var shortlistAddToShortlistCaption = 'Add to Shortlist';
var shortlistRemoveFromShortlistCaption = 'Remove from Shortlist';

// Nov10
var btnDownloadPdfSelector = '#btnDownloadPdf';

// Reference to the email dialog. The email dialog object, EmailDialog, is created 
// only when needed in the event handler for the email button click.
var emailDialog = null;


//var Messages
var noResultsFoundMessage = '<p> We are sorry your search has shown no results. This means that we do not have details of any provision in that area. </p>';
noResultsFoundMessage   += '<p> You could try widening the radius of your search and/or changing the type of provision you are looking for. </p>';
noResultsFoundMessage   += '<p> If you need advice about other steps you could take to find childcare please contact the Family Information Service: </p>';
noResultsFoundMessage   += '<p> Tel:0800 055 6874 </p>';
noResultsFoundMessage += '<p> Email: fis@essex.gov.uk </p>';

var moreInfoTooltip = 'Click for more info about this provider';
var lessInfoTooltip = 'Click to close details';

var notfoundLat = 51.7659078;
var notfoundLng = 0.667366500000071;



function initVars() {
    //debugger; //Nov10
    dataUrl = settings.webServiceEndpoint + '/map/resource?lat=51.7347934&lng=0.47003589999997075&radius=4.828032&categoryId=ccr-asc%2Cccr-btg%2Cccr-brk%2Cccr-chc%2Cccr-chm%2Cccr-cre%2Cccr-dyn%2Cccr-hol%2Cccr-mns%2Cccr-nis%2Cccr-pre%2Cccr-psn&groupId=2';
    allCategoriesUrl = settings.webServiceEndpoint + '/map/resourcecategory/all?t=' + timeStamp;
    resourceGroupUrl = settings.webServiceEndpoint + '/map/resourcegroup/2';

    mapImageFolderUrl = settings.siteColUrl + "/_layouts/ecc/csp/images/MappingWebPart/MapIcons/";
    searchRadius = settings.initialSearchRadius;
    debug = settings.debug;

    // Nov10
    btnDownloadPdfSelector = settings.btnDownloadPdfSelector;

    //Set initial radius
    try {
        jQuery("#searchValue-Radius").val(settings.initialSearchRadius);
    }
    catch (e) {
    }

}

if (!jQuery) {
    alert('jQuery not loaded. Exiting.');
}

function oldDocReadyfn() {

    //getLocations(dataUrl,displayLocations,null,null);
    initializeResourceGroup();

    //Initialize Category Panel
    initializeCategoryPanel();

    initializeDataTable(resultsTableSelector);
    //initializeSearchPanel();

    initializeMap();

    //Setup Shortlist Panel
    initializeShortlistPanel();

    //Setup ajax spinner
    var ajaxSpinnerSelector = '#ajaxAnimationPanel';


    jQuery(ajaxSpinnerSelector)
    .hide()  // hide it initially
    .ajaxStart(function () {
        if (ajaxMessage.length === 0) ajaxMessage = 'Please wait';
        jQuery(this).find('#ajax-animationMessage').text = ajaxMessage;
        jQuery(this).show();
    })
    .ajaxStop(function () {
        ajaxMessage = '';    //Rollback
        jQuery(this).hide();
    });


    //Setup Tabs
    tabsObject = jQuery("#mainTabs").tabs();


    //Load categories
    //Generate a timestamp to avoid caching in browser. We are not turning off caching globally to make sure we should not hit the server unncessarily
    jQuery.getJSON(allCategoriesUrl, null, function (json) {
        updateCategoriesDictionary(json);

    });

    //No Search Slider
    //displaySearchRadiusSlider(settings.enableSearchRadiusPanel, settings.initialSearchRadius, settings.minSearchRadius, settings.maxSearchRadius);


    createMapSizeControl(true);

    // Hide the email dialog 
    jQuery(_sEmailDialog).hide();

    //jQuery('#map-searchButton').button();



}
//jQuery(document).ready();

//Initialize Settings
function initializeSettings(webPartsettings)
{
    jQuery.each(webPartsettings, function (key, value) {

        settings[key] = webPartsettings[key];

    });

    initVars();
    oldDocReadyfn();

}

//UI Functions
function displaySearchRadiusSlider(enable, initialRadius, minRadius, maxRadius) {

    if (!enable) {
        jQuery(_sSearchRadiusPanel).hide();
        return;
    }

    jQuery(_sSearchRadiusPanel).show();

    // Initialize the search radius slider control
    jQuery(_sSearchRadiusSlider).slider({
        range: "min",
        value: initialRadius,
        min: minRadius,
        max: maxRadius,
        // Display the updated numeric value of the slider as the user moves the slider.
        slide: function (event, ui) {
            //jQuery(_sSearchRadiusText).val(ui.value + " " + unitLabel);
            jQuery(_sSearchRadiusText).val(ui.value);
            jQuery(_sSearchRadiusUnitSelector).val(unitLabel);
            
        },

        // Notify the presenter when the user stops moving the slider
        change: function (event, ui) {
            onSearchRadiusChange(ui.value);
        }
    });

    //Setup Increase Decrease button

    jQuery(_sSearchRadiusIncreaseSelector).click(function () {
        var sliderCurrentValue = jQuery(_sSearchRadiusSlider).slider("option", "value");
        jQuery(_sSearchRadiusSlider).slider("value", sliderCurrentValue + 1);
        jQuery(_sSearchRadiusText).val(jQuery(_sSearchRadiusSlider).slider("value"));
    });

    jQuery(_sSearchRadiusDecreaseSelector).click(function () {
        var sliderCurrentValue = jQuery(_sSearchRadiusSlider).slider("option", "value");
        jQuery(_sSearchRadiusSlider).slider("value", sliderCurrentValue - 1);
        jQuery(_sSearchRadiusText).val(jQuery(_sSearchRadiusSlider).slider("value"));
    });

    // Display the initial value of the slider in the textbox
    //jQuery(_sSearchRadiusText).val(jQuery(_sSearchRadiusSlider).slider("value") + " " + unitLabel);
    jQuery(_sSearchRadiusText).val(jQuery(_sSearchRadiusSlider).slider("value"));
}

function onSearchRadiusChange(radius) {
    //searchRadius = this.toKilometres(radius);
    searchRadius = radius;

    // Remove anything in the results panel
    //this.view.clearResultsPanel();

    //this.updateMap();
}

function createMapSizeControl(enable) {
    if (!enable) {
        jQuery(_sMapSizePanel).hide();
        return;
    }

    jQuery(_sMapSizePanel).show();

    //Select the current height radio button
    jQuery(':radio[value=' + settings.defaultMapHeight + ']').attr('checked', true);
    
    jQuery('div', _sMapSizePanel).buttonset();

    // Bind event to all radio buttons.
    var radioButtons = jQuery(_sMapSizeButtons);
    radioButtons.bind('click', function (e) {
        onMapSizeButtonClick(e.target.value);
    });
}
function onMapSizeButtonClick(size) {
    setMapHeight(size);
}

function initializeShortlistPanel() {

    //Siwtch back to Search 
    jQuery(shortListBackButtonSelector).click(function (e) {
        tabsObject.tabs('select', 0);
    });

    //clear Shortlist
    jQuery(shortListClearButtonSelector).click(function (e) {
        clearShortlist();
    });

    //Email Shortlist
    jQuery(shortListEmailButtonSelector).click(function (e) {
        emailShortlist();
    });

    //Nov10 Download as PDF ServerSide
    jQuery(btnDownloadPdfSelector).click(function (e) {
        //debugger;
        if (isShortlistEmpty() === false) {

            //Record Analytic Event
            var shortlistCount = getShortListCount();
            recordAnalyticEvent('FIS - Shortlist', 'Download Shortlist', '', shortlistCount);

            var relReportUrl = getReportUrl(0);

            if (relReportUrl != '') {
                // This is POST call
                downloadShortlist();
            }
            else {
                displayMessage('PDF not available', 'PDF version of shortlist is not available. Please click OK to print directly from browser.');
                //alert('PDF version of shortlist is not available. Please click OK to print directly from browser.');
                window.print();
            }
        }
        else {
            //TODO: Change it to proper message
            displayMessage('Shortlist empty', 'Your shortlist is currently empty.  Please select and add your chosen providers to your shortlist before attempting to save, print or email.');
            _spFormOnSubmitCalled = true;
            return;
            //alert('Your shortlist is currently empty.  Please select and add your chosen providers to your shortlist before attempting to save, print or email.');
        }
        return resetFormSubmit();
    });

    //Download as PDF
    jQuery(shortListPrintButtonSelector).click(function (e) {
        //debugger;

        if (isShortlistEmpty() === false) {
            
            //Record Analytic Event
            var shortlistCount = getShortListCount();
            recordAnalyticEvent('FIS - Shortlist', 'Download Shortlist', '', shortlistCount);

            //var relReportUrl = getReportUrl(1);
            //var reportDownloadUrl = settings.webServiceEndpoint + '/map/download/' + relReportUrl;

            // This is POST call
            //downloadShortlist();

            var relReportUrl = getReportUrl(0);
            var reportDownloadUrl = settings.webServiceEndpoint + '/map/downloadall/' + relReportUrl;

            if (relReportUrl != '') {
                //window.open(reportDownloadUrl, '_blank', 'fullscreen=no,titlebar=no,toolbar=no,resizable=no');
                //window.open(fullReportUrl, '_blank');
            }
            else {
                displayMessage('PDF not available', 'PDF version of shortlist is not available. Please click OK to print directly from browser.');
                //alert('PDF version of shortlist is not available. Please click OK to print directly from browser.');
                window.print();
            }
        }
        else {
            //TODO: Change it to proper message
            displayMessage('Shortlist empty', 'Your shortlist is currently empty.  Please select and add your chosen providers to your shortlist before attempting to save, print or email.');
            //alert('Your shortlist is currently empty.  Please select and add your chosen providers to your shortlist before attempting to save, print or email.');
        }
    });
}

//Mapping Functions
function initializeMap() {
    // Set Google Map configuration options
    //
    //debugger;
    var options =
		{
		    scrollwheel: false,
		    zoom: settings.zoom,
		    center: new google.maps.LatLng(settings.position.lat, settings.position.lng),
		    mapTypeId: google.maps.MapTypeId.ROADMAP,
		    mapTypeControl: true,
		    mapTypeControlOptions:
				{
				    style: google.maps.MapTypeControlStyle.DEFAULT
				},
		    scaleControl: true,
		    streetViewControl: settings.enableStreetView
		};


    // Create the Google map
    map = new google.maps.Map(document.getElementById(mapPanelId), options);
    setMapHeight(settings.defaultMapHeight);

    // Google Maps Geocoder object
    geocoder = new google.maps.Geocoder();

    //Used for marker placement
    marker = null;

    //Set initial Search Position
    // The position from which searches for map resources are conducted.
    //		The value of this is set when the user searches for a location by entering 
    //		a placename in the location textbox and clicking the Find button. If the
    //		location is resolved successfully then the co-ordinates are stored in
    //		this variable.
    searchPosition = new google.maps.LatLng(settings.position.lat, settings.position.lng);

    // Create map icon dictionary
    //		This maps the symbolic icon names (defined in the resource category
    //		definition (IconName) to actual icons. These are used as location
    //		marker icons on the Google map.
    icons = {
        // Icon used to display the search origin location
        origin: new google.maps.MarkerImage(getFullMapImageUrl('home.png')),
        // Icons for childcare categories
        ccrasc: new google.maps.MarkerImage(getMapIconUrlByCategoryId('ccr-asc')),
        ccrbrk: new google.maps.MarkerImage(getMapIconUrlByCategoryId('ccr-brk')),
        ccrbtg: new google.maps.MarkerImage(getMapIconUrlByCategoryId('ccr-btg')),
        ccrchm: new google.maps.MarkerImage(getMapIconUrlByCategoryId('ccr-chm')),
        ccrchc: new google.maps.MarkerImage(getMapIconUrlByCategoryId('ccr-chc')),
        ccrcre: new google.maps.MarkerImage(getMapIconUrlByCategoryId('ccr-cre')),
        ccrdyn: new google.maps.MarkerImage(getMapIconUrlByCategoryId('ccr-dyn')),
        ccrhol: new google.maps.MarkerImage(getMapIconUrlByCategoryId('ccr-hol')),
        ccrmns: new google.maps.MarkerImage(getMapIconUrlByCategoryId('ccr-mns')),
        ccrpsn: new google.maps.MarkerImage(getMapIconUrlByCategoryId('ccr-psn')),
        ccrnny: new google.maps.MarkerImage(getMapIconUrlByCategoryId('ccr-nny')),
        ccrnis: new google.maps.MarkerImage(getMapIconUrlByCategoryId('ccr-nis')),
        ccrpre: new google.maps.MarkerImage(getMapIconUrlByCategoryId('ccr-pre')),
        // These icons are not currently used (other than for a test
        // version of Find My Nearest functionality).
        adultLearning: new google.maps.MarkerImage(getFullMapImageUrl('school.png')),
        countryPark: new google.maps.MarkerImage(getFullMapImageUrl('urbnpark.png')),
        library: new google.maps.MarkerImage(getFullMapImageUrl('library.png')),
        recycle: new google.maps.MarkerImage(getFullMapImageUrl('recycle.png'))
    };
}

function getFullMapImageUrl(fileName) {
    if (fileName == null) return fileName;
    return settings.mapImageFolderUrl + fileName;
}

function getMapIconUrlByCategoryId(categoryId) {
    if (categoryId == null || categoryId.length == 0) return categoryId;
    return this.getFullMapImageUrl(categoryId + '.png');
}

function setMapHeight(size) {
    var height = settings.mapHeights[size];
    if (height != null) {
        jQuery('#' + mapPanelId).height(height);
        google.maps.event.trigger(map, 'resize');

        
    }
}

function initializeResourceGroup() {
    jQuery.getJSON(resourceGroupUrl, null, function (json) {
        resourceGroup = json[0];
        initializeSearchPanel();
    });

}

function initializeCategoryPanel() {
    categoryPanel = new CategoryPanel();
    jQuery.getJSON(allCategoriesUrl, null, function (json) {
        if (json != null && json.length > 0) {
            var j = 0;
            for (var i = 0; i < json.length; i++) {
                var currentJsonItem = json[i];
                if (currentJsonItem != null && typeof currentJsonItem.Id != "undefined") {
                    //if(j==0) alert(currentJsonItem.Id);
                    categoriesDictionary[currentJsonItem.Id] = currentJsonItem;
                    j++;
                }
            }
        }

        categoryPanel.render(json);

    });
}

//Search Panel Functions
function initializeSearchPanel() {
    searchPanel = new SearchPanel();
    var searches =resourceGroup.Searches;
    searchPanel.displaySearches(searches);
    
}

function clearOverlays() {

    jQuery.each(locationsDictionary, function (index, loc) {
        var marker = loc.marker;
        if (typeof marker != "undefined" && marker != null) {
            marker.setMap(null);
        }
    });

    
}

function clearSearchOriginMarker() {
    if (typeof marker != "undefined" && marker != null) {
        marker.setMap(null);
        marker = null;
    }
}
function displayMapBestFitZoom() {

    var bounds = new google.maps.LatLngBounds();
    var isZoomRequired = false;

    jQuery.each(locationsDictionary, function (index, loc) {
        var marker = loc.marker;

        if (typeof marker != "undefined" && marker != null) {
            bounds.extend(marker.getPosition());
            isZoomRequired = true;
        }
    });
    if (searchPanel.searchCriteria.keyValue['Location'] != '') {
        //Add search location also
        var searchLoaction = new google.maps.LatLng(searchPanel.searchCriteria.position.lat, searchPanel.searchCriteria.position.lng);
        bounds.extend(searchLoaction);
        isZoomRequired = true;

    }

    if (isZoomRequired === true) {

        // This is needed to set the zoom after fitbounds, to make sure we have enough detailed zoom
        google.maps.event.addListener(map, 'zoom_changed', function () {
            zoomChangeBoundsListener = google.maps.event.addListener(map, 'bounds_changed', function (event) {
            if (this.getZoom() > 15 && this.initialZoom == true) {
                // Change max/min zoom here
                this.setZoom(15);
                this.initialZoom = false;
            }
            google.maps.event.removeListener(zoomChangeBoundsListener);
        });
        });
        map.initialZoom = true;
        map.fitBounds(bounds);

    }
}

function RefreshMap() {
    //debugger;
    for (Id in locationsDictionary) {
        // for-in loop goes over all properties including inherited properties
        // let's use only our own properties
        if (locationsDictionary.hasOwnProperty(Id)) {
            loc = locationsDictionary[Id];

            if (typeof loc.marker == "undefined") {

                var categoryId = loc.Category[0];
                var iconKey = categoryId.replace(/-/g, ""); //To remove dash from Category id
                loc.marker = new google.maps.Marker({
                    position: new google.maps.LatLng(loc.Lat, loc.Lng),
                    title: loc.Name,
                    map: map,
                    icon: icons[iconKey]
                });
                // Create event listener for the InfoWindow
                (function (loc1, marker1) {
                    google.maps.event.addListener(marker1, 'click', function () {
                        var content;

                        // Check to see if we've already got an InfoWindow object
                        if (!infoWindow) {
                            // Creating a new InfoWindow
                            infoWindow = new google.maps.InfoWindow({ maxWidth: settings.infoWindowWidth });
                        }

                        // Adding the content to the InfoWindow
                        content = getInfoWindowContent(loc1);
                        infoWindow.setContent(content);
                        // Open the InfoWindow
                        infoWindow.open(map, marker1);
                    });
                })(loc, loc.marker);
            }

        }
    }

    displayMapBestFitZoom();

}



function getInfoWindowContent(loc) {
    var s;
    var fieldDef;
    var fieldValue;
    var categoryId = loc.Category[0];
    var cat = categoriesDictionary[categoryId];

    s = '<div class="map-infoview">';
    s += '<table class="map-table">';
    for (var k = 0; k < cat.BubbleView.length; k++) {
        fieldDef = cat.BubbleView[k];
        fieldValue = loc.Fields[fieldDef.Name];
        if (fieldValue != null && fieldValue.length > 0) {
            // Convert nerwlines into line-break tags
            fieldValue = fieldValue.replace(/\n/g, "<br />");

            s += '<tr>';

            s += '<td>';
            s += fieldDef.DisplayName;
            s += '</td>';

            s += '<td>';
            s += fieldValue;
            s += '</td>';
            s += '</tr>';
        }
    }
    s += '</table>';
    s += '<p>Please see the list below for more details about this provider.</p>';
    s += '</div>';

    return s;
}

// Purpose:
//		Get the co-ordinates corresponding to a placename 
//
// Remarks:
//		Uses google maps to determine the co-ordinates of the placename entered
//		- the handler argument is a callback that can be used to continue
//		  processing, the handler receives the resolved co-ordinates.
//
function getCoordinates (address, handler) {
    // Check to see if we already have a geocoded object. If not we create one
    if (!geocoder) {
        geocoder = new google.maps.Geocoder();
    }


    if (address.search(/\bUK\b/i) == -1) {
        if (address.search(/\bEssex\b/i) == -1)
            address += ', Essex';

        address += ', UK';
    }

    // Creating a GeocoderRequest object
    //		Use the region tag 'GB' to bias Google geocoder results towards places within the UK.
    var geocoderRequest = {
        address: address,
        region: 'GB'
    }

    
    // Making the Geocode request
    geocoder.geocode(geocoderRequest, function (results, status) {
        // Check if status is OK before proceeding
        if (status == google.maps.GeocoderStatus.OK) {
            var position = results[0].geometry.location;

            //Set Search position in search criteria
            searchPanel.searchCriteria.position.lat = position.lat();   //Lat Long
            searchPanel.searchCriteria.position.lng = position.lng();   //Lat Long
            //alert('geocoderRequest');
            // Center the map on the returned location
            map.setCenter(position);

            // Display a marker at the returned location
            setSearchOriginMarker(position);


            // Check to see if we've already got an InfoWindow object
            if (!infoWindow) {
                // Creating a new InfoWindow
                infoWindow = new google.maps.InfoWindow({ maxWidth: 300 });
            }

            // Creating the content of the InfoWindow to the address
            // and the returned position
            var content = '<strong>' + results[0].formatted_address + '</strong><br />';

            if (settings.debug)
                content += '( ' + position.lat() + ', ' + position.lng() + ' )<br />';

            // Adding the content to the InfoWindow
            infoWindow.setContent(content);
            // Opening the InfoWindow
            infoWindow.open(map, marker);

            //Invoke the handler, passing the co-ordinates.
            if(handler)
            {
                handler(position);
            }

        }
    });
}

function setSearchOriginMarker (latLng) {
    // Check to see if we've already got a Marker object
    if (!marker) {
        marker = new google.maps.Marker({
            position: latLng,
            title: "Your Location",
            map: map,
            icon: icons["origin"]
        });
    }
    
    marker.setPosition(latLng);
}


function initializeDataTable(tableSelector) {
    resultsTable = jQuery(tableSelector).dataTable({
        "bJQueryUI": false,
        "bFilter": true,
	"aaSorting": [[ 4, "asc" ]],
        "aLengthMenu": [[10, 20, 50,100, -1], [10, 20, 50, 100, "All"]],
        "iDisplayLength": settings.defaultListLength,
        "sDom": 'Test<"#resultsTableHeader"f>rt<"bottom"ilp><"clear">',
        "sPaginationType": "four_button",
        "oLanguage": {

            "sInfo": "Showing records _START_ to _END_ of _TOTAL_",
            "sEmptyTable": "",
            "sZeroRecords": "No records matched."


        },
        
        "bAutoWidth": false,
        "fnDrawCallback": function (oSettings) {
            syncResultsTable(oSettings);
        },
        "aoColumns": [
				{
				    "sTitle": "More Info",
				    "sClass": "center-align",
				    "fnRender": function (obj) {
				        var val = obj.aData[obj.iDataColumn];
				        //return '<img colType="moreInfo" src="/_layouts/images/ResourceMappingWebPart/show-details.png" />';
				        //return '<span colType="moreInfo" class="ui-icon ui-icon-triangle-1-e" style="cursor:hand;cursor:pointer;vertical-align:middle;"></span>';
				        //return '<img colType="moreInfo" src="/_layouts/ecc/csp/images/MappingWebPart/details_open.png" class="moreInfo" />';
				        return '<span colType="moreInfo" class="moreInfo" title="Click for more info about this provider" ></span>';
				    },
				    "bSearchable": false,
				    "bSortable": false,
				    "sWidth": "10px"
				},


				{
				    "sTitle": "",
				    "sClass": "",
				    "fnRender": function (obj) {
				        var val = obj.aData[obj.iDataColumn];
				        return '<img style="height:16px;width:16px;" src="' + getMapIconUrlByCategoryId(val) + '" catId="' + val + '"/>';

				    },
				    bUseRendered: false,
				    "sWidth": "20px"
				},
				{
				    "sTitle": "Id",
				    "bSearchable": false,
				    "bVisible": false,
				    "sWidth": "20px"
				},
				{
				    "sTitle": "Name",
				    "sWidth": "280px"
				},
				{
				    "sTitle": "Distance (miles)",
				    "sClass": "right-align",
				    "fnRender": function (obj) {
				        var val = obj.aData[obj.iDataColumn];
				        if (val === -1) {
				            return 'N/A';
				        }

				        return val.toFixed(1); //Round to 1 decimal place

				    },
				    "sWidth": "40px",
				    "sType": "numeric"

				},
				{
				    "sTitle": "Funded Places for 2 yr olds",
				    "sClass": "center-align",
				    "sWidth": "50px"
				},
				{
				    "sTitle": "Funded Places for 3-4 yr olds",
				    "sClass": "center-align",
				    "sWidth": "50px"
				},
                {
                    "sTitle": "Add to Shortlist",
                    "sClass": "center-align",
                    "fnRender": function (obj) {
                        var locId = obj.aData[obj.iDataColumn];
                        if (isShortlisted(locId)) {
                            //Shortlisted, so display it as checked
                            sReturn = '<input colType="shortlist" checked="checked" type="checkbox" value="' + locId + '"></input>';
                        }
                        else {
                            //Not shortlisted
                            sReturn = '<input colType="shortlist" type="checkbox" value="' + locId + '"></input>';
                        }
                        return sReturn;
                    },
                    bSortable: false,
                    "sWidth": "45px"
                }

			]
    });

    addViewShortlistLink('resultsTableHeader');

    //Attach Row event
    // 'open' an information row when a row is clicked on
    /* Add event listener for opening and closing details
    * Note that the indicator for showing which row is open is not controlled by DataTables,
    * rather it is done here
    */
    jQuery(resultsTableSelector + ' tbody td span[colType="moreInfo"]').live('click', function () {
        var nTr = this.parentNode.parentNode;
        //alert('Yes');
        //'<span colType="moreInfo" class="ui-icon ui-icon-triangle-1-e"></span>';

        if (jQuery(this).is('.lessInfo')) {
            /* This row is already open - close it */
            jQuery(this).removeClass('lessInfo');
            jQuery(this).addClass('moreInfo');

            jQuery(this).attr('title', moreInfoTooltip);


            jQuery('div.map-locationdetail', jQuery(nTr).next()[0]).slideUp(function () {
                resultsTable.fnClose(nTr);
            });



            //resultsTable.fnClose(nTr);
        }
        else {
            /* Open this row */
            jQuery(this).removeClass('moreInfo');
            jQuery(this).addClass('lessInfo');
            jQuery(this).attr('title', lessInfoTooltip);

            var detailsRow = resultsTable.fnOpen(nTr, formatDetailContent(resultsTable, nTr), 'details');
            jQuery('div.map-locationdetail', detailsRow).slideDown();
            //anOpen.push(nTr);
        }
    });


    //Row click
    jQuery(resultsTableSelector + ' tbody tr').live('click', function () {
        var nTr = this.parentNode.parentNode;
        var currentRowCheckbox = jQuery('input[colType="shortlist"]', this);
        if (currentRowCheckbox.length > 0) {

            var locId = jQuery('input[colType="shortlist"]', this).val();
            var loc = locationsDictionary[locId];
            if (typeof loc != 'undefined' && loc != null) {

                if (loc.marker != null)
                    google.maps.event.trigger(loc.marker, 'click');
            }
        }
    });



    //Shortlist event
    jQuery(resultsTableSelector + ' tbody td input[colType="shortlist"]').live('click', function () {
        //debugger;
        var nTr = this.parentNode.parentNode;
        //alert('Yes');
        var locId = this.value;
        var selectedLocation = null;
        var targetButton = jQuery('input[buttonType="addRemoveShortlist"][locId="' + locId + '"]');
        if (this.checked) {
            //Add to Shortlist
            addToShortlist(locId);
            updateAddRemoveShortlistButtonCaption(locId, true);
        }
        else {
            //Delete from Shortlist
            removeFromShortlist(locId);
            updateAddRemoveShortlistButtonCaption(locId, false);
        }

    });
}

function syncResultsTable(oSettings) {
    //Perform all aftework here
    try {
        jQuery(resultsTableSelector + ' tbody td input[colType="shortlist"]').attr('checked', false);
        jQuery.each(shortlistDictionary, function (index, loc) {
            var checkBoxSelector = 'input[type="checkbox"][colType="shortlist"][value="' + loc.Id + '"]';
            jQuery(checkBoxSelector).attr('checked', true);
        });
    }
    catch (e) {
    }


}

//Shortlist Functions
function displayShortlist() {
    //Siwtch to Shortlist
    tabsObject.tabs('select', 1);
}
function addToShortlist(locId) {
    selectedLocation = locationsDictionary[locId];
    shortlistDictionary[locId] = selectedLocation;

    //Uncheck the box
    setShortListCheckBox(locId, true);
    
    updateShortlistView();
    updateLocationInShortListUI(locId);
}
function removeFromShortlist(locId) {
    //Delete from Shortlist
    delete shortlistDictionary[locId];

    //Uncheck the box
    setShortListCheckBox(locId, false);
    
    updateShortlistView();
    updateLocationInShortListUI(locId);
}
function setShortListCheckBox(locId, status) {
    //Uncheck the box
    var checkBoxSelector = 'input[type="checkbox"][colType="shortlist"][value="' + locId + '"]';
    jQuery(checkBoxSelector).attr('checked', status);
}
function clearShortlist() {

    //Step 1: Uncheck all selected checkboxes in results panel
    try {
        jQuery.each(shortlistDictionary, function (index, loc) {
            setShortListCheckBox(loc.Id, false);
        });
    }
    catch (e) {
    }

    //Step 2: Set the count to zero
    updateShortlistItemCount(0);
    
    //Step 3: Set Shortlist object to empty object
    shortlistDictionary = {};

    //Step 4: Clear the Shortlist UI
    jQuery(shortListPanelSelector).empty();

    //step 5: Clear My Notes field
    jQuery('#txtUserComments').attr('value', '');

    //step 6: Clear Email dialogue fields
    jQuery('#map-dlg-email-rcpt-email').attr('value', '');
    jQuery('#map-dlg-email-sndr-body').attr('value', '');
    
}
function isShortlistEmpty() {

    var shortListEmpty = true;
    for (var k in shortlistDictionary) {
        if (shortlistDictionary.hasOwnProperty(k)) {
            shortListEmpty = false;
            break;
        }
    }
    return shortListEmpty;
}
function emailShortlist() {
    //debugger;
    if (isShortlistEmpty() === true) {

        displayMessage('Shortlist empty', 'Your shortlist is currently empty.  Please select and add your chosen providers to your shortlist before attempting to save, print or email.');
        //alert('Your shortlist is currently empty.  Please select and add your chosen providers to your shortlist before attempting to save, print or email.');
    }
    else {

        if (emailDialog === null)
            emailDialog = new EmailDialog();

        emailDialog.open(function () {
            _this.onEmailDialogOK();

        });
    }
}
// Added: 09-Nov-2012 - for handling http post download
function downloadShortlist() {
    //debugger;
    if (isShortlistEmpty() === true) {

        displayMessage('Shortlist empty', 'Your shortlist is currently empty.  Please select and add your chosen providers to your shortlist before attempting to download.');
        //alert('Your shortlist is currently empty.  Please select and add your chosen providers to your shortlist before attempting to download.');
    }
    else {
        var p = {
            fullShortListReportUrl: getReportUrl(0)
        };

        jQuery("#h_downloadReq").val(p.fullShortListReportUrl);

        //shortlistPostDownload(p);
    }
}

function shortlistPostDownload(args, responseHandler, sendHandler, completeHandler) {
    debugger; //9Nov, refactored 10Nov
    // Set value of hidden variable = h_downloadRequest

    jQuery("input[id=h_downloadReq]").val(args.fullShortListReportUrl);
    jQuery("#h_downloadReq").val(args.fullShortListReportUrl);
    jQuery(".txt_h_downloadReq").val(args.fullShortListReportUrl);

//    var url = settings.webServiceEndpoint + '/map/downloadall';
//    var form = $('<form action="' + url + '" method="post">' +
//  '<input type="text" name="fullShortListReportUrl" value="' + JSON.stringify(downloadRequest) + '" />' +
//  '</form>');
//    $('body').append(form);
//    $(form).submit();


//    ajaxMessage = 'Downloading shortlist ...';
//    ajaxActionStatus = '';

//    jQuery.ajax(
//		{
//		    url: settings.webServiceEndpoint + "/map/downloadall",
//		    type: 'POST',
//		    dataType: 'json',
//		    data: JSON.stringify(downloadRequest),
//		    contentType: 'application/json; charset=utf-8',

//		    beforeSend: function (jqXHR, settings) {
//		        //debugger;
//		        if (sendHandler)
//		            sendHandler();
//		    },
//		    success: function (response) {
//		        debugger;
//                if(response) {
//                    if (response.path) {
//                        var dlif = jQuery('<iframe/>', { 'src': data.path }).hide();
//                        //Append the iFrame to the context
//                        this.append(dlif);
//                    }
//                }

//		        if (responseHandler)
//		            responseHandler();
//		    },
//		    error: function (jqXHR, textStatus, errorThrown) {
//		        debugger;
//		        //alert( "The server encountered an error processing the request." );
//		        alert(errorThrown.toString());
//		    },
//		    complete: function (jqXHR, textStatus) {
//		        debugger;
//		        if (completeHandler)
//		            completeHandler();
//		    }
//		});
} // end function shortlistPostDownload()

function resetFormSubmit() {
    //debugger;

    if (_spFormOnSubmitCalled) _spFormOnSubmitCalled = false;
    return true;
}


function getCategorySectionId(categoryId) {
    return 'map-report-section' + categoryId;
}
function updateShortlistView() {

    var total = getShortListCount();
    updateShortlistItemCount(total);
}

function getShortListCount() {
    var total = 0; //checkl
    try {
        jQuery.each(shortlistDictionary, function (index, loc) {
            total++;

        });
    }
    catch (e) {
    }
    return total;

}
function updateShortlistItemCount(itemCount) {
    jQuery('#map-basket-text').text('My Shortlist: (' + itemCount + ')');
    if (itemCount > 0) {
        jQuery('#resultsTableHeader :input[type=button]').attr('value', 'View Shortlist: (' + itemCount + ')');
    }
    else {
        jQuery('#resultsTableHeader :input[type=button]').attr('value', 'View Shortlist');
    }
}
function updateLocationInShortListUI(locId) {

    var selector = '#map-reportitem-' + locId;
    //check if location is in Shortlist dictionary
    var loc = shortlistDictionary[locId];
    if (typeof loc == "undefined") {
        //loaction has been removed from Shortlist. Remove it from UI too
        // remove the location from the shortlist
        var sectionDiv = null;
        if (jQuery(selector).length > 0) {
            sectionDiv = jQuery(selector).parent('div');
            jQuery(selector).remove();
        }
        // remove the section header if it is empty
        if (jQuery('.map-reportitem', sectionDiv).length <= 0) {
            jQuery(sectionDiv).remove();
        }
        return;
    }

    var categoryId = loc.Category[0];
    var _sShortListPanel = '#map-report';




    //determine whether the location has already been added
    if (jQuery(selector).length > 0)
        return;

    // get the section id & jquery selector strings
    var sectionId = getCategorySectionId(categoryId);
    var sectionSelector = '#' + sectionId;

    // add the section header (if this is a new section)
    if (jQuery(sectionSelector).length <= 0) {
        s = sectionHeaderContent(categoryId);
        jQuery(_sShortListPanel).append(s);
    }

    // generate the markup for the location
    s = formatShortlistContent(loc);

    jQuery(sectionSelector).append(s);
}

function isShortlisted(locId) {
    var loc = shortlistDictionary[locId];
    if (typeof loc == "undefined") {
        return false; //Not shortlisted
    }
    return true; //Shortlisted
}

function getReportUrl(doEncode) {
    var _this = this;
    var fullReportUrl = '';
    var i = 0;

    var selectedReportIds = '';

    try {
        jQuery.each(shortlistDictionary, function (index, loc) {
            if (i === 0) {
                selectedReportIds += loc.Id;
            }
            else {
                selectedReportIds += ',' + loc.Id;
            }
            i = i + 1;

        });
    }
    catch (e) {
    }

    if (selectedReportIds != '') {
        var reportServerUrl = settings.reportServerUrl;
        var reportUrl = settings.shortListReportUrl;
        var userComments = '';
        //debugger;
        var objUserComments = jQuery('#txtUserComments');
        if (jQuery(objUserComments).length > 0) {
            userComments = jQuery(objUserComments).val();
            if (userComments != null && userComments.length > 0) {
                userComments = JSON.stringify(userComments);
                userComments = userComments.substring(1, userComments.length - 1);
            }
        }

        if (reportServerUrl != '' && reportUrl != '') {
            var reportRenderCommand = '&rs:Command=Render&rs:Format=PDF';
            // partialReportUrl will not include comments
            var partialReportUrl;

            if (userComments != '' && userComments.indexOf('Comments entered here will be included when you ') == -1) {
                partialReportUrl =  reportUrl + '&p_resourceIdList=' + selectedReportIds + '&p_Comments=' + userComments + reportRenderCommand;
            }
            else {
                partialReportUrl =  reportUrl + '&p_resourceIdList=' + selectedReportIds + reportRenderCommand;
            }
            if (doEncode) { // Http GET download.
                //debugger;
                // if doEncode, this is partialReportUrl we want to keep
                partialReportUrl = reportUrl + '&p_resourceIdList=' + selectedReportIds + reportRenderCommand;

                var encodedFullReportUrl = encodeURIComponent(reportServerUrl + '?' + partialReportUrl);
                var encodedReportServerUrl = encodeURIComponent(reportServerUrl + '?');
                var encodedpartialReportUrl = encodedFullReportUrl.substring(encodedReportServerUrl.length, encodedFullReportUrl.length);

                partialReportUrl = encodedpartialReportUrl.replace(/%/g, '_per_');
                fullReportUrl = partialReportUrl;
            }
            else
                fullReportUrl = reportServerUrl + '?' + partialReportUrl;
        }
    }

    //Debug
    //jQuery('#testPanel').append('</br><span>' + fullReportUrl + '</span>');
    return fullReportUrl;
}

function sectionHeaderContent(categoryId) {
    var s;
    var sectionId = getCategorySectionId(categoryId);
    s = '<div id="' + sectionId + '" class="' + 'map-report-section' + '">';
    categoryName = categoriesDictionary[categoryId].Name;
    //s += '<h2>' + categoryName + '</h2>';
    s += '<div class="shortlist-category-header" >' + categoryName + '</div>';
    s += '</div>';
    return s;
}

function formatShortlistContent(loc) {
    var s;
    var fieldDef;
    var fieldValue;
    var _this = this;

    var locationId = loc.Id;
    var categoryId = loc.Category[0];
    var anchorId = 'shl-' + locationId;
    var listId = 'map-reportitem-' + locationId;

    var removeFromShortlistMarkup = getShortAddRemovelistButtonMarkup(locationId,'float:right;margin-top:-27px;');

    s = '<div id="' + listId + '" class="' + 'map-reportitem' + '">';

    s += '<div class="shortlist-resource-header" >';
    s += '<div class="shortlist-resource-name">' + loc.Name + '</div>';
    s += removeFromShortlistMarkup;
    s += '</div>';
    s += '<dl>';

    ////////////////////////////////////
    // Iterate like so.  The jQueryH() construct creates a prototype-extended Hash.
    var fields = loc.Fields;
    var detailView = categoriesDictionary[categoryId].DetailView;

    jQuery.each(detailView, function (key, value) {
        var fieldDef = value.DisplayName;
        var fieldValue = fields[value.Name];

        var customFormattedValue = fieldValue;

        if (fieldValue != null && fieldValue.length > 0) {
            // Convert newlines into line-break tags
            fieldValue = fieldValue.replace(/\n/g, "<br />");

            //Check if custom formatting function is defined
            if (typeof customFormatFieldValue != "undefined") {
                //Custom formatting is defined therefore, call it
                customFormattedValue = customFormatFieldValue(value.Name, fieldValue, loc);
            }
        }
        else {
            customFormattedValue = '';
        }

        //Add field 
        s += '<dt>';
        s += fieldDef;
        s += '</dt>';

        s += '<dd>';
        s += customFormattedValue;
        s += '</dd>';


    });

    s += '</dl>';
    s += '<div style="clear:both" />';
    s += '</div>';

    return s;
}

function getMapIconUrlByCategoryId(categoryId) {
    if (categoryId == null || categoryId.length == 0) return categoryId;
    return getFullMapImageUrl(categoryId + '.png');
}
function getFullMapImageUrl(fileName) {
    if (fileName == null) return fileName;
    return mapImageFolderUrl + fileName;
}

function RefreshTable(searchCriteria, mergeFlag) {

    var categoriesForSearch = getSelectedCategoriesCSV();
    
    //Generate a timestamp to avoid caching in browser. We are not turning off caching globally to make sure we should not hit the server unncessarily
    var d = new Date();
    var timeStamp = d.getTime();    //No. of millisecons sinc Jan 1 1970

    var requestParams = {
        address: searchCriteria.keyValue['Location'],
        name: searchCriteria.keyValue['ProviderName'],
        resourceIdentifier: searchCriteria.keyValue['OfstedReference'],
        lat: searchCriteria.position.lat,
        lng: searchCriteria.position.lng,
        radius: searchCriteria.keyValue['Radius'],
        categoryId: categoriesForSearch,
        groupId: settings.groups[0],  //We wil not support multiple groups
        timestamp: timeStamp
    };
    var searchUrl = settings.webServiceEndpoint + '/map/search';


    jQuery.getJSON(searchUrl, requestParams, function (json) {

        displaySearchResults(json, false);

    });

}
function displaySearchResults(json, mergeFlag) {
    //Record search Event
    recordSearchEvent(json.length);


    //Update locations dictionary 
    updateLocationsDictionary(json, mergeFlag);

    //alert(locations.length);
    //table = jQuery(tableId).dataTable();

    oSettings = resultsTable.fnSettings();

    resultsTable.fnClearTable(this);


    // go over all keys and values in our dictionary
    for (Id in locationsDictionary) {
        // for-in loop goes over all properties including inherited properties
        // let's use only our own properties
        if (locationsDictionary.hasOwnProperty(Id)) {
            currentItem = locationsDictionary[Id];
            var itemToAdd = [
			currentItem.Category[0],
			currentItem.Category[0],
			currentItem.Id,
			currentItem.Name,
			currentItem.Distance,
			currentItem.Fields.FundedPlaces2yr,
			currentItem.Fields.FundedPlaces3_4yr,
            currentItem.Id

		];
            resultsTable.oApi._fnAddData(oSettings, itemToAdd);
        }
    }

    oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();

    //Set no results found message, if there is no data
    if (json.length === 0) {
        resultsTable.dataTableSettings[0].oLanguage.sEmptyTable = noResultsFoundMessage;
    }
    else {
        resultsTable.dataTableSettings[0].oLanguage.sEmptyTable = '';
    }

    //Finally, draw the table
    resultsTable.fnDraw();



    //Update Statistics
    categoryPanel.updateCategoryLocationCounts();

    RefreshMap();
}
function RefreshTableOld(selectedCategories,mergeFlag) {

    var requestParams = {
        lat: searchPosition.lat(),
        lng: searchPosition.lng(),
        radius: searchRadius,
        categoryId: selectedCategories,
        groupId: settings.groups[0]  //We wil not support multiple groups
    };
    var searchUrl = settings.webServiceEndpoint + '/map/resource';


    jQuery.getJSON(searchUrl, requestParams, function (json) {

        //Update locations dictionary 
        updateLocationsDictionary(json, mergeFlag);

        //alert(locations.length);
        //table = jQuery(tableId).dataTable();

        oSettings = resultsTable.fnSettings();

        resultsTable.fnClearTable(this);


        // go over all keys and values in our dictionary
        for (Id in locationsDictionary) {
            // for-in loop goes over all properties including inherited properties
            // let's use only our own properties
            if (locationsDictionary.hasOwnProperty(Id)) {
                currentItem = locationsDictionary[Id];
                var itemToAdd = [
			currentItem.Category[0],
			currentItem.Category[0],
			currentItem.Id,
			currentItem.Name,
			currentItem.Distance,
			currentItem.Fields.FundedPlaces2yr,
			currentItem.Fields.FundedPlaces3_4yr,
            currentItem.Id

		];
                resultsTable.oApi._fnAddData(oSettings, itemToAdd);
            }
        }

        oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
        resultsTable.fnDraw();

        //Update Statistics
        categoryPanel.updateCategoryLocationCounts();

        RefreshMap();

    });
    
}



/* Formating function for row details */
function fnFormatDetails(oTable, nTr) {
    var aData = oTable.fnGetData(nTr);
    var sOut = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">';
    sOut += '<tr><td>Rendering engine:</td><td>' + aData[2] + ' ' + aData[3] + '</td></tr>';
    sOut += '<tr><td>Link to source:</td><td>Could provide a link here</td></tr>';
    sOut += '<tr><td>Extra info:</td><td>And any further details here (images etc)</td></tr>';
    sOut += '</table>';

    return sOut;
}

// Purpose:
//		Generates HTML markup for displaying expanded location details
//
// Parameters:
//		loc 	(object) The Location object.
//
//		view 	(object). Object that describes the content to be
//				displayed. 
//		
//		listId 	(string) The ID of the location list 
//
// Return Value:
//		(string) A string containing the HTML markup.
//
function formatDetailContent(oTable, nTr) {
    //loc, view, listId
    //debugger;
    var aData = oTable.fnGetData(nTr);
    var loc = locationsDictionary[aData[2]];

    var s;
    var fieldDef;
    var fieldValue;
    var categoryId = loc.Category[0];

    s = '<div id="details-' + loc.Id + '" class="' + 'map-locationdetail' + '" style="display:none;">';
    s += '<dl>';


    // Iterate like so.  The jQueryH() construct creates a prototype-extended Hash.
    var fields = loc.Fields;
    var detailView = categoriesDictionary[categoryId].DetailView;

    jQuery.each(detailView, function (key, value) {

        var fieldDef = value.DisplayName;
        var fieldValue = fields[value.Name];

        var customFormattedValue = fieldValue;

        if (fieldValue != null && fieldValue.length > 0) {
            // Convert newlines into line-break tags
            fieldValue = fieldValue.replace(/\n/g, "<br />");

            //Check if custom formatting function is defined
            if (typeof customFormatFieldValue != "undefined") {
                //Custom formatting is defined therefore, call it
                customFormattedValue = customFormatFieldValue(value.Name, fieldValue, loc);
            }
        }
        else {
            customFormattedValue = '';
        }

        //Add field 
        s += '<dt>';
        s += fieldDef;
        s += '</dt>';

        s += '<dd>';
        s += customFormattedValue;
        s += '</dd>';


    });
    var shortlistedStatus = isShortlisted(loc.Id);
    s += '</dl>';
    s += '<div id="details-actions" style="float:right;padding-bottom:10px;padding-right:10px">';
    //s += '<input type="button" value="Shortlist this Provider" locId="' + loc.Id + '" onclick=" addRemoveShortlist(this)" class="button" />';
    s += getShortAddRemovelistButtonMarkup(loc.Id);
    s += '<input type="button" value="View Shortlist"  onclick="displayShortlist()" class="button" style="margin-left:10px;"/>';
    s += '</div>';
    s += '</div>';

    return s;
}
function getShortAddRemovelistButtonMarkup(locId,style) {

    if (locId != null && locId.length > 0) {
        var shortlistedStatus = isShortlisted(locId);
        var buttonStyle = '';
        if (style != null && style.length > 0) {
            buttonStyle = 'style="' + style + '"';
        }
        var buttonCaption = shortlistedStatus ? 'Remove from shortlist' : 'Add to shortlist';
        return '<input buttonType="addRemoveShortlist" type="button" ' + buttonStyle + 'value="' + buttonCaption + '" locId="' + locId + '" onclick="addRemoveShortlist(this)" class="button" />';
    }
    return '';
}
function addRemoveShortlist(target) {

    var locId = jQuery(target).attr('locId');
    if (locId != null && locId.length > 0) {


        var shortlistedStatus = isShortlisted(locId);
        if (shortlistedStatus === true) {
            removeFromShortlist(locId);
        }
        else {
            addToShortlist(locId);
        }

        //Set the button caption
        updateAddRemoveShortlistButtonCaption(locId, !shortlistedStatus);

        //Check/Uncheck the box
        setShortListCheckBox(locId, !shortlistedStatus);
    }

}

function updateAddRemoveShortlistButtonCaption(locId, shortlistedStatus) {
    var targetButton = jQuery('input[buttonType="addRemoveShortlist"][locId="' + locId + '"]');
    if (targetButton != null && targetButton.length > 0) {
        if (shortlistedStatus === true) {
            jQuery(targetButton).val(shortlistRemoveFromShortlistCaption);
        }
        else {
            jQuery(targetButton).val(shortlistAddToShortlistCaption);
        }
    }
}
function updateLocationsDictionary(json, mergeFlag) {
    if (mergeFlag == false) {

        //clearMap
        clearOverlays();

        
        //clear dictionary
        locationsDictionary = {};
    }
    if (json != null && json.length > 0) {
        var j = 0;
        for (i = 0; i < json.length; i++) {
            var currentJsonItem = json[i];
            if (currentJsonItem != null && typeof currentJsonItem.Id != "undefined") {
                //if(j==0) alert(currentJsonItem.Id);
                locationsDictionary[currentJsonItem.Id] = currentJsonItem;
                j++;

            }

            

        }
    }
}
function updateCategoriesDictionary(json) {
    //debugger;
    if (json != null && json.length > 0) {
        var j = 0;
        for (i = 0; i < json.length; i++) {
            var currentJsonItem = json[i];
            if (currentJsonItem != null && typeof currentJsonItem.Id != "undefined") {
                //if(j==0) alert(currentJsonItem.Id);
                categoriesDictionary[currentJsonItem.Id] = currentJsonItem;
                j++;
            }
        }
    }
}
function getLocations(dataUrl, responseHandler, sendHandler, completeHandler) {
    //alert('getLocations');
    jQuery.ajax(
	{
	    url: dataUrl,
	    type: 'GET',
	    dataType: 'json',
	    contentType: 'application/json; charset=utf-8',

	    beforeSend: function (jqXHR, settings) {
	        if (sendHandler)
	            sendHandler();
	    },
	    success: function (response) {
	        locations = response;
	        if (responseHandler)
	            responseHandler();
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	        //alert( "The server encountered an error processing the request." );
	        //alert( textStatus );
	        alert(errorThrown.toString());
	    },
	    complete: function (jqXHR, textStatus) {
	        if (completeHandler)
	            completeHandler();
	    }
	});
}

function displayMessage(title, message) {
    if (message != null && message.length > 0) {
        var messageTitle = "Message";
        //setup message dialogue
        if (title != null && title.length > 0) {
            messageTitle = title;
        }
        messagDialogBox = jQuery('<div></div>')
		.html(message)
		.dialog({
		    title: messageTitle,
		    modal: true,
		    buttons: {
		        Ok: function () {
		            jQuery(this).dialog("close");
		        }
		    }
		});
    }
}

function recordSearchEvent(resultCount) {
    if (typeof _gaq == 'undefined') return;
    if (_gaq == null) return;


    var searchCriteria = searchPanel.searchCriteria;
    if (searchCriteria == null) return;



    if (typeof searchCriteria.keyValue != 'undefined') {
        var location = searchCriteria.keyValue['Location'];
        var provider = searchCriteria.keyValue['ProviderName'];
        var radius = parseInt(searchCriteria.keyValue['Radius'], 10);
        var providerTypes = getSelectedCategoriesCSV();
        var ofstedRef = searchCriteria.keyValue['OfstedReference'];
        

        var eventCategory = '';
        var eventAction = '';
        var eventLabel = '';
        var eventValue = resultCount;
        var eventNeedsToRecord = true;

        if (typeof ofstedRef != 'undefined' && ofstedRef != null && ofstedRef.length > 0) {
            //Ofsted Reference Search
            eventCategory = 'FIS - Search By Ofsted Reference';
            eventAction = ofstedRef;
            eventLabel = '';
        }
        else {

            //Normal Search
            var labelDelimeter = ':: ';
            if (providerTypes != '') {
                eventLabel = 'Service Providers: ' + providerTypes;

            }


            if (location != null && location.length > 0) {
                eventAction = location;
                //Location = 1
                if (provider != null && provider.length > 0) {
                    //provider = 1
                    eventLabel += eventLabel == '' ? '' : labelDelimeter
                    eventLabel += 'Provider Name: ' + provider;

                    if (radius != null && radius > 0) {
                        //radius = 1
                        eventCategory = 'FIS - Search By Area and Provider (With Radius)';
                        eventLabel += eventLabel == '' ? '' : labelDelimeter;
                        eventLabel += 'Radius: ' + radius + ' miles';
                    }
                    else {
                        //radius = 0
                        eventCategory = 'FIS - Search By Area and Provider (Without Radius)';
                        eventAction = location;
                    }

                }
                else {
                    //provider = 0
                    if (radius != null && radius > 0) {
                        //radius = 1
                        eventCategory = 'FIS - Search By Area (With Radius)';
                        eventLabel += eventLabel == '' ? '' : labelDelimeter;
                        eventLabel += 'Radius: ' + radius + ' miles';
                    }
                    else {
                        //radius = 0
                        eventCategory = 'FIS - Search By Area (Without Radius)';
                    }
                }

            }
            else {
                //Location = 0
                if (provider != null && provider.length > 0) {
                    //provider = 1
                    eventCategory = 'FIS - Search By Provider Only';
                    eventAction = provider;
                }
                else {
                    ////provider = 0
                    //N/A
                }

            }
        }
        if (eventNeedsToRecord) {

            recordAnalyticEvent(eventCategory, eventAction, eventLabel, eventValue);
        }
    }
}

function recordAnalyticEvent(category, action, label, value) {
    if (typeof _gaq == 'undefined') return;
    if (_gaq == null) return;


    _gaq.push(['_trackEvent', category, action, label, value, false]);
    

}
    



function getSelectedCategoriesCSV() {
    var categoriesForSearch = '';
    var selectedCategoriesArray = categoryPanel.selectedCategories();
    jQuery.each(selectedCategoriesArray, function (index, category) {
        categoriesForSearch += category + ',';
    });

    //Remove last comma
    var len = categoriesForSearch.length;
    if (categoriesForSearch.substr(len - 1, 1) == ",") {
        categoriesForSearch = categoriesForSearch.substring(0, len - 1);
    }

    return categoriesForSearch;
}


function displayStatusMessage(message, status) {
    if (message != null && message.length > 0 && status != null && status.length > 0) {

        var title = 'Success';
        switch (status.toLowerCase()) {
            case 'success':
                title = 'Success';
                break;
            case 'failure':
                title = 'Failed';
                break;
        }

        displayMessage(title, message);
    }
}

function addViewShortlistLink(containerId) {
    if (containerId != null && containerId.length > 0) {

        var container = jQuery('#' + containerId);
        if (container != null & container.length > 0) {

            var htmlLink = '<input type="button" value="View Shortlist"  onclick="displayShortlist()" class="button" style="margin-top:-20px;"/>';
            
            jQuery(container).append(htmlLink);

        }

    }
    
}