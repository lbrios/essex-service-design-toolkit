﻿function SearchPanel() {
    var _this = this;
    this.currentOpenAccordionId = 'map-SearchFields';     //By default open
    this.accordionChanging = false;

    this.idSearchPanel = 'map-searchpanel';

    this._sSearchPanel = '#map-searchpanel';
    this._sSearchButton = "#map-searchButton";
    this._sSearchName = "#map-search-type";
    this._sSearchValue = "#map-address";

    //jQuery(this._sSearchButton).button();
    //jQuery(this._sSearchPanel).accordion( { collapsible: true } );

    this.search = {};   //Deprecated
    this.searchKey = "";

    this.searchCriteria = {};
    this.searchCriteria.keyValue = {};
    this.searchCriteria.selectedCategories = [];
    this.searchCriteria.searchType = 'location';
    this.searchCriteria.position = [];   //Lat Long
    this.searchCriteria.searchByCategories = false; //Set it true to search only for selected categories
    this.searchCriteria.searchByRadius = true;  //Set it false to stop searching by radius

    //Enable/Disable Radius drop down
    jQuery('#searchValue-Location').change(function () {
        var txtValue = jQuery.trim(jQuery(this).val());
        if (txtValue.length > 0) {

            //enable radius
            jQuery('#searchValue-Radius').removeAttr('disabled');
        }
        else {
            jQuery('#searchValue-Radius').attr('disabled', 'disabled');
        }
    });


    //Normal Search
    jQuery(this._sSearchButton).on('click', function () {
        _this.getSearchCriteria();

        //Remove Ofsted Reference from search criteria as it is a normal search
        _this.searchCriteria.keyValue['OfstedReference'] = '';
        _this.searchCriteria.searchType = 'location';



        if (searchPanel.isSearchCriteriaProvided() === true) {

            _this.onSearch();
        }
        else {
            _this.displaySearchErrorMessage();
        }
    });


    //Ofsted Ref Search Button
    jQuery('#map-searchButton-OfstedRef').on('click', function () {
        _this.getSearchCriteria();
        if (jQuery('#searchValue-OfstedReference').val() != '') {

            _this.onSearch();
        }
        else {
            displayMessage('No Ofsted Reference', 'Please enter Ofsted Reference and click Find')

        }
    });



    // Event handler for the search button / enter key

    jQuery('#map-lhcol').keyup(function (e) {
        if (e.which == 13) {
            //check if we are on correct tab
            //var selectedPanel = jQuery("#mainTabs div.ui-tabs-panel:not(.ui-tabs-hide)");
            var currentTabIndex = tabsObject.tabs('option', 'selected');
            if (currentTabIndex == 0) {

                //Check which search to call
                var currentSearchCriteria = searchPanel.getSearchCriteria();
                if (currentSearchCriteria.keyValue["OfstedReference"] != null && currentSearchCriteria.keyValue["OfstedReference"].length > 0) {

                    jQuery('#map-searchButton-OfstedRef').click();

                }
                else {
                    jQuery(_this._sSearchButton).click();
                }
            }
        }
    });


    jQuery(this._sSearchName).change(function () {
        var key = this.value;
        var value = jQuery(_this._sSearchValue).val();

        // Save the value of the current search key
        _this.search[this.searchKey] = value;

        // Retrieve the value for the search that has been selected
        value = _this.search[key];
        jQuery(_this._sSearchValue).val(value);

        // Remember the name of the cunrrenly selected search
        this.searchKey = key;
    });
}


SearchPanel.prototype.displaySearchErrorMessage = function () {
    var searchCriteria = searchPanel.searchCriteria;
    var errorTitle = 'Invalid Search Criteria';
    var errorMessage = '';

    if (searchCriteria == null) errorMessage = 'No search specified.';
    if (searchCriteria.keyValue == null) errorMessage = '';

    var searchRadius = searchCriteria.keyValue['Radius'] == null ? '' : searchCriteria.keyValue['Radius'];
    var searchLocation = searchCriteria.keyValue['Location'] == null ? '' : searchCriteria.keyValue['Location'];
    var searchProviderName = searchCriteria.keyValue['ProviderName'] == null ? '' : searchCriteria.keyValue['ProviderName'];

    //Following error will never occur as Radius will not be enabled until user has specified something in town or postcode
    /*
    if (searchRadius.length > 0) {
    var r = parseInt(searchRadius);
    if (r > 0) {
    //Radius Specified, check for location now
    if (searchLocation.length === 0) {
    //Radius specified but search not specified
    errorMessage = '<li>Search Radius cannot be specified without a location. Please specify town or postcode.</li>';
    }
    }
    }
    */


    if (searchLocation.length === 0 && searchProviderName.length === 0) {
        errorMessage += '<li>Please specify eirther Location or Provider Name</li>';


    }

    var selectedCategories = getSelectedCategoriesCSV();
    if (selectedCategories.length === 0) {
        errorMessage += '<li>Please select Provider Type.</li>';
    }

    if (errorMessage.length > 0) {
        errorMessage = '<ol>' + errorMessage + '</ol>'
        displayMessage(errorTitle, errorMessage);
    }


}

