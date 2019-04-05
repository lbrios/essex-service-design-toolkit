// from: http://support.microsoft.com/kb/931509 [08/09/2010]

function ProcessImn() {
    if (typeof (ctx) == "undefined") return;
    if (ctx.CurrentUserId == -1) return;
    if (EnsureIMNControl() && IMNControlObj.PresenceEnabled) {
        imnElems = document.getElementsByName("imnmark");
        imnElemsCount = imnElems.length;
        ProcessImnMarkers();
    }
}
