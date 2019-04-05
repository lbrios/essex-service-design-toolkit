// based on solutions at http://spribbonactions.codeplex.com/

function getTop(dlgHeight)
{
    var windowHeight;
    if (!window.innerWidth)
    {
        if (!(document.documentElement.clientWidth == 0))
        {
            windowHeight = document.documentElement.clientHeight;
        }
        else
        {
            windowHeight = document.body.clientHeight;
        }
    }
    else
    {
        windowHeight = window.innerHeight;
    }
    return (Math.floor(windowHeight / 2)) - (Math.floor(dlgHeight / 2));
}

//This function opens up the Anchor name dialog window
function InsertBookmark()
{
    anchorSelectedText = getSelectedText();
    anchorSelectedText = anchorSelectedText.toString();
    var options = SP.UI.$create_DialogOptions();
    options.args = getSelectedText();
    options.title = "Please enter a name for the bookmark";
    options.width = 400;
    options.height = 200;
    options.y = getTop(200);
    options.url = "/_layouts/15/Ecc.SaaS.SharePoint.SelfServe/CustomRibbonActions/BookmarkInsertDialog.aspx";
    options.dialogReturnValueCallback = Function.createDelegate(null, BookmarkCloseCallback);
    SP.UI.ModalDialog.showModalDialog(options);
}

//This function inserts the anchor tag into the current RTE field.
function BookmarkCloseCallback(result, target)
{
    if (result === SP.UI.DialogResult.OK)
    {
        var range = RTE.Cursor.get_range();
        range.deleteContent();
        var selection = range.parentElement();
        var anchor = selection.ownerDocument.createElement("ins");        
        anchor.innerHTML = "<img src=/_layouts/images/wab16.gif alt='image' class='bookmarkPlaceholderImage' />" + anchorSelectedText;
        anchor.id = target;
        anchor.className = "pageBookmark";
        anchor.style.textDecoration = "none";
        range.insertNode(anchor);
        RTE.Cursor.get_range().moveToNode(anchor);
        RTE.Cursor.update();
    }
}

//This function gets a listing of all the anchor tags that are in the current RTE field.
function InsertBookmarkLink()
{
    var selectedField = RTE.Canvas.currentEditableRegion();
    //var bookmarkTags = selectedField.getElementsByTagName("ins");
    // changed to look at all content within the page
    var bookmarkTags = $("ins");
    var bookmarkList = "";
    //This loop creates an Array that we pass into the dialog window
    for (i = 0; i < bookmarkTags.length; i++)
    {
        if (bookmarkTags[i].id && (bookmarkTags[i].id.length > 0))
        {
            bookmarkList = bookmarkList + bookmarkTags[i].id + ",";
        }
    }
    bookmarkList = bookmarkList.substring(0, bookmarkList.length - 1);
    var options = SP.UI.$create_DialogOptions();
    var selectedText = getSelectedText();

    options.title = "Please select a bookmark";
    options.width = 400;
    options.height = 200;
    options.y = getTop(200);

    options.args =
    {
        selectedText: selectedText,
        bookmarkList: bookmarkList
    };

    options.url = "/_layouts/15/Ecc.SaaS.SharePoint.SelfServe/CustomRibbonActions/BookmarkLinkDialog.aspx";
    options.dialogReturnValueCallback = Function.createDelegate(null, BookmarkLinkCloseCallback);
    SP.UI.ModalDialog.showModalDialog(options);

}

//This functions gets the anchor link name returned and formats an href to the selected anchor.
function BookmarkLinkCloseCallback(result, target)
{
    if (result === SP.UI.DialogResult.OK)
    {
        var anchorlinkArray = target.split("|");
        if (anchorlinkArray.toString() > "")
        {
            var anchorlinkHref = anchorlinkArray[0];
            var anchorlinkName = anchorlinkArray[1];
        }

        var range = RTE.Cursor.get_range();
        range.deleteContent();
        var selection = range.parentElement();
        if (!selection)
        {
            return;
        }

        var anchor = selection.ownerDocument.createElement("a");
        anchor.className = "bookmarkLink";
        anchor.href = "#" + anchorlinkHref;
        var anchorText = selection.ownerDocument.createTextNode(anchorlinkName);
        anchor.appendChild(anchorText);
        range.insertNode(anchor);
        RTE.Cursor.get_range().moveToNode(anchor);
        RTE.Cursor.update();
    }
}