SearchPanel.prototype.isSearchCriteriaProvided = function () {
    var searchCriteria = searchPanel.searchCriteria;

    if (getSelectedCategoriesCSV().length === 0) return false;
    if (searchCriteria == null) return false;
    if (searchCriteria.keyValue == null) return false;

    //Following error will never occur as Radius will not be enabled until user has specified something in town or postcode
    /*
    var searchRadius = searchCriteria.keyValue['Radius'] == null ? '' : searchCriteria.keyValue['Radius'];
    var searchLocation = searchCriteria.keyValue['Location'] == null ? '' : searchCriteria.keyValue['Location'];
    if (searchRadius.length > 0) {
    var r = parseInt(searchRadius);
    if (r > 0) {
    //Radius Specified, check for location now
    if (searchLocation.length === 0) {
    //Radius specified but search not specified
    return false;
    }
    }
    }
    */
    if (searchCriteria.keyValue['Location'] != null && searchCriteria.keyValue['Location'].length > 0) return true;
    if (searchCriteria.keyValue['ProviderName'] != null && searchCriteria.keyValue['ProviderName'].length > 0) return true;
    if (searchCriteria.keyValue['OfstedReference'] != null && searchCriteria.keyValue['OfstedReference'].length > 0) return true;

    return false;

}
SearchPanel.prototype.onSearch = function () {
    var _this = this;

    //clear Markers
    clearOverlays();

    //clear Results table
    if (resultsTable) {
        resultsTable.fnClearTable();
    }

    var address = searchPanel.searchCriteria.keyValue['Location'];
    if (address != null && address.length > 0) {
        getCoordinates(address, function (position) {
            searchPanel.searchCriteria.position.lat = position.lat();   //Lat Long
            searchPanel.searchCriteria.position.lng = position.lng();   //Lat Long

            _this.processSearchCriteria();

        });
    }
    else {
        _this.processSearchCriteria();
    }
}

SearchPanel.prototype.processSearchCriteria = function () {

    var _this = this;
    _this.searchMode = searchPanel.searchCriteria.searchType.toLowerCase();

    //Check for not found location
    if (searchPanel.searchCriteria.keyValue['Location'] != null && searchPanel.searchCriteria.keyValue['Location'].length > 0) {
        if ((searchPanel.searchCriteria.position.lat == notfoundLat || searchPanel.searchCriteria.position.lat == 999) && (searchPanel.searchCriteria.position.lng == notfoundLng || searchPanel.searchCriteria.position.lng == 999)) {
            //not found in essex
            searchResults = [];
            displaySearchResults(searchResults, false);
            displayMessage('Location not found', 'Unable to find the given town or postcode in Essex. Please revise your search and try again.');
            return;

        }
    }

    if (_this.searchMode != null && _this.searchMode.length > 0) {
        RefreshTable(searchPanel.searchCriteria, false);
    }

}


SearchPanel.prototype.searchByLocation = function (address) {
    //alert('Search By Location: ' + address);
    // Lookup the position (lat, lng ) corresponding to the address entered
    getCoordinates(address, function (position) {

        searchPosition = position;
        var categoriesForSearch = '';

        if (settings.enableCategoryPanel) {

            jQuery.each(categoriesDictionary, function (index, category) {
                categoriesForSearch += category.Id + ',';
            });

            //Remove last comma
            var len = categoriesForSearch.length;
            if (categoriesForSearch.substr(len - 1, 1) == ",") {
                categoriesForSearch = categoriesForSearch.substring(0, len - 1);
            }
        }

        RefreshTable(categoriesForSearch, false);    //Clear the current result and search again
    });
}

SearchPanel.prototype.searchByParameter = function (searchParameter) {
    alert('Search By Parameter: ' + searchParameter);

}

