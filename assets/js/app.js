//-------------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
//                                                              CLIENT CENTRAL MONITOR v6.0 - 2021/10/21(12:25)(last update)
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------------


function getXmlHttpRequestObject() {  //Gets the browser specific XmlHttpRequest Object
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest(); 	//Not IE
    } else if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP"); //IE
    } else {
        alert("Your browser doesn't want to use AJAX"); //Displays error message
    }
}
// var objJSON = '{"queryresult":[{"severity":"Warning","reason":"SystemMonitor","currentstatus":"ACTIVE","updatedby":"","created":"2019-05-29 07:48:35","notified":"1","hostid":"110","description":"The disk is over 80% utilised.","source":"DiskSpace","message":"Drive C: on WFSVARSQL02 is 81.8% utilised.","metric":"Drive_C:","id":"376","category":"Alarm","updated":"2019-06-10 10:53:35"},{"severity":"Warning","reason":"SystemMonitor","currentstatus":"ACTIVE","updatedby":"","created":"2019-05-29 07:48:43","notified":"1","hostid":"24","description":"The disk is over 80% utilised.","source":"DiskSpace","message":"Drive E: on KPPRESREC01 is 82.8% utilised.","metric":"Drive_E:","id":"377","category":"Alarm","updated":"2019-06-10 10:57:23"},{"severity":"Warning","reason":"SystemMonitor","currentstatus":"ACTIVE","updatedby":"","created":"2019-05-29 07:50:02","notified":"1","hostid":"34","description":"The disk is over 80% utilised.","source":"DiskSpace","message":"Drive D: on TRUVARSQL02 is 81.2% utilised.","metric":"Drive_D:","id":"382","category":"Alarm","updated":"2019-06-07 09:15:02"},{"severity":"Warning","reason":"SystemMonitor","currentstatus":"ACTIVE","updatedby":"","created":"2019-05-29 07:50:28","notified":"1","hostid":"26","description":"The disk is over 80% utilised.","source":"DiskSpace","message":"Drive \/dev\/mapper\/VolGroup00-LogVol_root on KPPRESINT is 84.7% utilised.","metric":"Drive_\/dev\/mapper\/VolGroup00-LogVol_root","id":"383","category":"Alarm","updated":"2019-06-10 10:55:54"},{"severity":"Warning","reason":"SystemMonitor","currentstatus":"ACTIVE","updatedby":"","created":"2019-05-29 07:50:29","notified":"1","hostid":"112","description":"The disk is over 80% utilised.","source":"DiskSpace","message":"Drive C: on WFSVARINT01 is 88.4% utilised.","metric":"Drive_C:","id":"384","category":"Alarm","updated":"2019-06-10 10:55:29"},{"severity":"Error","reason":"SystemMonitor","currentstatus":"ACTIVE","updatedby":"","created":"2019-05-29 07:50:30","notified":"1","hostid":"3","description":"The disk is over 90% utilised.","source":"DiskSpace","message":"Drive C: on XLPRESENCEAPP01 is 94.9% utilised.","metric":"Drive_C:","id":"385","category":"Alarm","updated":"2019-06-10 10:55:20"},{"severity":"Warning","reason":"SystemMonitor","currentstatus":"ACTIVE","updatedby":"","created":"2019-05-29 07:56:21","notified":"1","hostid":"107","description":"The disk is over 80% utilised.","source":"DiskSpace","message":"Drive D: on WFSVARCIM is 87.6% utilised.","metric":"Drive_D:","id":"390","category":"Alarm","updated":"2019-06-10 10:56:21"},{"severity":"Warning","reason":"SystemMonitor","currentstatus":"ACTIVE","updatedby":"","created":"2019-05-29 07:57:08","notified":"1","hostid":"105","description":"The disk is over 80% utilised.","source":"DiskSpace","message":"Drive E: on WFSPRESARCH01 is 81.5% utilised.","metric":"Drive_E:","id":"391","category":"Alarm","updated":"2019-06-10 10:54:18"},{"severity":"Warning","reason":"SystemMonitor","currentstatus":"ACTIVE","updatedby":"","created":"2019-05-29 07:57:29","notified":"1","hostid":"100","description":"The disk is over 80% utilised.","source":"DiskSpace","message":"Drive D: on SAGJHBVMPRES04 is 80.8% utilised.","metric":"Drive_D:","id":"392","category":"Alarm","updated":"2019-06-10 10:57:29"},{"severity":"Error","reason":"SystemMonitor","currentstatus":"ACTIVE","updatedby":"","created":"2019-05-29 09:30:30","notified":"1","hostid":"3","description":"Service is DOWN","source":"ServiceStatus","message":"Service Presence Update Service on XLPRESENCEAPP01 is not running.","metric":"Service Presence Update Service is down.","id":"399","category":"Alarm","updated":"2019-06-10 10:55:20"},{"severity":"Error","reason":"SystemMonitor","currentstatus":"ACTIVE","updatedby":"","created":"2019-05-29 09:35:11","notified":"1","hostid":"253","description":"Service is DOWN","source":"ServiceStatus","message":"Service Presence Server on WFSPRESAPP02 is not running.","metric":"Service Presence Server is down.","id":"458","category":"Alarm","updated":"2019-06-10 10:56:44"},{"severity":"Error","reason":"SystemMonitor","currentstatus":"ACTIVE","updatedby":"","created":"2019-05-29 09:35:11","notified":"1","hostid":"253","description":"Service is DOWN","source":"ServiceStatus","message":"Service Presence Statistics Server on WFSPRESAPP02 is not running.","metric":"Service Presence Statistics Server is down.","id":"459","category":"Alarm","updated":"2019-06-10 10:56:44"},{"severity":"Error","reason":"SystemMonitor","currentstatus":"ACTIVE","updatedby":"","created":"2019-05-29 09:35:11","notified":"1","hostid":"253","description":"Service is DOWN","source":"ServiceStatus","message":"Service Presence Update Service on WFSPRESAPP02 is not running.","metric":"Service Presence Update Service is down.","id":"460","category":"Alarm","updated":"2019-06-10 10:56:44"},{"severity":"Warning","reason":"SystemMonitor","currentstatus":"ACTIVE","updatedby":"","created":"2019-06-01 21:04:22","notified":"1","hostid":"86","description":"The disk is over 80% utilised.","source":"DiskSpace","message":"Drive D: on WIN-HR17G2KD3VQ is 80.5% utilised.","metric":"Drive_D:","id":"473","category":"Alarm","updated":"2019-06-10 10:54:08"}]}'

/*

 */

var arrayAlarm, arrayVodaAlarm;

var queryOPG = "";
var queryHost = "";
var queryPresence = "";
var queryCIMStatus = "";
var clientSiteId;

var nameofServer = "serverName";
var directServerName = "DIRECT";
var vodaServerName = "VODACOM";

var siteMapSiteID = "";
var directSiteList;
var vodacomSiteList;
var siteV = false;
var siteD = false;

// -- main req --
var receiveReq = getXmlHttpRequestObject();
var receiveVodaReq = getXmlHttpRequestObject();
var receiveSiteTypeReq = getXmlHttpRequestObject();
var receiveHostStatus = getXmlHttpRequestObject();
var receiveOpengateStatus = getXmlHttpRequestObject();
var receivePresenceStatus = getXmlHttpRequestObject();
var receiveCIMStatus = getXmlHttpRequestObject();

var receiveStatusCardRenderReq = getXmlHttpRequestObject();

// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
var userUpdateReq = getXmlHttpRequestObject();
var updateUSRlogReq = getXmlHttpRequestObject();
var createUSRlogReq = getXmlHttpRequestObject();
var createUserlogReq = getXmlHttpRequestObject();
var createVodaUserlogReq = getXmlHttpRequestObject();



var receiveDirectSiteUserListReq = getXmlHttpRequestObject();
var receiveVodacomSiteUserListReq = getXmlHttpRequestObject();

var createUserReq = getXmlHttpRequestObject();

var createUserDirectSitemapReq = getXmlHttpRequestObject();
var createUserVodaSitemapReq = getXmlHttpRequestObject();


// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                            CUSTOM REQUEST DECLARATION
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------


var receiveCustomDirectReq = getXmlHttpRequestObject();
var receiveCustomVodaReq = getXmlHttpRequestObject();

// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                            DISK INFO
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------

var receiveDiskInfoReq = getXmlHttpRequestObject();
var receiveVodacomDiskInfoReq = getXmlHttpRequestObject();


// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                            CHECK USER AUTHENTICATION
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------


// ---  filters ----
var receiveDirectSiteFilterReq = getXmlHttpRequestObject();
var receiveVodacomSiteFilterReq = getXmlHttpRequestObject();
var receiveSourceFilterReq = getXmlHttpRequestObject();
var receiveSeverityFilterReq = getXmlHttpRequestObject();
var receiveClientFilterReq = getXmlHttpRequestObject();
// --- tables --
var receiveDirectSiteTableReq = getXmlHttpRequestObject();
var receiveVodacomSiteTableReq = getXmlHttpRequestObject();

var receiveSourceTableReq = getXmlHttpRequestObject();
var receiveVodaSourceTableReq = getXmlHttpRequestObject();

var receiveSeverityTableReq = getXmlHttpRequestObject();
var receiveVodaSeverityTableReq = getXmlHttpRequestObject();

var receiveClientServerTableReq = getXmlHttpRequestObject();
var receiveClientVodaServerTableReq = getXmlHttpRequestObject();

var receiveStatusTableReq = getXmlHttpRequestObject();
var receiveVodaStatusTableReq = getXmlHttpRequestObject();

var receiveVodaClearedStatusTableReq = getXmlHttpRequestObject();
var receiveClearedStatusTableReq = getXmlHttpRequestObject();

var userProfilereq = getXmlHttpRequestObject();


var userManagementProfileReq = getXmlHttpRequestObject();
var userRelogProfileReq = getXmlHttpRequestObject();
var acknowledgeAlarmReq = getXmlHttpRequestObject();
var acknowledgeAlarmVodaReq = getXmlHttpRequestObject();

var clearedAlarmReq = getXmlHttpRequestObject();
var clearedAlarmVodaReq = getXmlHttpRequestObject();




var usePresenceCard = false;
var useHostStatusCard = false;
var useOpenGateTrunkStatusCard = false;
var useCIMStatusCard = false;
var CIMStatus;
var presStatus;
var opgStatus;
var hostStatus;




var inovoOkayStat = "Inovo:  <a><i class=\"fas fa-dot-circle\" style=\"font-size: 14px;color: limegreen;\"></i></a>";
var inovoFailStat = "Inovo:  <a><i class=\"fas fa-dot-circle\" style=\"font-size: 14px;color: red;\"></i></a>";
// var vodaOkayStat = "Vodacom:  <a><i class=\"fas fa-dot-circle\" style=\"font-size: 14px;color: limegreen;\"></i></a>";
// var vodaFailStat = "Vodacom:  <a><i class=\"fas fa-dot-circle\" style=\"font-size: 14px;color: red;\"></i></a>";

// The server in use
var serverURL = "/InovoCentralMonitorClient";
// var serverURL = "http://102.164.81.12:7080/InovoCentralMonitorClient";
// var serverURL = "http://monitor.inovolab.com:7080/InovoCentralMonitorClient";
// var serverURLDEV = "http://192.168.1.158:7080/InovoCentralMonitorClient";
var intervalID = null;
// //http://102.164.81.12:7080/InovoCentralMonitorClient

var userkeyForModal = "";
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                  THRESHOLD ADJUSTMENT
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
var acknowledgeReason;

var menuToggle = "Closed";

function openMenu() {

    var menuWrapper = document.getElementById("wrapper")
    var menuValue = menuWrapper.getAttribute("style")


    //if Menu is closed
    if (menuValue == "display: none;") {
        //Open Menu
        menuWrapper.setAttribute("style", "")

        menuToggle = "Open"
    } else {
        menuWrapper.setAttribute("style", "display: none;")

        menuToggle = "Closed";

    }
}


//document.body.addEventListener('click',closeMenu,true);

function closeMenu() {

    var menuWrapper = document.getElementById("wrapper")
    var menuValue = menuWrapper.getAttribute("style")

    //if Menu is open
    if (menuValue == "") {
        menuWrapper.setAttribute("style", "display: none;")
        //menuToggle = "Closed";
    }
}


function acknowledgeAlarm(acknwlgeAlrmID, serverName) {
    var acknowledgeAlarmID = acknwlgeAlrmID;
    var currentUser = "";
    var userKey, alarmID;
    if (userProfilereq.readyState == 4) {
        var jsonObj = JSON.parse(userProfilereq.responseText);
        currentUser = jsonObj['UserInfo'];

    }

    userKey = currentUser['userKey'];
    alarmID = acknowledgeAlarmID;

    var queryParam = "/UserActions?action=updatealarm&key=" + userKey + "&alarmid=" + alarmID + "&alarmstatus=RESET&reason=" + acknowledgeReason;

    if (serverName == "DIRECT") {

        acknowledgeReason = "User: " + currentUser['userLogin'] + ", Acknowledged Alarm: " + alarmID;
        //	document.body.style.cursor  = 'wait';
        acknowledgeAlarmReq.open("GET", serverURL + queryParam, true);
        //Set the function that will be called when the XmlHttpRequest objects state changes.
        acknowledgeAlarmReq.onreadystatechange = logUserAlarmAcknowledgement;
        acknowledgeAlarmReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        //Make the actual request.
        // 	var query = "SELECT * FROM InovoMonitor.tblAlarms t WHERE currentstatus<>'RESET'";
        acknowledgeAlarmReq.send();
    }
    // else if (serverName == "VODACOM") {

    //     acknowledgeReason = "User: " + currentUser['userLogin'] + ", Acknowledged Alarm: " + alarmID + "(REMOTE UPDATE)";
    //     var remoteVodaEXT = "/MonitorData?action=runopenquery&remotehost=https://41.0.203.210:8443/InovoCentralMonitorClient/MonitorData&query=";

    //     var query = "UPDATE tblAlarms SET currentstatus='RESET' WHERE id=" + alarmID + "";

    //     var check = serverURL + remoteVodaEXT + query;

    //     acknowledgeAlarmVodaReq.open("GET", serverURL + remoteVodaEXT + query, true);
    //     acknowledgeAlarmVodaReq.onreadystatechange = logUserVodaAlarmAcknowledgement;
    //     acknowledgeAlarmVodaReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //     acknowledgeAlarmVodaReq.send();
    // }
}


function logUserAlarmAcknowledgement() {
    if (acknowledgeAlarmReq.readyState == 4) {




        var currentUser;
        var userProfileID = "";
        var dateNow;

        // var remoteVodaEXT = "?remotehost=https://41.0.203.210:8443/InovoCentralMonitorClient/MonitorData&action=runopenquery&query=";


        var newUserId;

        var dbData = JSON.parse(userManagementProfileReq.responseText);
        var userDetails = dbData['queryresult'];


        var userProfileData = JSON.parse(userProfilereq.responseText);
        var userProfile = userProfileData['UserInfo'];

        currentUser = userProfile['userLogin']
        for (var iAlarm = 0; iAlarm < userDetails.length; iAlarm++) {

            var rowData = userDetails[iAlarm];
            if (currentUser == rowData['userlogin']) {
                userProfileID = rowData['id'];
            }
        }

        // // --------------------------------------------------------------------------------------------------------------------------------------------------
        // //  UPDATE USER LOG
        // // --------------------------------------------------------------------------------------------------------------------------------------------------
        var updateReason = acknowledgeReason;

        dateNow = new Date();
        dateNow = dateNow.getFullYear() + '-' +
            ('00' + (dateNow.getMonth() + 1)).slice(-2) + '-' +
            ('00' + dateNow.getDate()).slice(-2) + ' ' +
            ('00' + dateNow.getHours()).slice(-2) + ':' +
            ('00' + dateNow.getMinutes()).slice(-2) + ':' +
            ('00' + dateNow.getSeconds()).slice(-2);

        var insertAckLogquery = "INSERT INTO InovoMonitor.tblUserLog (userid, reason, datecreated, createdby)  VALUES ('" + userProfileID + "','" + String(updateReason) + "', '" + dateNow + "','" + currentUser + "');";

        createUserlogReq.open("POST", serverURL + "/MonitorData", true);
        createUserlogReq.onreadystatechange = acknowledgeResult;
        createUserlogReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        createUserlogReq.send("action=runopenquery&query=" + insertAckLogquery);
    }
}


// function logUserVodaAlarmAcknowledgement() {
//     if (acknowledgeAlarmVodaReq.readyState == 4) {




//         var currentUser;
//         var userProfileID = "";
//         var dateNow;

//         // var remoteVodaEXT = "?remotehost=https://41.0.203.210:8443/InovoCentralMonitorClient/MonitorData&action=runopenquery&query=";


//         var newUserId;

//         var dbData = JSON.parse(userManagementProfileReq.responseText);
//         var userDetails = dbData['queryresult'];


//         var userProfileData = JSON.parse(userProfilereq.responseText);
//         var userProfile = userProfileData['UserInfo'];

//         currentUser = userProfile['userLogin']
//         for (var iAlarm = 0; iAlarm < userDetails.length; iAlarm++) {

//             var rowData = userDetails[iAlarm];
//             if (currentUser == rowData['userlogin']) {
//                 userProfileID = rowData['id'];
//             }
//         }

//         // // --------------------------------------------------------------------------------------------------------------------------------------------------
//         // //  UPDATE USER LOG
//         // // --------------------------------------------------------------------------------------------------------------------------------------------------
//         var updateReason = acknowledgeReason;

//         dateNow = new Date();
//         dateNow = dateNow.getFullYear() + '-' +
//             ('00' + (dateNow.getMonth() + 1)).slice(-2) + '-' +
//             ('00' + dateNow.getDate()).slice(-2) + ' ' +
//             ('00' + dateNow.getHours()).slice(-2) + ':' +
//             ('00' + dateNow.getMinutes()).slice(-2) + ':' +
//             ('00' + dateNow.getSeconds()).slice(-2);

//         var insertAckLogquery = "INSERT INTO InovoMonitor.tblUserLog (userid, reason, datecreated, createdby)  VALUES ('" + userProfileID + "','" + String(updateReason) + "', '" + dateNow + "','" + currentUser + "');";

//         createVodaUserlogReq.open("POST", serverURL + "/MonitorData", true);
//         createVodaUserlogReq.onreadystatechange = acknowledgeVodaResult;
//         createVodaUserlogReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//         createVodaUserlogReq.send("action=runopenquery&query=" + insertAckLogquery);
//     }
// }




function acknowledgeVodaResult() {

    if (acknowledgeAlarmVodaReq.readyState == 4 && createVodaUserlogReq.readyState == 4) {
        var jsonObj = JSON.parse(acknowledgeAlarmVodaReq.responseText);


        //set time
        var toastDelayTime = 10000;
        // set title
        var toastTitle = "COMPLETE!";
        //Set Message
        var toastMessage = acknowledgeReason + " and it was completed successfully.";

        //set objects
        var toastPopup = document.getElementById("mainPageToastAlert");
        var toastTITLEObj = document.getElementById("toastTitle");
        var toastMSGObj = document.getElementById("toastMessage");


        // run toast
        toastPopup.setAttribute("data-delay", toastDelayTime);
        toastTITLEObj.innerHTML = toastTitle;
        toastMSGObj.innerHTML = toastMessage;
        $(function () { $('#mainPageToastAlert').toast('show'); });

    }

}



function acknowledgeResult() {

    if (acknowledgeAlarmReq.readyState == 4 && createUserlogReq.readyState == 4) {
        var jsonObj = JSON.parse(acknowledgeAlarmReq.responseText);


        //set time
        var toastDelayTime = 10000;
        // set title
        var toastTitle = "COMPLETE!";
        //Set Message
        var toastMessage = acknowledgeReason + " and it was completed successfully.";

        //set objects
        var toastPopup = document.getElementById("mainPageToastAlert");
        var toastTITLEObj = document.getElementById("toastTitle");
        var toastMSGObj = document.getElementById("toastMessage");


        // run toast
        toastPopup.setAttribute("data-delay", toastDelayTime);
        toastTITLEObj.innerHTML = toastTitle;
        toastMSGObj.innerHTML = toastMessage;
        $(function () { $('#mainPageToastAlert').toast('show'); });

    }

}


function isClearedModal(clrAlrmID, serverName, idData) {
    var div =

        "<div class=\"modal-dialog\" role=\"document\">"
        + "<div class=\"modal-content\">"
        + "<div class=\"modal-header\">"
        + "<h5 class=\"modal-title\">CLEAR ALARM</h5>"
        + "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">"
        + "<span aria-hidden=\"true\">&times;</span>"
        + "</button>"
        + "</div>"
        + "<div class=\"modal-body\">"
        + "<div class=\"container-fluid\">"
        + "Are you sure you want to clear the Alarm(" + clrAlrmID + ")?"
        + "</div>"
        + "</div>"
        + "<div class=\"modal-footer\">"
        + "<button type=\"button\" class=\"btn btn-secondary\"  data-toggle=\"modal\" data-target=\".bd-example-modal-lg\" onclick=\"getAlarmModal(" + idData + ")\"   data-dismiss=\"modal\""
        + "style=\"width: 200px;\">No</button>"
        + "<button type=\"button\" onclick=\"clearedAlarm(" + clrAlrmID + ", '" + serverName + "')\" data-dismiss=\"modal\""
        + "class=\"btn btn-primary\" style=\"width: 200px;\">Clear Alarm</button>"
        + "</div>"
        + "</div>"
        + "</div>"


    var modal = document.getElementById("modalClearConfirm");

    modal.innerHTML = div;
}



var clearedReason;

function clearedAlarm(clrAlrmID, serverName) {
    var clearedAlarmID = clrAlrmID;
    var currentUser = "";
    var userKey, alarmID;
    if (userProfilereq.readyState == 4) {
        var jsonObj = JSON.parse(userProfilereq.responseText);
        currentUser = jsonObj['UserInfo'];

    }

    var modalInfo = document.getElementById("modalClearConfirm");
    userKey = currentUser['userKey'];
    alarmID = clearedAlarmID;

    // var queryParam = "/UserActions?action=updatealarm&key=" + userKey + "&alarmid=" + alarmID + "&alarmstatus=CLEARED&reason=" + clearedReason;
    var queryParam = "UPDATE tblAlarms SET currentstatus='CLEARED' WHERE id=" + alarmID + "";
    if (serverName == "DIRECT") {

        clearedReason = "User: " + currentUser['userLogin'] + ", Cleared Alarm: " + alarmID;
        //	document.body.style.cursor  = 'wait';
        clearedAlarmReq.open("GET", serverURL + "/MonitorData?action=runopenquery&query=" + queryParam, true);
        //Set the function that will be called when the XmlHttpRequest objects state changes.
        clearedAlarmReq.onreadystatechange = logUserAlarmCleared;
        clearedAlarmReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        //Make the actual request.
        // 	var query = "SELECT * FROM InovoMonitor.tblAlarms t WHERE currentstatus<>'CLEARED'";
        clearedAlarmReq.send();

        // modalInfo.style.display = "none";
    }
    // else if (serverName == "VODACOM") {

    //     clearedReason = "User: " + currentUser['userLogin'] + ", Cleared Alarm: " + alarmID + "(REMOTE UPDATE)";
    //     var remoteVodaEXT = "/MonitorData?action=runopenquery&remotehost=https://41.0.203.210:8443/InovoCentralMonitorClient/MonitorData&query=";

    //     var query = "UPDATE tblAlarms SET currentstatus='CLEARED' WHERE id=" + alarmID + "";

    //     var check = serverURL + remoteVodaEXT + query;

    //     clearedAlarmVodaReq.open("GET", serverURL + remoteVodaEXT + query, true);
    //     clearedAlarmVodaReq.onreadystatechange = logUserVodaAlarmCleared;
    //     clearedAlarmVodaReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //     clearedAlarmVodaReq.send();

    //     // modalInfo.style.display = "none";
    // }
}


function logUserAlarmCleared() {
    if (clearedAlarmReq.readyState == 4) {




        var currentUser;
        var userProfileID = "";
        var dateNow;

        // var remoteVodaEXT = "?remotehost=https://41.0.203.210:8443/InovoCentralMonitorClient/MonitorData&action=runopenquery&query=";


        var newUserId;

        var dbData = JSON.parse(userManagementProfileReq.responseText);
        var userDetails = dbData['queryresult'];


        var userProfileData = JSON.parse(userProfilereq.responseText);
        var userProfile = userProfileData['UserInfo'];

        currentUser = userProfile['userLogin']
        for (var iAlarm = 0; iAlarm < userDetails.length; iAlarm++) {

            var rowData = userDetails[iAlarm];
            if (currentUser == rowData['userlogin']) {
                userProfileID = rowData['id'];
            }
        }

        // // --------------------------------------------------------------------------------------------------------------------------------------------------
        // //  UPDATE USER LOG
        // // --------------------------------------------------------------------------------------------------------------------------------------------------
        var updateReason = clearedReason;

        dateNow = new Date();
        dateNow = dateNow.getFullYear() + '-' +
            ('00' + (dateNow.getMonth() + 1)).slice(-2) + '-' +
            ('00' + dateNow.getDate()).slice(-2) + ' ' +
            ('00' + dateNow.getHours()).slice(-2) + ':' +
            ('00' + dateNow.getMinutes()).slice(-2) + ':' +
            ('00' + dateNow.getSeconds()).slice(-2);

        var insertAckLogquery = "INSERT INTO InovoMonitor.tblUserLog (userid, reason, datecreated, createdby)  VALUES ('" + userProfileID + "','" + String(updateReason) + "', '" + dateNow + "','" + currentUser + "');";

        createUserlogReq.open("POST", serverURL + "/MonitorData", true);
        createUserlogReq.onreadystatechange = clearedResult;
        createUserlogReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        createUserlogReq.send("action=runopenquery&query=" + insertAckLogquery);
    }
}


// function logUserVodaAlarmCleared() {
//     if (clearedAlarmVodaReq.readyState == 4) {




//         var currentUser;
//         var userProfileID = "";
//         var dateNow;

//         // var remoteVodaEXT = "?remotehost=https://41.0.203.210:8443/InovoCentralMonitorClient/MonitorData&action=runopenquery&query=";


//         var newUserId;

//         var dbData = JSON.parse(userManagementProfileReq.responseText);
//         var userDetails = dbData['queryresult'];


//         var userProfileData = JSON.parse(userProfilereq.responseText);
//         var userProfile = userProfileData['UserInfo'];

//         currentUser = userProfile['userLogin']
//         for (var iAlarm = 0; iAlarm < userDetails.length; iAlarm++) {

//             var rowData = userDetails[iAlarm];
//             if (currentUser == rowData['userlogin']) {
//                 userProfileID = rowData['id'];
//             }
//         }

//         // // --------------------------------------------------------------------------------------------------------------------------------------------------
//         // //  UPDATE USER LOG
//         // // --------------------------------------------------------------------------------------------------------------------------------------------------
//         var updateReason = clearedReason;

//         dateNow = new Date();
//         dateNow = dateNow.getFullYear() + '-' +
//             ('00' + (dateNow.getMonth() + 1)).slice(-2) + '-' +
//             ('00' + dateNow.getDate()).slice(-2) + ' ' +
//             ('00' + dateNow.getHours()).slice(-2) + ':' +
//             ('00' + dateNow.getMinutes()).slice(-2) + ':' +
//             ('00' + dateNow.getSeconds()).slice(-2);

//         var insertAckLogquery = "INSERT INTO InovoMonitor.tblUserLog (userid, reason, datecreated, createdby)  VALUES ('" + userProfileID + "','" + String(updateReason) + "', '" + dateNow + "','" + currentUser + "');";

//         createVodaUserlogReq.open("POST", serverURL + "/MonitorData", true);
//         createVodaUserlogReq.onreadystatechange = clearedVodaResult;
//         createVodaUserlogReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//         createVodaUserlogReq.send("action=runopenquery&query=" + insertAckLogquery);
//     }
// }




// function clearedVodaResult() {

//     if (clearedAlarmVodaReq.readyState == 4 && createVodaUserlogReq.readyState == 4) {
//         var jsonObj = JSON.parse(clearedAlarmVodaReq.responseText);


//         //set time
//         var toastDelayTime = 10000;
//         // set title
//         var toastTitle = "COMPLETE!";
//         //Set Message
//         var toastMessage = clearedReason + " and it was completed successfully.";

//         //set objects
//         var toastPopup = document.getElementById("mainPageToastAlert");
//         var toastTITLEObj = document.getElementById("toastTitle");
//         var toastMSGObj = document.getElementById("toastMessage");


//         // run toast
//         toastPopup.setAttribute("data-delay", toastDelayTime);
//         toastTITLEObj.innerHTML = toastTitle;
//         toastMSGObj.innerHTML = toastMessage;
//         $(function () { $('#mainPageToastAlert').toast('show'); });

//     }

// }



function clearedResult() {

    if (clearedAlarmReq.readyState == 4 && createUserlogReq.readyState == 4) {
        var jsonObj = JSON.parse(clearedAlarmReq.responseText);


        //set time
        var toastDelayTime = 10000;
        // set title
        var toastTitle = "COMPLETE!";
        //Set Message
        var toastMessage = clearedReason + " and it was completed successfully.";

        //set objects
        var toastPopup = document.getElementById("mainPageToastAlert");
        var toastTITLEObj = document.getElementById("toastTitle");
        var toastMSGObj = document.getElementById("toastMessage");


        // run toast
        toastPopup.setAttribute("data-delay", toastDelayTime);
        toastTITLEObj.innerHTML = toastTitle;
        toastMSGObj.innerHTML = toastMessage;
        $(function () { $('#mainPageToastAlert').toast('show'); });

    }

}

function getDiskInfo(hostid) {
    //	alert("getDiskInfo");
    document.getElementById('diskTable').innerHTML = "Waiting for threshold data to load...";
    //	document.body.style.cursor  = 'wait';
    receiveDiskInfoReq.open("GET", serverURL + "/ThresholdConfig?action=getdiskinfo&hostid=" + hostid, true);
    //Set the function that will be called when the XmlHttpRequest objects state changes.
    receiveDiskInfoReq.onreadystatechange = getDiskInfoResult;
    receiveDiskInfoReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    //Make the actual request.
    // 	var query = "SELECT * FROM InovoMonitor.tblAlarms t WHERE currentstatus<>'RESET'";
    receiveDiskInfoReq.send();
}
function getDiskInfoResult() {
    //Check to see if the XmlHttpRequests state is finished.
    if (receiveDiskInfoReq.readyState == 4) {
        //		document.body.style.cursor  = default';
        //Here we should have some JSON data !!
        //		alert("Disk : " + receiveDiskInfoReq.responseText);
        var jsonObj = JSON.parse(receiveDiskInfoReq.responseText);
        var diskArr = jsonObj['DiskInfo'];
        //		alert(diskArr.length);
        var hostid = "0";
        var entrycnt = 0;
        var diskOption = "<select id=\"diskid\">";
        var diskUsage = "<select id=\"diskusage\">";
        var thresTable = "<h3>Alert Thresholds for disk usage</h3><table border='1'><tr><th width=\"10%\">Device</th><th width=\"30%\">MountPoint</th><th width=\"20%\">Current %</th><th  width=\"20%\">Warning %</th><th  width=\"20%\">Critical %</th></tr>";
        var thresTable2 = "" + "<table class=\"table\"><thead style=\"background-color: rgb(255, 255, 255);\">" + "<tr><th style=\"color: rgb(0,0,0);\">Device</th>" + "<th style=\"color: rgb(0,0,0);\">MountPoint</th><th style=\"color: black;\">Current %</th><th style=\"color: black;\">Warning %</th><th style=\"color: black;\">Critical %</th></tr></thead><tbody>"
        for (var i = 0; i < diskArr.length; i++) {
            var obj = diskArr[i];
            entrycnt = i + 1;
            hostid = obj['hostid'];
            thresTable2 += "<tr><td><center>" + obj['diskdevice'] + "</center></td><td>" + obj['mountpoint'] + "</td><td><center>" + obj['persUsed'] + "</center></td><td><center><input name=\"" + obj['diskdevice'] + "\" type=\"number\" id=\"warning_" + i + "\" value=\"" + obj['threswarning'] + "\" maxlength=\"3\" size=\"2\" placeholder=\"80\"></center></td><td><center><input name=\"" + hostid + "\" type=\"number\" id=\"critical_" + i + "\" value=\"" + obj['threscritical'] + "\" maxlength=\"3\" size=\"2\"  placeholder=\"90\"></center></td></tr>";
            thresTable += "<tr><td><center>" + obj['diskdevice'] + "</center></td><td>" + obj['mountpoint'] + "</td><td><center>" + obj['persUsed'] + "</center></td><td><center><input name=\"" + obj['diskdevice'] + "\" type=\"number\" id=\"warning_" + i + "\" value=\"" + obj['threswarning'] + "\" maxlength=\"3\" size=\"2\"></center></td><td><center><input name=\"" + hostid + "\" type=\"number\" id=\"critical_" + i + "\" value=\"" + obj['threscritical'] + "\" maxlength=\"3\" size=\"2\"></center></td></tr>";
            diskOption += "<option value=\"" + obj['id'] + "\">" + obj['diskdevice'] + " (" + obj['persUsed'] + " % Used)" + "</option>";
            diskUsage += "<option value=\"" + obj['id'] + "\">" + obj['persUsed'] + "</option>";
        }
        thresTable += "<tr><td colspan='4'></td><td><button onclick=\"updateHost(" + hostid + "," + entrycnt + ")\">Update Host</button></td></tr>";
        thresTable2 += "<tr><td colspan='4'></td><td><button class=\"btn btn-dark\" onclick=\"updateHost(" + hostid + "," + entrycnt + ")\">Update Host</button></td></tr>";
        thresTable += "</table>";
        thresTable2 += "</tbody></table>";
        diskOption += "</select>";
        diskUsage += "</select>";

        //		alert(diskOption);
        //		document.getElementById('disks').innerHTML = diskOption;
        document.getElementById('diskTable').innerHTML = thresTable2;
    }
}



// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                                         users Manage list
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
function requestRelogUserList() {

}
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                                         users Manage list
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
function requestUserManagementList() {
    var query = "SELECT InovoMonitor.tblUsers.id, InovoMonitor.tblUsers.username,InovoMonitor.tblUsers.usersurname,InovoMonitor.tblUsers.userkey,InovoMonitor.tblUsers.userlogin,InovoMonitor.tblUsers.usertype,InovoMonitor.tblUsers.useractive,InovoMonitor.tblUserTypes.description FROM InovoMonitor.tblUsers INNER JOIN InovoMonitor.tblUserTypes ON InovoMonitor.tblUserTypes.id = InovoMonitor.tblUsers.usertype WHERE InovoMonitor.tblUsers.useractive = 1;";
    // var query = "SELECT * FROM InovoMonitor.tblUsers"; // where InovoMonitor.tblUsers.userpassword = '" + passW + "' AND InovoMonitor.tblUsers.username = '" + userN + "';"

    // userManagementProfileReq.open("POST", serverURLDEV + "/MonitorData", true);
    userManagementProfileReq.open("POST", serverURL + "/MonitorData", true);
    userManagementProfileReq.onreadystatechange = checkLoggedInUser;
    userManagementProfileReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    userManagementProfileReq.send("action=runopenquery&query=" + query);

}
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                                       Manage users
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
function checkUsers() {
    var query = "SELECT InovoMonitor.tblUsers.id, InovoMonitor.tblUsers.username,InovoMonitor.tblUsers.usersurname,InovoMonitor.tblUsers.userkey,InovoMonitor.tblUsers.userlogin,InovoMonitor.tblUsers.usertype,InovoMonitor.tblUsers.useractive,InovoMonitor.tblUserTypes.description FROM InovoMonitor.tblUsers INNER JOIN InovoMonitor.tblUserTypes ON InovoMonitor.tblUserTypes.id = InovoMonitor.tblUsers.usertype WHERE InovoMonitor.tblUsers.useractive = 1;";
    // var query = "SELECT * FROM InovoMonitor.tblUsers"; // where InovoMonitor.tblUsers.userpassword = '" + passW + "' AND InovoMonitor.tblUsers.username = '" + userN + "';"

    // userManagementProfileReq.open("POST", serverURLDEV + "/MonitorData", true);
    userManagementProfileReq.open("POST", serverURL + "/MonitorData", true);
    userManagementProfileReq.onreadystatechange = manageUsers;
    userManagementProfileReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    userManagementProfileReq.send("action=runopenquery&query=" + query);
}


function manageUsers() {


    var sideMenu = document.getElementById("wrapper");
    sideMenu.style.display = "none";


    if (userManagementProfileReq.readyState == 4 && userProfilereq.readyState == 4) {


        var userProfileData = JSON.parse(userProfilereq.responseText);
        var userProfile = userProfileData['UserInfo'];


        var userDetails;
        // var aNewTableArr = [];

        //Here we should have some JSON data !!
        var dbData = JSON.parse(userManagementProfileReq.responseText);
        userDetails = dbData['queryresult'];

        //add header for table
        var txtData = "";
        var btnCreate = "";

        // far fa-plus-square

        if (userProfile['userTypeDescription'] == "Administrator") {

            btnCreate = "<button id=\"logInBtn\" data-dismiss=\"modal\" data-toggle=\"modal\" data-target=\"#modalCreateUser\" onclick=\"openCreateUser()\" class=\"btn btn-dark btn-block\" type=\"button\" style=\"margin-right: 1rem; padding-right: 0px;  padding-left: 0px;\"><i class=\"fas fa-user-plus\"></i> Create User</button>";


            for (var iAlarm = 0; iAlarm < userDetails.length; iAlarm++) {
                var rowData = userDetails[iAlarm];

                rwData =
                    "<tr><td class=\"table-cell-custom\">"
                    + rowData['username']
                    + "</td><td class=\"table-cell-custom\">" + rowData['usersurname']
                    + "</td><td class=\"table-cell-custom\">" + rowData['userlogin']
                    + "</td><td class=\"table-cell-custom\">" + rowData['description']
                    + "</td><td class=\"table-cell-custom\">"
                    + "<a class=\"userModalPress\"  data-dismiss=\"modal\" data-toggle=\"modal\" data-target=\"#userManageModal\"  onclick=\"retrieveUserDetails(" + iAlarm + "); \" title=\"Click for More Info on the user\">"
                    + "<i class=\"far fa-plus-square\" style=\"font-size: 25px;color: rgb(4,4,4);\"></i>"
                    + "</a>"
                    + "</td></tr>";

                txtData += rwData;

            }
        }

        else if (userProfile['userTypeDescription'] == "User") {

            btnCreate = "";
            for (var iAlarm = 0; iAlarm < userDetails.length; iAlarm++) {
                var rowData = userDetails[iAlarm];

                if (userProfile['userName'] == rowData['username']) {
                    rwData =
                        "<tr><td class=\"table-cell-custom\">"
                        + rowData['username']
                        + "</td><td class=\"table-cell-custom\">" + rowData['usersurname']
                        + "</td><td class=\"table-cell-custom\">" + rowData['userlogin']
                        + "</td><td class=\"table-cell-custom\">" + rowData['description']
                        + "</td><td class=\"table-cell-custom\">"
                        + "<a class=\"userModalPress\"  data-dismiss=\"modal\" data-toggle=\"modal\" data-target=\"#userManageModal\"  onclick=\"retrieveUserDetails(" + iAlarm + "); \" title=\"Click for More Info on the user\">"
                        + "<i class=\"far fa-plus-square\" style=\"font-size: 25px;color: rgb(4,4,4);\"></i>"
                        + "</a>"
                        + "</td></tr>";

                    txtData += rwData;
                }

            }
        }

        // txtData += "</tbody></table>";
        document.getElementById("userManageTable").innerHTML = txtData;
        document.getElementById("userButtons").innerHTML = btnCreate;
    }

}
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                                          retrieve users
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
function retrieveUserDetails(userNumber) {

    var reqNumber = userNumber;
    var userDetails, nameVar, surnameVar, loginVar, accessTypeVar, activeVar, profileIdVar;
    // var aNewTableArr = [];
    if (userManagementProfileReq.readyState == 4) {
        //Here we should have some JSON data !!
        var dbData = JSON.parse(userManagementProfileReq.responseText);
        userDetails = dbData['queryresult'];

        // var userProfileData = JSON.parse(userProfilereq.responseText);
        // var userProfile = userProfileData['UserInfo'];

        //add header for table
        var txtData = "";

        // far fa-plus-square


        var rowData = userDetails[reqNumber];

        nameVar = rowData['username'];
        surnameVar = rowData['usersurname'];
        loginVar = rowData['userlogin'];
        accessTypeVar = rowData['description'];
        activeVar = rowData['useractive'];
        profileIdVar = rowData['id'];

        var activeName = "";

        if (activeVar == 1) {
            activeName = "Active"
        } else {
            activeName = "InActive";
        }

        var btnUpdateProfile = "<div class=\"modal-footer\"><button class=\"btn btn-dark\" onclick=\"updateProfile(" + profileIdVar + ")\"type=\"button\" data-dismiss=\"modal\">Update Profile</button></div>";


        // table inforamtion

        rwData =
            "<thead><tr><th style=\"color: rgb(0,0,0);\">Key</th>"
            + "<th style=\"color: rgb(0,0,0);\">Value</th></tr></thead>"
            + "<tbody><tr><td class=\"table-cell-custom\">User Name: </td><td class=\"table-cell-custom\">" + nameVar + "</td></tr>"
            + "<tr><td class=\"table-cell-custom\">User Surname: </td><td class=\"table-cell-custom\">" + surnameVar + "</td></tr>"
            + "<tr><td class=\"table-cell-custom\">User Login: </td><td class=\"table-cell-custom\">" + loginVar + "</td></tr>"
            + "<tr><td class=\"table-cell-custom\">User Access Type: </td>"
            + "<td class=\"table-cell-custom\">" + accessTypeVar + "</td></tr>"
            + "<tr><td class=\"table-cell-custom\">User Active: </td><td class=\"table-cell-custom\">" + activeName + "</td></tr>"
            + "</tbody>";


        txtData += rwData;

    }

    // txtData += "</tbody></table>";
    document.getElementById("manageUserTable").innerHTML = txtData;
    document.getElementById("manageUserName").innerHTML = nameVar + " " + surnameVar;
    document.getElementById("updateBtnSection").innerHTML = btnUpdateProfile;


}

// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                       update user log
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
function updateUserLog(selectUserID, selectNewUserName, selectNewUserSurname, selectNewUserPass, selectNewUserActive, selectNewUserAccess) {

    var userProfile;
    if (userProfilereq.readyState == 4) {
        var userProfileData = JSON.parse(userProfilereq.responseText);
        userProfile = userProfileData['UserInfo'];
    }

    var setNewUserName = "";

    var setActionId = 3;

    var setNewUserSurname = "";
    var setNewUserPass = "";
    var setNewUserActive = "";
    var setNewUserAccess = "";
    var selectedUserID = "";

    var loggedInUser = userProfile['userLogin'];

    var setReason = "User: " + loggedInUser + ", changed: ";


    // setting reason

    if (selectNewUserName != "" && selectNewUserName != undefined) {
        setNewUserName = "user name: " + selectNewUserName + "";

    }
    if (selectNewUserSurname != "" && selectNewUserSurname != undefined) {
        setNewUserSurname = "user surname: " + selectNewUserSurname + "";

    }
    if (selectNewUserPass != "" && selectNewUserPass != undefined) {
        setNewUserPass = "user password";

    }
    if (selectNewUserActive != "" && selectNewUserActive != undefined) {
        setNewUserActive = "useractive= " + selectNewUserActive + "";

    }
    if (selectNewUserAccess != "" && selectNewUserAccess != undefined) {
        setNewUserAccess = "user access type: " + selectNewUserAccess + "";

    }
    // selectedUserID = "InovoMonitor.tblUsers.ID=" + selectUserID;

    var queryKey = "Choose"

    var finalReason;
    // var intialQuery = "SELECT InovoMonitor.tblSites.sitename, InovoMonitor.tblAlarms.hostid, InovoMonitor.tblAlarms.id, InovoMonitor.tblHosts.hostName, InovoMonitor.tblAlarms.description, InovoMonitor.tblAlarms.severity, InovoMonitor.tblAlarms.Message, InovoMonitor.tblAlarms.currentstatus, InovoMonitor.tblAlarms.source, InovoMonitor.tblAlarms.category, InovoMonitor.tblAlarms.created, InovoMonitor.tblAlarms.updated, InovoMonitor.tblAlarms.updatedby FROM InovoMonitor.tblAlarms INNER JOIN InovoMonitor.tblHosts ON InovoMonitor.tblAlarms.hostid = InovoMonitor.tblHosts.id INNER JOIN InovoMonitor.tblSites ON InovoMonitor.tblSites.id = InovoMonitor.tblHosts.siteid ";
    //  var intialQuery = "UPDATE InovoMonitor.tblUsers SET ";
    //  + setNewUserName + ", " + setNewUserSurname + ", " + setNewUserPass + ", " + setNewUserActive + " , " + setNewUserAccess + " WHERE " + +";"

    var clauseQuery = "";
    var queryArr = [];

    if ((setNewUserName.indexOf(queryKey) == -1) && (setNewUserName != "")) {
        queryArr.push(setNewUserName);
    }
    if ((setNewUserSurname.indexOf(queryKey) == -1) && (setNewUserSurname != "")) {
        queryArr.push(setNewUserSurname);
    }
    if ((setNewUserPass.indexOf(queryKey) == -1) && (setNewUserPass != "")) {
        queryArr.push(setNewUserPass);
    }
    if ((setNewUserActive.indexOf(queryKey) == -1) && (setNewUserActive != "")) {
        queryArr.push(setNewUserActive);
    }
    if ((setNewUserAccess.indexOf(queryKey) == -1) && (setNewUserAccess != "")) {
        queryArr.push(setNewUserAccess);
    }


    if (queryArr.length >= 2) {
        var n = 0;
        for (i = 0; i < queryArr.length - 1; i++) {
            n++;
            clauseQuery += queryArr[i] + " , ";
        }

        clauseQuery += queryArr[n];

    }
    else if (queryArr.length == 1) {
        clauseQuery += queryArr[0];
    }
    else {
        clauseQuery += "No Clause";
    }




    if (clauseQuery.indexOf("No Clause") == -1) {
        finalReason = setReason + clauseQuery;
    } else {

        finalReason = "false";
    }


    return finalReason;
}
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                       create user log
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
function createUserLog(creatorUserID, selectNewUserName, selectNewUserSurname, selectNewUserlogin, selectNewUserPass, selectNewUserActive, selectNewUserAccess) {
    // createUserLog(userProfileID, newUserName, newUserSurname, newUserLogin, newUserPass, newUserActive, newUserAccess);
    var currentUserProfile;
    if (userProfilereq.readyState == 4) {
        var userProfileData = JSON.parse(userProfilereq.responseText);
        currentUserProfile = userProfileData['UserInfo'];
    }

    var setNewUserName = "";

    //var setActionId = 3;

    var setNewUserSurname = "";
    var setNewUserPass = "";
    var setNewUserlogin = "";
    var setNewUserActive = "";
    var setNewUserAccess = "";
    //var selectedUserID = "";

    var loggedInUser = currentUserProfile['userLogin'];

    var setReason = "User: " + loggedInUser + ", created a user with the following details: ";


    // setting reason

    if (selectNewUserName != "" && selectNewUserName != undefined) {
        setNewUserName = "user name: " + selectNewUserName + "";

    }
    if (selectNewUserSurname != "" && selectNewUserSurname != undefined) {
        setNewUserSurname = "user surname: " + selectNewUserSurname + "";

    }
    if (selectNewUserlogin != "" && selectNewUserlogin != undefined) {
        setNewUserlogin = "user login: " + selectNewUserlogin + "";

    }
    if (selectNewUserPass != "" && selectNewUserPass != undefined) {
        setNewUserPass = "user password";

    }
    if (selectNewUserActive != "" && selectNewUserActive != undefined) {
        setNewUserActive = "useractive= " + selectNewUserActive + "";

    }
    if (selectNewUserAccess != "" && selectNewUserAccess != undefined) {
        setNewUserAccess = "user access type: " + selectNewUserAccess + "";

    }
    // selectedUserID = "InovoMonitor.tblUsers.ID=" + selectUserID;

    var queryKey = "Choose"

    var finalReason;
    // var intialQuery = "SELECT InovoMonitor.tblSites.sitename, InovoMonitor.tblAlarms.hostid, InovoMonitor.tblAlarms.id, InovoMonitor.tblHosts.hostName, InovoMonitor.tblAlarms.description, InovoMonitor.tblAlarms.severity, InovoMonitor.tblAlarms.Message, InovoMonitor.tblAlarms.currentstatus, InovoMonitor.tblAlarms.source, InovoMonitor.tblAlarms.category, InovoMonitor.tblAlarms.created, InovoMonitor.tblAlarms.updated, InovoMonitor.tblAlarms.updatedby FROM InovoMonitor.tblAlarms INNER JOIN InovoMonitor.tblHosts ON InovoMonitor.tblAlarms.hostid = InovoMonitor.tblHosts.id INNER JOIN InovoMonitor.tblSites ON InovoMonitor.tblSites.id = InovoMonitor.tblHosts.siteid ";
    //  var intialQuery = "UPDATE InovoMonitor.tblUsers SET ";
    //  + setNewUserName + ", " + setNewUserSurname + ", " + setNewUserPass + ", " + setNewUserActive + " , " + setNewUserAccess + " WHERE " + +";"

    var clauseQuery = "";
    var queryArr = [];

    if ((setNewUserName.indexOf(queryKey) == -1) && (setNewUserName != "")) {
        queryArr.push(setNewUserName);
    }
    if ((setNewUserSurname.indexOf(queryKey) == -1) && (setNewUserSurname != "")) {
        queryArr.push(setNewUserSurname);
    }
    if ((setNewUserlogin.indexOf(queryKey) == -1) && (setNewUserlogin != "")) {
        queryArr.push(setNewUserlogin);
    }
    if ((setNewUserPass.indexOf(queryKey) == -1) && (setNewUserPass != "")) {
        queryArr.push(setNewUserPass);
    }
    if ((setNewUserActive.indexOf(queryKey) == -1) && (setNewUserActive != "")) {
        queryArr.push(setNewUserActive);
    }
    if ((setNewUserAccess.indexOf(queryKey) == -1) && (setNewUserAccess != "")) {
        queryArr.push(setNewUserAccess);
    }


    if (queryArr.length >= 2) {
        var n = 0;
        for (i = 0; i < queryArr.length - 1; i++) {
            n++;
            clauseQuery += queryArr[i] + " , ";
        }

        clauseQuery += queryArr[n];

    }
    else if (queryArr.length == 1) {
        clauseQuery += queryArr[0];
    }
    else {
        clauseQuery += "No Clause";
    }




    if (clauseQuery.indexOf("No Clause") == -1) {
        finalReason = setReason + clauseQuery;
    } else {

        finalReason = "false";
    }


    return finalReason;
}
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                       CUSTOM FILTER  - RUN CUSTOM SEARCH
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
function createUpdateQuery(selectNewUserName, selectNewUserSurname, selectNewUserPass, selectNewUserActive, selectNewUserAccess, selectUserID) {

    var setNewUserName = "";

    var setNewUserSurname = "";
    var setNewUserPass = "";
    var setNewUserActive = "";
    var setNewUserAccess = "";
    var selectedUserID = "";

    if (selectNewUserName != "" && selectNewUserName != undefined) {
        setNewUserName = "InovoMonitor.tblUsers.username = '" + selectNewUserName + "'";

    }
    if (selectNewUserSurname != "" && selectNewUserSurname != undefined) {
        setNewUserSurname = "InovoMonitor.tblUsers.usersurname= '" + selectNewUserSurname + "'";

    }
    if (selectNewUserPass != "" && selectNewUserPass != undefined) {
        setNewUserPass = "InovoMonitor.tblUsers.userpassword='" + selectNewUserPass + "'";

    }
    if (selectNewUserActive != "" && selectNewUserActive != undefined) {
        setNewUserActive = "InovoMonitor.tblUsers.useractive= " + selectNewUserActive + "";

    }
    if (selectNewUserAccess != "" && selectNewUserAccess != undefined) {
        setNewUserAccess = "InovoMonitor.tblUsers.usertype= " + selectNewUserAccess + "";

    }
    selectedUserID = "InovoMonitor.tblUsers.ID=" + selectUserID;

    var queryKey = "Choose"

    var finalQuery;
    // var intialQuery = "SELECT InovoMonitor.tblSites.sitename, InovoMonitor.tblAlarms.hostid, InovoMonitor.tblAlarms.id, InovoMonitor.tblHosts.hostName, InovoMonitor.tblAlarms.description, InovoMonitor.tblAlarms.severity, InovoMonitor.tblAlarms.Message, InovoMonitor.tblAlarms.currentstatus, InovoMonitor.tblAlarms.source, InovoMonitor.tblAlarms.category, InovoMonitor.tblAlarms.created, InovoMonitor.tblAlarms.updated, InovoMonitor.tblAlarms.updatedby FROM InovoMonitor.tblAlarms INNER JOIN InovoMonitor.tblHosts ON InovoMonitor.tblAlarms.hostid = InovoMonitor.tblHosts.id INNER JOIN InovoMonitor.tblSites ON InovoMonitor.tblSites.id = InovoMonitor.tblHosts.siteid ";
    var intialQuery = "UPDATE InovoMonitor.tblUsers SET ";
    //  + setNewUserName + ", " + setNewUserSurname + ", " + setNewUserPass + ", " + setNewUserActive + " , " + setNewUserAccess + " WHERE " + +";"

    var clauseQuery = "";
    var queryArr = [];

    if ((setNewUserName.indexOf(queryKey) == -1) && (setNewUserName != "")) {
        queryArr.push(setNewUserName);
    }
    if ((setNewUserSurname.indexOf(queryKey) == -1) && (setNewUserSurname != "")) {
        queryArr.push(setNewUserSurname);
    }
    if ((setNewUserPass.indexOf(queryKey) == -1) && (setNewUserPass != "")) {
        queryArr.push(setNewUserPass);
    }
    if ((setNewUserActive.indexOf(queryKey) == -1) && (setNewUserActive != "")) {
        queryArr.push(setNewUserActive);
    }
    if ((setNewUserAccess.indexOf(queryKey) == -1) && (setNewUserAccess != "")) {
        queryArr.push(setNewUserAccess);
    }


    if (queryArr.length >= 2) {
        var n = 0;
        for (i = 0; i < queryArr.length - 1; i++) {
            n++;
            clauseQuery += queryArr[i] + " , ";
        }

        clauseQuery += queryArr[n];

    }
    else if (queryArr.length == 1) {
        clauseQuery += queryArr[0];
    }
    else {
        clauseQuery += "No Clause";
    }


    if (clauseQuery.indexOf("No Clause") == -1) {
        finalQuery = intialQuery + clauseQuery + " WHERE " + selectedUserID;
    } else {

        finalQuery = "false";
    }


    return finalQuery;
}

// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------create profile
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
function createProfile() {
    var newUserName = $('#updateUserName').val();
    var newUserSurname = $('#updateUserSurname').val();
    var newUserPass = $('#updateUserPass').val();
    var newUserConfPass = $('#updateConfirmUserPass').val();
    var newUserActive = $('#selectUserActive').val();
    var newUserAccess = $('#selectUserAccess').val();
    var userProfileID = profileId;

    if (newUserConfPass == newUserPass && newUserPass != undefined && newUserConfPass != undefined) {
        var query = createUpdateQuery(newUserName, newUserSurname, newUserPass, newUserActive, newUserAccess, userProfileID)
        // var query = "SELECT * FROM InovoMonitor.tblAlarms;"

        if (query != "false") {
            // userUpdateReq.open("POST", serverURLDEV + "/MonitorData", true);
            userUpdateReq.open("POST", serverURL + "/MonitorData", true);

            userUpdateReq.onreadystatechange = updateProfileResult;
            // set the Request Header
            userUpdateReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


            //Make the actual request.
            userUpdateReq.send("action=runopenquery&query=" + query);

        } else {
            alert('please ensure a change needs to be made before you try to update');
        }
    } else {
        alert('password is not the same');
    }
}

function createProfileResult() {
    if (userUpdateReq.readyState == 4) {
        var userUpdateReqData = JSON.parse(userUpdateReq.responseText);
        var finalResult = userUpdateReqData['queryresult'];

        if (finalResult == []) {
            alert("Update is complete!");
        }
    }
}
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------- open create new user
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
function openCreateUser() {

    // var newUsername;
    // var newUsersurname;
    // var newUserpassword;
    // var newUserConfPass;
    var newUserAccess;
    var newUserLogin;
    var newUserActive;
    var newUserVodaSiteList;
    var newUserDirectSiteList;

    var siteVodaTxtData = "";
    var siteDirectTxtData = "";

    //if (receiveDirectSiteUserListReq.readyState == 4 && receiveVodacomSiteUserListReq.readyState == 4) {

    // var dbData = JSON.parse(receiveDirectSiteUserListReq.responseText);
    // var arrayDAlarm = dbData['queryresult'];
    // var dbData = JSON.parse(receiveVodacomSiteUserListReq.responseText);
    // var arrayVAlarm = dbData['queryresult'];

    newUserAccess = "<div class=\"input-group mb-3\"><div class=\"input-group-prepend\"><label class=\"input-group-text\"for=\"searchGroupSelect01\">Access Level</label></div><select class=\"custom-select\" id=\"createUserAccess\"><option selected=\"\">Choose User Access Level...</option><option value=\"1\">Administrator</option><option value=\"2\">User</option><option value=\"3\">Guest</option><option value=\"4\">Wallboard</option></select></div>";
    newUserActive = "<div class=\"input-group mb-3\"><div class=\"input-group-prepend\"><label class=\"input-group-text\"for=\"searchGroupSelect01\">User Active</label></div><select class=\"custom-select\" id=\"createUserActive\"><option selected=\"\">Choose If User Is Active...</option><option value=\"1\">Yes</option><option value=\"0\">No</option></select></div>";


    // create and  populate the

    // filVodadata = "<div class=\"input-group mb-3\"><div class=\"input-group-prepend\"><label class=\"input-group-text\">User Vodacom Site Select</label></div><select class=\"custom-select\" id=\"selectSearchVodacom\"><option selected>Assign Vodacom Clients to User...</option><option value=\"All\">Select All Vodacom Sites</option>";
    // filVodadata = "<div class=\"card\" style=\"width: 18rem;\"><ul id=\"listVoda\" class=\"list-group list-group-flush\"><li class=\"list-group-item\"><input type=\"checkbox\" value=\"Select All\">Select all Vodacom Sites</li>";
    // siteVodaTxtData += filVodadata;
    // filDirectdata = "<div class=\"input-group mb-3\"><div class=\"input-group-prepend\"><label class=\"input-group-text\">User Direct Site Select</label></div><select class=\"custom-select\" id=\"selectDirect\"><option selected>Assign Direct Clients to User...</option><option value=\"All\">Select All Direct Sites</option>";
    // filDirectdata = "<div class=\"card\" style=\"width: 18rem;\"><ul id=\"listDirect\" class=\"list-group list-group-flush\"><li class=\"list-group-item\"><input type=\"checkbox\" value=\"Select All\">Select all Direct Sites</li>";
    // siteDirectTxtData += filDirectdata;
    // for (var iAlarm = 0; iAlarm < arrayVAlarm.length; iAlarm++) {
    //     var rowData = arrayVAlarm[iAlarm];

    //     filVodadata = "<option id=\"" + rowData['sitename'] + "\" value=\"" + rowData['id'] + "\">" + rowData['sitename'] + "</option>";
    //     filVodadata = "<li class=\"list-group-item\"><input type=\"checkbox\" id=\"" + rowData['sitename'] + "\" value=\"" + rowData['id'] + "\">" + rowData['sitename'] + "</input>";

    //     siteVodaTxtData += filVodadata;
    // }
    // for (var iAlarm = 0; iAlarm < arrayDAlarm.length; iAlarm++) {
    //     var rowData = arrayDAlarm[iAlarm];

    //     filDirectdata = "<option id=\"" + rowData['sitename'] + "\" value=\"" + rowData['id'] + "\">" + rowData['sitename'] + "</option>";
    //     filDirectdata = "<li class=\"list-group-item\"><input type=\"checkbox\" id=\"" + rowData['sitename'] + "\" value=\"" + rowData['id'] + "\">" + rowData['sitename'] + "</input>";

    //     siteDirectTxtData += filDirectdata;
    // }

    // siteVodaTxtData += "</select></div></div> ";
    // siteVodaTxtData += "</ul></div>";
    // siteDirectTxtData += "</select></div></div> ";
    // siteDirectTxtData += "</ul></div>";

    // document.getElementById("newUserVodacomSitesList").innerHTML = siteVodaTxtData;
    // document.getElementById("newUserDirectSitesList").innerHTML = siteDirectTxtData;
    document.getElementById("newUserActive").innerHTML = newUserActive;
    document.getElementById("newUserAccessLevel").innerHTML = newUserAccess;


    //}

}

// function getSitesUserList() {
//     var query = "SELECT id, sitename FROM InovoMonitor.tblSites WHERE InovoMonitor.tblSites.sitename !='' ORDER BY InovoMonitor.tblSites.sitename asc;";
//     var remoteVodaEXT = "?remotehost=https://41.0.203.210:8443/InovoCentralMonitorClient/MonitorData&action=runopenquery&query=";


//     receiveDirectSiteUserListReq.open("POST", serverURL + "/MonitorData", true);
//     receiveVodacomSiteUserListReq.open("GET", serverURL + "/MonitorData" + remoteVodaEXT + query, true);
//     //Set the function that will be called when the XmlHttpRequest objects state changes.
//     receiveDirectSiteUserListReq.onreadystatechange = openCreateUser;
//     receiveVodacomSiteUserListReq.onreadystatechange = openCreateUser;
//     receiveDirectSiteUserListReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     receiveVodacomSiteUserListReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     receiveDirectSiteUserListReq.send("action=runopenquery&query=" + query);
//     receiveVodacomSiteUserListReq.send();
// }

function getDirectSiteUserList() {

}

// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------update profile
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
function updateProfile(profileId) {
    var newUserName = $('#updateUserName').val();
    var newUserSurname = $('#updateUserSurname').val();
    var newUserPass = $('#updateUserPass').val();
    var newUserConfPass = $('#updateConfirmUserPass').val();
    var newUserActive = $('#selectUserActive').val();
    var newUserAccess = $('#selectUserAccess').val();
    var userProfileID = profileId;
    var dateNow;



    var currentUser;

    if (userProfilereq.readyState == 4) {

        var userProfileData = JSON.parse(userProfilereq.responseText);
        userProfile = userProfileData['UserInfo'];


        currentUser = userProfile['userLogin'];
    }

    if (newUserConfPass == newUserPass && newUserPass != undefined && newUserConfPass != undefined) {
        var query = createUpdateQuery(newUserName, newUserSurname, newUserPass, newUserActive, newUserAccess, userProfileID);
        var updateReason = updateUserLog(userProfileID, newUserName, newUserSurname, newUserPass, newUserActive, newUserAccess);
        // var query = "SELECT * FROM InovoMonitor.tblAlarms;"

        dateNow = new Date();
        dateNow = dateNow.getFullYear() + '-' +
            ('00' + (dateNow.getMonth() + 1)).slice(-2) + '-' +
            ('00' + dateNow.getDate()).slice(-2) + ' ' +
            ('00' + dateNow.getHours()).slice(-2) + ':' +
            ('00' + dateNow.getMinutes()).slice(-2) + ':' +
            ('00' + dateNow.getSeconds()).slice(-2);

        var updatequery = "INSERT INTO InovoMonitor.tblUserLog (userid, reason, datecreated, createdby)  VALUES ('" + userProfileID + "','" + String(updateReason) + "', '" + dateNow + "','" + currentUser + "');";


        if (query != "false") {

            // updateUSRlogReq.open("POST", serverURL + "/MonitorData"),

            // set the Request Header
            userUpdateReq.open("POST", serverURL + "/MonitorData", true);
            updateUSRlogReq.open("POST", serverURL + "/MonitorData", true);

            userUpdateReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            updateUSRlogReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            userUpdateReq.onreadystatechange = updateProfileResult;
            updateUSRlogReq.onreadystatechange = updateProfileResult;

            userUpdateReq.send("action=runopenquery&query=" + query);
            updateUSRlogReq.send("action=runopenquery&query=" + updatequery);


        } else {
            alert('please ensure a change needs to be made before you try to update');
        }
    } else {
        alert('password is not the same');
    }
}

function updateProfileResult() {
    if (userUpdateReq.readyState == 4 && updateUSRlogReq.readyState == 4) {
        var userUpdateReqData = JSON.parse(userUpdateReq.responseText);
        var finalResult = userUpdateReqData['queryresult'];

        if (userUpdateReq.status == 200 && updateUSRlogReq.status == 200) {


            //set time
            var toastDelayTime = 10000;
            // set title
            var toastTitle = "COMPLETE!";
            //Set Message
            var toastMessage = "Update of your profile is completed successfully.";

            //set objects
            var toastPopup = document.getElementById("mainPageToastAlert");
            var toastTITLEObj = document.getElementById("toastTitle");
            var toastMSGObj = document.getElementById("toastMessage");


            // run toast
            toastPopup.setAttribute("data-delay", toastDelayTime);
            toastTITLEObj.innerHTML = toastTitle;
            toastMSGObj.innerHTML = toastMessage;
            $(function () { $('#mainPageToastAlert').toast('show'); });
        }
    }
}
function createNewProfileResult() {
    if (userUpdateReq.readyState == 4 && updateUSRlogReq.readyState == 4) {
        var userUpdateReqData = JSON.parse(userUpdateReq.responseText);
        var finalResult = userUpdateReqData['queryresult'];

        if (userUpdateReq.status == 200 && updateUSRlogReq.status == 200) {


            //set time
            var toastDelayTime = 12000;
            // set title
            var toastTitle = "COMPLETE!";
            //Set Message
            var toastMessage = updateCreateUserReason + ". User creation is completed successfully.";

            //set objects
            var toastPopup = document.getElementById("mainPageToastAlert");
            var toastTITLEObj = document.getElementById("toastTitle");
            var toastMSGObj = document.getElementById("toastMessage");


            // run toast
            toastPopup.setAttribute("data-delay", toastDelayTime);
            toastTITLEObj.innerHTML = toastTitle;
            toastMSGObj.innerHTML = toastMessage;
            $(function () { $('#mainPageToastAlert').toast('show'); });
        }
    }
}
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------Delete Profile
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
function DeleteProfile(profileId) {
    var newUserName = $('#updateUserName').val();
    var newUserSurname = $('#updateUserSurname').val();
    var newUserPass = $('#updateUserPass').val();
    var newUserConfPass = $('#updateConfirmUserPass').val();
    var newUserActive = $('#selectUserActive').val();
    var newUserAccess = $('#selectUserAccess').val();
    var userProfileID = profileId;

    if (newUserConfPass == newUserPass && newUserPass != undefined && newUserConfPass != undefined) {
        var query = createUpdateQuery(newUserName, newUserSurname, newUserPass, newUserActive, newUserAccess, userProfileID)
        // var query = "SELECT * FROM InovoMonitor.tblAlarms;"

        if (query != "false") {
            // userUpdateReq.open("POST", serverURLDEV + "/MonitorData", true);
            userUpdateReq.open("POST", serverURL + "/MonitorData", true);

            userUpdateReq.onreadystatechange = updateProfileResult;
            // set the Request Header
            userUpdateReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            //Make the actual request.
            userUpdateReq.send("action=runopenquery&query=" + query);
        } else {
            alert('please ensure a change needs to be made before you try to update');
        }
    } else {
        alert('password is not the same');
    }
}




// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                            INSERT INTO USER
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
function insertUserLogDetails(userLogQuery) {

}



// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                            CHECK USER AUTHENTICATION
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------

function checkLoggedInUser() {
    var loggedIn;
    var userLoggedIn;
    var userHash = window.location.hash;
    var userkey = userHash.replace('#&key=', '');

    if (userManagementProfileReq.readyState == 4 && userRelogProfileReq.readyState == 4) {

        // var dbData = JSON.parse(userManagementProfileReq.responseText);
        // userDetails = dbData['queryresult'];

        var userManagementProfileData = JSON.parse(userManagementProfileReq.responseText);
        allUserProfiles = userManagementProfileData['queryresult'];

        for (i = 0; i < allUserProfiles.length; i++) {

            var userK = allUserProfiles[i]['userkey'];

            // if( allUserProfiles[i]['username'] == uProfile['username'])
            if (userK == userkey) {
                loggedIn = true;
                userLoggedIn = allUserProfiles[i];
            }
        }

        if (loggedIn == undefined) {
            var modalLogin = document.getElementById("modal-login");
            modalLogin.style.display = "block";
            document.getElementById('modal-login').addEventListener('keypress', function (e) {
                var key = e.which || e.keyCode;
                if (key === 13) {
                    checkAuth();
                }
            });
        }
        else if (loggedIn == true && loggedIn != undefined) {
            checkLoggedInUserAuth(userLoggedIn);
        }
    }

}

// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                            CHECK Logged USER AUTHENTICATION
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------




function checkLoggedInUserAuth(user) {
    var userN;
    var passW;
    // create request
    if (userRelogProfileReq.readyState == 4) {

        var dbData = JSON.parse(userRelogProfileReq.responseText);
        userDetails = dbData['queryresult'];

        for (i = 0; i < userDetails.length; i++) {
            if ((userDetails[i]['userlogin'] == user['userlogin']) && (userDetails[i]['userkey'] == user['userkey'])) {
                userN = userDetails[i]['userlogin'];
                passW = userDetails[i]['userpassword'];
            }
        }


        // var query = "SELECT * FROM InovoMonitor.tblUsers where InovoMonitor.tblUsers.userpassword = '" + passW + "' AND InovoMonitor.tblUsers.username = '" + userN + "';"
        // var query = "SELECT * FROM InovoMonitor.tblUsers"; // where InovoMonitor.tblUsers.userpassword = '" + passW + "' AND InovoMonitor.tblUsers.username = '" + userN + "';"

        userProfilereq.open("POST", serverURL + "/UserAuth?", true);
        // userProfilereq.open("POST", serverURLDEV + "/UserAuth?", true);
        // userProfilereq.open("POST",   "/UserAuth?", true);
        userProfilereq.onreadystatechange = returnProfile;
        userProfilereq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        userProfilereq.send("action=authenticate&username=" + userN + "&password=" + passW)
    }
    //http://102.164.81.12:7080/InovoCentralMonitorClient/UserAuth?action=authenticate&username=esiwela&password=esiwela

}
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                            CHECK USER AUTHENTICATION
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------




function checkAuth() {
    // create request

    //http://102.164.81.12:7080/InovoCentralMonitorClient/UserAuth?action=authenticate&username=esiwela&password=esiwela
    var userN = document.getElementById("username-login").value;
    var passW = document.getElementById("password-login").value;



    // var query = "SELECT * FROM InovoMonitor.tblUsers where InovoMonitor.tblUsers.userpassword = '" + passW + "' AND InovoMonitor.tblUsers.username = '" + userN + "';"
    // var query = "SELECT * FROM InovoMonitor.tblUsers"; // where InovoMonitor.tblUsers.userpassword = '" + passW + "' AND InovoMonitor.tblUsers.username = '" + userN + "';"

    userProfilereq.open("POST", serverURL + "/UserAuth?", true);
    userProfilereq.onreadystatechange = returnProfile;
    userProfilereq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    userProfilereq.send("action=authenticate&username=" + userN + "&password=" + passW)



}
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                              RETURN USER PROFILE
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------


function returnProfile() {
    var userProfile = "", allUserProfiles = "", userErrorData = "";
    if (userProfilereq.readyState == 4 && userManagementProfileReq.readyState == 4) {
        var uProfileMng;

        // Parse UserProfile data to object
        var userProfileData = JSON.parse(userProfilereq.responseText);
        userProfile = userProfileData['UserInfo'];

        userErrorData = userProfileData['Error'];
        userErrorCode = userErrorData['ErrorCode'];
        userErrorMessage = userErrorData['ErrorDescription'];

        // Parse Entire User list to object
        var userManagementProfileData = JSON.parse(userManagementProfileReq.responseText);
        allUserProfiles = userManagementProfileData['queryresult'];

        var uProfile = userProfile;




        if (uProfile != undefined && userErrorCode == 0) {

            // var uKey = uProfile['userkey'];
            // var uType = uProfile['usertype'];
            // var uActive = uProfile['useractive'];
            for (i = 0; i < allUserProfiles.length; i++) {

                var name = allUserProfiles[i]['username'];
                var profile = uProfile['userName'];

                // if( allUserProfiles[i]['username'] == uProfile['username'])
                if (name == profile) {
                    uProfileMng = allUserProfiles[i];
                }
            }
            usePresenceCard = false;
            useHostStatusCard = false;
            useOpenGateTrunkStatusCard = false;
            useCIMStatusCard = false;

            grantAccess(uProfile, uProfileMng);

        }
        else if ((uProfile == undefined && userErrorCode != 0) || userErrorCode == 99) {
            var userN = document.getElementById("username-login");
            var passW = document.getElementById("password-login");

            document.getElementById("errorMessage").innerHTML = "ERROR: " + userErrorMessage;

            document.getElementById("login-form").reset();
            passW.style.border = "1px solid #ff0000";
            userN.style.border = "1px solid #ff0000";
            userN.focus();
        }
    }

}
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                              GRANT ACCESS
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------


function grantAccess(loggedInProfile, loggedProfileDet) {

    var profile = loggedInProfile
    var usersites = loggedInProfile['userSites'];
    if (usersites.length == 1) {
        siteMapSiteID = usersites[0]['siteid'];
    } else if (usersites.length >= 2) {
        siteMapSiteID = createSiteIdListForRequest(usersites);
    }
    clientSiteId = siteMapSiteID;
    var type = loggedProfileDet['usertype'];
    var key = profile['userKey'];
    var active = loggedProfileDet['useractive'];
    var userlogin = profile['userLogin'];
    var userLevelDesc = loggedProfileDet['description'];
    insertHashParam(key);
    var modalLogin = document.getElementById("modal-login");
    if (active == 1) {
        // if admin user
        if ((type == 1 && profile['userTypeDescription'] == "Administrator") || (type == 2 && profile['userTypeDescription'] == "User")) {
            var hostMaintenanceSiteLink = "<a href=\"hostMaintenanceScheduler.html#&key=" + key + "\"><i class=\"fas fa-hammer\"></i> Maintenance Scheduling</a>";
            var hostManageSiteLink = "<a href=\"hostManagement.html#&key=" + key + "\"><i class=\"fas fa-server\"></i> Host Management</a>";
            var serverMonitorThresholdLink = "<a href=\"ServerMonitorThresholds.html#&key=" + key + "\"><i class=\"fas fa-hdd\"></i> Server Monitor Threshold</a>";
            var serverUsageLink = "<a href=\"serverDiskUsage.html#&key=" + key + "\"><i class=\"fas fa-line-chart\"></i> Server Usage</a>";
            var diskSpaceTrackingLink = "<a href=\"diskSpaceTracking.html#&key=" + key + "\"><i class=\"fas fa-database\"></i> Disk Space Tracking</a>";

            var UserManagementLink = "<a data-toggle=\"modal\" data-target=\"#modaluser\" href=\"#UserManagement\" onclick=\"checkUsers()\">"
                + "<i class=\"fas fa-users\"></i> User Management&nbsp;</a>";



            getActiveAlarms();
            openCustomSearchFilter();
            modalLogin.style.display = "none";
            document.getElementById("loginUserId").innerHTML = userlogin + "(" + userLevelDesc + ")";

            document.getElementById("hostMaintenanceLink").innerHTML = hostMaintenanceSiteLink;
            document.getElementById("hostManageLink").innerHTML = hostManageSiteLink;
            document.getElementById("serverMonitorThresholdLink").innerHTML = serverMonitorThresholdLink;
            document.getElementById("serverUsageLink").innerHTML = serverUsageLink;
            document.getElementById("diskSpaceTrackingLink").innerHTML = diskSpaceTrackingLink;
            document.getElementById("userManagementLink").innerHTML = UserManagementLink;
            document.getElementById("login-form").reset();

        }
        //if a wallboard user
        else if (type == 4 || type == 3) {


            // checkWallboardSiteMap(userid);


            var hostMaintenanceSiteLink = "";
            var hostManageSiteLink = "";
            var serverMonitorThresholdLink = "";
            var UserManagementLink = "";
            var serverUsageLink = "<a href=\"serverDiskUsage.html#&key=" + key + "\"><i class=\"fas fa-line-chart\"></i> Server Usage</a>";
            var diskSpaceTrackingLink = "<a href=\"diskSpaceTracking.html#&key=" + key + "\"><i class=\"fas fa-database\"></i> Disk Space Tracking</a>";

            getWallboardActiveAlarms(siteMapSiteID);

            modalLogin.style.display = "none";
            // restructureElementsForWallboardUser();
            document.getElementById("loginUserId").innerHTML = userlogin + "(" + userLevelDesc + ")";
            document.getElementById("hostMaintenanceLink").innerHTML = hostMaintenanceSiteLink;
            document.getElementById("hostManageLink").innerHTML = hostManageSiteLink;
            document.getElementById("serverMonitorThresholdLink").innerHTML = serverMonitorThresholdLink;
            //document.getElementById("serverUsageLink").innerHTML = serverUsageLink;
            //document.getElementById("diskSpaceTrackingLink").innerHTML = diskSpaceTrackingLink;
            // document.getElementById("buttonCust").disabled = true;
            document.getElementById("userManagementLink").innerHTML = UserManagementLink;
            document.getElementById("login-form").reset();


        }
    } else {
        var userN = document.getElementById("username-login");
        var passW = document.getElementById("password-login");

        document.getElementById("errorMessage").innerHTML = "ERROR: [" + userlogin + "] You are not an active user please contact Inovo for further details.";

        document.getElementById("login-form").reset();
        passW.style.border = "1px solid #ff0000";
        userN.style.border = "1px solid #ff0000";
        userN.focus();
    }
}

function createSiteIdListForRequest(siteIdList) {
    var siteString = "";
    var finalSiteString = "";
    for (let i = 0; i < siteIdList.length; i++) {
        const element = siteIdList[i]['siteid'];

        siteString = element.toString()
        if (siteIdList.length - 1 != i) {
            finalSiteString += siteString + ", ";
        } else {
            finalSiteString += siteString;
        }
    }

    return finalSiteString;
}

function checkWallboardSiteMap(userid) {

    var querySiteMap = "SELECT * FROM InovoMonitor.tblUserSiteMap where userid = " + userid + ";"
    receiveSiteTypeReq.open("POST", serverURL + "/MonitorData", true);

    receiveSiteTypeReq.onreadystatechange = completeSiteMap;
    receiveSiteTypeReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    receiveSiteTypeReq.send("action=runopenquery&query=" + querySiteMap);


}


function getStatusCardsRenderCheck() {

    var uProfileMng;
    // Parse UserProfile data to object
    var userProfileData = JSON.parse(userProfilereq.responseText);
    userProfile = userProfileData['UserInfo'];

    // Parse Entire User list to object
    var userManagementProfileData = JSON.parse(userManagementProfileReq.responseText);
    allUserProfiles = userManagementProfileData['queryresult'];

    var uProfile = userProfile;



    // var uKey = uProfile['userkey'];
    // var uType = uProfile['usertype'];
    // var uActive = uProfile['useractive'];
    for (i = 0; i < allUserProfiles.length; i++) {

        var name = allUserProfiles[i]['username'];
        var profile = uProfile['userName'];

        // if( allUserProfiles[i]['username'] == uProfile['username'])
        if (name == profile) {
            uProfileMng = allUserProfiles[i];
        }
    }


    var profileId = uProfileMng['id']

    var query = "SELECT * FROM InovoMonitor.tblStatusCards "
        + "INNER JOIN InovoMonitor.tblStatusCardStructure "
        + "on InovoMonitor.tblStatusCardStructure.id = InovoMonitor.tblStatusCards.structureid "
        + " WHERE userid  = " + profileId + "";

    receiveStatusCardRenderReq.open("POST", serverURL + "/MonitorData", true);
    receiveStatusCardRenderReq.onreadystatechange = getStatus;
    receiveStatusCardRenderReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    receiveStatusCardRenderReq.send("action=runopenquery&query=" + query);


}

function getStatus() {


    if (receiveStatusCardRenderReq.readyState == 4) {

        var statusCardQList = JSON.parse(receiveStatusCardRenderReq.responseText);
        var statusCardList = statusCardQList['queryresult'];




        for (let index = 0; index < statusCardList.length; index++) {
            const statusCardData = statusCardList[index];
            if (statusCardData['statuscard'] == 'CIM') {
                useCIMStatusCard = true;
            } else if (statusCardData['statuscard'] == 'Host') {
                useHostStatusCard = true;
            } else if (statusCardData['statuscard'] == 'Presence') {
                usePresenceCard = true;
            } else if (statusCardData['statuscard'] == 'Opengate') {
                useOpenGateTrunkStatusCard = true;
            }
        }

        if (useOpenGateTrunkStatusCard) {


            queryOPG = "SELECT * "
                + "FROM vwOpenGateTrunkStatus "
                + "where siteid in (" + clientSiteId + "); "

        }

        if (useHostStatusCard) {


            queryHost = "SELECT * "
                + "FROM vwHostStatusEx "
                + "where siteid in (" + clientSiteId + "); "

        }

        if (usePresenceCard) {



            queryPresence = "SELECT * "
                + "FROM vwPresenceStatus "
                + "where siteid in ( " + clientSiteId + "); "

        }

        if (useCIMStatusCard) {


            queryCIMStatus = "SELECT * "
                + "FROM vwCimStatusInfo "
                + "where siteid in ( " + clientSiteId + "); "


        }
        //All
        if (useHostStatusCard && useOpenGateTrunkStatusCard && usePresenceCard && useCIMStatusCard) {

            receiveHostStatus.open("POST", serverURL + "/MonitorData", true);
            receiveOpengateStatus.open("POST", serverURL + "/MonitorData", true);
            receivePresenceStatus.open("POST", serverURL + "/MonitorData", true);
            receiveCIMStatus.open("POST", serverURL + "/MonitorData", true);


            receiveHostStatus.onreadystatechange = processCards;
            receiveOpengateStatus.onreadystatechange = processCards;
            receivePresenceStatus.onreadystatechange = processCards;
            receiveCIMStatus.onreadystatechange = processCards;

            receiveHostStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            receiveOpengateStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            receivePresenceStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            receiveCIMStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


            receivePresenceStatus.send("action=runopenquery&query=" + queryPresence);
            receiveHostStatus.send("action=runopenquery&query=" + queryHost);
            receiveOpengateStatus.send("action=runopenquery&query=" + queryOPG);
            receiveCIMStatus.send("action=runopenquery&query=" + queryCIMStatus);

        }
        //--------------------------------------------------------------------1s-------------------------------------------------------

        //Cim Only 
        else if (!useHostStatusCard && !useOpenGateTrunkStatusCard && !usePresenceCard && useCIMStatusCard) {

            receiveCIMStatus.open("POST", serverURL + "/MonitorData", true);

            receiveCIMStatus.onreadystatechange = processCards;

            receiveCIMStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            receiveCIMStatus.send("action=runopenquery&query=" + queryCIMStatus);
        }
        //Presence Only
        else if (!useHostStatusCard && !useOpenGateTrunkStatusCard && usePresenceCard && !useCIMStatusCard) {

            receivePresenceStatus.open("POST", serverURL + "/MonitorData", true);

            receivePresenceStatus.onreadystatechange = processCards;

            receivePresenceStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            receivePresenceStatus.send("action=runopenquery&query=" + queryPresence);
        }
        //Host Only
        else if (useHostStatusCard && !useOpenGateTrunkStatusCard && !usePresenceCard && !useCIMStatusCard) {

            receiveHostStatus.open("POST", serverURL + "/MonitorData", true);

            receiveHostStatus.onreadystatechange = processCards;

            receiveHostStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            receiveHostStatus.send("action=runopenquery&query=" + queryHost);
        }
        //OPG Only
        else if (!useHostStatusCard && useOpenGateTrunkStatusCard && !usePresenceCard && !useCIMStatusCard) {

            receiveOpengateStatus.open("POST", serverURL + "/MonitorData", true);

            receiveOpengateStatus.onreadystatechange = processCards;

            receiveOpengateStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            receiveOpengateStatus.send("action=runopenquery&query=" + queryOPG);
        }

        //---------------------------------------------2s--------------------------------------------------------------------------------
        //Host & OPG
        else if ((useHostStatusCard && useOpenGateTrunkStatusCard && !usePresenceCard && !useCIMStatusCard)) {

            receiveHostStatus.open("POST", serverURL + "/MonitorData", true);
            receiveOpengateStatus.open("POST", serverURL + "/MonitorData", true);


            receiveHostStatus.onreadystatechange = processCards;
            receiveOpengateStatus.onreadystatechange = processCards;

            receiveHostStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            receiveOpengateStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


            receiveHostStatus.send("action=runopenquery&query=" + queryHost);
            receiveOpengateStatus.send("action=runopenquery&query=" + queryOPG);
        }
        //Host & Presence
        else if ((useHostStatusCard && usePresenceCard && !useCIMStatusCard && !useOpenGateTrunkStatusCard)) {

            receiveHostStatus.open("POST", serverURL + "/MonitorData", true);
            receivePresenceStatus.open("POST", serverURL + "/MonitorData", true);

            receiveHostStatus.onreadystatechange = processCards;
            receivePresenceStatus.onreadystatechange = processCards;

            receiveHostStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            receivePresenceStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            receivePresenceStatus.send("action=runopenquery&query=" + queryPresence);
            receiveHostStatus.send("action=runopenquery&query=" + queryHost);
        }
        //Host & CIM
        else if ((useHostStatusCard && useCIMStatusCard && !useOpenGateTrunkStatusCard && !usePresenceCard)) {

            receiveHostStatus.open("POST", serverURL + "/MonitorData", true);
            receiveCIMStatus.open("POST", serverURL + "/MonitorData", true);


            receiveHostStatus.onreadystatechange = processCards;
            receiveCIMStatus.onreadystatechange = processCards;

            receiveHostStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            receiveCIMStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


            receiveHostStatus.send("action=runopenquery&query=" + queryHost);
            receiveCIMStatus.send("action=runopenquery&query=" + queryCIMStatus);
        }
        //OPG & Pres
        else if ((useOpenGateTrunkStatusCard && usePresenceCard && !useHostStatusCard && !useCIMStatusCard)) {



            receiveOpengateStatus.open("POST", serverURL + "/MonitorData", true);
            receivePresenceStatus.open("POST", serverURL + "/MonitorData", true);


            receiveOpengateStatus.onreadystatechange = processCards;
            receivePresenceStatus.onreadystatechange = processCards;


            receiveOpengateStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            receivePresenceStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


            receivePresenceStatus.send("action=runopenquery&query=" + queryPresence);
            receiveOpengateStatus.send("action=runopenquery&query=" + queryOPG);
        }
        //CIM & pres
        else if ((useCIMStatusCard && usePresenceCard && !useHostStatusCard && !useOpenGateTrunkStatusCard)) {


            receivePresenceStatus.open("POST", serverURL + "/MonitorData", true);
            receiveCIMStatus.open("POST", serverURL + "/MonitorData", true);


            receivePresenceStatus.onreadystatechange = processCards;
            receiveCIMStatus.onreadystatechange = processCards;

            receivePresenceStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            receiveCIMStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


            receivePresenceStatus.send("action=runopenquery&query=" + queryPresence);
            receiveCIMStatus.send("action=runopenquery&query=" + queryCIMStatus);

        }
        //OPG & CIM
        else if ((useOpenGateTrunkStatusCard && useCIMStatusCard && !usePresenceCard && !useHostStatusCard)) {

            receiveOpengateStatus.open("POST", serverURL + "/MonitorData", true);
            receiveCIMStatus.open("POST", serverURL + "/MonitorData", true);


            receiveOpengateStatus.onreadystatechange = processCards;
            receiveCIMStatus.onreadystatechange = processCards;

            receiveOpengateStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            receiveCIMStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


            receiveOpengateStatus.send("action=runopenquery&query=" + queryOPG);
            receiveCIMStatus.send("action=runopenquery&query=" + queryCIMStatus);
        }
        //----------------------------------------------------------3s-------------------------------------------------------------------
        //Host & OPG & CIM
        else if (useHostStatusCard && useOpenGateTrunkStatusCard && useCIMStatusCard && !usePresenceCard) {

            receiveHostStatus.open("POST", serverURL + "/MonitorData", true);
            receiveOpengateStatus.open("POST", serverURL + "/MonitorData", true);
            receiveCIMStatus.open("POST", serverURL + "/MonitorData", true);


            receiveHostStatus.onreadystatechange = processCards;
            receiveOpengateStatus.onreadystatechange = processCards;
            receiveCIMStatus.onreadystatechange = processCards;

            receiveHostStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            receiveOpengateStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            receiveCIMStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


            receiveHostStatus.send("action=runopenquery&query=" + queryHost);
            receiveOpengateStatus.send("action=runopenquery&query=" + queryOPG);
            receiveCIMStatus.send("action=runopenquery&query=" + queryCIMStatus);
        }
        //CIM & OPG & Pres
        else if (useCIMStatusCard && useOpenGateTrunkStatusCard && usePresenceCard && !useHostStatusCard) {

            receiveOpengateStatus.open("POST", serverURL + "/MonitorData", true);
            receivePresenceStatus.open("POST", serverURL + "/MonitorData", true);
            receiveCIMStatus.open("POST", serverURL + "/MonitorData", true);


            receiveOpengateStatus.onreadystatechange = processCards;
            receivePresenceStatus.onreadystatechange = processCards;
            receiveCIMStatus.onreadystatechange = processCards;

            receiveOpengateStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            receivePresenceStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            receiveCIMStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


            receivePresenceStatus.send("action=runopenquery&query=" + queryPresence);
            receiveOpengateStatus.send("action=runopenquery&query=" + queryOPG);
            receiveCIMStatus.send("action=runopenquery&query=" + queryCIMStatus);
        }
        //Host & Cim & Pres
        else if (useHostStatusCard && useCIMStatusCard && usePresenceCard && !useOpenGateTrunkStatusCard) {


            receiveHostStatus.open("POST", serverURL + "/MonitorData", true);
            receivePresenceStatus.open("POST", serverURL + "/MonitorData", true);
            receiveCIMStatus.open("POST", serverURL + "/MonitorData", true);


            receiveHostStatus.onreadystatechange = processCards;
            receivePresenceStatus.onreadystatechange = processCards;
            receiveCIMStatus.onreadystatechange = processCards;

            receiveHostStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            receivePresenceStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            receiveCIMStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


            receivePresenceStatus.send("action=runopenquery&query=" + queryPresence);
            receiveHostStatus.send("action=runopenquery&query=" + queryHost);
            receiveCIMStatus.send("action=runopenquery&query=" + queryCIMStatus);
        }
        // Host & OPG & Presence
        else if (useHostStatusCard && useOpenGateTrunkStatusCard && usePresenceCard && !useCIMStatusCard) {

            receiveHostStatus.open("POST", serverURL + "/MonitorData", true);
            receiveOpengateStatus.open("POST", serverURL + "/MonitorData", true);
            receivePresenceStatus.open("POST", serverURL + "/MonitorData", true);


            receiveHostStatus.onreadystatechange = processCards;
            receiveOpengateStatus.onreadystatechange = processCards;
            receivePresenceStatus.onreadystatechange = processCards;

            receiveHostStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            receiveOpengateStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            receivePresenceStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


            receivePresenceStatus.send("action=runopenquery&query=" + queryPresence);
            receiveHostStatus.send("action=runopenquery&query=" + queryHost);
            receiveOpengateStatus.send("action=runopenquery&query=" + queryOPG);
        }
        // ---------------------------------------------------------------------------------------------------------------------------


        // if (queryHost != "") {
        //     getHostStatusCard();


        // }

        // if (queryCIMStatus != "") {
        //     getCIMStatusCard();


        // }


        // if (queryOPG != "") {
        //     getOpengateStatusCard();


        // }

        // if (queryPresence != "") {
        //     getPresenceStatusCard();


        // }

    }

}




function processCards() {

    if (useHostStatusCard && useOpenGateTrunkStatusCard && usePresenceCard && useCIMStatusCard) {
        if (receiveOpengateStatus.readyState == 4 && receiveHostStatus.readyState == 4 && receiveCIMStatus.readyState == 4 && receivePresenceStatus.readyState == 4) {
            var opgStatusData = JSON.parse(receiveOpengateStatus.responseText);
            opgStatus = opgStatusData['queryresult'];

            var hostStatusData = JSON.parse(receiveHostStatus.responseText);
            hostStatus = hostStatusData['queryresult'];


            var presStatusData = JSON.parse(receivePresenceStatus.responseText);
            presStatus = presStatusData['queryresult'];


            var CIMStatusData = JSON.parse(receiveCIMStatus.responseText);
            CIMStatus = CIMStatusData['queryresult'];
            getStatusCards();

        }

    }
    //--------------------------------------------------------------------1s-------------------------------------------------------

    //Cim Only 
    else if (!useHostStatusCard && !useOpenGateTrunkStatusCard && !usePresenceCard && useCIMStatusCard) {

        if (receiveCIMStatus.readyState == 4) {
            var CIMStatusData = JSON.parse(receiveCIMStatus.responseText);
            CIMStatus = CIMStatusData['queryresult'];
            getStatusCards();
        }
    }
    //Presence Only
    else if (!useHostStatusCard && !useOpenGateTrunkStatusCard && usePresenceCard && !useCIMStatusCard) {

        if (receivePresenceStatus.readyState == 4) {
            var presStatusData = JSON.parse(receivePresenceStatus.responseText);
            presStatus = presStatusData['queryresult'];
            getStatusCards();
        }
    }
    //Host Only
    else if (useHostStatusCard && !useOpenGateTrunkStatusCard && !usePresenceCard && !useCIMStatusCard) {

        if (receiveHostStatus.readyState == 4) {

            var hostStatusData = JSON.parse(receiveHostStatus.responseText);
            hostStatus = hostStatusData['queryresult'];
            getStatusCards();
        }
    }
    //OPG Only
    else if (!useHostStatusCard && useOpenGateTrunkStatusCard && !usePresenceCard && !useCIMStatusCard) {

        if (receiveOpengateStatus.readyState == 4) {
            var opgStatusData = JSON.parse(receiveOpengateStatus.responseText);
            opgStatus = opgStatusData['queryresult'];


        }
    }

    //---------------------------------------------2s--------------------------------------------------------------------------------
    else if ((useHostStatusCard && useOpenGateTrunkStatusCard && !usePresenceCard && !useCIMStatusCard)) {

        if (receiveOpengateStatus.readyState == 4 && receiveHostStatus.readyState == 4) {
            var opgStatusData = JSON.parse(receiveOpengateStatus.responseText);
            opgStatus = opgStatusData['queryresult'];

            var hostStatusData = JSON.parse(receiveHostStatus.responseText);
            hostStatus = hostStatusData['queryresult'];

            getStatusCards();

        }
    }
    // Host & Presence
    else if ((useHostStatusCard && usePresenceCard && !useCIMStatusCard && !useOpenGateTrunkStatusCard)) {

        if (receiveHostStatus.readyState == 4 && receivePresenceStatus.readyState == 4) {

            var hostStatusData = JSON.parse(receiveHostStatus.responseText);
            hostStatus = hostStatusData['queryresult'];


            var presStatusData = JSON.parse(receivePresenceStatus.responseText);
            presStatus = presStatusData['queryresult'];
            getStatusCards();
        }
    }
    // Host & CIM
    else if ((useHostStatusCard && useCIMStatusCard && !useOpenGateTrunkStatusCard && !usePresenceCard)) {

        if (receiveHostStatus.readyState == 4 && receiveCIMStatus.readyState == 4) {

            var hostStatusData = JSON.parse(receiveHostStatus.responseText);
            hostStatus = hostStatusData['queryresult'];

            var CIMStatusData = JSON.parse(receiveCIMStatus.responseText);
            CIMStatus = CIMStatusData['queryresult'];
            getStatusCards();
        }
    }
    //OPG & Presence
    else if ((useOpenGateTrunkStatusCard && usePresenceCard && !useHostStatusCard && !useCIMStatusCard)) {

        if (receiveOpengateStatus.readyState == 4 && receivePresenceStatus.readyState == 4) {
            var opgStatusData = JSON.parse(receiveOpengateStatus.responseText);
            opgStatus = opgStatusData['queryresult'];

            var presStatusData = JSON.parse(receivePresenceStatus.responseText);
            presStatus = presStatusData['queryresult'];

            getStatusCards();
        }
    }
    // CIM & Presence
    else if ((useCIMStatusCard && usePresenceCard && !useHostStatusCard && !useOpenGateTrunkStatusCard)) {

        if (receiveCIMStatus.readyState == 4 && receivePresenceStatus.readyState == 4) {


            var presStatusData = JSON.parse(receivePresenceStatus.responseText);
            presStatus = presStatusData['queryresult'];


            var CIMStatusData = JSON.parse(receiveCIMStatus.responseText);
            CIMStatus = CIMStatusData['queryresult'];
            getStatusCards();
        }

    }
    //  OPG & CIM
    else if ((useOpenGateTrunkStatusCard && useCIMStatusCard && !usePresenceCard && !useHostStatusCard)) {

        if (receiveOpengateStatus.readyState == 4 && receiveCIMStatus.readyState == 4) {
            var opgStatusData = JSON.parse(receiveOpengateStatus.responseText);
            opgStatus = opgStatusData['queryresult'];

            var CIMStatusData = JSON.parse(receiveCIMStatus.responseText);
            CIMStatus = CIMStatusData['queryresult'];
            getStatusCards();
        }
    }
    //----------------------------------------------------------3s-------------------------------------------------------------------
    // Host & OPG & CIM
    else if (useHostStatusCard && useOpenGateTrunkStatusCard && useCIMStatusCard && !usePresenceCard) {

        if (receiveOpengateStatus.readyState == 4 && receiveHostStatus.readyState == 4 && receiveCIMStatus.readyState == 4) {
            var opgStatusData = JSON.parse(receiveOpengateStatus.responseText);
            opgStatus = opgStatusData['queryresult'];

            var hostStatusData = JSON.parse(receiveHostStatus.responseText);
            hostStatus = hostStatusData['queryresult'];


            var CIMStatusData = JSON.parse(receiveCIMStatus.responseText);
            CIMStatus = CIMStatusData['queryresult'];
            getStatusCards();

        }
    }
    // CIM & OPG & Presence
    else if (useCIMStatusCard && useOpenGateTrunkStatusCard && usePresenceCard && !useHostStatusCard) {

        if (receiveOpengateStatus.readyState == 4 && receiveCIMStatus.readyState == 4 && receivePresenceStatus.readyState == 4) {
            var opgStatusData = JSON.parse(receiveOpengateStatus.responseText);
            opgStatus = opgStatusData['queryresult'];



            var presStatusData = JSON.parse(receivePresenceStatus.responseText);
            presStatus = presStatusData['queryresult'];


            var CIMStatusData = JSON.parse(receiveCIMStatus.responseText);
            CIMStatus = CIMStatusData['queryresult'];
            getStatusCards();
        }
    }
    // Host & CIM & Presence
    else if (useHostStatusCard && useCIMStatusCard && usePresenceCard && !useOpenGateTrunkStatusCard) {

        if (receiveHostStatus.readyState == 4 && receiveCIMStatus.readyState == 4 && receivePresenceStatus.readyState == 4) {


            var hostStatusData = JSON.parse(receiveHostStatus.responseText);
            hostStatus = hostStatusData['queryresult'];


            var presStatusData = JSON.parse(receivePresenceStatus.responseText);
            presStatus = presStatusData['queryresult'];


            var CIMStatusData = JSON.parse(receiveCIMStatus.responseText);
            CIMStatus = CIMStatusData['queryresult'];
            getStatusCards();
        }
    }
    // Host & OPG & Presence
    else if (useHostStatusCard && useOpenGateTrunkStatusCard && usePresenceCard && !useCIMStatusCard) {

        if (receiveOpengateStatus.readyState == 4 && receiveHostStatus.readyState == 4 && receivePresenceStatus.readyState == 4) {
            var opgStatusData = JSON.parse(receiveOpengateStatus.responseText);
            opgStatus = opgStatusData['queryresult'];

            var hostStatusData = JSON.parse(receiveHostStatus.responseText);
            hostStatus = hostStatusData['queryresult'];


            var presStatusData = JSON.parse(receivePresenceStatus.responseText);
            presStatus = presStatusData['queryresult'];

            getStatusCards();
        }
    }
}







// function getHostStatusCard() {


//     receiveHostStatus.open("POST", serverURL + "/MonitorData", true);

//     receiveHostStatus.onreadystatechange = processHostCard;
//     // set the Request Header
//     receiveHostStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

//     //Make the actual request.
//     receiveHostStatus.send("action=runopenquery&query=" + queryHost);
// }
// function processHostCard() {

// }
// function getOpengateStatusCard() {