//This function opens up the email name dialog window
function InsertInfoBox() {
    var options = SP.UI.$create_DialogOptions();
    options.args = getSelectedText();
    options.title = "Please enter details for the info box";
    options.width = 400;
    options.height = 200;
    options.y = getTop(200);
    options.url = "/_layouts/15/Ecc.SaaS.SharePoint.SelfServe/CustomRibbonActions/InfoBoxDialog.aspx";
    options.dialogReturnValueCallback = Function.createDelegate(null, InfoBoxCloseCallback);
    SP.UI.ModalDialog.showModalDialog(options);

}

function InfoBoxCloseCallback(result, target) {
    if (result === SP.UI.DialogResult.OK) {
        var range = RTE.Cursor.get_range();
        range.deleteContent();
        var selection = range.parentElement();
        if (!selection) {
            return;
        }

        var container = selection.ownerDocument.createElement("div");
        container.className = "panel"

        var infoBoxTitle = selection.ownerDocument.createElement("h5");
        infoBoxTitle.innerHTML = target.title;

        var infoBoxContent = selection.ownerDocument.createElement("p");
        infoBoxContent.innerHTML = target.content;

        container.appendChild(infoBoxTitle);
        container.appendChild(infoBoxContent);

        range.insertNode(container);
        RTE.Cursor.get_range().moveToNode(container);
        RTE.Cursor.update();
    }
}



//This function opens up the email name dialog window
function InsertMailtoLink() {
    var options = SP.UI.$create_DialogOptions();
    options.args = getSelectedText();
    options.title = "Please enter some details for the mailto link";
    options.width = 400;
    options.height = 200;
    options.y = getTop(200);
    options.url = "/_layouts/15/Ecc.SaaS.SharePoint.SelfServe/CustomRibbonActions/EmailLinkDialog.aspx";
    options.dialogReturnValueCallback = Function.createDelegate(null, EmailLinkCloseCallback);
    SP.UI.ModalDialog.showModalDialog(options);

}

//This function inserts the email tag into the current RTE field.
function EmailLinkCloseCallback(result, target)
{
    if (result === SP.UI.DialogResult.OK) {
        var emailArray = target.split("|");

        if (emailArray.toString() > "")
        {
            var emailAddress = emailArray[0];
            var emailHref = emailArray[1];
        }

        var range = RTE.Cursor.get_range();
        range.deleteContent();
        var selection = range.parentElement();

        if (!selection)
        {
            return;
        }

        var email = selection.ownerDocument.createElement("a");
        email.href = emailHref;
        var emailText = selection.ownerDocument.createTextNode(emailAddress);
        email.appendChild(emailText);
        range.insertNode(email);
        RTE.Cursor.get_range().moveToNode(email);
        RTE.Cursor.update();
    }
}

//This function inserts a HR element into the current RTE
function InsertHorizontalLine() {
    var range = RTE.Cursor.get_range();
    range.deleteContent();
    var selection = range.parentElement();
    if (!selection) {
        return;
    }
    var line = selection.ownerDocument.createElement('hr');
    range.insertNode(line);
    RTE.Cursor.get_range().moveToNode(line);
    RTE.Cursor.update();
}

// This is a helper function for
// creating HTML tags with JS
function createHtmlTag(options)
{
    var tag = document.createElement(options.tagName);
    if (options.cssClass) {
        tag.setAttribute('class', options.cssClass);
    }

    if (options.text)
    {
        tag.appendChild(document.createTextNode(options.text));
    }

    for (var attr in options.attributes)
    {
        tag.setAttribute(attr, options.attributes[attr]);
    }

    return tag;
}


// This function opens a dialog box to insert embedable content
function InsertEmbedContent(code, caption, index)
{
    var myArgs = { "code": code, "caption": caption, "index": index };
    var options = SP.UI.$create_DialogOptions();
    options.args = myArgs;
    options.title = "Embed";
    options.width = 700;
    options.height = 480;
    options.y = getTop(600);
    options.url = "/_layouts/15/Ecc.SaaS.SharePoint.SelfServe/CustomRibbonActions/EmbedDialog.aspx";
    options.dialogReturnValueCallback = Function.createDelegate(null, EmbedCloseCallback);
    SP.UI.ModalDialog.showModalDialog(options);
}

