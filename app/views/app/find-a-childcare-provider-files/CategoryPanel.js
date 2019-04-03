function CategoryPanel() {
    var _this = this;
    

    // Control IDs
    this.idCategoryPanel = 'map-catpanel';
    this.idCategoryCheckBox = 'map-cat-cbx';

    //
    // Category Panel Selectors
    //

    this._sCatPanel = "#map-catpanel";
    // Selector expression that returns the search category field in the search form
    this._sCatList = "#map-catpanel #map-catlist";
    // Selector expression that returns the resource category checkboxes
    this._sCategories = "#map-catlist :checkbox";
    // Selector expression that returns the currently selected resource category checkboxes
    this._sCategoriesSelected = "#map-catlist :checkbox:checked";
    // Selector expression that returns the information icons (situated next to the category label)
    this.sCategoryInformation = "#map-catlist img";
    // The spinner icon used during the ajax call to retrieve category information
    this.sCatSpinner = "#map-catspinner";


    this.icons = {
        // information icon (used in the category list panel)
        information: "/_layouts/images/ResourceMappingWebPart/information.png",
        // Small "loading" icon for ajax calls
        'loading-sml': "/_layouts/images/ResourceMappingWebPart/loading-sml.gif",
        // Large "loading" icon for ajax calls
        'loading-lrg': "/_layouts/images/ResourceMappingWebPart/loading-lrg.gif"
    };

    this.categorySpinner(false);
}

CategoryPanel.prototype.categorySpinner = function (show) {
    if (show)
        jQuery(this.sCatSpinner).show();
    else
        jQuery(this.sCatSpinner).hide();
}

CategoryPanel.prototype.show = function (enable) {
    if (!enable) {
        jQuery(this._sCatPanel).hide();
        return;
    }

    jQuery(this._sCatPanel).show();
}

CategoryPanel.prototype.render = function (categories) {
    var _this = this;
    var cat;
    var checkboxId;
    var n;
    var s;


    // Clear out the category checkbox list		
    jQuery(this._sCatList).empty();

    //
    // Create the category checkbox list 
    //

    //Sort the categories by Name
    var sortedCategories = categories.sort(function (a, b) { return a.Name > b.Name ? 1 : -1; });

    s = '<table id="cat-table" cellPadding="5">';
    //s = '<ul>';

    // Add a checkbox for each category
    for (n = 0; n < sortedCategories.length; n++) {
        cat = sortedCategories[n];
        checkboxId = this.idCategoryCheckBox + cat.Id;

        //s += '<li>';
        s += '<tr>';


        s += '<td style="vertical-align:middle"><img  src="/_layouts/ecc/csp/images/MappingWebPart/MapIcons/' + cat.Id + '.png" width="16" height="16" title="' + cat.Description + '" /></td>';
        s += '<td><input id="' + checkboxId + '" type="checkbox" name="category" value="' + cat.Id + '" /><td>';
        s += '<td><span for="' + checkboxId + '" >' + cat.Name + '</span></td>';
        s += '<td colType="count" ><span id="resultCount-' + cat.Id + '" catId="' + cat.Id + '" ></span></td>';
        //s += '<label for="' + checkboxId + '" >' + cat.Name;

        //s += '</label>';

        //s += '</li>';
        s += '</tr>';

    }
    //s += '</ul>';
    s += '</table>';
    jQuery(this._sCatList).append(s);

    //Wire the Select/Unselect all check box
    jQuery('#chk-selectAllCategories').change(function () {
        _this.checkUncheckAllCategories(jQuery(this).is(':checked'));
    });



    // Resize Search Panel
    if (searchPanel !== null) {
        searchPanel.resizeSearchPanels();
    }


    // Event handler for the search category panel
    //		Fires when the user ticks or clears ca category checkbox. 
    jQuery(this._sCategories).change(function (e) {
        // Get the category ID 
        var categoryId = this.value;
        _this.syncCheckUncheckAllCategories();

        //_this.onSearchCategoryChange(categoryId, this.checked);  //TODO : Check it out
    });

}
CategoryPanel.prototype.checkUncheckAllCategories = function (isChecked) {

    //var checkBoxCaption = isChecked === true ? 'Unselect All' : 'Select All';
    jQuery('#cat-table tbody tr input[type="checkbox"]').attr('checked', isChecked);

    this.syncCheckUncheckAllCategories();
    //jQuery('#lbl-selectAllCategories').text(checkBoxCaption);

}

