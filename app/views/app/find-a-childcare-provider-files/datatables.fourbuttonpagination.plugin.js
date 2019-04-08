﻿jQuery.fn.dataTableExt.oPagination.four_button = {
    "fnInit": function (oSettings, nPaging, fnCallbackDraw) {
        nFirst = document.createElement('span');
        nPrevious = document.createElement('span');
        nNext = document.createElement('span');
        nLast = document.createElement('span');

        nFirst.appendChild(document.createTextNode(oSettings.oLanguage.oPaginate.sFirst));
        nPrevious.appendChild(document.createTextNode(oSettings.oLanguage.oPaginate.sPrevious));
        nNext.appendChild(document.createTextNode(oSettings.oLanguage.oPaginate.sNext));
        nLast.appendChild(document.createTextNode(oSettings.oLanguage.oPaginate.sLast));

        nFirst.className = "paginate_button first";
        nPrevious.className = "paginate_button previous";
        nNext.className = "paginate_button next";
        nLast.className = "paginate_button last";

        nPaging.appendChild(nFirst);
        nPaging.appendChild(nPrevious);
        nPaging.appendChild(nNext);
        nPaging.appendChild(nLast);

        jQuery(nFirst).click(function () {
            oSettings.oApi._fnPageChange(oSettings, "first");
            fnCallbackDraw(oSettings);
        });

        jQuery(nPrevious).click(function () {
            oSettings.oApi._fnPageChange(oSettings, "previous");
            fnCallbackDraw(oSettings);
        });

        jQuery(nNext).click(function () {
            oSettings.oApi._fnPageChange(oSettings, "next");
            fnCallbackDraw(oSettings);
        });

        jQuery(nLast).click(function () {
            oSettings.oApi._fnPageChange(oSettings, "last");
            fnCallbackDraw(oSettings);
        });

        /* Disallow text selection */
        jQuery(nFirst).bind('selectstart', function () { return false; });
        jQuery(nPrevious).bind('selectstart', function () { return false; });
        jQuery(nNext).bind('selectstart', function () { return false; });
        jQuery(nLast).bind('selectstart', function () { return false; });
    },


    "fnUpdate": function (oSettings, fnCallbackDraw) {
        if (!oSettings.aanFeatures.p) {
            return;
        }

        /* Loop over each instance of the pager */
        var an = oSettings.aanFeatures.p;
        for (var i = 0, iLen = an.length; i < iLen; i++) {
            var buttons = an[i].getElementsByTagName('span');
            if (oSettings._iDisplayStart === 0) {
                buttons[0].className = "paginate_disabled_previous";
                buttons[1].className = "paginate_disabled_previous";
            }
            else {
                buttons[0].className = "paginate_enabled_previous";
                buttons[1].className = "paginate_enabled_previous";
            }

            if (oSettings.fnDisplayEnd() == oSettings.fnRecordsDisplay()) {
                buttons[2].className = "paginate_disabled_next";
                buttons[3].className = "paginate_disabled_next";
            }
            else {
                buttons[2].className = "paginate_enabled_next";
                buttons[3].className = "paginate_enabled_next";
            }
        }
    }
};