function EmbedCloseCallback(result, target)
{
    if (result === SP.UI.DialogResult.OK)
    {
        var escapedEmbed = escape(target.code);
        var embedCaption = target.caption;
        if (target.newEmbed)
        {
            var range = RTE.Cursor.get_range();
            range.deleteContent();
            var selection = range.parentElement();
            if (!selection)
            {
                return;
            }

            var embedContainer = selection.ownerDocument.createElement("div");
            embedContainer.className = "embedOuterContainer";

            var embedEditView = selection.ownerDocument.createElement("div");
            embedEditView.className = "embedEditModeView";

            var embedEditViewP = selection.ownerDocument.createElement("p");
            embedEditViewP.className = "embedEditText";
            embedEditViewP.innerHTML = "This section contains dynamic content that cannot be displayed in edit mode. Click the button below to edit this content.";
            embedEditView.appendChild(embedEditViewP);

            var embedEditButton = selection.ownerDocument.createElement("input");
            embedEditButton.type = "button";
            embedEditButton.className = "embedEditButton";
            embedEditButton.value = "Edit Content";
            embedEditView.appendChild(embedEditButton);
            embedContainer.appendChild(embedEditView);

            var embedEscapedContent = selection.ownerDocument.createElement("div");
            embedEscapedContent.className = "embedEscapedContent";
            embedEscapedContent.style.display = "none";
            embedEscapedContent.innerHTML = escapedEmbed;
            embedContainer.appendChild(embedEscapedContent);

            if (embedCaption)
            {
                var embedCaptionDiv = selection.ownerDocument.createElement("div");
                embedCaptionDiv.className = "embedCaption";
                embedCaptionDiv.innerHTML = embedCaption;
                embedContainer.appendChild(embedCaptionDiv);
            }

            range.insertNode(embedContainer);
            RTE.Cursor.get_range().moveToNode(embedContainer);
            RTE.Cursor.update();
        }
        else {
            (function ($) {
                var targetDiv = $("div.embedOuterContainer")[target.index];
                $(targetDiv).children(".embedEscapedContent").html(escapedEmbed);
                if ((embedCaption) && ($(targetDiv).children(".embedCaption").length > 0))
                {
                    $(targetDiv).children(".embedCaption").html(embedCaption);
                }
                else if (embedCaption)
                {
                    $(targetDiv).append("<div class='embedCaption'>" + embedCaption + "</div>");
                }
                else if ($(targetDiv).children(".embedCaption").length > 0)
                {
                    $(targetDiv).children(".embedCaption").remove();
                }
            })(jQuery);
        }
    }
}


//this function is used for youtube emded
function InsertVideo()
{
    var options = SP.UI.$create_DialogOptions();
    options.title = "Enter Video Url and Caption.";
    options.width = 400;
    options.height = 200;
    options.y = getTop(200);
    options.args = getSelectedText();
    options.url = "/_layouts/15/Ecc.SaaS.SharePoint.SelfServe/CustomRibbonActions/YouTubeVideoDialog.aspx";
    options.dialogReturnValueCallback = Function.createDelegate(null, VideoCloseCallback);
    SP.UI.ModalDialog.showModalDialog(options);
}

function VideoCloseCallback(result, target)
{
    if (result === SP.UI.DialogResult.OK)
    {
        var linkArray = target.split("|");
        if (linkArray.toString() > "")
        {
            var linkHref = linkArray[0];
            var caption = linkArray[1];
        }

        var range = RTE.Cursor.get_range();
        range.deleteContent();
        var selection = range.parentElement();
        if (!selection)
        {
            return;
        }
        
        var fullContainer = selection.ownerDocument.createElement("div");
        fullContainer.className = "youtubeVideoContainer"
        var videodiv = selection.ownerDocument.createElement("div");
        videodiv.className = "youtubeVideoLink";
        var captiondiv = selection.ownerDocument.createElement("div");
        captiondiv.className = "youtubeVideoCaption";
        var captiontext = selection.ownerDocument.createTextNode(caption);
        var textblock = selection.ownerDocument.createTextNode(linkHref);
        captiondiv.appendChild(captiontext);
        videodiv.appendChild(textblock);        
        range.insertNode(fullContainer);
        fullContainer.appendChild(videodiv)

        if (caption && caption.length)
        {
            fullContainer.appendChild(captiondiv);
        }

        RTE.Cursor.get_range().moveToNode(videodiv);
        RTE.Cursor.update();
    }
}



// This function is used to get the selected text on the page.
function getSelectedText()
{
    var txt = '';
    if (window.getSelection)
    {
        txt = window.getSelection();
    }
    else if (document.getSelection) // FireFox
    {
        txt = document.getSelection() + "";
    }
    else if (document.selection)  // IE 6/7
    {
        txt = document.selection.createRange().text;
    }
    return txt;
}