SearchPanel.prototype.getSearchTypeAndValue = function () {

    //Select that text box which is not disabled
    var selectedTextBox = jQuery('#map-SearchFields input[type="text"]').not('.disabled');
    var selectedSearch = [];
    selectedSearch.name = jQuery(selectedTextBox).attr('searchName');
    selectedSearch.value = jQuery(selectedTextBox).val();

    return selectedSearch;

}

SearchPanel.prototype.enable = function (enable) {      //Enable / disable the search panel
    if (enable) {
        jQuery(this._sSearchPanel).show();
    }
    else {
        jQuery(this._sSearchPanel).hide();
    }
}

SearchPanel.prototype.displaySearches = function (searches) {   //Display the available search types
    //jQuery(this._sSearchPanel).accordion('destroy');
    //jQuery(this._sSearchPanel).empty();
    var _this = this;
    var panelHTML = ' <h3><a href="#">Search</a></h3>';
    var selectHTML = '';

    jQuery(this._sSearchName).empty();

    //jQuery('#map-SearchFields').empty();
    /*
    var divHTML = '';
    //divHTML +='<div>';

    for (var n = 0; n < searches.length; n++) {
    var searchDef = searches[n];
    selectHTML += '<option value="' + searchDef.Name + '">' + searchDef.DisplayName + '</option>';

    //divHTML += '<span for="' + searchDef.Name + '">' + searchDef.DisplayName  + ':</span><input type="text" id="searchValue-"' + searchDef.Name +' class="fld_std" />';

    divHTML += '<input type="radio" name="rdl-search-type" value="' + searchDef.Name + '" id="' + searchDef.Name + '" /><label for="' + searchDef.Name + '">' + searchDef.DisplayName + ':</label>';

    //divHTML += '<input type="radio" name="rdl-search-type" value="' + searchDef.Name + '">' + searchDef.DisplayName  + ':</input><input type="text" id="searchValue-' + searchDef.Name +'" class="fld_std" />';
    divHTML += '<input type="text" disabled="disabled" searchName="' + searchDef.Name + '" id="searchValue-' + searchDef.Name + '" class="fld_std disabled" />';

    //jQuery(this._sSearchName).append( s );


    }

    //divHTML += '</div>'
    panelHTML += selectHTML + divHTML;
    jQuery('#map-SearchFields').append(divHTML);
    jQuery(this._sSearchName).append(selectHTML);
    var searchDropDownSelect = this._sSearchName;

    //jQuery('#map-SearchFields').append(divHTML);
    //jQuery(this._sSearchPanel).accordion({ collapsible: true, clearStyle: true });
    */
    //jQuery('#map-SearchFields2').accordion('destroy');

    /*    
    jQuery('#map-SearchFields').accordion({ collapsible: true, clearStyle: true });
    jQuery('#map-SearchByOfstedRef').accordion({ collapsible: true, clearStyle: true, active: false });
    */

    jQuery('#btnTestPanel').click(function () {
        if (_this.accordionChanging === false) {
            this.accordionChanging = true;
            jQuery('#map-SearchFields').accordion('activate', 0);
            jQuery('#map-SearchByOfstedRef').accordion('activate', 0);
        }
        else {
            this.accordionChanging = false;
        }

    });


    jQuery('#map-SearchFields').accordion({ collapsible: true, clearStyle: true,

        change: function (event, ui) {
            if (_this.accordionChanging === false) {
                _this.accordionChanging = true;
                _this.clearAllSearchFields();
                
                jQuery('#map-SearchByOfstedRef').accordion('activate', 0);
                document.getElementById('mainTabs').scrollIntoView();
            }
            else {
                _this.accordionChanging = false;
            }

        }
    });

    jQuery('#map-SearchByOfstedRef').accordion({ collapsible: true, clearStyle: true, active: false,
        change: function (event, ui) {
            if (_this.accordionChanging === false) {
                _this.accordionChanging = true;
                _this.clearAllSearchFields();
                
                jQuery('#map-SearchFields').accordion('activate', 0);
                document.getElementById('mainTabs').scrollIntoView();
            }
            else {
                _this.accordionChanging = false;
            }

        }
    });

    /*
    jQuery('#map-SearchFields').accordion({ collapsible: true, clearStyle: true });
    jQuery('#map-SearchByOfstedRef').accordion({ collapsible: true, clearStyle: true, active: false });
    */


    //jQuery('#map-SearchByOfstedRef').accordion('resize');










    jQuery('input[name="rdl-search-type"]').bind('click', function () {
        //alert( jQuery( this ).next().next().val());

        //Remove focus class from every text box
        jQuery('#map-SearchFields input[type="text"]').removeClass("focus");

        //Select current text box
        var targetTextBox = jQuery(this).next().next();
        jQuery(targetTextBox).removeClass("disabled");
        jQuery(targetTextBox).addClass("focus");

        //Enable current text box
        jQuery(targetTextBox).prop("disabled", false);

        //Set focus on current text box
        jQuery(targetTextBox).focus();

        //Diable other text boxes
        jQuery('#map-SearchFields input[type="text"]').not('.focus').addClass('disabled');
        jQuery('#map-SearchFields input[type="text"]').not('.focus').prop("disabled", true);


        //Set Drop down
        jQuery(searchDropDownSelect).val(jQuery(this).val());



    });


}
SearchPanel.prototype.clearAllSearchFields = function () {
    var _this = this;
    _this.clearSearchByLocationFields();
    _this.clearSearchByOfstedFields();


    //Clear the origin marker
    clearSearchOriginMarker();

    //Clear Map
    clearOverlays();

    //clear dictionary
    locationsDictionary = {};

    //Update Statistics
    categoryPanel.updateCategoryLocationCounts();

    //clear Results table
    if (resultsTable) {
        resultsTable.fnClearTable();
    }
}