//     receiveOpengateStatus.open("POST", serverURL + "/MonitorData", true);

//     receiveOpengateStatus.onreadystatechange = processOpengateCard;
//     // set the Request Header
//     receiveOpengateStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

//     //Make the actual request.
//     receiveOpengateStatus.send("action=runopenquery&query=" + queryOPG);
// }
// function processOpengateCard() {
//     if (receiveOpengateStatus.readyState == 4 && receiveHostStatus.readyState == 4 && receiveCIMStatus.readyState == 4 && receivePresenceStatus.readyState == 4) {
//         var opgStatusData = JSON.parse(receiveOpengateStatus.responseText);
//         opgStatus = opgStatusData['queryresult'];

//         var hostStatusData = JSON.parse(receiveHostStatus.responseText);
//         hostStatus = hostStatusData['queryresult'];


//         var presStatusData = JSON.parse(receivePresenceStatus.responseText);
//         presStatus = presStatusData['queryresult'];


//         var CIMStatusData = JSON.parse(receiveCIMStatus.responseText);
//         CIMStatus = CIMStatusData['queryresult'];

//     }
// }
// function getPresenceStatusCard() {


//     receivePresenceStatus.open("POST", serverURL + "/MonitorData", true);
//     receivePresenceStatus.onreadystatechange = processPresenceStatusCard;
//     // set the Request Header
//     receivePresenceStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     //Make the actual request.
//     receivePresenceStatus.send("action=runopenquery&query=" + queryPresence);
// }
// function processPresenceStatusCard() {
// }
// function getCIMStatusCard() {


//     receiveCIMStatus.open("POST", serverURL + "/MonitorData", true);
//     receiveCIMStatus.onreadystatechange = processCIMStatusCard;
//     // set the Request Header
//     receiveCIMStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     //Make the actual request.
//     receiveCIMStatus.send("action=runopenquery&query=" + queryCIMStatus);
// }
// function processCIMStatusCard() {
// }

function getStatusCards() {

    var txtData = "", rwData;
    var hostCard = "";
    var opgCard = "";
    var presCard = "";
    var cimCard = "";

    var greenPresCount = 0;
    var greenOPGCount = 0;
    var greenHostCount = 0;
    var greenCIMCount = 0;

    var orangeHostCount = 0;
    var orangeOPGCount = 0;
    var orangePresCount = 0;
    var orangeCIMCount = 0;

    var redHostCount = 0;
    var redOPGCount = 0;
    var redPresCount = 0;
    var redCIMCount = 0;

    var fullStatusCard = "";
    var fullHostCard = "";
    var fullOPGCard = "";
    var fullCIMCard = "";
    var fullPResCard = "";

    var valueTop = "";


    var statusCardBottomRow = "<div class=\"col-sm-1\">"
    var statusCardBottomRowBottom = "</div>";

    //------------------------------------------------------------------------------------------------------
    //------------------------------------------General Status Card ----------------------------------------
    //------------------------------------------------------------------------------------------------------

    var cimCardColumnValue = "";

    var generalCardColumnValue = "";
    var generalCardColumnValueRow = "";
    // var statusCardGeneralTop = "<div class=\"col-sm-" + generalCardColumnValue + "\">";


    var statusCardTopRow = "<div class=\"col-sm-1\">"
    var statusCardTopRowBottom = "</div>";


    // if cim exists
    if (useCIMStatusCard) {


        if (useHostStatusCard && useOpenGateTrunkStatusCard && usePresenceCard) {

            generalCardColumnValueRow = "5";
            generalCardColumnValue = "4";
        } else if ((useHostStatusCard && useOpenGateTrunkStatusCard) || (useHostStatusCard && usePresenceCard) ||
            (useOpenGateTrunkStatusCard && usePresenceCard)) {

            generalCardColumnValueRow = "5";
            generalCardColumnValue = "6";
        } else if (useHostStatusCard || useOpenGateTrunkStatusCard || usePresenceCard) {

            generalCardColumnValueRow = "5";
            generalCardColumnValue = "12";
        }

        if ((useHostStatusCard || useOpenGateTrunkStatusCard || usePresenceCard)) {

            cimCardColumnValue = "5"
        } else {

            statusCardTopRow = "<div class=\"col-sm-3\">"

            cimCardColumnValue = "6"
        }

        // if (useCIMStatusCard && (useHostStatusCard || useOpenGateTrunkStatusCard || usePresenceCard)) {
        //     if (useHostStatusCard && useOpenGateTrunkStatusCard && usePresenceCard) {
        //         cimCardColumnValue = "4";
        //     } else if ((useHostStatusCard && useOpenGateTrunkStatusCard) || (useHostStatusCard && usePresenceCard) ||
        //         (useOpenGateTrunkStatusCard && usePresenceCard)) {
        //         cimCardColumnValue = "5";
        //     } else if (useHostStatusCard || useOpenGateTrunkStatusCard || usePresenceCard) {
        //         cimCardColumnValue = "6";
        //     }
        // } else {
        //     cimCardColumnValue = "12"
        // }
    } else {
        //if CIM DOESNT exist
        statusCardTopRow = "<div class=\"col-sm-3\">"
        if (useHostStatusCard && useOpenGateTrunkStatusCard && usePresenceCard) {

            generalCardColumnValueRow = "6";
            generalCardColumnValue = "4";
        } else if ((useHostStatusCard && useOpenGateTrunkStatusCard) || (useHostStatusCard && usePresenceCard) ||
            (useOpenGateTrunkStatusCard && usePresenceCard)) {

            generalCardColumnValueRow = "6";
            generalCardColumnValue = "6";
        } else if (useHostStatusCard || useOpenGateTrunkStatusCard || usePresenceCard) {

            generalCardColumnValueRow = "6";
            generalCardColumnValue = "12";
        }
    }

    fullStatusCard += statusCardTopRow + statusCardTopRowBottom;

    var statusCardGeneralTop = "<div class=\"col-sm-" + generalCardColumnValueRow + "\" id=\"GeneralCards\"><div class=\"row\">";
    var statusCardGeneralBottom = "</div></div>"
    //------------------------------------------------------------------------------------------------------
    //------------------------------------------CIM STATUS Card --------------------------------------------
    //------------------------------------------------------------------------------------------------------

    var cimStatusCardTop =
        "<div class=\"col-sm-" + cimCardColumnValue + "\" id=\"CimTableCardsSection\">"
        + "<div class=\"row\">"
        + "<div class=\"col-sm-12\">"
        + "<a class=\"infoModalPress\">"
        + "<div class=\"card shadow border-left-info py-2\">"
        + "<div class=\"card-body\""
        + "style=\"padding-bottom: 0px; padding-top: 0px; padding-left: 0px; text-align: center;\">"
        + "<div class=\"text-uppercase text-info font-weight-bold text-xs mb-1\">"
        + "<span>CIM STATUS </span> "
        + "</div>"
        + "<div class=\"row align-items-center no-gutters\">"
        + "<div class=\"col mr-2\" id=\"cimIndicatorTable\"></div>";
    var cimStatusCardBottom = "</div>"
        + "</div>"
        + "</div>"
        + "</a>"
        + "</div>"
        + "</div>"
        + "</div>";

    //--------------------------------------------------------------------------------------------------
    //------------------------------------------Host Card----------------------------------------
    //--------------------------------------------------------------------------------------------------

    var HostCardHTMLTop =
        "<div class=\"col-sm-" + generalCardColumnValue + "\">"
        + "<a class=\"infoModalPress\">"
        + "<div class=\"card shadow border-left-info py-2\">"
        + "<div class=\"card-body\">"
        + "<div class=\"row align-items-center no-gutters\">"
        + "<div class=\"col mr-2\">"
        + "<div class=\"text-uppercase text-info font-weight-bold text-xs mb-1\">"
        + "<span>HOST STATUS</span>"
        + "</div>"
        + "</div>"
        + "<div class=\"col-auto\" id=\"presenceCard\">";
    var HostCardHTMLTBottom = "</div>"
        + "</div>"
        + "</div>"
        + "</div>"
        + "</a>"
        + "</div>";




    "<div class=\"card shadow border-left-info py-2\"><div class=\"card-body\"><div class=\"row align-items-center no-gutters\"><div class=\"col mr-2\"><div class=\"text-uppercase text-info font-weight-bold text-xs mb-1\"><span>HOST STATUS</span></div></div><div class=\"col-auto\" id=\"presenceCard\">"
    var HostCardHTMLTBottom = "</div></div></div></div>"






    //--------------------------------------------------------------------------------------------------
    //------------------------------------------Presence Card----------------------------------------
    //--------------------------------------------------------------------------------------------------

    var PresenceCardHTMLTop =

        "<div class=\"col-sm-" + generalCardColumnValue + "\">"
        + "<a class=\"infoModalPress\">"
        + "<div class=\"card shadow border-left-info py-2\">"
        + "<div class=\"card-body\">"
        + "<div class=\"row align-items-center no-gutters\">"
        + "<div class=\"col mr-2\">"
        + "<div class=\"text-uppercase text-info font-weight-bold text-xs mb-1\">"
        + "<span>PRESENCE STATUS</span>"
        + "</div>"
        + "</div>"
        + "<div class=\"col-auto\" id=\"presenceCard\">";

    var PresenceCardHTMLTBottom =
        "</div>"
        + "</div>"
        + "</div>"
        + "</div>"
        + "</a>"
        + "</div>";
    //--------------------------------------------------------------------------------------------------
    //------------------------------------------Opengate Card----------------------------------------
    //--------------------------------------------------------------------------------------------------


    var OpengateCardHTMLTop =
        "<div class=\"col-sm-" + generalCardColumnValue + "\">"
        + "<a class=\"infoModalPress\">"
        + "<div class=\"card shadow border-left-info py-2\">"
        + "<div class=\"card-body\">"
        + "<div class=\"row align-items-center no-gutters\">"
        + "<div class=\"col mr-2\">"
        + "<div class=\"text-uppercase text-info font-weight-bold text-xs mb-1\">"
        + "<span>OPENGATE STATUS</span>"
        + "</div>"
        + "</div>"
        + "<div class=\"col-auto\" id=\"opengateCard\">";
    var OpengateCardHTMLTBottom =
        "</div>"
        + "</div>"
        + "</div>"
        + "</div>"
        + "</a>"
        + "</div>";




    // var hostStatusData = JSON.parse(receiveHostStatus.responseText);
    // var hostStatus = hostStatusData['queryresult'];
    // var opgStatusData = JSON.parse(receiveOpengateStatus.responseText);
    // var opgStatus = opgStatusData['queryresult'];
    // var presStatusData = JSON.parse(receivePresenceStatus.responseText);
    // var presStatus = presStatusData['queryresult'];
    // var CIMStatusData = JSON.parse(receiveCIMStatus.responseText);
    // var CIMStatus = CIMStatusData['queryresult'];


    if (useHostStatusCard || useOpenGateTrunkStatusCard || usePresenceCard) {
        fullStatusCard += statusCardGeneralTop;
    }



    //  -----------------------------------------------------------------------------------------------------------------------------------------------
    //  -----------------------------------------------------------------------------------------------------------------------------------------------
    //   Host Status Card Render
    //  -----------------------------------------------------------------------------------------------------------------------------------------------
    //  -----------------------------------------------------------------------------------------------------------------------------------------------
    if (useHostStatusCard) {


        if (hostStatus.length != 0) {
            for (let i = 0; i < hostStatus.length; i++) {
                const host = hostStatus[i];


                if (host["Color"] == "Orange") {
                    orangeHostCount++;
                }
                else if (host["Color"] == "Red") {
                    redHostCount++;
                }
            }
        } else {
            greenHostCount++;
        }



        if (greenHostCount >= 1) {

            hostCard = "<i class=\"fas fa-thermometer-empty fa-2x text-gray-300\" style=\"color: green; font-size:3.5em;\">"
                + "</i>"
        } else {
            if ((redHostCount == 0) && (orangeHostCount >= 1)) {
                hostCard =
                    "<i class=\"fas fa-thermometer-half fa-2x text-gray-300\" style=\"color: orange; font-size:3.5em;\">"
                    + "</i>";
                // + "</a>";
            }
            else if ((redHostCount >= 1) && (orangeHostCount == 0)) {
                hostCard = "<i class=\"fas fa-thermometer-full fa-2x text-gray-300\" style=\"color: red; font-size:3.5em;\">"
                    + "</i>";
                // + "</a>";

            }
            else if ((redHostCount >= 1) && (orangeHostCount >= 1)) {
                hostCard = "<i class=\"fas fa-thermometer-full fa-2x text-gray-300\" style=\"color: red; font-size:3.5em;\">"
                    + "</i>";
                // + "</a>";

            }
        }


        fullHostCard = HostCardHTMLTop + hostCard + HostCardHTMLTBottom;
        fullStatusCard += fullHostCard;
    }
    //  -----------------------------------------------------------------------------------------------------------------------------------------------
    //  -----------------------------------------------------------------------------------------------------------------------------------------------
    //   Opengate Status Card Render
    //  -----------------------------------------------------------------------------------------------------------------------------------------------
    //  -----------------------------------------------------------------------------------------------------------------------------------------------

    if (useOpenGateTrunkStatusCard) {


        if (opgStatus.length != 0) {


            for (let i = 0; i < opgStatus.length; i++) {
                const opg = opgStatus[i];
                if (opg["Color"] == "Orange") {
                    orangeOPGCount++;
                }
                else if (opg["Color"] == "Red") {
                    redOPGCount++;
                }
            }
        } else {
            greenOPGCount++;
        }

        if (greenOPGCount >= 1) {

            opgCard = "<i class=\"fas fa-hdd fa-2x text-gray-300\" style=\"color: green; font-size:3.5em;\">"
                + "</i>";
        } else {
            if ((redOPGCount == 0) && (orangeOPGCount >= 1)) {

                opgCard =
                    "<i class=\"fas fa-hdd fa-2x text-gray-300\" style=\"color: orange; font-size:3.5em;\">"
                    + "</i>";

            }
            else if ((redOPGCount >= 1) && (orangeOPGCount == 0)) {

                opgCard = "<i class=\"fas fa-hdd fa-2x text-gray-300\" style=\"color: red; font-size:3.5em;\">"
                    + "</i>";
            }
            else if ((redOPGCount >= 1) && (orangeOPGCount >= 1)) {

                opgCard = "<i class=\"fas fa-hdd fa-2x text-gray-300\" style=\"color: red; font-size:3.5em;\">"
                    + "</i>";
            }

        }
        fullOPGCard = OpengateCardHTMLTop + opgCard + OpengateCardHTMLTBottom;

        fullStatusCard += fullOPGCard;

    }

    // -------------------------------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------------------------------
    //  Presence Status Card render
    // -------------------------------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------------------------------


    if (usePresenceCard) {

        if (presStatus.length != 0) {
            for (let i = 0; i < presStatus.length; i++) {
                const pres = presStatus[i];
                if (pres["Color"] == "Orange") {
                    orangePresCount++;
                }
                else if (pres["Color"] == "Red") {
                    redPresCount++;
                }
            }
        } else {
            greenPresCount++
        }

        if (greenPresCount >= 1) {

            presCard =
                "<i class=\"fas fa-clipboard-list fa-2x text-gray-300\" style=\"color: green; font-size:3.5em;\">"
                + "</i>";

        } else {
            if ((redPresCount == 0) && (orangePresCount >= 1)) {

                presCard =
                    "<i class=\"fas fa-clipboard-list fa-2x text-gray-300\" style=\"color: orange; font-size:3.5em;\">"
                    + "</i>";

            }
            else if ((redPresCount >= 1) && (orangePresCount == 0)) {

                presCard = "<i class=\"fas fa-clipboard-list fa-2x text-gray-300\" style=\"color: red; font-size:3.5em;\">"
                    + "</i>";
            }
            else if ((redPresCount >= 1) && (orangePresCount >= 1)) {

                presCard = "<i class=\"fas fa-clipboard-list fa-2x text-gray-300\" style=\"color: red; font-size:3.5em;\">"
                    + "</i>";
            }
        }

        fullPResCard = PresenceCardHTMLTop + presCard + PresenceCardHTMLTBottom;
        fullStatusCard += fullPResCard;


        if (useHostStatusCard || useOpenGateTrunkStatusCard || usePresenceCard) {
            fullStatusCard += statusCardGeneralBottom;
        }
    }
    // ---------------------------------------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------------------------------------
    // --------------------------------- CIM Table
    // ---------------------------------------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------------------------------------
    if (useCIMStatusCard) {


        rwData = "<table class=\"table\" style=\"margin-right: 0px; margin-left: 0px; margin-bottom: 0px;\"><thead>"
            + "<tr><td style=\"padding-bottom: 0px; padding-top: 0px; padding-left: 0px; padding-right: 0px; border-top-width: 0px;\">Type</td>"
            + "<td style=\"padding-bottom: 0px; padding-top: 0px; padding-left: 0px; padding-right: 0px; border-top-width: 0px;\">Count</td>"
            + "<td style=\"padding-bottom: 0px; padding-top: 0px; padding-left: 0px; padding-right: 0px; border-top-width: 0px;\">Last Loaded(Min)</td>"
            + "<td style=\"padding-bottom: 0px; padding-top: 0px; padding-left: 0px; padding-right: 0px; border-top-width: 0px;\">Indicator</td>"
            + "</tr>"
            + "</thead>"
            + "<tbody>";
        txtData += rwData;
        var found = "No";
        if (CIMStatus.length != 0) {
            for (let i = 0; i < 2; i++) {
                const rowData = CIMStatus[i];
                var lastLoaded;

                var num = rowData['leadslast'];
                var hours = (num / 60);
                var rhours = Math.floor(hours);
                var minutes = (hours - rhours) * 60;
                var rminutes = Math.round(minutes);
                lastLoaded = rhours + " h " + rminutes + " min(s).";

                rwData =
                    "<tr>"
                    + "<td style=\"padding-bottom: 0px; padding-top: 0px; padding-left: 0px; padding-right: 0px; border-top-width: 0px;\"><strong>" + rowData['leadsdescription'] + "</strong></td>"
                    + "<td style=\"padding-bottom: 0px; padding-top: 0px; padding-left: 0px; padding-right: 0px; border-top-width: 0px;\"><strong>" + rowData['leadscount'] + "</strong></td>"
                    + "<td style=\"padding-bottom: 0px; padding-top: 0px; padding-left: 0px; padding-right: 0px; border-top-width: 0px;\"><strong>" + lastLoaded + "</strong></td>"
                    + "<td style=\"padding-bottom: 0px; padding-top: 0px; padding-left: 0px; padding-right: 0px; border-top-width: 0px;\"><i class=\"fas fa-download fa-2x text-gray-300\""
                    + " style=\"color: " + rowData["leadsindicator"] + "; font-size: 1em;\">"
                    + "</i>"
                    + "</td>"
                    + "</tr>";

                txtData += rwData;

            }
        }

        txtData += "</tbody></table>";


        fullCIMCard = cimStatusCardTop + txtData + cimStatusCardBottom;

        fullStatusCard += fullCIMCard;
    }


    fullStatusCard += statusCardTopRow + statusCardTopRowBottom;
    // var ts = getMinutesBetweenDates(CIMStatus[0]['updated']);


    // document.getElementById("cimType").innerHTML = "Type: "+CIMStatus[0]['leadssource'];
    // document.getElementById("cimTS").innerHTML = "Timestamp: "+CIMStatus[0]['updated'];
    // document.getElementById("cimTS").innerHTML = "Timestamp: "+"06:38:11";
    // document.getElementById("cimTS").innerHTML = "Timestamp: "+ts;
    // document.getElementById("cimCount").innerHTML = "Count: "+CIMStatus[0]['leadscount'];



    document.getElementById("cardHDDUsageDetails").innerHTML = fullStatusCard;
    // document.getElementById("hostStatusCard").innerHTML = hostCard;
    // document.getElementById("opengateCard").innerHTML = opgCard;
    // document.getElementById("presenceCard").innerHTML = presCard;
    // document.getElementById("cimIndicatorTable").innerHTML = txtData;


}
;


function getMinutesBetweenDates(startDate) {
    var dn = new Date();
    var diff = dn - startDate;
    var finaleMin = diff / 60000;
    return finaleMin;
}

function completeSiteMap() {

    if (receiveSiteTypeReq.readyState == 4) {

        var sitetypeData = JSON.parse(receiveSiteTypeReq.responseText);

        if (sitetypeData != "") {

            siteMapSiteID = sitetypeData['siteid'];
        }
    }
}

function restructureElementsForWallboardUser() {
    var modalLogin = document.getElementById("modal-login");
    var openFilterButton = document.getElementById("buttonCust");
    var menuToggleButton = document.getElementById("menu-toggle");
    var logoCol = document.getElementById("col-Logo");
    var headerCol = document.getElementById("col-Header");
    var menuCol = document.getElementById("col-Menu");
    var buttonCol = document.getElementById("col-button");

    modalLogin.style.display = "none";
    // //disable filter
    // openFilterButton.disabled = true;
    // openFilterButton.style.display = "none";
    //remove menu
    menuToggleButton.style.display = "none";

    //change size of columns
    logoCol.className = "col-md-2";
    // logoCol.style.paddingLeft = "10px";
    headerCol.className = "col-md-7";
    menuCol.className = "col-md-0";
    buttonCol.className = "col-md-3";
}


// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                              USER AUTHORIZATION
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------

function create() {

}
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                       far fa-plus-square                       CHECK AUTHENTICATION(CHECK IF LOGGGED IN )
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------

function checkAuthorization() {
    var kvp = document.location.hash.substr(1).split('=');
    var keyParam = kvp[1];

    var userResult = "";

    if (userProfilereq.readyState == 4) {

        var userProfileData = JSON.parse(userProfilereq.responseText);
        userProfile = userProfileData['UserInfo'];


        if (keyParam == userProfile['userKey'] && userProfile['userTypeId'] == 1) {

            userResult = userProfile['userTypeDescription'];
        }
        if (keyParam == userProfile['userKey'] && userProfile['userTypeId'] == 2) {

            userResult = userProfile['userTypeDescription'];
        }
        if (keyParam == userProfile['userKey'] && userProfile['userTypeId'] == 3) {

            userResult = userProfile['userTypeDescription'];
        }
        if (keyParam == userProfile['userKey'] && userProfile['userTypeId'] == 4) {

            userResult = userProfile['userTypeDescription'];
        }
        // else if(a == b) {
        //     userResult = userProfile['userTypeDescription']; false;
        // }
    }

    return userResult;
}


function returnAuthProfile() {

    var userProfile = "";


}
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                              RELOAD TABLE MANAGER
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------



function reloadTableManager(mustReload, tableFunction, filterVarARRAY) {

    var tableFunctionKEY = tableFunction;
    var filterKEY = filterVarARRAY;

    if (mustReload) {
        if (tableFunctionKEY == "activeAlarms") {
            intervalID = setTimeout(function () { getActiveAlarms(); }, 5000);
        }
        if (tableFunctionKEY == "wallboardActiveAlarms") {
            if (siteMapSiteID != undefined || siteMapSiteID != "") {

                intervalID = setTimeout(function () { getWallboardActiveAlarms(siteMapSiteID); }, 5000);
            } else {
                intervalID = setTimeout(function () { getWallboardActiveAlarms(); }, 5000);
            }
        }
        else if (tableFunctionKEY == "customAlarms") {
            intervalID = setTimeout(function () {
                var selectVodacomSiteVar = filterKEY[0];
                var selectSourceVar = filterKEY[1];
                var selectSeverityVar = filterKEY[2];
                var selectServerVar = filterKEY[3];
                var selectStatusVar = filterKEY[4];
                var selectDirectSiteVar = filterKEY[5];
                var selectAlarmIDVar = filterKEY[6];

                reloadCustomSearch(selectVodacomSiteVar, selectSourceVar, selectSeverityVar, selectServerVar, selectStatusVar, selectDirectSiteVar, selectAlarmIDVar);


            }, 5000);
        }
        // else if (tableFunctionKEY == "vodacomSitesAlarms") {
        //     intervalID = setTimeout(function () { getVodacomSitesAlarms(filterKEY); }, 5000);
        // }
        // else if (tableFunctionKEY == "sourceAlarms") {
        //     intervalID = setTimeout(function () { getSourceAlarms(filterKEY); }, 5000);
        // }
        // else if (tableFunctionKEY == "severityAlarms") {
        //     intervalID = setTimeout(function () { getSeverityAlarms(filterKEY); }, 5000);
        // }
        // else if (tableFunctionKEY == "vodacomClientServerAlarms") {
        //     intervalID = setTimeout(function () { getVodacomClientServerAlarms(); }, 5000);
        // }
        // else if (tableFunctionKEY == "directClientServerAlarms") {
        //     intervalID = setTimeout(function () { getDirectClientServerAlarms(); }, 5000);
        // }
        // else if (tableFunctionKEY == "resetStatusAlarms") {
        //     intervalID = setTimeout(function () { getResetStatusAlarms(); }, 7000);
        // }
        // else if (tableFunctionKEY == "clearedStatusAlarms") {
        //     intervalID = setTimeout(function () { getClearedStatusAlarms(); }, 7000);
        // }
    }
    else {
        clearTimeout(intervalID);
    }

}
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                         USER SESSION
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
function insertHashParam(value) {
    var query = window.location.search;
    var quer = window.location.href;
    var quy = window.location.pathname;
    var qery = window.location.hash;
    var key = "key";
    key = encodeURI(key);
    value = encodeURI(value);

    var kvp = document.location.hash.substr(1).split('&');

    var i = kvp.length; var x; while (i--) {
        x = kvp[i].split('=');

        if (x[0] == key) {
            x[1] = value;
            kvp[i] = x.join('=');
            break;
        }
    }

    if (i < 0) { kvp[kvp.length] = [key, value].join('='); }

    //this will reload the page, it's likely better to store this until finished
    document.location.hash = kvp.join('&');
}


function logOutofDashboard() {
    var key = "";
    var sideMenu = document.getElementById("wrapper");
    var userN = document.getElementById("username-login");
    var passW = document.getElementById("password-login");

    var errMSG = document.getElementById("errorMessage");
    errMSG.innerHTML = "";

    passW.style.border = "1px solid rgba(0,0,0,.2)";
    userN.style.border = "1px solid rgba(0,0,0,.2)";

    sideMenu.style.display = "none";
    reloadTableManager(false);
    insertHashParam(key);
}




// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                          START PAGE
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------



// function to setup page
function startPage() {

    // requestUserManagementList();

    //     var modalLogin = document.getElementById("modal-login");
    //     modalLogin.style.display = "block";
    //     document.getElementById('modal-login').addEventListener('keypress', function (e) {
    //         var key = e.which || e.keyCode;
    //         if (key === 13) {
    //             checkAuth();
    //         }
    //     });




    requestUserManagementList();

    getDirectSiteList();
    //getVodacomSiteList();

    var loggedIn;
    var userHash = window.location.hash;
    var key = userHash.replace('#&key=', '');

    userkeyForModal = key;
    // requestRelogUserList();

    // startRequests();

    if (key != "" && key != undefined) {
        var query = "SELECT InovoMonitor.tblUsers.id, InovoMonitor.tblUsers.username, InovoMonitor.tblUsers.userpassword,InovoMonitor.tblUsers.usersurname,InovoMonitor.tblUsers.userkey,InovoMonitor.tblUsers.userlogin,InovoMonitor.tblUsers.usertype,InovoMonitor.tblUsers.useractive,InovoMonitor.tblUserTypes.description FROM InovoMonitor.tblUsers INNER JOIN InovoMonitor.tblUserTypes ON InovoMonitor.tblUserTypes.id = InovoMonitor.tblUsers.usertype;";
        // var query = "SELECT * FROM InovoMonitor.tblUsers"; // where InovoMonitor.tblUsers.userpassword = '" + passW + "' AND InovoMonitor.tblUsers.username = '" + userN + "';"

        // userRelogProfileReq.open("POST", serverURLDEV + "/MonitorData", true);
        userRelogProfileReq.open("POST", serverURL + "/MonitorData", true);

        userRelogProfileReq.onreadystatechange = checkLoggedInUser;
        userRelogProfileReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        userRelogProfileReq.send("action=runopenquery&query=" + query);
        // userRelogProfileReq.onreadystatechange = checkLoggedInUser(key);

        // loggedIn = checkLoggedInUser(key)
    } else {
        var modalLogin = document.getElementById("modal-login");
        modalLogin.style.display = "block";
        document.getElementById('modal-login').addEventListener('keypress', function (e) {
            var key = e.which || e.keyCode;
            if (key === 13) {
                checkAuth();
            }
        });
    }


    // if (loggedIn == false) {

    // }
    // else if (loggedIn == true && loggedIn != undefined) {
    //     checkLoggedInUserAuth();

    // }



}



// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                       Create user
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
function createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


function checkUserExists(usernameTest, usersurnameTest, userloginTest) {
    var user;
    var variableName;

    var dbData = JSON.parse(userManagementProfileReq.responseText);
    userDetails = dbData['queryresult'];


    for (var iAlarm = 0; iAlarm < userDetails.length; iAlarm++) {
        var rowData = userDetails[iAlarm];

        if ((rowData['username'] == usernameTest) && (rowData['usersurname'] == usersurnameTest) || (rowData['userLogin'] == userloginTest)) {

            variableName = 'yes';

        }
    }

    if (variableName == 'yes') {

        user = true;

    } else {
        user = false;
    }

    return user;
}

// // --------------------------------------------------------------------------------------------------------------------------------------------------
// // --------------------------------------------------------------------------------------------------------------------------------------------------
// //                                                                       Create user
// // --------------------------------------------------------------------------------------------------------------------------------------------------
// // --------------------------------------------------------------------------------------------------------------------------------------------------

function createUser() {
    var guidUser;

    var newUserName = $('#createNewUsername').val();
    var newUserSurname = $('#createNewUsersurname').val();
    var newUserLogin = $('#createNewUserlogin').val();
    var newUserPass = $('#createNewUserpassword').val();
    var newUserConfPass = $('#confirmNewUserpassword').val();
    var newUserActive = $('#createUserActive').val();
    var newUserAccess = $('#createUserAccess').val();
    var userProfileID, userDetails;

    // var dbData = JSON.parse(userManagementProfileReq.responseText);
    // userDetails = dbData['queryresult'];
    var dateNow;





    var userExists = checkUserExists(newUserName, newUserSurname, newUserLogin);


    if (newUserName != undefined && newUserName != "" && newUserSurname != "" && newUserSurname != undefined && newUserLogin != "" && newUserLogin != undefined && newUserConfPass != "" && newUserConfPass != undefined && newUserPass != "" && newUserPass != undefined && newUserActive != "" && newUserActive != undefined && newUserAccess != "" && newUserAccess != undefined) {

        if (userExists == false) {

            dateNow = new Date();
            dateNow = dateNow.getFullYear() + '-' +
                ('00' + (dateNow.getMonth() + 1)).slice(-2) + '-' +
                ('00' + dateNow.getDate()).slice(-2) + ' ' +
                ('00' + dateNow.getHours()).slice(-2) + ':' +
                ('00' + dateNow.getMinutes()).slice(-2) + ':' +
                ('00' + dateNow.getSeconds()).slice(-2);


            var createUserQuery;

            var userProfileData = JSON.parse(userProfilereq.responseText);
            var userProfile = userProfileData['UserInfo'];

            if (newUserConfPass == newUserPass && newUserPass != undefined && newUserConfPass != undefined && newUserConfPass != "" && newUserPass != "") {
                // // --------------------------------------------------------------------------------------------------------------------------------------------------
                // // CREATE USER
                // // --------------------------------------------------------------------------------------------------------------------------------------------------
                guidUser = createGuid();
                createUserQuery = "INSERT INTO InovoMonitor.tblUsers (username, usersurname, userlogin, userpassword, usertype, userkey, useractive, created ) VALUES ('" + newUserName + "','" + newUserSurname + "','" + newUserLogin + "','" + newUserPass + "'," + newUserAccess + ",'" + guidUser + "'," + newUserActive + ",'" + dateNow + "');";


                createUserReq.open("POST", serverURL + "/MonitorData", true);

                createUserReq.onreadystatechange = retrieveNewUserList;
                // set the Request Header
                createUserReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                //Make the actual request.
                createUserReq.send("action=runopenquery&query=" + createUserQuery);


            } else {
                alert('password is not the same or the password is not present');
                // break;
            }
        }
        else {
            alert('The user:' + newUserName + ' ' + newUserSurname + ', userlogin: ' + newUserLogin + ' currently exists');
            // break;
        }
    }
    else {
        alert('Ensure there are no empty properties before creating users.');
        // break;
    }


}

var updateCreateUserReason;