CategoryPanel.prototype.syncCheckUncheckAllCategories = function () {

    var checkBoxCaption = 'Deselect All';
    var checkAll = true;

    var checkedBoxesCount = jQuery('#cat-table tbody tr input[type="checkbox"][checked="checked"]').length;
    var totalBoxesCount = jQuery('#cat-table tbody tr input[type="checkbox"]').length;

    if (totalBoxesCount !== checkedBoxesCount) {
        checkBoxCaption = 'Select All';
        checkAll = false;
    }

    jQuery('#lbl-selectAllCategories').text(checkBoxCaption);
    jQuery('#chk-selectAllCategories').attr('checked', checkAll);

}

CategoryPanel.prototype.onSearchCategoryChange = function (categoryId, isChecked) {
    if (settings.debug)
        console.log("onSearchCategoryChange:begin");

    var category = categoriesDictionary[categoryId];
    if (isChecked) {
        //if(this.settings.displayCategoriesResultsInTab)
        {
            this.updateLocations(this.searchPosition, categoryId);
        }
        //else
        {
            //Remove location markers
            this.addLocationMarkers(locationsDictionary, categoryId);

            // Resize the map viewport to fit all the locations
            this.fitMapToLocations();
        }
    }
    else {
        //remove any shortlisted items
        //Disabling the following line because user does not want to remove the items when category is unchecked
        //this.shortlistLocations( categoryId, false );

        // Remove location markers from the map 
        this.clearLocationMarkers(categoryId);

        //if (this.settings.debug)
            //this._model.dumpLocations();

        if (this.settings.displayCategoriesResultsInTab) {
            //Remove unchecked category tab
            this._view.removeCategoryTab(categoryId);
        }
        else {
            this.displayLocationList(categoryId);
        }

    }

    if (this.settings.debug)
        console.log("onSearchCategoryChange:end");
}

// Purpose:
//		Get or set the selected categories
// 
// Parameters:
//		categories 	[optional] [array of string]
//				An array of category IDs. 
//
// Return Value:
//		[array of string] The list of selected categories.
//
// Description:
//		Returns an array containing the Ids of the selected categories
CategoryPanel.prototype.selectedCategories = function (categories) {
    var n;

    if (categories) {
        jQuery(this.sCategories).prop("checked", false);

        for (n = 0; n < categories.length; n++) {
            var checkboxSelector = '#' + this.idCategoryCheckBox + categories[n];
            jQuery(checkboxSelector).prop("checked", true);
        }
    }
    else {
        var list = [];
        var selectedCategories = jQuery(this._sCategoriesSelected);
        for (n = 0; n < selectedCategories.length; n++) {
            list.push(selectedCategories[n].value);
        }

        return list;
    }
}

CategoryPanel.prototype.updateCategoryLocationCounts = function () {

    var catStats = {};
    jQuery.each(locationsDictionary, function (key, loc) {
        var catId = loc.Category[0];
        if (typeof catStats[catId] == "undefined") {
            catStats[catId] = 1;
        }
        else {
            catStats[catId]++;
        }

    });

    var spanSelector = '#cat-table td[colType="count"] span';

    jQuery(spanSelector).each(function (index) {
        var catId = jQuery(this).attr('catId');
        var catCount = 0;
        if (typeof catStats[catId] != "undefined") {
            catCount = catStats[catId];
        }


        var catCheckbox = jQuery('#' + categoryPanel.idCategoryCheckBox + catId);

        //We will only deal with selected checkbox, there will be no more automatic checking of the checkbox
        if (catCheckbox.length > 0 && jQuery(catCheckbox).is(':checked')) {

            //Set the category count
            jQuery(this).text('(' + catCount + ')');

            /*
            //Check the checkbox, if count > 0
            if (catCheckbox.length > 0) {
            jQuery(catCheckbox).prop("checked", catCount > 0 ? true : false);
            }
            */
        }
        else {
            //Remove the category count
            jQuery(this).text('');

        }
    });

    //Resize Search Panel to accomadate new changes
    searchPanel.resizeSearchPanels();
}