SearchPanel.prototype.clearSearchByLocationFields = function () {
    jQuery('#searchValue-Location').val('');
    jQuery('#searchValue-Radius').attr('disabled', 'disabled');
    jQuery('#searchValue-ProviderName').val('');
    jQuery('#chk-selectAllCategories').attr('checked', false);
    categoryPanel.checkUncheckAllCategories(false);
    
    

}

SearchPanel.prototype.clearSearchByOfstedFields = function () {
    jQuery('#searchValue-OfstedReference').val('');
}

SearchPanel.prototype.searchValue = function (key, value) {
    if (value) {
        this.search[key] = value;
    }
    else {
        // No value specified, return value of the search argument for the key
        return this.search[key];
    }
}

SearchPanel.prototype.removeSearches = function (category) {
    jQuery(this._sSearchName).empty();
}

SearchPanel.prototype.getSearchCriteria = function () {

    if (this.searchCriteria == null)
        this.searchCriteria = {};

    //Step 1: Fill Key Value
    this.searchCriteria.keyValue = {};
    jQuery('*[searchType="keyValue"]').each(function (index) {


        var k = jQuery(this).attr('searchKey');
        var v = jQuery(this).val();

        //if control is disabled e.g. radius then take its disabledKeyValue instead of original value

        if (jQuery(this).is(':disabled')) {
            v = jQuery(this).attr('disabledSearchValue');
        }

        searchPanel.searchCriteria.keyValue[k] = v;

    });

    //Step 2: Get Selected Categories
    this.searchCriteria.selectedCategories = categoryPanel.selectedCategories();

    //Setp 3:  Set Search Type
    this.searchCriteria.searchType = 'location';
    var ofstedRef = null;
    ofstedRef = this.searchCriteria.keyValue['OfstedReference'];

    if (ofstedRef != null && ofstedRef.length > 0) {
        this.searchCriteria.searchType = 'ofstedReference';
    }

    //Step 4: Set Radius flag
    this.searchCriteria.searchByRadius = false;
    var r = null;
    r = this.searchCriteria.keyValue['Radius'];

    if (r != null && r > -1) {
        this.searchCriteria.searchByRadius = true;
    }

    //Step 5: Set Search by Categories flag
    this.searchCriteria.searchByCategories = this.searchCriteria.selectedCategories.length > 0 ? true : false;

    //Step 6: Set Search Position
    this.searchCriteria.position.lat = 999; // settings.position.lat;   //Lat Long
    this.searchCriteria.position.lng = 999; // settings.position.lng;   //Lat Long
    var address = this.searchCriteria.keyValue['Location'];

    if (address != null && address.length > 0)
        getCoordinates(address, function (position) {
            //searchPanel.searchCriteria.position.lat = position.lat();   //Lat Long
            //searchPanel.searchCriteria.position.lng = position.lng();   //Lat Long
        });

    return this.searchCriteria;

}

SearchPanel.prototype.resizeSearchPanels = function () {
    //Resizes the accordian to make sure new content is properly visible
    jQuery('#map-SearchFields').accordion('resize');
}