function completeCreateUser() {
    if (createUserReq.readyState == 4 && userManagementProfileReq.readyState == 4) {

        var newUserName = $('#createNewUsername').val();
        var newUserSurname = $('#createNewUsersurname').val();
        var newUserLogin = $('#createNewUserlogin').val();
        var newUserPass = $('#createNewUserpassword').val();
        var newUserActive = $('#createUserActive').val();
        var newUserAccess = $('#createUserAccess').val();
        var currentUser;
        var userProfileID = "";

        var remoteVodaEXT = "?remotehost=https://41.0.203.210:8443/InovoCentralMonitorClient/MonitorData&action=runopenquery&query=";


        var newUserId;

        var dbData = JSON.parse(userManagementProfileReq.responseText);
        userDetails = dbData['queryresult'];


        var userProfileData = JSON.parse(userProfilereq.responseText);
        var userProfile = userProfileData['UserInfo'];

        currentUser = userProfile['userLogin']
        for (var iAlarm = 0; iAlarm < userDetails.length; iAlarm++) {
            var rowData = userDetails[iAlarm];

            var uname = rowData['username'];
            var usurname = rowData['usersurname'];
            var ulogin = rowData['userlogin'];


            if (uname == newUserName && usurname == newUserSurname && ulogin == newUserLogin) {
                userProfileID = rowData['id'];
            }
        }

        // // --------------------------------------------------------------------------------------------------------------------------------------------------
        // //  UPDATE USER LOG
        // // --------------------------------------------------------------------------------------------------------------------------------------------------
        updateCreateUserReason = createUserLog(userProfileID, newUserName, newUserSurname, newUserLogin, newUserPass, newUserActive, newUserAccess);
        // var query = "SELECT * FROM InovoMonitor.tblAlarms;"

        dateNow = new Date();
        dateNow = dateNow.getFullYear() + '-' +
            ('00' + (dateNow.getMonth() + 1)).slice(-2) + '-' +
            ('00' + dateNow.getDate()).slice(-2) + ' ' +
            ('00' + dateNow.getHours()).slice(-2) + ':' +
            ('00' + dateNow.getMinutes()).slice(-2) + ':' +
            ('00' + dateNow.getSeconds()).slice(-2);

        var insertLogquery = "INSERT INTO InovoMonitor.tblUserLog (userid, reason, datecreated, createdby)  VALUES ('" + userProfileID + "','" + String(updateCreateUserReason) + "', '" + dateNow + "','" + currentUser + "');";



        // // --------------------------------------------------------------------------------------------------------------------------------------------------
        // // UPDATE SITEMAP
        // // --------------------------------------------------------------------------------------------------------------------------------------------------

        // var queryVoda = createVodaUserSiteMapQuery(userProfileID)
        // var queryDirect = createDirectUserSiteMapQuery(userProfileID)

        // // --------------------------------------------------------------------------------------------------------------------------------------------------
        // // RUN SITEMAP AND LOQ QUERIES
        // // --------------------------------------------------------------------------------------------------------------------------------------------------




        // createUserDirectSitemapReq.open("POST", serverURL + "/MonitorData", true);
        // createUserVodaSitemapReq.open("POST", serverURL + "/MonitorData" + remoteVodaEXT + queryVoda, true);
        createUSRlogReq.open("POST", serverURL + "/MonitorData", true);

        // createUserDirectSitemapReq.onreadystatechange = getCustomSearchResult;
        // createUserVodaSitemapReq.onreadystatechange = getCustomSearchResult;
        createUSRlogReq.onreadystatechange = createNewProfileResult;
        // set the Request Header
        // createUserDirectSitemapReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // createUserVodaSitemapReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        createUSRlogReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        //Make the actual request.
        // createUserDirectSitemapReq.send("action=runopenquery&query=" + queryDirect);
        // createUserVodaSitemapReq.send();
        createUSRlogReq.send("action=runopenquery&query=" + insertLogquery);


    }
}

function createVodaUserSiteMapQuery(newUserId) {
    var intialSMQuery = "INSERT INTO inovomonitor.tblusersitemap (userid, siteid, enabled, updated)  VALUES ";
    var dateNow, clauseQuery, querySiteValue, finalVodaQuery;

    // ---------------------------------------------------------------------------
    // get date
    // ---------------------------------------------------------------------------


    dateNow = new Date();
    dateNow = dateNow.getFullYear() + '-' +
        ('00' + (dateNow.getMonth() + 1)).slice(-2) + '-' +
        ('00' + dateNow.getDate()).slice(-2) + ' ' +
        ('00' + dateNow.getHours()).slice(-2) + ':' +
        ('00' + dateNow.getMinutes()).slice(-2) + ':' +
        ('00' + dateNow.getSeconds()).slice(-2);



    // ---------------------------------------------------------------------------
    // set query
    // ---------------------------------------------------------------------------
    var form = document.getElementById('listVoda');
    var chks = form.querySelectorAll('input[type="checkbox"]');
    var checkedSitesArr = [];
    for (var i = 0; i < chks.length; i++) {
        if (chks[i].checked) {
            querySiteValue = "(" + newUserId + ", " + chks[i].value + ", " + 1 + ", " + dateNow + ")";
            checkedSitesArr.push(querySiteValue);
        }
    }



    if (checkedSitesArr.length >= 2) {
        var n = 0;
        for (i = 0; i < checkedSitesArr.length - 1; i++) {
            n++;
            clauseQuery += checkedSitesArr[i] + " , ";
        }

        clauseQuery += checkedSitesArr[n];

    }
    else if (checkedSitesArr.length == 1) {
        clauseQuery += clauseQuery[0];
    }
    else {
        clauseQuery += "No Clause";
    }




    if (clauseQuery.indexOf("No Clause") == -1) {
        finalVodaQuery = intialSMQuery + clauseQuery;
    } else {

        finalVodaQuery = "false";
    }

    return finalVodaQuery
}

function createDirectUserSiteMapQuery(newUserId) {
    var intialSMQuery = "INSERT INTO Inovomonitor.tblUserSiteMap (userid, siteid, enabled, updated)  VALUES ";
    var siteId, dateNow, clauseQuery, querySiteValue, finalDirectQuery;

    // ---------------------------------------------------------------------------
    // get date
    // ---------------------------------------------------------------------------


    dateNow = new Date();
    dateNow = dateNow.getFullYear() + '-' +
        ('00' + (dateNow.getMonth() + 1)).slice(-2) + '-' +
        ('00' + dateNow.getDate()).slice(-2) + ' ' +
        ('00' + dateNow.getHours()).slice(-2) + ':' +
        ('00' + dateNow.getMinutes()).slice(-2) + ':' +
        ('00' + dateNow.getSeconds()).slice(-2);



    // ---------------------------------------------------------------------------
    // set query
    // ---------------------------------------------------------------------------
    var form = document.getElementById('listDirect');
    var chks = form.querySelectorAll('input[type="checkbox"]');
    var checkedSitesArr = [];
    for (var i = 0; i < chks.length; i++) {
        if (chks[i].checked) {
            querySiteValue = "(" + newUserId + ", " + chks[i].value + ", " + 1 + ", " + dateNow + ")";
            checkedSitesArr.push(querySiteValue);
        }
    }



    if (checkedSitesArr.length >= 2) {
        var n = 0;
        for (i = 0; i < checkedSitesArr.length - 1; i++) {
            n++;
            clauseQuery += checkedSitesArr[i] + " , ";
        }

        clauseQuery += checkedSitesArr[n];

    }
    else if (checkedSitesArr.length == 1) {
        clauseQuery += clauseQuery[0];
    }
    else {
        clauseQuery += "No Clause";
    }




    if (clauseQuery.indexOf("No Clause") == -1) {
        finalReason = intialSMQuery + clauseQuery;
    } else {

        finalReason = "false";
    }

    return finalDirectQuery
}



function retrieveNewUserList() {
    if (createUserReq.readyState == 4) {
        var query = "SELECT InovoMonitor.tblUsers.id, InovoMonitor.tblUsers.username,InovoMonitor.tblUsers.usersurname,InovoMonitor.tblUsers.userkey,InovoMonitor.tblUsers.userlogin,InovoMonitor.tblUsers.usertype,InovoMonitor.tblUsers.useractive,InovoMonitor.tblUserTypes.description FROM InovoMonitor.tblUsers INNER JOIN InovoMonitor.tblUserTypes ON InovoMonitor.tblUserTypes.id = InovoMonitor.tblUsers.usertype WHERE InovoMonitor.tblUsers.useractive = 1;";
        // var query = "SELECT * FROM InovoMonitor.tblUsers"; // where InovoMonitor.tblUsers.userpassword = '" + passW + "' AND InovoMonitor.tblUsers.username = '" + userN + "';"

        // userManagementProfileReq.open("POST", serverURLDEV + "/MonitorData", true);
        userManagementProfileReq.open("POST", serverURL + "/MonitorData", true);
        userManagementProfileReq.onreadystatechange = completeCreateUser;
        userManagementProfileReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        userManagementProfileReq.send("action=runopenquery&query=" + query);
    }

}


// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                       CUSTOM FILTER  - RUN CUSTOM SEARCH
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
function createQuery(selectSourceSearchQ, selectSeveritySearchQ, selectServerSearchSiteQ, selectStatusSearchQ, selectAlarmIDSearchQ) {

    var selectSourceQuery = "InovoMonitor.tblAlarms.source = '" + selectSourceSearchQ + "'";
    var selectSeverityQuery = "InovoMonitor.tblAlarms.severity = '" + selectSeveritySearchQ + "'";
    var selectServerQuery = "InovoMonitor.tblSites.sitename = '" + selectServerSearchSiteQ + "'";
    var selectStatusQuery = "InovoMonitor.tblAlarms.currentstatus = '" + selectStatusSearchQ + "'";
    var selectAlarmIDQuery = "InovoMonitor.tblAlarms.id = " + selectAlarmIDSearchQ + "";

    var queryKey = "Choose"
    var queryKeyAlarm = "";

    var finalQuery;
    var intialQuery = "SELECT InovoMonitor.tblSites.sitename, InovoMonitor.tblAlarms.hostid, InovoMonitor.tblAlarms.id, InovoMonitor.tblHosts.hostName, InovoMonitor.tblAlarms.description, InovoMonitor.tblAlarms.severity, InovoMonitor.tblAlarms.Message, InovoMonitor.tblAlarms.currentstatus, InovoMonitor.tblAlarms.source, InovoMonitor.tblAlarms.category, InovoMonitor.tblAlarms.created, InovoMonitor.tblAlarms.updated, InovoMonitor.tblAlarms.updatedby FROM InovoMonitor.tblAlarms INNER JOIN InovoMonitor.tblHosts ON InovoMonitor.tblAlarms.hostid = InovoMonitor.tblHosts.id INNER JOIN InovoMonitor.tblSites ON InovoMonitor.tblSites.id = InovoMonitor.tblHosts.siteid ";


    var clauseQuery = "";
    var queryArr = [];

    if (selectSourceQuery.indexOf(queryKey) == -1) {
        queryArr.push(selectSourceQuery);
    }
    if (selectSeverityQuery.indexOf(queryKey) == -1) {
        queryArr.push(selectSeverityQuery);
    }
    if (selectServerQuery.indexOf(queryKey) == -1) {
        queryArr.push(selectServerQuery);
    }
    if (selectStatusQuery.indexOf(queryKey) == -1) {
        queryArr.push(selectStatusQuery);
    }
    if ((queryKeyAlarm.localeCompare(selectAlarmIDSearchQ)) == -1) {
        queryArr.push(selectAlarmIDQuery);
    }
    // if (selectAlarmIDQuery.indexOf(queryKeyAlarm) == -1) {
    //     queryArr.push(selectAlarmIDQuery);
    // }

    if (queryArr.length >= 2) {
        var n = 0;
        for (i = 0; i < queryArr.length - 1; i++) {
            n++;
            clauseQuery += queryArr[i] + " AND ";
        }

        clauseQuery += queryArr[n];

    }
    else if (queryArr.length == 1) {
        clauseQuery += queryArr[0];
    }
    else {
        clauseQuery += "No Clause";
    }


    if (clauseQuery.indexOf("No Clause") == -1) {
        finalQuery = intialQuery + " WHERE " + clauseQuery;
    } else {

        finalQuery = intialQuery;
    }



    return finalQuery;
}
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
function checkUpdateRequirements() {
    if (userManagementProfileReq.readyState == 4 && userProfilereq.readyState == 4) {


        var userProfileData = JSON.parse(userProfilereq.responseText);
        var userProfile = userProfileData['UserInfo'];

        if (userProfile['userTypeDescription'] == "Administrator") {
            var accessSec = "<div class=\"input-group mb-3\"><div class=\"input-group-prepend\"><label class=\"input-group-text\"for=\"searchGroupSelect01\">Access Level</label></div><select class=\"custom-select\" id=\"selectUserAccess\"><option selected=\"\">Choose User Access Level...</option><option value=\"1\">Administrator</option><option value=\"2\">User</option><option value=\"3\">Guest</option><option value=\"4\">Wallboard</option></select></div>";
            var activeSec = "<div class=\"input-group mb-3\"><div class=\"input-group-prepend\"><label class=\"input-group-text\"for=\"searchGroupSelect01\">User Active</label></div><select class=\"custom-select\" id=\"selectUserActive\"><option selected=\"\">Choose If User Is Active...</option><option value=\"1\">Yes</option><option value=\"0\">No</option></select></div>";
            document.getElementById("updateAccessSection").innerHTML = accessSec;
            document.getElementById("updateActiveSection").innerHTML = activeSec;

        } else {
            var accessSec = "";
            var activeSec = "";
            document.getElementById("updateAccessSection").innerHTML = accessSec;
            document.getElementById("updateActiveSection").innerHTML = activeSec;
        }
    }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                       RELOAD CUSTOM FILTER  - RUN CUSTOM SEARCH ()
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
function reloadCustomSearch(selectVodacomSiteVar, selectSourceVar, selectSeverityVar, selectServerVar, selectStatusVar, selectDirectSiteVar, selectAlarmIDVar) {
    reloadTableManager(false);
    var filterArray = [];


    var selectVodacomSite = selectVodacomSiteVar;
    var selectSource = selectSourceVar;
    var selectSeverity = selectSeverityVar;
    var selectServer = selectServerVar;
    var selectStatus = selectStatusVar;
    var selectDirectSite = selectDirectSiteVar;
    var selectAlarmID = selectAlarmIDVar;

    filterArray.push(selectVodacomSite);
    filterArray.push(selectSource);
    filterArray.push(selectSeverity);
    filterArray.push(selectServer);
    filterArray.push(selectStatus);
    filterArray.push(selectDirectSite);
    filterArray.push(selectAlarmID);

    reloadTableManager(true, "customAlarms", filterArray);


    if (selectServer == "All") {
        var dirQuery = createQuery(selectSource, selectSeverity, selectDirectSite, selectStatus, selectAlarmID);
        var vodaQuery = createQuery(selectSource, selectSeverity, selectVodacomSite, selectStatus, selectAlarmID);
        var remoteVodaEXT = "?remotehost=https://41.0.203.210:8443/InovoCentralMonitorClient/MonitorData&action=runopenquery&query=";

        receiveCustomDirectReq.open("POST", serverURL + "/MonitorData", true);
        receiveCustomVodaReq.open("GET", serverURL + "/MonitorData" + remoteVodaEXT + vodaQuery, true);

        receiveCustomDirectReq.onreadystatechange = getCustomSearchResult;
        receiveCustomVodaReq.onreadystatechange = getCustomSearchResult;
        // set the Request Header
        receiveCustomDirectReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        receiveCustomVodaReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        //Make the actual request.
        receiveCustomDirectReq.send("action=runopenquery&query=" + dirQuery);
        receiveCustomVodaReq.send();

    }
    else if (selectServer == "Direct") {
        var dirQuery = createQuery(selectSource, selectSeverity, selectDirectSite, selectStatus, selectAlarmID);


        receiveCustomDirectReq.open("POST", serverURL + "/MonitorData", true);

        receiveCustomDirectReq.onreadystatechange = getCustomDirectSearchResult;
        // set the Request Header
        receiveCustomDirectReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        //Make the actual request.
        receiveCustomDirectReq.send("action=runopenquery&query=" + dirQuery);

    }
    else if (selectServer == "Vodacom") {
        var vodaQuery = createQuery(selectSource, selectSeverity, selectVodacomSite, selectStatus, selectAlarmID);

        var remoteVodaEXT = "?remotehost=https://41.0.203.210:8443/InovoCentralMonitorClient/MonitorData&action=runopenquery&query=";

        receiveCustomVodaReq.open("GET", serverURL + "/MonitorData" + remoteVodaEXT + vodaQuery, true);

        receiveCustomVodaReq.onreadystatechange = getCustomVodacomSearchResult;
        // set the Request Header
        receiveCustomVodaReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        //Make the actual request.
        receiveCustomVodaReq.send();
    }
    else {
        alert("Please ensure you select Server to query");
    }

}
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                       CUSTOM FILTER  - RUN CUSTOM SEARCH
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
function runCustomSearch() {
    reloadTableManager(false);

    var filterArray = [];

    var selectVodacomSite = $('#selectSearchVodacom').val();
    // var selectAlarmID = parseInt($('#selectSearchAlarmId').val());
    var selectAlarmID = $('#selectSearchAlarmId').val();
    var selectSource = $('#selectSearchSource').val();
    var selectSeverity = $('#selectSearchSeverity').val();
    var selectServer = $('#selectSearchServer').val();
    var selectStatus = $('#selectSearchStatus').val();
    var selectDirectSite = $('#selectSearchDirectClient').val();

    filterArray.push(selectVodacomSite);
    filterArray.push(selectSource);
    filterArray.push(selectSeverity);
    filterArray.push(selectServer);
    filterArray.push(selectStatus);
    filterArray.push(selectDirectSite);
    filterArray.push(selectAlarmID);
    reloadTableManager(true, "customAlarms", filterArray);


    if (selectServer == "All") {
        var dirQuery = createQuery(selectSource, selectSeverity, selectDirectSite, selectStatus, selectAlarmID);
        var vodaQuery = createQuery(selectSource, selectSeverity, selectVodacomSite, selectStatus, selectAlarmID);
        var remoteVodaEXT = "?remotehost=https://41.0.203.210:8443/InovoCentralMonitorClient/MonitorData&action=runopenquery&query=";

        receiveCustomDirectReq.open("POST", serverURL + "/MonitorData", true);
        receiveCustomVodaReq.open("GET", serverURL + "/MonitorData" + remoteVodaEXT + vodaQuery, true);

        receiveCustomDirectReq.onreadystatechange = getCustomSearchResult;
        receiveCustomVodaReq.onreadystatechange = getCustomSearchResult;
        // set the Request Header
        receiveCustomDirectReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        receiveCustomVodaReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        //Make the actual request.
        receiveCustomDirectReq.send("action=runopenquery&query=" + dirQuery);
        receiveCustomVodaReq.send();

    }
    else if (selectServer == "Direct") {
        var dirQuery = createQuery(selectSource, selectSeverity, selectDirectSite, selectStatus, selectAlarmID);


        receiveCustomDirectReq.open("POST", serverURL + "/MonitorData", true);

        receiveCustomDirectReq.onreadystatechange = getCustomDirectSearchResult;
        // set the Request Header
        receiveCustomDirectReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        //Make the actual request.
        receiveCustomDirectReq.send("action=runopenquery&query=" + dirQuery);

    }
    else if (selectServer == "Vodacom") {
        var vodaQuery = createQuery(selectSource, selectSeverity, selectVodacomSite, selectStatus, selectAlarmID);

        var remoteVodaEXT = "?remotehost=https://41.0.203.210:8443/InovoCentralMonitorClient/MonitorData&action=runopenquery&query=";

        receiveCustomVodaReq.open("GET", serverURL + "/MonitorData" + remoteVodaEXT + vodaQuery, true);

        receiveCustomVodaReq.onreadystatechange = getCustomVodacomSearchResult;
        // set the Request Header
        receiveCustomVodaReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        //Make the actual request.
        receiveCustomVodaReq.send();
    }
    else {
        alert("Please ensure you select Server to query");
    }

}

// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                         CUSTOM SEARCH RESULT
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------

function getCustomSearchResult() {

    var txtData = "", rwData;

    var vodaServerCheck;
    var inovoServerCheck;
    var serverStatusInovo;
    var serverStatusVoda;



    //Check to see if the XmlHttpRequests state is finished.
    if (receiveCustomDirectReq.readyState == 4 && receiveCustomVodaReq.readyState == 4) {

        var dateNowCPTS = new Date();
        dateNowCPTS = dateNowCPTS.getFullYear() + '-' +
            ('00' + (dateNowCPTS.getMonth() + 1)).slice(-2) + '-' +
            ('00' + dateNowCPTS.getDate()).slice(-2) + ' ' +
            ('00' + dateNowCPTS.getHours()).slice(-2) + ':' +
            ('00' + dateNowCPTS.getMinutes()).slice(-2) + ':' +
            ('00' + dateNowCPTS.getSeconds()).slice(-2);


        var CPTS = document.getElementById("CopyrightAndTimestamp");
        var footerText = "Copyright INOVO, All Rights Reserved &copy; 2021 - INOVO Central Monitoring Dashboard (Last Updated: " + dateNowCPTS + ")";



        var aNewTableArr = [];
        var finalTableArr = [];
        var sevArrError = [];
        var sevArrWarning = []
        if (receiveCustomDirectReq.responseText.indexOf("queryresult") == 2) {
            var dbData = JSON.parse(receiveCustomDirectReq.responseText);
            arrayAlarm = dbData['queryresult'];

            inovoServerCheck = true;

        } else {
            inovoServerCheck = false;
        }


        if (receiveCustomVodaReq.responseText.indexOf("queryresult") == 2) {

            var dbVodaData = JSON.parse(receiveCustomVodaReq.responseText);
            arrayVodaAlarm = dbVodaData['queryresult'];

            vodaServerCheck = true;

        }
        else {
            vodaServerCheck = false
        }



        if (inovoServerCheck && vodaServerCheck) {

            serverStatusInovo = inovoOkayStat;
            //serverStatusVoda = vodaOkayStat;


            rwData = "<table class=\"table\"><thead style=\"background-color: rgb(255, 255, 255);\">" + "<tr><th style=\"color: rgb(0,0,0);\">Client Name</th><th style=\"color: rgb(0,0,0);\">Client</th>" + "<th style=\"color: rgb(0,0,0);\">Host Name</th><th style=\"color: black;\">Message</th><th style=\"color: black;\">Status</th><th style=\"color: black;\">Source</th><th style=\"color: black;\">First Occurrence</th><th style=\"color: black;\">Updated At</th></tr></thead><tbody>";

            txtData += rwData;



            //adding server type to each object
            for (var iAlarms = 0; iAlarms < arrayAlarm.length; iAlarms++) {
                arrayAlarm[iAlarms][nameofServer] = directServerName;
                aNewTableArr.push(arrayAlarm[iAlarms]);
            }
            for (var iAlarms = 0; iAlarms < arrayVodaAlarm.length; iAlarms++) {
                arrayVodaAlarm[iAlarms][nameofServer] = vodaServerName;
                aNewTableArr.push(arrayVodaAlarm[iAlarms]);
            }

            // --------------------------------------------------------------------  
            // ----------------------------  Split to new arrays based on severity
            // --------------------------------------------------------------------
            for (var iAlarms = 0; iAlarms < aNewTableArr.length; iAlarms++) {
                var alarmSev = aNewTableArr[iAlarms]["severity"];
                if (alarmSev == "Error") {
                    sevArrError.push(aNewTableArr[iAlarms]);
                }
                else if (alarmSev == "Warning") {
                    sevArrWarning.push(aNewTableArr[iAlarms]);
                }
            }



            // Sort the new Array
            sevArrError.sort(function (a, b) {
                var c = new Date(a.created);
                var d = new Date(b.created);
                return d - c;
            });
            sevArrWarning.sort(function (a, b) {
                var c = new Date(a.created);
                var d = new Date(b.created);
                return d - c;
            });

            for (let i = 0; i < sevArrError.length; i++) {
                finalTableArr.push(sevArrError[i]);

            }

            for (let i = 0; i < sevArrWarning.length; i++) {
                finalTableArr.push(sevArrWarning[i]);

            }



            for (var iAlarm = 0; iAlarm < finalTableArr.length; iAlarm++) {
                var rowData = finalTableArr[iAlarm];
                var message = "";
                if (rowData['message'].length > 60) {
                    message = rowData['message'].substring(0, 60) + "...";
                } else {
                    message = rowData['message'];
                }

                rwData =
                    "<tr id=\"" + rowData['severity'] + "\"><td>"
                    + rowData['sitename']
                    + "</td><td>" + rowData['serverName']
                    + "</td><td>" + rowData['hostname']
                    + "</td><td style=\"text-align: left;\">" + rowData['message']
                    + "</td><td>" + rowData['currentstatus']
                    + "</td><td>" + rowData['source']
                    + "</td><td>" + rowData['created']
                    + "</td><td>" + rowData['updated']
                    // + "</td><td class=\"table-cell-custom\">" CORRECT WAY
                    // + "<a class=\"graphModalPress\" data-toggle=\"modal\" data-target=\".bd-example-modal-lg\"  onclick=\"getAlarmModal(" + iAlarm + "); \" title=\"Click for More Info\">"
                    // + "<i class=\"far fa-chart-bar\" style=\"font-size: 25px;color: rgb(5,51,103);\"></i>"
                    // + "</a>"
                    + "</td><td class=\"table-cell-custom\">"
                    + "<a class=\"infoModalPress\" data-toggle=\"modal\" data-target=\".bd-example-modal-lg\"  onclick=\"getAlarmModal(" + iAlarm + "); \" title=\"Click for More Info\">"
                    + "<i class=\"fas fa-ellipsis-v\" style=\"font-size: 25px;color: rgb(4,4,4);\"></i>"
                    + "</a>"
                    + "</td></tr>";

                txtData += rwData;

            }

            txtData += "</tbody></table>";
            document.getElementById("datatable").innerHTML = txtData;
            // document.getElementById("ServerCheckStatusInovo").innerHTML = serverStatusInovo;
            // document.getElementById("ServerCheckStatusVoda").innerHTML = serverStatusVoda;
            CPTS.innerHTML = footerText;
        }
        else if (inovoServerCheck && !vodaServerCheck) {

            serverStatusInovo = inovoOkayStat
            //serverStatusVoda = vodaFailStat;

            rwData = "<table class=\"table\"><thead style=\"background-color: rgb(255, 255, 255);\">" + "<tr><th style=\"color: rgb(0,0,0);\">Client Name</th><th style=\"color: rgb(0,0,0);\">Client</th>" + "<th style=\"color: rgb(0,0,0);\">Host Name</th><th style=\"color: black;\">Message</th><th style=\"color: black;\">Status</th><th style=\"color: black;\">Source</th><th style=\"color: black;\">First Occurrence</th><th style=\"color: black;\">Updated At</th></tr></thead><tbody>";

            txtData += rwData;



            //adding server type to each object
            for (var iAlarms = 0; iAlarms < arrayAlarm.length; iAlarms++) {
                arrayAlarm[iAlarms][nameofServer] = directServerName;
                aNewTableArr.push(arrayAlarm[iAlarms]);
            }

            // --------------------------------------------------------------------  
            // ----------------------------  Split to new arrays based on severity
            // --------------------------------------------------------------------
            for (var iAlarms = 0; iAlarms < aNewTableArr.length; iAlarms++) {
                var alarmSev = aNewTableArr[iAlarms]["severity"];
                if (alarmSev == "Error") {
                    sevArrError.push(aNewTableArr[iAlarms]);
                }
                else if (alarmSev == "Warning") {
                    sevArrWarning.push(aNewTableArr[iAlarms]);
                }
            }



            // Sort the new Array
            sevArrError.sort(function (a, b) {
                var c = new Date(a.created);
                var d = new Date(b.created);
                return d - c;
            });
            sevArrWarning.sort(function (a, b) {
                var c = new Date(a.created);
                var d = new Date(b.created);
                return d - c;
            });

            for (let i = 0; i < sevArrError.length; i++) {
                finalTableArr.push(sevArrError[i]);

            }

            for (let i = 0; i < sevArrWarning.length; i++) {
                finalTableArr.push(sevArrWarning[i]);

            }



            for (var iAlarm = 0; iAlarm < finalTableArr.length; iAlarm++) {
                var rowData = finalTableArr[iAlarm];

                rwData =
                    "<tr id=\"" + rowData['severity'] + "\"><td>"
                    + rowData['sitename']
                    + "</td><td>" + rowData['serverName']
                    + "</td><td>" + rowData['hostname']
                    + "</td><td style=\"text-align: left;\">" + rowData['message']
                    + "</td><td>" + rowData['currentstatus']
                    + "</td><td>" + rowData['source']
                    + "</td><td>" + rowData['created']
                    + "</td><td>" + rowData['updated']
                    // + "</td><td class=\"table-cell-custom\">" CORRECT WAY
                    // + "<a class=\"graphModalPress\" data-toggle=\"modal\" data-target=\".bd-example-modal-lg\"  onclick=\"getAlarmModal(" + iAlarm + "); \" title=\"Click for More Info\">"
                    // + "<i class=\"far fa-chart-bar\" style=\"font-size: 25px;color: rgb(5,51,103);\"></i>"
                    // + "</a>"
                    + "</td><td class=\"table-cell-custom\">"
                    + "<a class=\"infoModalPress\" data-toggle=\"modal\" data-target=\".bd-example-modal-lg\"  onclick=\"getAlarmModal(" + iAlarm + "); \" title=\"Click for More Info\">"
                    + "<i class=\"fas fa-ellipsis-v\" style=\"font-size: 25px;color: rgb(4,4,4);\"></i>"
                    + "</a>"
                    + "</td></tr>";

                txtData += rwData;

            }

            txtData += "</tbody></table>";
            document.getElementById("datatable").innerHTML = txtData;
            // document.getElementById("ServerCheckStatusInovo").innerHTML = serverStatusInovo;
            // document.getElementById("ServerCheckStatusVoda").innerHTML = serverStatusVoda;
            CPTS.innerHTML = footerText;

        }
        else if (!inovoServerCheck && vodaServerCheck) {

            serverStatusInovo = inovoFailStat;
            //serverStatusVoda = vodaOkayStat;

            rwData = "<table class=\"table\"><thead style=\"background-color: rgb(255, 255, 255);\">" + "<tr><th style=\"color: rgb(0,0,0);\">Client Name</th><th style=\"color: rgb(0,0,0);\">Client</th>" + "<th style=\"color: rgb(0,0,0);\">Host Name</th><th style=\"color: black;\">Message</th><th style=\"color: black;\">Status</th><th style=\"color: black;\">Source</th><th style=\"color: black;\">First Occurrence</th><th style=\"color: black;\">Updated At</th></tr></thead><tbody>";

            txtData += rwData;



            //adding server type to each object
            // for (var iAlarms = 0; iAlarms < arrayAlarm.length; iAlarms++) {
            //     arrayAlarm[iAlarms][nameofServer] = directServerName;
            //     aNewTableArr.push(arrayAlarm[iAlarms]);
            // }
            for (var iAlarms = 0; iAlarms < arrayVodaAlarm.length; iAlarms++) {
                arrayVodaAlarm[iAlarms][nameofServer] = vodaServerName;
                aNewTableArr.push(arrayVodaAlarm[iAlarms]);
            }

            // --------------------------------------------------------------------  
            // ----------------------------  Split to new arrays based on severity
            // --------------------------------------------------------------------
            for (var iAlarms = 0; iAlarms < aNewTableArr.length; iAlarms++) {
                var alarmSev = aNewTableArr[iAlarms]["severity"];
                if (alarmSev == "Error") {
                    sevArrError.push(aNewTableArr[iAlarms]);
                }
                else if (alarmSev == "Warning") {
                    sevArrWarning.push(aNewTableArr[iAlarms]);
                }
            }



            // Sort the new Array
            sevArrError.sort(function (a, b) {
                var c = new Date(a.created);
                var d = new Date(b.created);
                return d - c;
            });
            sevArrWarning.sort(function (a, b) {
                var c = new Date(a.created);
                var d = new Date(b.created);
                return d - c;
            });

            for (let i = 0; i < sevArrError.length; i++) {
                finalTableArr.push(sevArrError[i]);

            }

            for (let i = 0; i < sevArrWarning.length; i++) {
                finalTableArr.push(sevArrWarning[i]);

            }



            for (var iAlarm = 0; iAlarm < finalTableArr.length; iAlarm++) {
                var rowData = finalTableArr[iAlarm];

                rwData =
                    "<tr id=\"" + rowData['severity'] + "\"><td>"
                    + rowData['sitename']
                    + "</td><td>" + rowData['serverName']
                    + "</td><td>" + rowData['hostname']
                    + "</td><td style=\"text-align: left;\">" + rowData['message']
                    + "</td><td>" + rowData['currentstatus']
                    + "</td><td>" + rowData['source']
                    + "</td><td>" + rowData['created']
                    + "</td><td>" + rowData['updated']
                    // + "</td><td class=\"table-cell-custom\">" CORRECT WAY
                    // + "<a class=\"graphModalPress\" data-toggle=\"modal\" data-target=\".bd-example-modal-lg\"  onclick=\"getAlarmModal(" + iAlarm + "); \" title=\"Click for More Info\">"
                    // + "<i class=\"far fa-chart-bar\" style=\"font-size: 25px;color: rgb(5,51,103);\"></i>"
                    // + "</a>"
                    + "</td><td class=\"table-cell-custom\">"
                    + "<a class=\"infoModalPress\" data-toggle=\"modal\" data-target=\".bd-example-modal-lg\"  onclick=\"getAlarmModal(" + iAlarm + "); \" title=\"Click for More Info\">"
                    + "<i class=\"fas fa-ellipsis-v\" style=\"font-size: 25px;color: rgb(4,4,4);\"></i>"
                    + "</a>"
                    + "</td></tr>";

                txtData += rwData;

            }

            txtData += "</tbody></table>";
            document.getElementById("datatable").innerHTML = txtData;
            // document.getElementById("ServerCheckStatusInovo").innerHTML = serverStatusInovo;
            // document.getElementById("ServerCheckStatusVoda").innerHTML = serverStatusVoda;
            CPTS.innerHTML = footerText;
        }
        else if (!inovoServerCheck && !vodaServerCheck) {

            serverStatusInovo = inovoFailStat;
            //serverStatusVoda = vodaFailStat;;
            rwData = "<table class=\"table\"><thead style=\"background-color: rgb(255, 255, 255);\">" + "<tr><th style=\"color: rgb(0,0,0);\">Client Name</th><th style=\"color: rgb(0,0,0);\">Client</th>" + "<th style=\"color: rgb(0,0,0);\">Host Name</th><th style=\"color: black;\">Message</th><th style=\"color: black;\">Status</th><th style=\"color: black;\">Source</th><th style=\"color: black;\">First Occurrence</th><th style=\"color: black;\">Updated At</th></tr></thead><tbody>";

            txtData += rwData;


            txtData += "</tbody></table>";
            document.getElementById("datatable").innerHTML = txtData;
            // document.getElementById("ServerCheckStatusInovo").innerHTML = serverStatusInovo;
            // document.getElementById("ServerCheckStatusVoda").innerHTML = serverStatusVoda;
            CPTS.innerHTML = footerText;
        }
    }

}

// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                         CUSTOM DIRECT SEARCH RESULT
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
function getCustomDirectSearchResult() {
    var txtData = "", rwData;

    // var vodaServerCheck;
    var inovoServerCheck;
    var serverStatusInovo;


    //Check to see if the XmlHttpRequests state is finished.
    if (receiveCustomDirectReq.readyState == 4) {

        var dateNowCPTS = new Date();
        dateNowCPTS = dateNowCPTS.getFullYear() + '-' +
            ('00' + (dateNowCPTS.getMonth() + 1)).slice(-2) + '-' +
            ('00' + dateNowCPTS.getDate()).slice(-2) + ' ' +
            ('00' + dateNowCPTS.getHours()).slice(-2) + ':' +
            ('00' + dateNowCPTS.getMinutes()).slice(-2) + ':' +
            ('00' + dateNowCPTS.getSeconds()).slice(-2);


        var CPTS = document.getElementById("CopyrightAndTimestamp");
        var footerText = "Copyright INOVO, All Rights Reserved &copy; 2021 - INOVO Central Monitoring Dashboard (Last Updated: " + dateNowCPTS + ")";



        var aNewTableArr = [];
        var finalTableArr = [];
        var sevArrError = [];
        var sevArrWarning = []

        //Here we should have some JSON data !!
        if (receiveCustomDirectReq.responseText.indexOf("queryresult") == 2) {
            var dbData = JSON.parse(receiveCustomDirectReq.responseText);
            arrayAlarm = dbData['queryresult'];

            inovoServerCheck = true;

        } else {
            inovoServerCheck = false;
        }

        if (inovoServerCheck) {

            serverStatusInovo = inovoOkayStat;

            //add header for table

            rwData = "<table class=\"table\"><thead style=\"background-color: rgb(255, 255, 255);\">" + "<tr><th style=\"color: rgb(0,0,0);\">Client Name</th><th style=\"color: rgb(0,0,0);\">Client</th>" + "<th style=\"color: rgb(0,0,0);\">Host Name</th><th style=\"color: black;\">Message</th><th style=\"color: black;\">Status</th><th style=\"color: black;\">Source</th><th style=\"color: black;\">First Occurrence</th><th style=\"color: black;\">Updated At</th></tr></thead><tbody>";

            txtData += rwData;



            //adding server type to each object
            for (var iAlarms = 0; iAlarms < arrayAlarm.length; iAlarms++) {
                arrayAlarm[iAlarms][nameofServer] = directServerName;
                aNewTableArr.push(arrayAlarm[iAlarms]);
            }

            // --------------------------------------------------------------------  
            // ----------------------------  Split to new arrays based on severity
            // --------------------------------------------------------------------
            for (var iAlarms = 0; iAlarms < aNewTableArr.length; iAlarms++) {
                var alarmSev = aNewTableArr[iAlarms]["severity"];
                if (alarmSev == "Error") {
                    sevArrError.push(aNewTableArr[iAlarms]);
                }
                else if (alarmSev == "Warning") {
                    sevArrWarning.push(aNewTableArr[iAlarms]);
                }
            }



            // Sort the new Array
            sevArrError.sort(function (a, b) {
                var c = new Date(a.created);
                var d = new Date(b.created);
                return d - c;
            });
            sevArrWarning.sort(function (a, b) {
                var c = new Date(a.created);
                var d = new Date(b.created);
                return d - c;
            });

            for (let i = 0; i < sevArrError.length; i++) {
                finalTableArr.push(sevArrError[i]);

            }

            for (let i = 0; i < sevArrWarning.length; i++) {
                finalTableArr.push(sevArrWarning[i]);

            }



            for (var iAlarm = 0; iAlarm < finalTableArr.length; iAlarm++) {
                var rowData = finalTableArr[iAlarm];

                rwData =
                    "<tr id=\"" + rowData['severity'] + "\"><td>"
                    + rowData['sitename']
                    + "</td><td>" + rowData['serverName']
                    + "</td><td>" + rowData['hostname']
                    + "</td><td style=\"text-align: left;\">" + rowData['message']
                    + "</td><td>" + rowData['currentstatus']
                    + "</td><td>" + rowData['source']
                    + "</td><td>" + rowData['created']
                    + "</td><td>" + rowData['updated']
                    // + "</td><td class=\"table-cell-custom\">" CORRECT WAY
                    // + "<a class=\"graphModalPress\" data-toggle=\"modal\" data-target=\".bd-example-modal-lg\"  onclick=\"getAlarmModal(" + iAlarm + "); \" title=\"Click for More Info\">"
                    // + "<i class=\"far fa-chart-bar\" style=\"font-size: 25px;color: rgb(5,51,103);\"></i>"
                    // + "</a>"
                    + "</td><td class=\"table-cell-custom\">"
                    + "<a class=\"infoModalPress\" data-toggle=\"modal\" data-target=\".bd-example-modal-lg\"  onclick=\"getCustomDirectAlarmModal(" + iAlarm + "); \" title=\"Click for More Info\">"
                    + "<i class=\"fas fa-ellipsis-v\" style=\"font-size: 25px;color: rgb(4,4,4);\"></i>"
                    + "</a>"
                    + "</td></tr>";

                txtData += rwData;

            }

            txtData += "</tbody></table>";
            document.getElementById("datatable").innerHTML = txtData;
            // document.getElementById("ServerCheckStatusInovo").innerHTML = serverStatusInovo;
            CPTS.innerHTML = footerText;

        }
        else if (!inovoServerCheck) {

            serverStatusInovo = inovoFailStat;
            rwData = "<table class=\"table\"><thead style=\"background-color: rgb(255, 255, 255);\">" + "<tr><th style=\"color: rgb(0,0,0);\">Client Name</th><th style=\"color: rgb(0,0,0);\">Client</th>" + "<th style=\"color: rgb(0,0,0);\">Host Name</th><th style=\"color: black;\">Message</th><th style=\"color: black;\">Status</th><th style=\"color: black;\">Source</th><th style=\"color: black;\">First Occurrence</th><th style=\"color: black;\">Updated At</th></tr></thead><tbody>";

            txtData += rwData;


            txtData += "</tbody></table>";
            document.getElementById("datatable").innerHTML = txtData;
            // document.getElementById("ServerCheckStatusInovo").innerHTML = serverStatusInovo;
            CPTS.innerHTML = footerText;
        }
    }

}
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                         CUSTOM VODA SEARCH RESULT
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
// function getCustomVodacomSearchResult() {

//     var txtData = "", rwData;
//     var vodaServerCheck;
//     var serverStatusVoda;

//     //Check to see if the XmlHttpRequests state is finished.
//     if (receiveCustomVodaReq.readyState == 4) {


//         var aNewTableArr = [];

//         //Here we should have some JSON data !!

//         if (receiveCustomVodaReq.responseText.indexOf("queryresult") == 2) {

//             var dbVodaData = JSON.parse(receiveCustomVodaReq.responseText);
//             arrayVodaAlarm = dbVodaData['queryresult'];

//             vodaServerCheck = true;

//         }
//         else {
//             vodaServerCheck = false
//         }

//         //add header for table
//         if (vodaServerCheck) {

//             //serverStatusVoda = vodaOkayStat;

//             rwData = "<table class=\"table\"><thead style=\"background-color: rgb(255, 255, 255);\">" + "<tr><th style=\"color: rgb(0,0,0);\">Client Name</th><th style=\"color: rgb(0,0,0);\">Client</th>" + "<th style=\"color: rgb(0,0,0);\">Host Name</th><th style=\"color: black;\">Message</th><th style=\"color: black;\">Status</th><th style=\"color: black;\">Source</th><th style=\"color: black;\">First Occurrence</th><th style=\"color: black;\">Updated At</th></tr></thead><tbody>";

//             txtData += rwData;



//             //adding server type to each object
//             for (var iAlarms = 0; iAlarms < arrayVodaAlarm.length; iAlarms++) {
//                 arrayVodaAlarm[iAlarms][nameofServer] = vodaServerName;
//                 aNewTableArr.push(arrayVodaAlarm[iAlarms]);
//             }

//             // Sort the new Array
//             aNewTableArr.sort(function (a, b) {
//                 var c = new Date(a.created);
//                 var d = new Date(b.created);
//                 return d - c;
//             });


//             for (var iAlarm = 0; iAlarm < aNewTableArr.length; iAlarm++) {
//                 var rowData = aNewTableArr[iAlarm];

//                 rwData =
//                     "<tr id=\"" + rowData['severity'] + "\"><td>"
//                     + rowData['sitename']
//                     + "</td><td>" + rowData['serverName']
//                     + "</td><td>" + rowData['hostname']
//                     + "</td><td style=\"text-align: left;\">" + rowData['message']
//                     + "</td><td>" + rowData['currentstatus']
//                     + "</td><td>" + rowData['source']
//                     + "</td><td>" + rowData['created']
//                     + "</td><td>" + rowData['updated']
//                     // + "</td><td class=\"table-cell-custom\">" CORRECT WAY
//                     // + "<a class=\"graphModalPress\" data-toggle=\"modal\" data-target=\".bd-example-modal-lg\"  onclick=\"getAlarmModal(" + iAlarm + "); \" title=\"Click for More Info\">"
//                     // + "<i class=\"far fa-chart-bar\" style=\"font-size: 25px;color: rgb(5,51,103);\"></i>"
//                     // + "</a>"
//                     + "</td><td class=\"table-cell-custom\">"
//                     + "<a class=\"infoModalPress\" data-toggle=\"modal\" data-target=\".bd-example-modal-lg\"  onclick=\"getCustomVodacomAlarmModal(" + iAlarm + "); \" title=\"Click for More Info\">"
//                     + "<i class=\"fas fa-ellipsis-v\" style=\"font-size: 25px;color: rgb(4,4,4);\"></i>"
//                     + "</a>"
//                     + "</td></tr>";

//                 txtData += rwData;

//             }

//             txtData += "</tbody></table>";
//             document.getElementById("datatable").innerHTML = txtData;
//             document.getElementById("ServerCheckStatusVoda").innerHTML = serverStatusVoda;
//             CPTS.innerHTML = footerText;

//         }
//         else if (!vodaServerCheck) {

//             //serverStatusVoda = vodaFailStat;;
//             rwData = "<table class=\"table\"><thead style=\"background-color: rgb(255, 255, 255);\">" + "<tr><th style=\"color: rgb(0,0,0);\">Client Name</th><th style=\"color: rgb(0,0,0);\">Client</th>" + "<th style=\"color: rgb(0,0,0);\">Host Name</th><th style=\"color: black;\">Message</th><th style=\"color: black;\">Status</th><th style=\"color: black;\">Source</th><th style=\"color: black;\">First Occurrence</th><th style=\"color: black;\">Updated At</th></tr></thead><tbody>";

//             txtData += rwData;


//             txtData += "</tbody></table>";
//             document.getElementById("datatable").innerHTML = txtData;
//             document.getElementById("ServerCheckStatusVoda").innerHTML = serverStatusVoda;
//             CPTS.innerHTML = footerText;
//         }

//     }

// }

// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                         CUSTOM SEARCH MODAL FUNCTION
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
function openCustomSearchFilter() {
    getCustomAlarmIDFilterList();
    getCustomDirectSiteFilterList();
    //getCustomVodacomSiteFilterList();
    getCustomSourceFilterList();
    getCustomServerFilterList();
    getCustomSeverityFilterList();
    getCustomStatusFilterList();
}



// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                          CUSTOM DIRECT SITE FILTER
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------


function getDirectSiteList() {
    var query = "SELECT sitename, id FROM InovoMonitor.tblSites WHERE InovoMonitor.tblSites.sitename !='' ORDER BY InovoMonitor.tblSites.sitename asc";
    // var remoteVodaEXT = "?remotehost=https://41.0.203.210:8443/InovoCentralMonitorClient/MonitorData&action=runopenquery&query=";

    receiveDirectSiteFilterReq.open("POST", serverURL + "/MonitorData", true);
    //Set the function that will be called when the XmlHttpRequest objects state changes.
    receiveDirectSiteFilterReq.onreadystatechange = getDirectSiteListResult;
    receiveDirectSiteFilterReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    //Make request for site filter.
    // var query2 = "SELECT * FROM InovoMonitor.tblAlarms t WHERE currentstatus<>'RESET'";
    receiveDirectSiteFilterReq.send("action=runopenquery&query=" + query);


}

// DIRECT CLIENT FILTER LIST
function getDirectSiteListResult() {

    //Check to see if the XmlHttpRequests state is finished.
    if (receiveDirectSiteFilterReq.readyState == 4) {

        //Here we should have some JSON data !!
        var dbData = JSON.parse(receiveDirectSiteFilterReq.responseText);
        arrayAlarm = dbData['queryresult'];


        // filData = "<div id=\"selectCustomClientFilter\"><div class=\"input-group mb-3\"><div class=\"input-group-prepend\"><label class=\"input-group-text\" for=\"searchGroupSelect01\">Direct Client Filter</label></div><select id=\"selectSearchDirectClient\" class=\"custom-select\" ><option selected>Choose Direct Client...</option>";
        // siteTxtData += filData;

        directSiteList = arrayAlarm;

    }


}

function getCustomDirectSiteFilterList() {
    var query = "SELECT sitename FROM InovoMonitor.tblSites WHERE InovoMonitor.tblSites.sitename !='' ORDER BY InovoMonitor.tblSites.sitename asc";
    // var remoteVodaEXT = "?remotehost=https://41.0.203.210:8443/InovoCentralMonitorClient/MonitorData&action=runopenquery&query=";

    receiveDirectSiteFilterReq.open("POST", serverURL + "/MonitorData", true);
    //Set the function that will be called when the XmlHttpRequest objects state changes.
    receiveDirectSiteFilterReq.onreadystatechange = getCustomDirectSiteFilterListResult;
    receiveDirectSiteFilterReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    //Make request for site filter.
    // var query2 = "SELECT * FROM InovoMonitor.tblAlarms t WHERE currentstatus<>'RESET'";
    receiveDirectSiteFilterReq.send("action=runopenquery&query=" + query);


}

// DIRECT CLIENT FILTER LIST
function getCustomDirectSiteFilterListResult() {
    var siteTxtData = "", filData;


    //Check to see if the XmlHttpRequests state is finished.
    if (receiveDirectSiteFilterReq.readyState == 4) {

        //Here we should have some JSON data !!
        var dbData = JSON.parse(receiveDirectSiteFilterReq.responseText);
        arrayAlarm = dbData['queryresult'];


        filData = "<div id=\"selectCustomClientFilter\"><div class=\"input-group mb-3\"><div class=\"input-group-prepend\"><label class=\"input-group-text\" for=\"searchGroupSelect01\">Direct Client Filter</label></div><select id=\"selectSearchDirectClient\" class=\"custom-select\" ><option selected>Choose Direct Client...</option>";
        siteTxtData += filData;


        for (var iAlarm = 0; iAlarm < arrayAlarm.length; iAlarm++) {
            var rowData = arrayAlarm[iAlarm];

            filData = "<option id=\"" + rowData['sitename'] + "\">" + rowData['sitename'] + "</option>";

            siteTxtData += filData;
        }
        siteTxtData += "</select></div></div> ";
        document.getElementById("searchGroupClientSelect").innerHTML = siteTxtData;
    }


}

// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                      CUSTOM VODACOM SITE FILTER
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------

// function getVodacomSiteList() {
//     var query = "SELECT sitename, id FROM InovoMonitor.tblSites WHERE InovoMonitor.tblSites.sitename !='' ORDER BY InovoMonitor.tblSites.sitename asc";
//     var remoteVodaEXT = "?remotehost=https://41.0.203.210:8443/InovoCentralMonitorClient/MonitorData&action=runopenquery&query=";


//     receiveVodacomSiteFilterReq.open("GET", serverURL + "/MonitorData" + remoteVodaEXT + query, true);
//     //Set the function that will be called when the XmlHttpRequest objects state changes.
//     receiveVodacomSiteFilterReq.onreadystatechange = getVodacomSiteListResult;
//     receiveVodacomSiteFilterReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

//     //Make request for site filter.
//     // var query2 = "SELECT * FROM InovoMonitor.tblAlarms t WHERE currentstatus<>'RESET'";
//     receiveVodacomSiteFilterReq.send();


// }

// // VODACOM CLIENT FILTER LIST
// function getVodacomSiteListResult() {
//     var siteTxtData = "", filData;


//     //Check to see if the XmlHttpRequests state is finished.
//     if (receiveVodacomSiteFilterReq.readyState == 4) {

//         //Here we should have some JSON data !!
//         var dbData = JSON.parse(receiveVodacomSiteFilterReq.responseText);
//         arrayAlarm = dbData['queryresult'];

//         vodacomSiteList = arrayAlarm;

//     }


// }
// function getCustomVodacomSiteFilterList() {
//     var query = "SELECT sitename FROM InovoMonitor.tblSites WHERE InovoMonitor.tblSites.sitename !='' ORDER BY InovoMonitor.tblSites.sitename asc";
//     var remoteVodaEXT = "?remotehost=https://41.0.203.210:8443/InovoCentralMonitorClient/MonitorData&action=runopenquery&query=";


//     receiveVodacomSiteFilterReq.open("GET", serverURL + "/MonitorData" + remoteVodaEXT + query, true);
//     //Set the function that will be called when the XmlHttpRequest objects state changes.
//     receiveVodacomSiteFilterReq.onreadystatechange = getCustomVodacomSiteFilterListResult;
//     receiveVodacomSiteFilterReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

//     //Make request for site filter.
//     // var query2 = "SELECT * FROM InovoMonitor.tblAlarms t WHERE currentstatus<>'RESET'";
//     receiveVodacomSiteFilterReq.send();


// }

// // VODACOM CLIENT FILTER LIST
// function getCustomVodacomSiteFilterListResult() {
//     var siteTxtData = "", filData;


//     //Check to see if the XmlHttpRequests state is finished.
//     if (receiveVodacomSiteFilterReq.readyState == 4) {

//         //Here we should have some JSON data !!
//         var dbData = JSON.parse(receiveVodacomSiteFilterReq.responseText);
//         arrayAlarm = dbData['queryresult'];


//         filData = "<div id=\"selectCustomClientFilter\"><div class=\"input-group mb-3\"><div class=\"input-group-prepend\"><label class=\"input-group-text\" for=\"searchGroupSelect01\">Vodacom Client Filter</label></div><select class=\"custom-select\"  id=\"selectSearchVodacom\"><option selected>Choose Vodacom Client...</option>";
//         siteTxtData += filData;


//         for (var iAlarm = 0; iAlarm < arrayAlarm.length; iAlarm++) {
//             var rowData = arrayAlarm[iAlarm];

//             filData = "<option id=\"" + rowData['sitename'] + "\">" + rowData['sitename'] + "</option>";

//             siteTxtData += filData;
//         }
//         siteTxtData += "</select></div></div> ";
//         document.getElementById("searchGroupVodacomSelect").innerHTML = siteTxtData;
//     }


// }

// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                      CUSTOM SOURCE FILTER
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------


function getCustomSourceFilterList() {
    receiveSourceFilterReq.open("POST", serverURL + "/MonitorData", true);
    //Set the function that will be called when the XmlHttpRequest objects state changes.
    receiveSourceFilterReq.onreadystatechange = getCustomSourceFilterListResult;
    receiveSourceFilterReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    //Make the actual request.
    // var query2 = "SELECT * FROM InovoMonitor.tblAlarms t WHERE currentstatus<>'RESET'";
    var query = "SELECT DISTINCT InovoMonitor.tblAlarms.source FROM InovoMonitor.tblAlarms;";
    receiveSourceFilterReq.send("action=runopenquery&query=" + query);

}


function getCustomSourceFilterListResult() {
    var siteTxtData = "", filSoData;


    //Check to see if the XmlHttpRequests state is finished.
    if (receiveSourceFilterReq.readyState == 4) {

        //Here we should have some JSON data !!
        var dbData = JSON.parse(receiveSourceFilterReq.responseText);
        arrayAlarm = dbData['queryresult'];


        filSoData = "<div id=\"selectCustomSourceFilter\"><div class=\"input-group mb-3\"><div class=\"input-group-prepend\"><label class=\"input-group-text\" for=\"searchGroupSelect01\">Source Filter</label></div><select class=\"custom-select\"  id=\"selectSearchSource\"><option selected>Choose Source...</option>";

        siteTxtData += filSoData;


        for (var iAlarm = 0; iAlarm < arrayAlarm.length; iAlarm++) {
            var rowData = arrayAlarm[iAlarm];

            filSoData = "<option value=\"" + rowData['source'] + "\">" + rowData['source'] + "</option>";

            siteTxtData += filSoData;
        }
        document.getElementById("searchGroupSourceSelect").innerHTML = siteTxtData;
    }



}
//---------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                              CUSTOM SERVER FILTER
//----------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------

function getCustomServerFilterList() {

    var siteTxtData = "", filSoData;

    filSoData = "<div id=\"selectCustomServerFilter\"><div class=\"input-group mb-3\"><div class=\"input-group-prepend\"><label class=\"input-group-text\" for=\"searchGroupSelect01\">Active Server Filter</label></div>";

    siteTxtData += filSoData;

    filSoData = "<select class=\"custom-select\" id=\"selectSearchServer\" ><option selected>Choose Client Server...</option><option value=\"All\">All Clients</option><option value=\"Direct\">Direct Clients</option><option value=\"Vodacom\">Vodacom Clients</option></select></div>";

    siteTxtData += filSoData;

    document.getElementById("searchGroupServerSelect").innerHTML = siteTxtData;

}
//---------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                              CUSTOM SEVERITY FILTER
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------

function getCustomSeverityFilterList() {

    var siteTxtData = "", filSoData;

    filSoData = "<div id=\"selectCustomSeverityFilter\"><div class=\"input-group mb-3\"><div class=\"input-group-prepend\"><label class=\"input-group-text\" for=\"searchGroupSelect01\">Severity Filter</label></div>";

    siteTxtData += filSoData;

    filSoData = "<select class=\"custom-select\" id=\"selectSearchSeverity\" ><option selected>Choose Severity...</option><option value=\"Error\">Error</option><option value=\"Warning\">Warning</option></select></div>";

    siteTxtData += filSoData;

    document.getElementById("searchGroupSeveritySelect").innerHTML = siteTxtData;

}
//---------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                              CUSTOM STATUS FILTER
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------

function getCustomAlarmIDFilterList() {

    var siteTxtData = "", filSoData;

    filSoData = "<div id=\"selectCustomAlarmIDFilter\"class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">Alarm ID Filter</span></div><input type=\"text\" class=\"form-control\" id=\"selectSearchAlarmId\" placeholder=\"Choose Alarm ID to filter...\"></div>";

    siteTxtData += filSoData;

    document.getElementById("searchGroupAlarmIDSelect").innerHTML = siteTxtData;

}
//---------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                              CUSTOM STATUS FILTER
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------

function getCustomStatusFilterList() {

    var siteTxtData = "", filSoData;

    filSoData = "<div id=\"selectCustomStatusFilter\"><div class=\"input-group mb-3\"><div class=\"input-group-prepend\"><label class=\"input-group-text\" for=\"searchGroupSelect01\">Status Filter</label></div>";

    siteTxtData += filSoData;

    filSoData = "<select class=\"custom-select\" id=\"selectSearchStatus\"><option selected>Choose Status...</option><option value=\"ACTIVE\">ACTIVE</option><option value=\"CLEARED\">CLEARED</option><option value=\"RESET\">RESET</option></select></div>";

    siteTxtData += filSoData;

    document.getElementById("searchGroupStatusSelect").innerHTML = siteTxtData;

}




// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                            ACTIVE TABLE
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------


function getActiveAlarms() {
    //Stop timeout
    reloadTableManager(false);
    reloadTableManager(true, "activeAlarms");


    getStatusCardsRenderCheck();

    var query = "SELECT  InovoMonitor.tblHosts.siteid, "
        + "InovoMonitor.tblSites.sitename, "
        + "InovoMonitor.tblAlarms.hostid, "
        + "InovoMonitor.tblAlarms.id, "
        + "InovoMonitor.tblHosts.hostName, "
        + "InovoMonitor.tblAlarms.description, "
        + "InovoMonitor.tblAlarms.severity, "
        + "InovoMonitor.tblAlarms.Message, "
        + "InovoMonitor.tblAlarms.currentstatus, "
        + "InovoMonitor.tblAlarms.source, "
        + "InovoMonitor.tblAlarms.category, "
        + "InovoMonitor.tblAlarms.created, "
        + "InovoMonitor.tblAlarms.updated, "
        + "InovoMonitor.tblAlarms.updatedby "
        + "FROM InovoMonitor.tblHosts "
        + "INNER JOIN InovoMonitor.tblAlarms ON InovoMonitor.tblAlarms.hostid = InovoMonitor.tblHosts.id "
        + "INNER JOIN InovoMonitor.tblSites ON InovoMonitor.tblSites.id = InovoMonitor.tblHosts.siteid "
        + "WHERE InovoMonitor.tblAlarms.currentstatus = 'ACTIVE' ";
    // var query = "SELECT * FROM InovoMonitor.tblAlarms;"



    //  var remoteVodaEXT = "?remotehost=https://41.0.203.210:8443/InovoCentralMonitorClient/MonitorData&action=runopenquery&query=";

    receiveReq.open("POST", serverURL + "/MonitorData", true);
    //receiveVodaReq.open("GET", serverURL + "/MonitorData" + remoteVodaEXT + query, true);

    receiveReq.onreadystatechange = getAlarmsResult;
    // receiveVodaReq.onreadystatechange = getAlarmsResult;
    // set the Request Header
    receiveReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //receiveVodaReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    //Make the actual request.
    receiveReq.send("action=runopenquery&query=" + query);
    // receiveVodaReq.send();

}

function getAlarmsResult() {

    var txtData = "", rwData;

    var vodaServerCheck;
    var inovoServerCheck;
    var serverStatus;

    //Check to see if the XmlHttpRequests state is finished.
    // if (receiveReq.readyState == 4 && receiveVodaReq.readyState == 4) {
    if (receiveReq.readyState == 4) {

        var dateNowCPTS = new Date();
        dateNowCPTS = dateNowCPTS.getFullYear() + '-' +
            ('00' + (dateNowCPTS.getMonth() + 1)).slice(-2) + '-' +
            ('00' + dateNowCPTS.getDate()).slice(-2) + ' ' +
            ('00' + dateNowCPTS.getHours()).slice(-2) + ':' +
            ('00' + dateNowCPTS.getMinutes()).slice(-2) + ':' +
            ('00' + dateNowCPTS.getSeconds()).slice(-2);


        var CPTS = document.getElementById("CopyrightAndTimestamp");
        var footerText = "Copyright INOVO, All Rights Reserved &copy; 2021 - INOVO Central Monitoring Dashboard (Last Updated: " + dateNowCPTS + ")";




        var aNewTableArr = [];
        var finalTableArr = [];
        var sevArrError = [];
        var sevArrWarning = [];

        //Here we should have some JSON data !!


        if (receiveReq.responseText.indexOf("queryresult") == 2) {
            var dbData = JSON.parse(receiveReq.responseText);
            arrayAlarm = dbData['queryresult'];

            inovoServerCheck = true;

        } else {
            inovoServerCheck = false;
        }


        // if (receiveVodaReq.responseText.indexOf("queryresult") == 2) {

        //     var dbVodaData = JSON.parse(receiveVodaReq.responseText);
        //     arrayVodaAlarm = dbVodaData['queryresult'];

        //     vodaServerCheck = true;

        // }
        // else {
        //     vodaServerCheck = false
        // }



        // if (inovoServerCheck && vodaServerCheck) {
        if (inovoServerCheck) {

            serverStatusInovo = inovoOkayStat;
            // //serverStatusVoda = vodaOkayStat;


            rwData = "<table class=\"table\"><thead style=\"background-color: rgb(255, 255, 255);\">" + "<tr><th style=\"color: rgb(0,0,0);\">Client Name</th><th style=\"color: rgb(0,0,0);\">Client</th>" + "<th style=\"color: rgb(0,0,0);\">Host Name</th><th style=\"color: black;\">Message</th><th style=\"color: black;\">Status</th><th style=\"color: black;\">Source</th><th style=\"color: black;\">First Occurrence</th><th style=\"color: black;\">Updated At</th></tr></thead><tbody>";

            txtData += rwData;



            //adding server type to each object
            for (var iAlarms = 0; iAlarms < arrayAlarm.length; iAlarms++) {
                arrayAlarm[iAlarms][nameofServer] = directServerName;
                aNewTableArr.push(arrayAlarm[iAlarms]);
            }

            // --------------------------------------------------------------------  
            // ----------------------------  Split to new arrays based on severity
            // --------------------------------------------------------------------
            for (var iAlarms = 0; iAlarms < aNewTableArr.length; iAlarms++) {
                var alarmSev = aNewTableArr[iAlarms]["severity"];
                if (alarmSev == "Error") {
                    sevArrError.push(aNewTableArr[iAlarms]);
                }
                else if (alarmSev == "Warning") {
                    sevArrWarning.push(aNewTableArr[iAlarms]);
                }
            }



            // Sort the new Array
            sevArrError.sort(function (a, b) {
                var c = new Date(a.created);
                var d = new Date(b.created);
                return d - c;
            });
            sevArrWarning.sort(function (a, b) {
                var c = new Date(a.created);
                var d = new Date(b.created);
                return d - c;
            });

            for (let i = 0; i < sevArrError.length; i++) {
                finalTableArr.push(sevArrError[i]);

            }

            for (let i = 0; i < sevArrWarning.length; i++) {
                finalTableArr.push(sevArrWarning[i]);

            }



            for (var iAlarm = 0; iAlarm < finalTableArr.length; iAlarm++) {
                var rowData = finalTableArr[iAlarm];

                rwData =
                    "<tr id=\"" + rowData['severity'] + "\"><td>"
                    + rowData['sitename']
                    + "</td><td>" + rowData['serverName']
                    + "</td><td>" + rowData['hostname']
                    + "</td><td style=\"text-align: left;\">" + rowData['message']
                    + "</td><td>" + rowData['currentstatus']
                    + "</td><td>" + rowData['source']
                    + "</td><td>" + rowData['created']
                    + "</td><td>" + rowData['updated']
                    // + "</td><td class=\"table-cell-custom\">" CORRECT WAY
                    // + "<a class=\"graphModalPress\" data-toggle=\"modal\" data-target=\".bd-example-modal-lg\"  onclick=\"getAlarmModal(" + iAlarm + "); \" title=\"Click for More Info\">"
                    // + "<i class=\"far fa-chart-bar\" style=\"font-size: 25px;color: rgb(5,51,103);\"></i>"
                    // + "</a>"
                    + "</td><td class=\"table-cell-custom\">"
                    + "<a class=\"infoModalPress\" data-toggle=\"modal\" data-target=\".bd-example-modal-lg\"  onclick=\"getAlarmModal(" + iAlarm + "); \" title=\"Click for More Info\">"
                    + "<i class=\"fas fa-ellipsis-v\" style=\"font-size: 25px;color: rgb(4,4,4);\"></i>"
                    + "</a>"
                    + "</td></tr>";

                txtData += rwData;

            }

            txtData += "</tbody></table>";
            document.getElementById("datatable").innerHTML = txtData;
            // document.getElementById("ServerCheckStatusInovo").innerHTML = serverStatusInovo;
            // document.getElementById("ServerCheckStatusVoda").innerHTML = serverStatusVoda;
            CPTS.innerHTML = footerText;
        }
        else if (inovoServerCheck && !vodaServerCheck) {

            serverStatusInovo = inovoOkayStat
            //serverStatusVoda = vodaFailStat;

            rwData = "<table class=\"table\"><thead style=\"background-color: rgb(255, 255, 255);\">" + "<tr><th style=\"color: rgb(0,0,0);\">Client Name</th><th style=\"color: rgb(0,0,0);\">Client</th>" + "<th style=\"color: rgb(0,0,0);\">Host Name</th><th style=\"color: black;\">Message</th><th style=\"color: black;\">Status</th><th style=\"color: black;\">Source</th><th style=\"color: black;\">First Occurrence</th><th style=\"color: black;\">Updated At</th></tr></thead><tbody>";

            txtData += rwData;



            //adding server type to each object
            for (var iAlarms = 0; iAlarms < arrayAlarm.length; iAlarms++) {
                arrayAlarm[iAlarms][nameofServer] = directServerName;
                aNewTableArr.push(arrayAlarm[iAlarms]);
            }

            // --------------------------------------------------------------------  
            // ----------------------------  Split to new arrays based on severity
            // --------------------------------------------------------------------
            for (var iAlarms = 0; iAlarms < aNewTableArr.length; iAlarms++) {
                var alarmSev = aNewTableArr[iAlarms]["severity"];
                if (alarmSev == "Error") {
                    sevArrError.push(aNewTableArr[iAlarms]);
                }
                else if (alarmSev == "Warning") {
                    sevArrWarning.push(aNewTableArr[iAlarms]);
                }
            }



            // Sort the new Array
            sevArrError.sort(function (a, b) {
                var c = new Date(a.created);
                var d = new Date(b.created);
                return d - c;
            });
            sevArrWarning.sort(function (a, b) {
                var c = new Date(a.created);
                var d = new Date(b.created);
                return d - c;
            });

            for (let i = 0; i < sevArrError.length; i++) {
                finalTableArr.push(sevArrError[i]);

            }

            for (let i = 0; i < sevArrWarning.length; i++) {
                finalTableArr.push(sevArrWarning[i]);

            }



            for (var iAlarm = 0; iAlarm < finalTableArr.length; iAlarm++) {
                var rowData = finalTableArr[iAlarm];

                rwData =
                    "<tr id=\"" + rowData['severity'] + "\"><td>"
                    + rowData['sitename']
                    + "</td><td>" + rowData['serverName']
                    + "</td><td>" + rowData['hostname']
                    + "</td><td style=\"text-align: left;\">" + rowData['message']
                    + "</td><td>" + rowData['currentstatus']
                    + "</td><td>" + rowData['source']
                    + "</td><td>" + rowData['created']
                    + "</td><td>" + rowData['updated']
                    // + "</td><td class=\"table-cell-custom\">" CORRECT WAY
                    // + "<a class=\"graphModalPress\" data-toggle=\"modal\" data-target=\".bd-example-modal-lg\"  onclick=\"getAlarmModal(" + iAlarm + "); \" title=\"Click for More Info\">"
                    // + "<i class=\"far fa-chart-bar\" style=\"font-size: 25px;color: rgb(5,51,103);\"></i>"
                    // + "</a>"
                    + "</td><td class=\"table-cell-custom\">"
                    + "<a class=\"infoModalPress\" data-toggle=\"modal\" data-target=\".bd-example-modal-lg\"  onclick=\"getAlarmModal(" + iAlarm + "); \" title=\"Click for More Info\">"
                    + "<i class=\"fas fa-ellipsis-v\" style=\"font-size: 25px;color: rgb(4,4,4);\"></i>"
                    + "</a>"
                    + "</td></tr>";

                txtData += rwData;

            }

            txtData += "</tbody></table>";
            document.getElementById("datatable").innerHTML = txtData;
            // document.getElementById("ServerCheckStatusInovo").innerHTML = serverStatusInovo;
            // document.getElementById("ServerCheckStatusVoda").innerHTML = serverStatusVoda;
            CPTS.innerHTML = footerText;

        }
        ///CHECK-
        else if (!inovoServerCheck && vodaServerCheck) {

            serverStatusInovo = inovoFailStat;
            //serverStatusVoda = vodaOkayStat;

            rwData = "<table class=\"table\"><thead style=\"background-color: rgb(255, 255, 255);\">" + "<tr><th style=\"color: rgb(0,0,0);\">Client Name</th><th style=\"color: rgb(0,0,0);\">Client</th>" + "<th style=\"color: rgb(0,0,0);\">Host Name</th><th style=\"color: black;\">Message</th><th style=\"color: black;\">Status</th><th style=\"color: black;\">Source</th><th style=\"color: black;\">First Occurrence</th><th style=\"color: black;\">Updated At</th></tr></thead><tbody>";

            txtData += rwData;



            //adding server type to each object
            // for (var iAlarms = 0; iAlarms < arrayAlarm.length; iAlarms++) {
            //     arrayAlarm[iAlarms][nameofServer] = directServerName;
            //     aNewTableArr.push(arrayAlarm[iAlarms]);
            // }
            for (var iAlarms = 0; iAlarms < arrayVodaAlarm.length; iAlarms++) {
                arrayVodaAlarm[iAlarms][nameofServer] = vodaServerName;
                aNewTableArr.push(arrayVodaAlarm[iAlarms]);
            }

            // --------------------------------------------------------------------  
            // ----------------------------  Split to new arrays based on severity
            // --------------------------------------------------------------------
            for (var iAlarms = 0; iAlarms < aNewTableArr.length; iAlarms++) {
                var alarmSev = aNewTableArr[iAlarms]["severity"];
                if (alarmSev == "Error") {
                    sevArrError.push(aNewTableArr[iAlarms]);
                }
                else if (alarmSev == "Warning") {
                    sevArrWarning.push(aNewTableArr[iAlarms]);
                }
            }



            // Sort the new Array
            sevArrError.sort(function (a, b) {
                var c = new Date(a.created);
                var d = new Date(b.created);
                return d - c;
            });
            sevArrWarning.sort(function (a, b) {
                var c = new Date(a.created);
                var d = new Date(b.created);
                return d - c;
            });

            for (let i = 0; i < sevArrError.length; i++) {
                finalTableArr.push(sevArrError[i]);

            }

            for (let i = 0; i < sevArrWarning.length; i++) {
                finalTableArr.push(sevArrWarning[i]);

            }



            for (var iAlarm = 0; iAlarm < finalTableArr.length; iAlarm++) {
                var rowData = finalTableArr[iAlarm];

                rwData =
                    "<tr id=\"" + rowData['severity'] + "\"><td>"
                    + rowData['sitename']
                    + "</td><td>" + rowData['serverName']
                    + "</td><td>" + rowData['hostname']
                    + "</td><td style=\"text-align: left;\">" + rowData['message']
                    + "</td><td>" + rowData['currentstatus']
                    + "</td><td>" + rowData['source']
                    + "</td><td>" + rowData['created']
                    + "</td><td>" + rowData['updated']
                    // + "</td><td class=\"table-cell-custom\">" CORRECT WAY
                    // + "<a class=\"graphModalPress\" data-toggle=\"modal\" data-target=\".bd-example-modal-lg\"  onclick=\"getAlarmModal(" + iAlarm + "); \" title=\"Click for More Info\">"
                    // + "<i class=\"far fa-chart-bar\" style=\"font-size: 25px;color: rgb(5,51,103);\"></i>"
                    // + "</a>"
                    + "</td><td class=\"table-cell-custom\">"
                    + "<a class=\"infoModalPress\" data-toggle=\"modal\" data-target=\".bd-example-modal-lg\"  onclick=\"getAlarmModal(" + iAlarm + "); \" title=\"Click for More Info\">"
                    + "<i class=\"fas fa-ellipsis-v\" style=\"font-size: 25px;color: rgb(4,4,4);\"></i>"
                    + "</a>"
                    + "</td></tr>";

                txtData += rwData;

            }

            txtData += "</tbody></table>";
            document.getElementById("datatable").innerHTML = txtData;
            // document.getElementById("ServerCheckStatusInovo").innerHTML = serverStatusInovo;
            // document.getElementById("ServerCheckStatusVoda").innerHTML = serverStatusVoda;
            CPTS.innerHTML = footerText;
        }
        else if (!inovoServerCheck && !vodaServerCheck) {

            serverStatusInovo = inovoFailStat;
            //serverStatusVoda = vodaFailStat;;
            rwData = "<table class=\"table\"><thead style=\"background-color: rgb(255, 255, 255);\">" + "<tr><th style=\"color: rgb(0,0,0);\">Client Name</th><th style=\"color: rgb(0,0,0);\">Client</th>" + "<th style=\"color: rgb(0,0,0);\">Host Name</th><th style=\"color: black;\">Message</th><th style=\"color: black;\">Status</th><th style=\"color: black;\">Source</th><th style=\"color: black;\">First Occurrence</th><th style=\"color: black;\">Updated At</th></tr></thead><tbody>";

            txtData += rwData;


            txtData += "</tbody></table>";
            document.getElementById("datatable").innerHTML = txtData;
            // document.getElementById("ServerCheckStatusInovo").innerHTML = serverStatusInovo;
            // document.getElementById("ServerCheckStatusVoda").innerHTML = serverStatusVoda;
            CPTS.innerHTML = footerText;
        }


        // -------------------------------------------------------------------------------------------------------------------------------------------
        // -------------------------------------------------------------------------------------------------------------------------------------------
        // -------------------------------------------------------------------------------------------------------------------------------------------
        // -------------------------------------------------------------------------------------------------------------------------------------------
        //add header for table
        //add header for table
        //add header for table
        //add header for table



    }

}

// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                            WALLBOARD TABLE
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------




function getWallboardActiveAlarms(siteMapid) {
    //Stop timeout
    reloadTableManager(false);
    reloadTableManager(true, "wallboardActiveAlarms");

    getStatusCardsRenderCheck();

    if (siteMapid != "") {

        var dList = directSiteList;
        var vlist = vodacomSiteList;

        siteD = true;

        // for (let i = 0; i < dList.length; i++) {
        //     const element = dList[i];


        //     if (element['id'] == siteMapid) {
        //         siteD = true;
        //     }

        // }

        // if (siteD) {

        var query = "SELECT InovoMonitor.tblSites.sitename, "
            + "InovoMonitor.tblAlarms.hostid, "
            + "InovoMonitor.tblAlarms.id, "
            + "InovoMonitor.tblHosts.hostName, "
            + "InovoMonitor.tblAlarms.description, "
            + "InovoMonitor.tblAlarms.severity, "
            + "InovoMonitor.tblAlarms.Message, "
            + "InovoMonitor.tblAlarms.currentstatus, "
            + "InovoMonitor.tblAlarms.source, "
            + "InovoMonitor.tblAlarms.category, "
            + "InovoMonitor.tblAlarms.created, "
            + "InovoMonitor.tblAlarms.updated, "
            + "InovoMonitor.tblAlarms.updatedby "
            + "FROM InovoMonitor.tblHosts "
            + "INNER JOIN InovoMonitor.tblAlarms ON InovoMonitor.tblAlarms.hostid = InovoMonitor.tblHosts.id "
            + "INNER JOIN InovoMonitor.tblSites ON InovoMonitor.tblSites.id = InovoMonitor.tblHosts.siteid "
            + "WHERE InovoMonitor.tblAlarms.currentstatus = 'ACTIVE' AND InovoMonitor.tblSites.id in (" + siteMapid + ") ";

        receiveReq.open("POST", serverURL + "/MonitorData", true);

        receiveReq.onreadystatechange = getWallboardAlarmsResult;
        // set the Request Header
        receiveReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        //Make the actual request.
        receiveReq.send("action=runopenquery&query=" + query);
        //     }
        //     else if (siteV) {
        //         var query = "SELECT  InovoMonitor.tblSites.sitename, InovoMonitor.tblAlarms.hostid, InovoMonitor.tblAlarms.id, InovoMonitor.tblHosts.hostName, InovoMonitor.tblAlarms.description, InovoMonitor.tblAlarms.severity, InovoMonitor.tblAlarms.Message, InovoMonitor.tblAlarms.currentstatus, InovoMonitor.tblAlarms.source  ,InovoMonitor.tblAlarms.category, InovoMonitor.tblAlarms.created, InovoMonitor.tblAlarms.updated, InovoMonitor.tblAlarms.updatedby FROM InovoMonitor.tblHosts INNER JOIN InovoMonitor.tblAlarms ON InovoMonitor.tblAlarms.hostid = InovoMonitor.tblHosts.id INNER JOIN InovoMonitor.tblSites ON InovoMonitor.tblSites.id = InovoMonitor.tblHosts.siteid WHERE InovoMonitor.tblAlarms.currentstatus = 'ACTIVE' AND InovoMonitor.tblSites.id =" + siteMapid + " ";


        //         var remoteVodaEXT = "?remotehost=https://41.0.203.210:8443/InovoCentralMonitorClient/MonitorData&action=runopenquery&query=";

        //         //receiveReq.open("POST", serverURL + "/MonitorData", true);
        //         receiveVodaReq.open("GET", serverURL + "/MonitorData" + remoteVodaEXT + query, true);

        //         receiveVodaReq.onreadystatechange = getWallboardAlarmsResult;
        //         // set the Request Header
        //         receiveVodaReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        //         //Make the actual request.
        //         receiveVodaReq.send();
        //     }


        // } else {

        //     siteD = false;
        //     siteV = false;
        //     var query = "SELECT  InovoMonitor.tblSites.sitename, InovoMonitor.tblAlarms.hostid, InovoMonitor.tblAlarms.id, InovoMonitor.tblHosts.hostName, InovoMonitor.tblAlarms.description, InovoMonitor.tblAlarms.severity, InovoMonitor.tblAlarms.Message, InovoMonitor.tblAlarms.currentstatus, InovoMonitor.tblAlarms.source  ,InovoMonitor.tblAlarms.category, InovoMonitor.tblAlarms.created, InovoMonitor.tblAlarms.updated, InovoMonitor.tblAlarms.updatedby FROM InovoMonitor.tblHosts INNER JOIN InovoMonitor.tblAlarms ON InovoMonitor.tblAlarms.hostid = InovoMonitor.tblHosts.id INNER JOIN InovoMonitor.tblSites ON InovoMonitor.tblSites.id = InovoMonitor.tblHosts.siteid WHERE InovoMonitor.tblAlarms.currentstatus = 'ACTIVE' ";


        //     // var remoteVodaEXT = "?remotehost=https://41.0.203.210:8443/InovoCentralMonitorClient/MonitorData&action=runopenquery&query=";

        //     receiveReq.open("POST", serverURL + "/MonitorData", true);
        //     //receiveVodaReq.open("GET", serverURL + "/MonitorData" + remoteVodaEXT + query, true);

        //     receiveReq.onreadystatechange = getWallboardAlarmsResult;
        //     // receiveVodaReq.onreadystatechange = getWallboardAlarmsResult;
        //     // set the Request Header
        //     receiveReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        //     // receiveVodaReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        //     //Make the actual request.
        //     receiveReq.send("action=runopenquery&query=" + query);
        //     // receiveVodaReq.send();
    }

}

function getWallboardAlarmsResult() {

    var txtData = "", rwData;

    var vodaServerCheck = false;
    var inovoServerCheck = false;
    var serverStatusVoda;
    var serverStatusInovo;

    if (siteD) {
        if (receiveReq.readyState == 4) {

            var dateNowCPTS = new Date();
            dateNowCPTS = dateNowCPTS.getFullYear() + '-' +
                ('00' + (dateNowCPTS.getMonth() + 1)).slice(-2) + '-' +
                ('00' + dateNowCPTS.getDate()).slice(-2) + ' ' +
                ('00' + dateNowCPTS.getHours()).slice(-2) + ':' +
                ('00' + dateNowCPTS.getMinutes()).slice(-2) + ':' +
                ('00' + dateNowCPTS.getSeconds()).slice(-2);


            var CPTS = document.getElementById("CopyrightAndTimestamp");
            var footerText = "Copyright INOVO, All Rights Reserved &copy; 2021 - INOVO Central Monitoring Dashboard (Last Updated: " + dateNowCPTS + ")";




            var aNewTableArr = [];
            var finalTableArr = [];
            var sevArrError = [];
            var sevArrWarning = []

            //Here we should have some JSON data !!


            if (receiveReq.responseText.indexOf("queryresult") == 2) {
                var dbData = JSON.parse(receiveReq.responseText);
                arrayAlarm = dbData['queryresult'];

                inovoServerCheck = true;

            } else {
                inovoServerCheck = false;
            }


            if (receiveVodaReq.responseText.indexOf("queryresult") == 2) {

                // var dbVodaData = JSON.parse(receiveVodaReq.responseText);
                // arrayVodaAlarm = dbVodaData['queryresult'];

                vodaServerCheck = false;

            }
            else {
                vodaServerCheck = false
            }



            if (inovoServerCheck && vodaServerCheck) {

                serverStatusInovo = inovoOkayStat;
                //serverStatusVoda = vodaOkayStat;


                rwData = "<table class=\"table\"><thead style=\"background-color: rgb(255, 255, 255);\">" + "<tr><th style=\"color: rgb(0,0,0);\">Client Name</th><th style=\"color: rgb(0,0,0);\">Client</th>" + "<th style=\"color: rgb(0,0,0);\">Host Name</th><th style=\"color: black;\">Message</th><th style=\"color: black;\">Status</th><th style=\"color: black;\">Source</th><th style=\"color: black;\">First Occurrence</th><th style=\"color: black;\">Updated At</th></tr></thead><tbody>";

                txtData += rwData;



                //adding server type to each object
                for (var iAlarms = 0; iAlarms < arrayAlarm.length; iAlarms++) {
                    arrayAlarm[iAlarms][nameofServer] = directServerName;
                    aNewTableArr.push(arrayAlarm[iAlarms]);
                }
                for (var iAlarms = 0; iAlarms < arrayVodaAlarm.length; iAlarms++) {
                    arrayVodaAlarm[iAlarms][nameofServer] = vodaServerName;
                    aNewTableArr.push(arrayVodaAlarm[iAlarms]);
                }

                // --------------------------------------------------------------------  
                // ----------------------------  Split to new arrays based on severity
                // --------------------------------------------------------------------
                for (var iAlarms = 0; iAlarms < aNewTableArr.length; iAlarms++) {
                    var alarmSev = aNewTableArr[iAlarms]["severity"];
                    if (alarmSev == "Error") {
                        sevArrError.push(aNewTableArr[iAlarms]);
                    }
                    else if (alarmSev == "Warning") {
                        sevArrWarning.push(aNewTableArr[iAlarms]);
                    }
                }



                // Sort the new Array
                sevArrError.sort(function (a, b) {
                    var c = new Date(a.created);
                    var d = new Date(b.created);
                    return d - c;
                });
                sevArrWarning.sort(function (a, b) {
                    var c = new Date(a.created);
                    var d = new Date(b.created);
                    return d - c;
                });

                for (let i = 0; i < sevArrError.length; i++) {
                    finalTableArr.push(sevArrError[i]);

                }

                for (let i = 0; i < sevArrWarning.length; i++) {
                    finalTableArr.push(sevArrWarning[i]);

                }



                for (var iAlarm = 0; iAlarm < finalTableArr.length; iAlarm++) {
                    var rowData = finalTableArr[iAlarm];

                    rwData =
                        "<tr id=\"" + rowData['severity'] + "\"><td>"
                        + rowData['sitename']
                        + "</td><td>" + rowData['serverName']
                        + "</td><td>" + rowData['hostname']
                        + "</td><td style=\"text-align: left;\">" + rowData['message']
                        + "</td><td>" + rowData['currentstatus']
                        + "</td><td>" + rowData['source']
                        + "</td><td>" + rowData['created']
                        + "</td><td>" + rowData['updated']
                        // + "</td><td class=\"table-cell-custom\">" CORRECT WAY
                        // + "<a class=\"graphModalPress\" data-toggle=\"modal\" data-target=\".bd-example-modal-lg\"  onclick=\"getAlarmModal(" + iAlarm + "); \" title=\"Click for More Info\">"
                        // + "<i class=\"far fa-chart-bar\" style=\"font-size: 25px;color: rgb(5,51,103);\"></i>"
                        // + "</a>"
                        + "</td><td class=\"table-cell-custom\">"
                        + "<a class=\"infoModalPress\" data-toggle=\"modal\" data-target=\".bd-example-modal-lg\"  onclick=\"getAlarmModal(" + iAlarm + "); \" title=\"Click for More Info\">"
                        + "<i class=\"fas fa-ellipsis-v\" style=\"font-size: 25px;color: rgb(4,4,4);\"></i>"
                        + "</a>"
                        + "</td></tr>";

                    txtData += rwData;

                }


                txtData += "</tbody></table>";
                document.getElementById("datatable").innerHTML = txtData;
                // document.getElementById("ServerCheckStatusInovo").innerHTML = serverStatusInovo;
                // document.getElementById("ServerCheckStatusVoda").innerHTML = serverStatusVoda;
                CPTS.innerHTML = footerText;
            }
            else if (inovoServerCheck && !vodaServerCheck) {

                serverStatusInovo = inovoOkayStat
                // //serverStatusVoda = vodaFailStat;

                rwData = "<table class=\"table\"><thead style=\"background-color: rgb(255, 255, 255);\">" + "<tr><th style=\"color: rgb(0,0,0);\">Client Name</th><th style=\"color: rgb(0,0,0);\">Client</th>" + "<th style=\"color: rgb(0,0,0);\">Host Name</th><th style=\"color: black;\">Message</th><th style=\"color: black;\">Status</th><th style=\"color: black;\">Source</th><th style=\"color: black;\">First Occurrence</th><th style=\"color: black;\">Updated At</th></tr></thead><tbody>";

                txtData += rwData;



                //adding server type to each object
                for (var iAlarms = 0; iAlarms < arrayAlarm.length; iAlarms++) {
                    arrayAlarm[iAlarms][nameofServer] = directServerName;
                    aNewTableArr.push(arrayAlarm[iAlarms]);
                }

                // --------------------------------------------------------------------  
                // ----------------------------  Split to new arrays based on severity
                // --------------------------------------------------------------------
                for (var iAlarms = 0; iAlarms < aNewTableArr.length; iAlarms++) {
                    var alarmSev = aNewTableArr[iAlarms]["severity"];
                    if (alarmSev == "Error") {
                        sevArrError.push(aNewTableArr[iAlarms]);
                    }
                    else if (alarmSev == "Warning") {
                        sevArrWarning.push(aNewTableArr[iAlarms]);
                    }
                }



                // Sort the new Array
                sevArrError.sort(function (a, b) {
                    var c = new Date(a.created);
                    var d = new Date(b.created);
                    return d - c;
                });
                sevArrWarning.sort(function (a, b) {
                    var c = new Date(a.created);
                    var d = new Date(b.created);
                    return d - c;
                });

                for (let i = 0; i < sevArrError.length; i++) {
                    finalTableArr.push(sevArrError[i]);

                }

                for (let i = 0; i < sevArrWarning.length; i++) {
                    finalTableArr.push(sevArrWarning[i]);

                }



                for (var iAlarm = 0; iAlarm < finalTableArr.length; iAlarm++) {
                    var rowData = finalTableArr[iAlarm];

                    rwData =
                        "<tr id=\"" + rowData['severity'] + "\"><td>"
                        + rowData['sitename']
                        + "</td><td>" + rowData['serverName']
                        + "</td><td>" + rowData['hostname']
                        + "</td><td style=\"text-align: left;\">" + rowData['message']
                        + "</td><td>" + rowData['currentstatus']
                        + "</td><td>" + rowData['source']
                        + "</td><td>" + rowData['created']
                        + "</td><td>" + rowData['updated']
                        // + "</td><td class=\"table-cell-custom\">" CORRECT WAY
                        // + "<a class=\"graphModalPress\" data-toggle=\"modal\" data-target=\".bd-example-modal-lg\"  onclick=\"getAlarmModal(" + iAlarm + "); \" title=\"Click for More Info\">"
                        // + "<i class=\"far fa-chart-bar\" style=\"font-size: 25px;color: rgb(5,51,103);\"></i>"
                        // + "</a>"
                        + "</td><td class=\"table-cell-custom\">"
                        + "<a class=\"infoModalPress\" data-toggle=\"modal\" data-target=\".bd-example-modal-lg\"  onclick=\"getAlarmModal(" + iAlarm + "); \" title=\"Click for More Info\">"
                        + "<i class=\"fas fa-ellipsis-v\" style=\"font-size: 25px;color: rgb(4,4,4);\"></i>"
                        + "</a>"
                        + "</td></tr>";

                    txtData += rwData;

                }

                txtData += "</tbody></table>";
                document.getElementById("datatable").innerHTML = txtData;
                // document.getElementById("ServerCheckStatusInovo").innerHTML = serverStatusInovo;
                // document.getElementById("ServerCheckStatusVoda").innerHTML = serverStatusVoda;
                CPTS.innerHTML = footerText;
                // getStatusCards();

            }
            else if (!inovoServerCheck && vodaServerCheck) {

                serverStatusInovo = inovoFailStat;
                // //serverStatusVoda = vodaOkayStat;

                rwData = "<table class=\"table\"><thead style=\"background-color: rgb(255, 255, 255);\">" + "<tr><th style=\"color: rgb(0,0,0);\">Client Name</th><th style=\"color: rgb(0,0,0);\">Client</th>" + "<th style=\"color: rgb(0,0,0);\">Host Name</th><th style=\"color: black;\">Message</th><th style=\"color: black;\">Status</th><th style=\"color: black;\">Source</th><th style=\"color: black;\">First Occurrence</th><th style=\"color: black;\">Updated At</th></tr></thead><tbody>";

                txtData += rwData;



                //adding server type to each object
                // for (var iAlarms = 0; iAlarms < arrayAlarm.length; iAlarms++) {
                //     arrayAlarm[iAlarms][nameofServer] = directServerName;
                //     aNewTableArr.push(arrayAlarm[iAlarms]);
                // }
                for (var iAlarms = 0; iAlarms < arrayVodaAlarm.length; iAlarms++) {
                    arrayVodaAlarm[iAlarms][nameofServer] = vodaServerName;
                    aNewTableArr.push(arrayVodaAlarm[iAlarms]);
                }

                // --------------------------------------------------------------------  
                // ----------------------------  Split to new arrays based on severity
                // --------------------------------------------------------------------
                for (var iAlarms = 0; iAlarms < aNewTableArr.length; iAlarms++) {
                    var alarmSev = aNewTableArr[iAlarms]["severity"];
                    if (alarmSev == "Error") {
                        sevArrError.push(aNewTableArr[iAlarms]);
                    }
                    else if (alarmSev == "Warning") {
                        sevArrWarning.push(aNewTableArr[iAlarms]);
                    }
                }



                // Sort the new Array
                sevArrError.sort(function (a, b) {
                    var c = new Date(a.created);
                    var d = new Date(b.created);
                    return d - c;
                });
                sevArrWarning.sort(function (a, b) {
                    var c = new Date(a.created);
                    var d = new Date(b.created);
                    return d - c;
                });

                for (let i = 0; i < sevArrError.length; i++) {
                    finalTableArr.push(sevArrError[i]);

                }

                for (let i = 0; i < sevArrWarning.length; i++) {
                    finalTableArr.push(sevArrWarning[i]);

                }



                for (var iAlarm = 0; iAlarm < finalTableArr.length; iAlarm++) {
                    var rowData = finalTableArr[iAlarm];

                    rwData =
                        "<tr id=\"" + rowData['severity'] + "\"><td>"
                        + rowData['sitename']
                        + "</td><td>" + rowData['serverName']
                        + "</td><td>" + rowData['hostname']
                        + "</td><td style=\"text-align: left;\">" + rowData['message']
                        + "</td><td>" + rowData['currentstatus']
                        + "</td><td>" + rowData['source']
                        + "</td><td>" + rowData['created']
                        + "</td><td>" + rowData['updated']
                        // + "</td><td class=\"table-cell-custom\">" CORRECT WAY
                        // + "<a class=\"graphModalPress\" data-toggle=\"modal\" data-target=\".bd-example-modal-lg\"  onclick=\"getAlarmModal(" + iAlarm + "); \" title=\"Click for More Info\">"
                        // + "<i class=\"far fa-chart-bar\" style=\"font-size: 25px;color: rgb(5,51,103);\"></i>"
                        // + "</a>"
                        + "</td><td class=\"table-cell-custom\">"
                        + "<a class=\"infoModalPress\" data-toggle=\"modal\" data-target=\".bd-example-modal-lg\"  onclick=\"getAlarmModal(" + iAlarm + "); \" title=\"Click for More Info\">"
                        + "<i class=\"fas fa-ellipsis-v\" style=\"font-size: 25px;color: rgb(4,4,4);\"></i>"
                        + "</a>"
                        + "</td></tr>";

                    txtData += rwData;

                }

                txtData += "</tbody></table>";
                document.getElementById("datatable").innerHTML = txtData;
                document.getElementById("ServerCheckStatus").innerHTML = serverStatus;
                CPTS.innerHTML = footerText;
            }
            else if (!inovoServerCheck && !vodaServerCheck) {

                serverStatusInovo = inovoFailStat;
                //serverStatusVoda = vodaFailStat;;
                rwData = "<table class=\"table\"><thead style=\"background-color: rgb(255, 255, 255);\">" + "<tr><th style=\"color: rgb(0,0,0);\">Client Name</th><th style=\"color: rgb(0,0,0);\">Client</th>" + "<th style=\"color: rgb(0,0,0);\">Host Name</th><th style=\"color: black;\">Message</th><th style=\"color: black;\">Status</th><th style=\"color: black;\">Source</th><th style=\"color: black;\">First Occurrence</th><th style=\"color: black;\">Updated At</th></tr></thead><tbody>";

                txtData += rwData;


                txtData += "</tbody></table>";
                document.getElementById("datatable").innerHTML = txtData;
                // document.getElementById("ServerCheckStatus").innerHTML = serverStatusVoda;
                // document.getElementById("ServerCheckStatus").innerHTML = serverStatusVoda;
                CPTS.innerHTML = footerText;
            }


            // -------------------------------------------------------------------------------------------------------------------------------------------
            // -------------------------------------------------------------------------------------------------------------------------------------------
            // -------------------------------------------------------------------------------------------------------------------------------------------
            // -------------------------------------------------------------------------------------------------------------------------------------------
            //add header for table
            //add header for table
            //add header for table
            //add header for table



        }

    }
    else if (siteV) {

    } else {
        if (receiveReq.readyState == 4 && receiveVodaReq.readyState == 4) {

            var dateNowCPTS = new Date();
            dateNowCPTS = dateNowCPTS.getFullYear() + '-' +
                ('00' + (dateNowCPTS.getMonth() + 1)).slice(-2) + '-' +
                ('00' + dateNowCPTS.getDate()).slice(-2) + ' ' +
                ('00' + dateNowCPTS.getHours()).slice(-2) + ':' +
                ('00' + dateNowCPTS.getMinutes()).slice(-2) + ':' +
                ('00' + dateNowCPTS.getSeconds()).slice(-2);


            var CPTS = document.getElementById("CopyrightAndTimestamp");
            var footerText = "Copyright INOVO, All Rights Reserved &copy; 2021 - INOVO Central Monitoring Dashboard (Last Updated: " + dateNowCPTS + ")";




            var aNewTableArr = [];
            var finalTableArr = [];
            var sevArrError = [];
            var sevArrWarning = []

            //Here we should have some JSON data !!


            if (receiveReq.responseText.indexOf("queryresult") == 2) {
                var dbData = JSON.parse(receiveReq.responseText);
                arrayAlarm = dbData['queryresult'];

                inovoServerCheck = true;

            } else {
                inovoServerCheck = false;
            }


            if (receiveVodaReq.responseText.indexOf("queryresult") == 2) {

                var dbVodaData = JSON.parse(receiveVodaReq.responseText);
                arrayVodaAlarm = dbVodaData['queryresult'];

                vodaServerCheck = true;

            }
            else {
                vodaServerCheck = false
            }



            if (inovoServerCheck && vodaServerCheck) {

                serverStatusInovo = inovoOkayStat;
                //serverStatusVoda = vodaOkayStat;


                rwData = "<table class=\"table\"><thead style=\"background-color: rgb(255, 255, 255);\">" + "<tr><th style=\"color: rgb(0,0,0);\">Client Name</th><th style=\"color: rgb(0,0,0);\">Client</th>" + "<th style=\"color: rgb(0,0,0);\">Host Name</th><th style=\"color: black;\">Message</th><th style=\"color: black;\">Status</th><th style=\"color: black;\">Source</th><th style=\"color: black;\">First Occurrence</th><th style=\"color: black;\">Updated At</th></tr></thead><tbody>";

                txtData += rwData;



                //adding server type to each object
                for (var iAlarms = 0; iAlarms < arrayAlarm.length; iAlarms++) {
                    arrayAlarm[iAlarms][nameofServer] = directServerName;
                    aNewTableArr.push(arrayAlarm[iAlarms]);
                }

                // --------------------------------------------------------------------  
                // ----------------------------  Split to new arrays based on severity
                // --------------------------------------------------------------------
                for (var iAlarms = 0; iAlarms < aNewTableArr.length; iAlarms++) {
                    var alarmSev = aNewTableArr[iAlarms]["severity"];
                    if (alarmSev == "Error") {
                        sevArrError.push(aNewTableArr[iAlarms]);
                    }
                    else if (alarmSev == "Warning") {
                        sevArrWarning.push(aNewTableArr[iAlarms]);
                    }
                }



                // Sort the new Array
                sevArrError.sort(function (a, b) {
                    var c = new Date(a.created);
                    var d = new Date(b.created);
                    return d - c;
                });
                sevArrWarning.sort(function (a, b) {
                    var c = new Date(a.created);
                    var d = new Date(b.created);
                    return d - c;
                });

                for (let i = 0; i < sevArrError.length; i++) {
                    finalTableArr.push(sevArrError[i]);

                }

                for (let i = 0; i < sevArrWarning.length; i++) {
                    finalTableArr.push(sevArrWarning[i]);

                }



                for (var iAlarm = 0; iAlarm < finalTableArr.length; iAlarm++) {
                    var rowData = finalTableArr[iAlarm];

                    rwData =
                        "<tr id=\"" + rowData['severity'] + "\"><td>"
                        + rowData['sitename']
                        + "</td><td>" + rowData['serverName']
                        + "</td><td>" + rowData['hostname']
                        + "</td><td style=\"text-align: left;\">" + rowData['message']
                        + "</td><td>" + rowData['currentstatus']
                        + "</td><td>" + rowData['source']
                        + "</td><td>" + rowData['created']
                        + "</td><td>" + rowData['updated']
                        // + "</td><td class=\"table-cell-custom\">" CORRECT WAY
                        // + "<a class=\"graphModalPress\" data-toggle=\"modal\" data-target=\".bd-example-modal-lg\"  onclick=\"getAlarmModal(" + iAlarm + "); \" title=\"Click for More Info\">"
                        // + "<i class=\"far fa-chart-bar\" style=\"font-size: 25px;color: rgb(5,51,103);\"></i>"
                        // + "</a>"
                        + "</td><td class=\"table-cell-custom\">"
                        + "<a class=\"infoModalPress\" data-toggle=\"modal\" data-target=\".bd-example-modal-lg\"  onclick=\"getAlarmModal(" + iAlarm + "); \" title=\"Click for More Info\">"
                        + "<i class=\"fas fa-ellipsis-v\" style=\"font-size: 25px;color: rgb(4,4,4);\"></i>"
                        + "</a>"
                        + "</td></tr>";

                    txtData += rwData;

                }

                txtData += "</tbody></table>";
                document.getElementById("datatable").innerHTML = txtData;
                // document.getElementById("ServerCheckStatusInovo").innerHTML = serverStatusInovo;
                // document.getElementById("ServerCheckStatusVoda").innerHTML = serverStatusVoda;
                CPTS.innerHTML = footerText;
            }
            else if (inovoServerCheck && !vodaServerCheck) {

                serverStatusInovo = inovoOkayStat
                //serverStatusVoda = vodaFailStat;

                rwData = "<table class=\"table\"><thead style=\"background-color: rgb(255, 255, 255);\">" + "<tr><th style=\"color: rgb(0,0,0);\">Client Name</th><th style=\"color: rgb(0,0,0);\">Client</th>" + "<th style=\"color: rgb(0,0,0);\">Host Name</th><th style=\"color: black;\">Message</th><th style=\"color: black;\">Status</th><th style=\"color: black;\">Source</th><th style=\"color: black;\">First Occurrence</th><th style=\"color: black;\">Updated At</th></tr></thead><tbody>";

                txtData += rwData;



                //adding server type to each object
                for (var iAlarms = 0; iAlarms < arrayAlarm.length; iAlarms++) {
                    arrayAlarm[iAlarms][nameofServer] = directServerName;
                    aNewTableArr.push(arrayAlarm[iAlarms]);
                }

                // --------------------------------------------------------------------  
                // ----------------------------  Split to new arrays based on severity
                // --------------------------------------------------------------------
                for (var iAlarms = 0; iAlarms < aNewTableArr.length; iAlarms++) {
                    var alarmSev = aNewTableArr[iAlarms]["severity"];
                    if (alarmSev == "Error") {
                        sevArrError.push(aNewTableArr[iAlarms]);
                    }
                    else if (alarmSev == "Warning") {
                        sevArrWarning.push(aNewTableArr[iAlarms]);
                    }
                }



                // Sort the new Array
                sevArrError.sort(function (a, b) {
                    var c = new Date(a.created);
                    var d = new Date(b.created);
                    return d - c;
                });
                sevArrWarning.sort(function (a, b) {
                    var c = new Date(a.created);
                    var d = new Date(b.created);
                    return d - c;
                });

                for (let i = 0; i < sevArrError.length; i++) {
                    finalTableArr.push(sevArrError[i]);

                }

                for (let i = 0; i < sevArrWarning.length; i++) {
                    finalTableArr.push(sevArrWarning[i]);

                }



                for (var iAlarm = 0; iAlarm < finalTableArr.length; iAlarm++) {
                    var rowData = finalTableArr[iAlarm];

                    rwData =
                        "<tr id=\"" + rowData['severity'] + "\"><td>"
                        + rowData['sitename']
                        + "</td><td>" + rowData['serverName']
                        + "</td><td>" + rowData['hostname']
                        + "</td><td style=\"text-align: left;\">" + rowData['message']
                        + "</td><td>" + rowData['currentstatus']
                        + "</td><td>" + rowData['source']
                        + "</td><td>" + rowData['created']
                        + "</td><td>" + rowData['updated']
                        // + "</td><td class=\"table-cell-custom\">" CORRECT WAY
                        // + "<a class=\"graphModalPress\" data-toggle=\"modal\" data-target=\".bd-example-modal-lg\"  onclick=\"getAlarmModal(" + iAlarm + "); \" title=\"Click for More Info\">"
                        // + "<i class=\"far fa-chart-bar\" style=\"font-size: 25px;color: rgb(5,51,103);\"></i>"
                        // + "</a>"
                        + "</td><td class=\"table-cell-custom\">"
                        + "<a class=\"infoModalPress\" data-toggle=\"modal\" data-target=\".bd-example-modal-lg\"  onclick=\"getAlarmModal(" + iAlarm + "); \" title=\"Click for More Info\">"
                        + "<i class=\"fas fa-ellipsis-v\" style=\"font-size: 25px;color: rgb(4,4,4);\"></i>"
                        + "</a>"
                        + "</td></tr>";

                    txtData += rwData;

                }

                txtData += "</tbody></table>";
                document.getElementById("datatable").innerHTML = txtData;
                // document.getElementById("ServerCheckStatusInovo").innerHTML = serverStatusInovo;
                // document.getElementById("ServerCheckStatusVoda").innerHTML = serverStatusVoda;
                CPTS.innerHTML = footerText;

            }
            else if (!inovoServerCheck && vodaServerCheck) {

                serverStatusInovo = inovoFailStat;
                //serverStatusVoda = vodaOkayStat;

                rwData = "<table class=\"table\"><thead style=\"background-color: rgb(255, 255, 255);\">" + "<tr><th style=\"color: rgb(0,0,0);\">Client Name</th><th style=\"color: rgb(0,0,0);\">Client</th>" + "<th style=\"color: rgb(0,0,0);\">Host Name</th><th style=\"color: black;\">Message</th><th style=\"color: black;\">Status</th><th style=\"color: black;\">Source</th><th style=\"color: black;\">First Occurrence</th><th style=\"color: black;\">Updated At</th></tr></thead><tbody>";

                txtData += rwData;



                //adding server type to each object
                // for (var iAlarms = 0; iAlarms < arrayAlarm.length; iAlarms++) {
                //     arrayAlarm[iAlarms][nameofServer] = directServerName;
                //     aNewTableArr.push(arrayAlarm[iAlarms]);
                // }
                for (var iAlarms = 0; iAlarms < arrayVodaAlarm.length; iAlarms++) {
                    arrayVodaAlarm[iAlarms][nameofServer] = vodaServerName;
                    aNewTableArr.push(arrayVodaAlarm[iAlarms]);
                }

                // --------------------------------------------------------------------  
                // ----------------------------  Split to new arrays based on severity
                // --------------------------------------------------------------------
                for (var iAlarms = 0; iAlarms < aNewTableArr.length; iAlarms++) {
                    var alarmSev = aNewTableArr[iAlarms]["severity"];
                    if (alarmSev == "Error") {
                        sevArrError.push(aNewTableArr[iAlarms]);
                    }
                    else if (alarmSev == "Warning") {
                        sevArrWarning.push(aNewTableArr[iAlarms]);
                    }
                }



                // Sort the new Array
                sevArrError.sort(function (a, b) {
                    var c = new Date(a.created);
                    var d = new Date(b.created);
                    return d - c;
                });
                sevArrWarning.sort(function (a, b) {
                    var c = new Date(a.created);
                    var d = new Date(b.created);
                    return d - c;
                });

                for (let i = 0; i < sevArrError.length; i++) {
                    finalTableArr.push(sevArrError[i]);

                }

                for (let i = 0; i < sevArrWarning.length; i++) {
                    finalTableArr.push(sevArrWarning[i]);

                }



                for (var iAlarm = 0; iAlarm < finalTableArr.length; iAlarm++) {
                    var rowData = finalTableArr[iAlarm];

                    rwData =
                        "<tr id=\"" + rowData['severity'] + "\"><td>"
                        + rowData['sitename']
                        + "</td><td>" + rowData['serverName']
                        + "</td><td>" + rowData['hostname']
                        + "</td><td style=\"text-align: left;\">" + rowData['message']
                        + "</td><td>" + rowData['currentstatus']
                        + "</td><td>" + rowData['source']
                        + "</td><td>" + rowData['created']
                        + "</td><td>" + rowData['updated']
                        // + "</td><td class=\"table-cell-custom\">" CORRECT WAY
                        // + "<a class=\"graphModalPress\" data-toggle=\"modal\" data-target=\".bd-example-modal-lg\"  onclick=\"getAlarmModal(" + iAlarm + "); \" title=\"Click for More Info\">"
                        // + "<i class=\"far fa-chart-bar\" style=\"font-size: 25px;color: rgb(5,51,103);\"></i>"
                        // + "</a>"
                        + "</td><td class=\"table-cell-custom\">"
                        + "<a class=\"infoModalPress\" data-toggle=\"modal\" data-target=\".bd-example-modal-lg\"  onclick=\"getAlarmModal(" + iAlarm + "); \" title=\"Click for More Info\">"
                        + "<i class=\"fas fa-ellipsis-v\" style=\"font-size: 25px;color: rgb(4,4,4);\"></i>"
                        + "</a>"
                        + "</td></tr>";

                    txtData += rwData;

                }

                txtData += "</tbody></table>";
                document.getElementById("datatable").innerHTML = txtData;
                document.getElementById("ServerCheckStatus").innerHTML = serverStatus;
                CPTS.innerHTML = footerText;
            }
            else if (!inovoServerCheck && !vodaServerCheck) {

                serverStatusInovo = inovoFailStat;
                //serverStatusVoda = vodaFailStat;;
                rwData = "<table class=\"table\"><thead style=\"background-color: rgb(255, 255, 255);\">" + "<tr><th style=\"color: rgb(0,0,0);\">Client Name</th><th style=\"color: rgb(0,0,0);\">Client</th>" + "<th style=\"color: rgb(0,0,0);\">Host Name</th><th style=\"color: black;\">Message</th><th style=\"color: black;\">Status</th><th style=\"color: black;\">Source</th><th style=\"color: black;\">First Occurrence</th><th style=\"color: black;\">Updated At</th></tr></thead><tbody>";

                txtData += rwData;


                txtData += "</tbody></table>";
                document.getElementById("datatable").innerHTML = txtData;
                document.getElementById("ServerCheckStatus").innerHTML = serverStatusVoda;
                document.getElementById("ServerCheckStatus").innerHTML = serverStatusVoda;
                CPTS.innerHTML = footerText;
            }


            // -------------------------------------------------------------------------------------------------------------------------------------------
            // -------------------------------------------------------------------------------------------------------------------------------------------
            // -------------------------------------------------------------------------------------------------------------------------------------------
            // -------------------------------------------------------------------------------------------------------------------------------------------
            //add header for table
            //add header for table
            //add header for table
            //add header for table



        }
    }

    //Check to see if the XmlHttpRequests state is finished.

}






function testReturn() {
    var kvp = document.location.hash.substr(1).split('=');
    var keyParam = kvp[1];

    var test = testReturn();

    var boolResult;

    if (userProfilereq.readyState == 4) {

        var userProfileData = JSON.parse(userProfilereq.responseText);
        userProfile = userProfileData['queryresult'];

        var uProfile = userProfile[0];
        if (keyParam == uProfile['userkey'] && uProfile['useractive'] == 1 && uProfile['usertype'] == 1) {

            boolResult = true;
        }
        else {
            boolResult = false;
        }
    }
}


// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                         CUSTOM FILTER ALARM MODAL
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------

// Specifically for the main page table
function getCustomAlarmModal(idData) {

    // var arrayAlarmVAR, idVar, sitenameVAR, hostnameVAR, messageVAR,  descriptionVAR,sourceVAR, categoryVAR, createdVAR, updatedVAR,updatedbyVAR;

    var newrowData;

    var modalArray = [];
    var finalTableArr = [];
    var sevArrError = [];
    var sevArrWarning = [];

    var kvp = document.location.hash.substr(1).split('=');
    var keyParam = kvp[1];



    var boolResult = checkAuthorization();


    if (receiveCustomDirectReq.readyState == 4 && receiveCustomVodaReq.readyState == 4) {
        var dbDataVAR = JSON.parse(receiveCustomDirectReq.responseText);
        var arrayAlarmVAR = dbDataVAR['queryresult'];

        var dbVodaDataVAR = JSON.parse(receiveCustomVodaReq.responseText);
        var arrayVodaAlarmVAR = dbVodaDataVAR['queryresult'];


        for (var iAlarms = 0; iAlarms < arrayAlarmVAR.length; iAlarms++) {
            arrayAlarmVAR[iAlarms][nameofServer] = directServerName;
            modalArray.push(arrayAlarmVAR[iAlarms]);
        }
        for (var iAlarms = 0; iAlarms < arrayVodaAlarmVAR.length; iAlarms++) {
            arrayVodaAlarmVAR[iAlarms][nameofServer] = vodaServerName;
            modalArray.push(arrayVodaAlarmVAR[iAlarms]);
        }

        // --------------------------------------------------------------------  
        // ----------------------------  Split to new arrays based on severity
        // --------------------------------------------------------------------
        for (var iAlarms = 0; iAlarms < modalArray.length; iAlarms++) {
            var alarmSev = modalArray[iAlarms]["severity"];
            if (alarmSev == "Error") {
                sevArrError.push(modalArray[iAlarms]);
            }
            else if (alarmSev == "Warning") {
                sevArrWarning.push(modalArray[iAlarms]);
            }
        }



        // Sort the new Array
        sevArrError.sort(function (a, b) {
            var c = new Date(a.created);
            var d = new Date(b.created);
            return d - c;
        });
        sevArrWarning.sort(function (a, b) {
            var c = new Date(a.created);
            var d = new Date(b.created);
            return d - c;
        });

        for (let i = 0; i < sevArrError.length; i++) {
            finalTableArr.push(sevArrError[i]);

        }

        for (let i = 0; i < sevArrWarning.length; i++) {
            finalTableArr.push(sevArrWarning[i]);

        }
        newrowData = finalTableArr[idData];

        var acknowledgeBool, diskButtonBool;

        var sourceVAR = newrowData['source'];
        var idVar = newrowData['id'];
        var idHostVar = newrowData['hostid'];
        if (boolResult == "Administrator" || boolResult == "User") {
            var acknowledgeButton = "<button id=\"ackButtonCust\" onclick=\"acknowledgeAlarm(" + newrowData['id'] + ", '" + newrowData['serverName'] + "')\"  data-dismiss=\"modal\" class=\"btn btn-dark\" type=\"button\" >Acknowledge Alarm</button>";

            acknowledgeBool = true;
        }
        else {
            acknowledgeBool = false;
        }
        if (sourceVAR == "DiskSpace" && (boolResult == "Administrator" || boolResult == "User")) {
            var diskButton = "<button id=\"diskButtonCust\" onclick=\"getDiskInfo(" + newrowData['hostid'] + ")\" class=\"btn btn-dark\" type=\"button\" data-toggle=\"collapse\" data-target=\".multi-collapse-threshold\" aria-expanded=\"false\" aria-controls=\"multiCollapseAdjustThreshold\">Adjust Alarm Threshold</button>";
            diskButtonBool = true;
        }
        else {
            diskButtonBool = false;
        }


        var clientVAR = newrowData['serverName'];
        var currentStatusVAR = newrowData['currentstatus'];
        var severityVAR = newrowData['severity'];
        var sitenameVAR = newrowData['sitename'];
        var hostnameVAR = newrowData['hostname'];
        var descriptionVAR = newrowData['description'];
        var messageVAR = newrowData['message'];
        var categoryVAR = newrowData['category'];
        var createdVAR = newrowData['created'];
        var updatedVAR = newrowData['updated'];
        var updatedbyVAR = newrowData['updatedby'];

        //for the active not active icon
        // var isActiveVAR = newrowData['currentstatus']
        document.getElementById("idData").innerHTML = idVar;
        document.getElementById("hostidData").innerHTML = idHostVar;
        document.getElementById("clientData").innerHTML = clientVAR;
        document.getElementById("currentStatus").innerHTML = currentStatusVAR;
        document.getElementById("severity").innerHTML = severityVAR;
        document.getElementById("sitenameData").innerHTML = sitenameVAR;
        document.getElementById("hostnameData").innerHTML = hostnameVAR;
        document.getElementById("descriptionData").innerHTML = descriptionVAR;
        document.getElementById("messageData").innerHTML = messageVAR;
        document.getElementById("sourceData").innerHTML = sourceVAR;
        document.getElementById("categoryData").innerHTML = categoryVAR;
        document.getElementById("createdData").innerHTML = createdVAR;
        document.getElementById("updatedData").innerHTML = updatedVAR;
        document.getElementById("updatebyData").innerHTML = updatedbyVAR;
        if (acknowledgeBool == true && (currentStatusVAR != 'RESET' || currentStatusVAR != 'CLEARED')) {
            document.getElementById('getAckBtn').innerHTML = acknowledgeButton;
        }
        else {
            document.getElementById('getAckBtn').innerHTML = "";
        }
        if (diskButtonBool == true) {
            // document.getElementById('getDiskInfoBtn').innerHTML = diskButton;
            document.getElementById('getDiskInfoBtn').innerHTML = "";
        }
        else {
            document.getElementById('getDiskInfoBtn').innerHTML = "";
        }


    }

}
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                         CUSTOM DIRECT FILTER ALARM MODAL
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------

// Specifically for the main page table
function getCustomDirectAlarmModal(idData) {

    // var arrayAlarmVAR, idVar, sitenameVAR, hostnameVAR, messageVAR,  descriptionVAR,sourceVAR, categoryVAR, createdVAR, updatedVAR,updatedbyVAR;

    var newrowData;
    var modalArray = [];
    var finalTableArr = [];
    var sevArrError = [];
    var sevArrWarning = [];

    var kvp = document.location.hash.substr(1).split('=');
    var keyParam = kvp[1];



    var boolResult = checkAuthorization();


    if (receiveCustomDirectReq.readyState == 4) {
        var dbDataVAR = JSON.parse(receiveCustomDirectReq.responseText);
        var arrayAlarmVAR = dbDataVAR['queryresult'];




        for (var iAlarms = 0; iAlarms < arrayAlarmVAR.length; iAlarms++) {
            arrayAlarmVAR[iAlarms][nameofServer] = directServerName;
            modalArray.push(arrayAlarmVAR[iAlarms]);
        }

        // --------------------------------------------------------------------  
        // ----------------------------  Split to new arrays based on severity
        // --------------------------------------------------------------------
        for (var iAlarms = 0; iAlarms < modalArray.length; iAlarms++) {
            var alarmSev = modalArray[iAlarms]["severity"];
            if (alarmSev == "Error") {
                sevArrError.push(modalArray[iAlarms]);
            }
            else if (alarmSev == "Warning") {
                sevArrWarning.push(modalArray[iAlarms]);
            }
        }



        // Sort the new Array
        sevArrError.sort(function (a, b) {
            var c = new Date(a.created);
            var d = new Date(b.created);
            return d - c;
        });
        sevArrWarning.sort(function (a, b) {
            var c = new Date(a.created);
            var d = new Date(b.created);
            return d - c;
        });

        for (let i = 0; i < sevArrError.length; i++) {
            finalTableArr.push(sevArrError[i]);

        }

        for (let i = 0; i < sevArrWarning.length; i++) {
            finalTableArr.push(sevArrWarning[i]);

        }
        newrowData = finalTableArr[idData];



        var acknowledgeBool, diskButtonBool;

        var sourceVAR = newrowData['source'];
        var idVar = newrowData['id'];
        var idHostVar = newrowData['hostid'];
        if (boolResult == "Administrator" || boolResult == "User") {
            var acknowledgeButton = "<button id=\"ackButtonCust\" onclick=\"acknowledgeAlarm(" + newrowData['id'] + ", '" + newrowData['serverName'] + "')\" data-dismiss=\"modal\" class=\"btn btn-dark\" type=\"button\" >Acknowledge Alarm</button>";

            acknowledgeBool = true;
        }
        else {
            acknowledgeBool = false;
        }
        if (sourceVAR == "DiskSpace" && (boolResult == "Administrator" || boolResult == "User")) {
            var diskButton = "<button id=\"diskButtonCust\" onclick=\"getDiskInfo(" + newrowData['hostid'] + ")\" class=\"btn btn-dark\" type=\"button\" data-toggle=\"collapse\" data-target=\".multi-collapse-threshold\" aria-expanded=\"false\" aria-controls=\"multiCollapseAdjustThreshold\">Adjust Alarm Threshold</button>";
            diskButtonBool = true;
        }
        else {
            diskButtonBool = false;
        }


        var clientVAR = newrowData['serverName'];
        var currentStatusVAR = newrowData['currentstatus'];
        var severityVAR = newrowData['severity'];
        var sitenameVAR = newrowData['sitename'];
        var hostnameVAR = newrowData['hostname'];
        var descriptionVAR = newrowData['description'];
        var messageVAR = newrowData['message'];
        var categoryVAR = newrowData['category'];
        var createdVAR = newrowData['created'];
        var updatedVAR = newrowData['updated'];
        var updatedbyVAR = newrowData['updatedby'];

        //for the active not active icon
        // var isActiveVAR = newrowData['currentstatus']
        document.getElementById("idData").innerHTML = idVar;
        document.getElementById("hostidData").innerHTML = idHostVar;
        document.getElementById("clientData").innerHTML = clientVAR;
        document.getElementById("currentStatus").innerHTML = currentStatusVAR;
        document.getElementById("severity").innerHTML = severityVAR;
        document.getElementById("sitenameData").innerHTML = sitenameVAR;
        document.getElementById("hostnameData").innerHTML = hostnameVAR;
        document.getElementById("descriptionData").innerHTML = descriptionVAR;
        document.getElementById("messageData").innerHTML = messageVAR;
        document.getElementById("sourceData").innerHTML = sourceVAR;
        document.getElementById("categoryData").innerHTML = categoryVAR;
        document.getElementById("createdData").innerHTML = createdVAR;
        document.getElementById("updatedData").innerHTML = updatedVAR;
        document.getElementById("updatebyData").innerHTML = updatedbyVAR;
        if (acknowledgeBool == true && (currentStatusVAR != 'RESET' || currentStatusVAR != 'CLEARED')) {
            document.getElementById('getAckBtn').innerHTML = acknowledgeButton;
        }
        else {
            document.getElementById('getAckBtn').innerHTML = "";
        }
        if (diskButtonBool == true) {
            // document.getElementById('getDiskInfoBtn').innerHTML = diskButton;
            document.getElementById('getDiskInfoBtn').innerHTML = "";
        }
        else {
            document.getElementById('getDiskInfoBtn').innerHTML = "";
        }


    }

}
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                         CUSTOM VODACOM FILTER ALARM MODAL
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------

// Specifically for the main page table
function getCustomVodacomAlarmModal(idData) {

    // var arrayAlarmVAR, idVar, sitenameVAR, hostnameVAR, messageVAR,  descriptionVAR,sourceVAR, categoryVAR, createdVAR, updatedVAR,updatedbyVAR;

    var newrowData;
    var modalArray = [];
    var finalTableArr = [];
    var sevArrError = [];
    var sevArrWarning = [];

    var kvp = document.location.hash.substr(1).split('=');
    var keyParam = kvp[1];



    var boolResult = checkAuthorization();


    if (receiveCustomVodaReq.readyState == 4) {

        var dbVodaDataVAR = JSON.parse(receiveCustomVodaReq.responseText);
        var arrayVodaAlarmVAR = dbVodaDataVAR['queryresult'];



        for (var iAlarms = 0; iAlarms < arrayVodaAlarmVAR.length; iAlarms++) {
            arrayVodaAlarmVAR[iAlarms][nameofServer] = vodaServerName;
            modalArray.push(arrayVodaAlarmVAR[iAlarms]);
        }

        // --------------------------------------------------------------------  
        // ----------------------------  Split to new arrays based on severity
        // --------------------------------------------------------------------
        for (var iAlarms = 0; iAlarms < modalArray.length; iAlarms++) {
            var alarmSev = modalArray[iAlarms]["severity"];
            if (alarmSev == "Error") {
                sevArrError.push(modalArray[iAlarms]);
            }
            else if (alarmSev == "Warning") {
                sevArrWarning.push(modalArray[iAlarms]);
            }
        }



        // Sort the new Array
        sevArrError.sort(function (a, b) {
            var c = new Date(a.created);
            var d = new Date(b.created);
            return d - c;
        });
        sevArrWarning.sort(function (a, b) {
            var c = new Date(a.created);
            var d = new Date(b.created);
            return d - c;
        });

        for (let i = 0; i < sevArrError.length; i++) {
            finalTableArr.push(sevArrError[i]);

        }

        for (let i = 0; i < sevArrWarning.length; i++) {
            finalTableArr.push(sevArrWarning[i]);

        }
        newrowData = finalTableArr[idData];



        var acknowledgeBool, diskButtonBool;

        var sourceVAR = newrowData['source'];
        var idVar = newrowData['id'];
        var idHostVar = newrowData['hostid'];
        if (boolResult == "Administrator" || boolResult == "User") {
            var acknowledgeButton = "<button id=\"ackButtonCust\" onclick=\"acknowledgeAlarm(" + newrowData['id'] + ", '" + newrowData['serverName'] + "')\" data-dismiss=\"modal\" class=\"btn btn-dark\" type=\"button\" >Acknowledge Alarm</button>";

            acknowledgeBool = true;
        }
        else {
            acknowledgeBool = false;
        }
        if (sourceVAR == "DiskSpace" && (boolResult == "Administrator" || boolResult == "User")) {
            var diskButton = "<button id=\"diskButtonCust\" onclick=\"getDiskInfo(" + newrowData['hostid'] + ")\" class=\"btn btn-dark\" type=\"button\" data-toggle=\"collapse\" data-target=\".multi-collapse-threshold\" aria-expanded=\"false\" aria-controls=\"multiCollapseAdjustThreshold\">Adjust Alarm Threshold</button>";
            diskButtonBool = true;
        }
        else {
            diskButtonBool = false;
        }


        var clientVAR = newrowData['serverName'];
        var currentStatusVAR = newrowData['currentstatus'];
        var severityVAR = newrowData['severity'];
        var sitenameVAR = newrowData['sitename'];
        var hostnameVAR = newrowData['hostname'];
        var descriptionVAR = newrowData['description'];
        var messageVAR = newrowData['message'];
        var categoryVAR = newrowData['category'];
        var createdVAR = newrowData['created'];
        var updatedVAR = newrowData['updated'];
        var updatedbyVAR = newrowData['updatedby'];

        //for the active not active icon
        // var isActiveVAR = newrowData['currentstatus']
        document.getElementById("idData").innerHTML = idVar;
        document.getElementById("hostidData").innerHTML = idHostVar;
        document.getElementById("clientData").innerHTML = clientVAR;
        document.getElementById("currentStatus").innerHTML = currentStatusVAR;
        document.getElementById("severity").innerHTML = severityVAR;
        document.getElementById("sitenameData").innerHTML = sitenameVAR;
        document.getElementById("hostnameData").innerHTML = hostnameVAR;
        document.getElementById("descriptionData").innerHTML = descriptionVAR;
        document.getElementById("messageData").innerHTML = messageVAR;
        document.getElementById("sourceData").innerHTML = sourceVAR;
        document.getElementById("categoryData").innerHTML = categoryVAR;
        document.getElementById("createdData").innerHTML = createdVAR;
        document.getElementById("updatedData").innerHTML = updatedVAR;
        document.getElementById("updatebyData").innerHTML = updatedbyVAR;
        if (acknowledgeBool == true && (currentStatusVAR != 'RESET' || currentStatusVAR != 'CLEARED')) {
            document.getElementById('getAckBtn').innerHTML = acknowledgeButton;
        }
        else {
            document.getElementById('getAckBtn').innerHTML = "";
        }
        if (diskButtonBool == true) {
            // document.getElementById('getDiskInfoBtn').innerHTML = diskButton;
            document.getElementById('getDiskInfoBtn').innerHTML = "";
        }
        else {
            document.getElementById('getDiskInfoBtn').innerHTML = "";
        }

    }

}





// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------



// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                         MAIN ACTIVE ALARM MODAL
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------

// Specifically for the main page table
function getAlarmModal(idData) {

    var acknowledgeBool, diskButtonBool;
    // var arrayAlarmVAR, idVar, sitenameVAR, hostnameVAR, messageVAR,  descriptionVAR,sourceVAR, categoryVAR, createdVAR, updatedVAR,updatedbyVAR;

    var newrowData;
    var modalArray = [];
    var finalTableArr = [];
    var sevArrError = [];
    var sevArrWarning = [];

    var kvp = document.location.hash.substr(1).split('=');
    var keyParam = kvp[1];



    var boolResult = checkAuthorization();


    if (receiveReq.readyState == 4) {
        var dbDataVAR = JSON.parse(receiveReq.responseText);
        var arrayAlarmVAR = dbDataVAR['queryresult'];

        // var dbVodaDataVAR = JSON.parse(receiveVodaReq.responseText);
        // var arrayVodaAlarmVAR = dbVodaDataVAR['queryresult'];





        for (var iAlarms = 0; iAlarms < arrayAlarmVAR.length; iAlarms++) {
            arrayAlarmVAR[iAlarms][nameofServer] = directServerName;
            modalArray.push(arrayAlarmVAR[iAlarms]);
        }
        // for (var iAlarms = 0; iAlarms < arrayVodaAlarmVAR.length; iAlarms++) {
        //     arrayVodaAlarmVAR[iAlarms][nameofServer] = vodaServerName;
        //     modalArray.push(arrayVodaAlarmVAR[iAlarms]);
        // }

        // --------------------------------------------------------------------  
        // ----------------------------  Split to new arrays based on severity
        // --------------------------------------------------------------------
        for (var iAlarms = 0; iAlarms < modalArray.length; iAlarms++) {
            var alarmSev = modalArray[iAlarms]["severity"];
            if (alarmSev == "Error") {
                sevArrError.push(modalArray[iAlarms]);
            }
            else if (alarmSev == "Warning") {
                sevArrWarning.push(modalArray[iAlarms]);
            }
        }



        // Sort the new Array
        sevArrError.sort(function (a, b) {
            var c = new Date(a.created);
            var d = new Date(b.created);
            return d - c;
        });
        sevArrWarning.sort(function (a, b) {
            var c = new Date(a.created);
            var d = new Date(b.created);
            return d - c;
        });

        for (let i = 0; i < sevArrError.length; i++) {
            finalTableArr.push(sevArrError[i]);

        }

        for (let i = 0; i < sevArrWarning.length; i++) {
            finalTableArr.push(sevArrWarning[i]);

        }
        newrowData = finalTableArr[idData];

        var acknowledgeBool, diskButtonBool;

        var sourceVAR = newrowData['source'];
        var idVar = newrowData['id'];
        var idHostVar = newrowData['hostid'];
        var serverUsageHostId = idHostVar;
        var serverUsageSiteId = newrowData['siteid'];



        // var diskButton = "<button id=\"diskButtonCust\" onclick=\"getDiskInfo(" + newrowData['hostid'] + ")\" class=\"btn btn-dark\" type=\"button\" data-toggle=\"collapse\" data-target=\".multi-collapse-threshold\" aria-expanded=\"false\" aria-controls=\"multiCollapseAdjustThreshold\">Adjust Alarm Threshold</button>";
        if (boolResult == "Administrator" || boolResult == "User") {
            var acknowledgeButton = "<button id=\"ackButtonCust\" onclick=\"acknowledgeAlarm(" + newrowData['id'] + ", '" + newrowData['serverName']
                + "')\" data-dismiss=\"modal\" class=\"btn btn-dark\" type=\"button\" >Acknowledge Alarm</button>";

            var clearButton = "<button id=\"clearButtonCust\" data-toggle=\"modal\" data-target=\"#modalClearConfirm\" onclick=\" isClearedModal(" + newrowData['id'] + ", '" + newrowData['serverName']
                + "', " + idData + ")\" data-dismiss=\"modal\" class=\"btn btn-dark\" type=\"button\" >Clear Alarm</button>";


            var diskButton = "<a href=\"serverDiskUsage.html#&key=" + userkeyForModal + "#&siteId=" + serverUsageSiteId + "#&host=" + serverUsageHostId + "\"><button class=\"btn btn-dark\" type=\"button\" id=\"diskButtonCust\" ><i class=\"fas fa-line-chart\"></i>View Server Usage</button></a>";

            // var clearButton = "<button id=\"clearButtonCust\" data-toggle=\"modal\" data-target=\"#modalClearConfirm\" onclick=\" isClearedModal(" + newrowData['id'] + ", '" + newrowData['serverName']
            // +"')\" class=\"btn btn-dark\" type=\"button\" >Clear Alarm</button>";

            acknowledgeBool = true;
            diskButtonBool = true;
        }
        else {
            acknowledgeBool = false;
        }
        if (sourceVAR == "DiskSpace" && (boolResult == "Administrator" || boolResult == "User")) {
            var diskButton = "<a href=\"serverDiskUsage.html#&key=" + userkeyForModal + "#&siteId=" + serverUsageSiteId + "#&host=" + serverUsageHostId + "\"><button class=\"btn btn-dark\" type=\"button\" id=\"diskButtonCust\" ><i class=\"fas fa-line-chart\"></i>View Server Usage</button></a>";

            diskButtonBool = true;
        }
        else {
            diskButtonBool = false;
        }


        var clientVAR = newrowData['serverName'];
        var currentStatusVAR = newrowData['currentstatus'];
        var severityVAR = newrowData['severity'];
        var sitenameVAR = newrowData['sitename'];
        var hostnameVAR = newrowData['hostname'];
        var descriptionVAR = newrowData['description'];
        var messageVAR = newrowData['message'];
        var categoryVAR = newrowData['category'];
        var createdVAR = newrowData['created'];
        var updatedVAR = newrowData['updated'];
        var updatedbyVAR = newrowData['updatedby'];

        //for the active not active icon
        // var isActiveVAR = newrowData['currentstatus']
        document.getElementById("idData").innerHTML = idVar;
        document.getElementById("hostidData").innerHTML = idHostVar;
        document.getElementById("clientData").innerHTML = clientVAR;
        document.getElementById("currentStatus").innerHTML = currentStatusVAR;
        document.getElementById("severity").innerHTML = severityVAR;
        document.getElementById("sitenameData").innerHTML = sitenameVAR;
        document.getElementById("hostnameData").innerHTML = hostnameVAR;
        document.getElementById("descriptionData").innerHTML = descriptionVAR;
        document.getElementById("messageData").innerHTML = messageVAR;
        document.getElementById("sourceData").innerHTML = sourceVAR;
        document.getElementById("categoryData").innerHTML = categoryVAR;
        document.getElementById("createdData").innerHTML = createdVAR;
        document.getElementById("updatedData").innerHTML = updatedVAR;
        document.getElementById("updatebyData").innerHTML = updatedbyVAR;
        if (acknowledgeBool == true && (currentStatusVAR != 'RESET' || currentStatusVAR != 'CLEARED')) {
            document.getElementById('getAckBtn').innerHTML = acknowledgeButton;
            document.getElementById('getClrBtn').innerHTML = clearButton;
        }
        else {
            document.getElementById('getAckBtn').innerHTML = "";
        }
        if (diskButtonBool == true) {
            document.getElementById('getDiskInfoBtn').innerHTML = diskButton;
            // document.getElementById('getDiskInfoBtn').innerHTML = "";
        }
        else {
            document.getElementById('getDiskInfoBtn').innerHTML = "";
        }


    }

}
