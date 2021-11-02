
function getXmlHttpRequestObject() {  //Gets the browser specific XmlHttpRequest Object
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest(); 	//Not IE
    } else if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP"); //IE
    } else {
        alert("Your browser doesn't want to use AJAX"); //Displays error message 
    }
}


var receiveReq = getXmlHttpRequestObject();
var receiveHostReq = getXmlHttpRequestObject();
var receiveCardReq = getXmlHttpRequestObject();
var receiveHDDCardReq = getXmlHttpRequestObject();
var receiveSitesReq = getXmlHttpRequestObject();
var receiveCPUStatReq = getXmlHttpRequestObject();
var receiveMemStatReq = getXmlHttpRequestObject();

//var serverURL = "http://102.164.81.12:7080/InovoCentralMonitorClient";
// var serverURL = "https://41.0.203.210:8443/InovoCentralMonitorClient";
// var serverURL = "http://192.168.51.27:7080/InovoCentralMonitorClient";
var serverURL = "/InovoCentralMonitorClient";
// var serverURL = "http://monitor.inovolab.com:7080/InovoCentralMonitorClient";

//209	-	WFS
//27 	-	KP
// ------------------------------------------------------------------------------------------------------
// USER MANAGEMENT
// ------------------------------------------------------------------------------------------------------
var userManagementProfileReq = getXmlHttpRequestObject();
var userRelogProfileReq = getXmlHttpRequestObject();
var userProfilereq = getXmlHttpRequestObject();
var hostUpdateIDReq = getXmlHttpRequestObject();
var hostUpdateReq = getXmlHttpRequestObject();
var createUserlogReq = getXmlHttpRequestObject();

var modalHostId = "";
var modalSiteId = "";
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
    if (menuValue == "" && menuToggle == "Open") {
        menuWrapper.setAttribute("style", "display: none;")
        menuToggle = "Closed";
    } 
}

function startPage() {

    requestUserManagementList();
    var loggedIn;
    var userHash = window.location.hash;
    var key = userHash.replace('#&key=', '');

    if (key.includes('#&host')) {
        values = key.split("#");

        key = values[0];
        modalHostId = values[2].replace('&host=', '');
        modalSiteId = values[1].replace('&siteId=', '');
    }

    if (key != "" && key != undefined) {
        var query = "SELECT InovoMonitor.tblUsers.id, InovoMonitor.tblUsers.username, InovoMonitor.tblUsers.userpassword,InovoMonitor.tblUsers.usersurname,InovoMonitor.tblUsers.userkey,InovoMonitor.tblUsers.userlogin,InovoMonitor.tblUsers.usertype,InovoMonitor.tblUsers.useractive,InovoMonitor.tblUserTypes.description FROM InovoMonitor.tblUsers INNER JOIN InovoMonitor.tblUserTypes ON InovoMonitor.tblUserTypes.id = InovoMonitor.tblUsers.usertype;";

        userRelogProfileReq.open("POST", serverURL + "/MonitorData", true);

        userRelogProfileReq.onreadystatechange = checkLoggedInUser;
        userRelogProfileReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        userRelogProfileReq.send("action=runopenquery&query=" + query);

    }
    else {
        var modalLogin = document.getElementById("modal-login");
        modalLogin.style.display = "block";
        document.getElementById('modal-login').addEventListener('keypress', function (e) {
            var key = e.which || e.keyCode;
            if (key === 13) {
                checkAuth();
            }
        });
    }


    // var toastMessage = date;
    // var toastObj = document.getElementById("toastMessage");
    // var newScheduleStartDate = document.getElementById("StartDate");
    // toastObj.innerHTML = toastMessage;
    // $(function () { $('#mainPageToastAlert').toast('show'); }, 15000);

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
//                                            CHECK USER AUTHENTICATION
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------

function checkLoggedInUser() {
    var loggedIn;
    var userLoggedIn;
    var userHash = window.location.hash;
    var userkey = userHash.replace('#&key=', '');



    if (userManagementProfileReq.readyState == 4 && userRelogProfileReq.readyState == 4) {
        if (userkey.includes('#&host')) {
            values = userkey.split("#");

            userkey = values[0];
            // modalHostId = values[2].replace('&host=','');
            // modalSiteId = values[1].replace('&siteId=','');
        }
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

    if(kvp.length == 4){
        kvp.pop();
        kvp.pop();


    }

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
//                                              RETURN USER PROFILE
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------


function returnProfile() {
    var userProfile = "", allUserProfiles = "", userErrorData = "";
    if (userProfilereq.readyState == 4 && userManagementProfileReq.readyState == 4) {
        var uProfileMng;

        var userProfileData = JSON.parse(userProfilereq.responseText);
        userProfile = userProfileData['UserInfo'];

        userErrorData = userProfileData['Error'];
        userErrorCode = userErrorData['ErrorCode'];
        userErrorMessage = userErrorData['ErrorDescription'];

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
    // var newScheduleStartDate = document.getElementById("StartDate");
    var profile = loggedInProfile
    var type = loggedProfileDet['usertype'];
    var key = profile['userKey'];
    var active = loggedProfileDet['useractive'];
    var userlogin = profile['userLogin'];
    var userLevelDesc = loggedProfileDet['description'];
    insertHashParam(key);

    if (active == 1) {
        // if admin user
        if ((type == 1 && profile['userTypeDescription'] == "Administrator") || (type == 2 && profile['userTypeDescription'] == "User")) {
            var homeSiteLink = "<a href=\"index.html#&key=" + key + "\"><i class=\"fas fa-home\"></i> Monitoring Dashboard</a>"
            var hostMaintenanceSiteLink = "<a href=\"hostMaintenanceScheduler.html#&key=" + key + "\"><i class=\"fas fa-hammer\"></i> Maintenance Scheduling</a>";
            var hostManageSiteLink = "<a href=\"hostManagement.html#&key=" + key + "\"><i class=\"fas fa-server\"></i> Host Management</a>";
            var serverMonitorThresholdLink = "<a href=\"ServerMonitorThresholds.html#&key=" + key + "\"><i class=\"fas fa-hdd\"></i> Server Monitor Threshold</a>";

            var diskSpaceTrackingLink = "<a href=\"diskSpaceTracking.html#&key=" + key + "\"><i class=\"fas fa-database\"></i> Disk Space Tracking</a>";
           
            document.getElementById("diskSpaceTrackingLink").innerHTML = diskSpaceTrackingLink;
            var modalLogin = document.getElementById("modal-login");
            var date = new Date().toISOString().slice(0, 10);

            getSites();


            modalLogin.style.display = "none";
            document.getElementById("loginUserId").innerHTML = userlogin + "(" + userLevelDesc + ")";
            document.getElementById("homeSiteLink").innerHTML = homeSiteLink;
            document.getElementById("hostManageLink").innerHTML = hostManageSiteLink;
            document.getElementById("hostMaintenanceLink").innerHTML = hostMaintenanceSiteLink;
            document.getElementById("diskSpaceTrackingLink").innerHTML = diskSpaceTrackingLink;
            document.getElementById("serverMonitorThresholdLink").innerHTML = serverMonitorThresholdLink;
            document.getElementById("login-form").reset();
            // makeMaintenanceTableScroll();
            // makeScheduleTableScroll();

        }
        else if (type == 4 || type == 3) {

            var homeSiteLink = "<a href=\"index.html#&key=" + key + "\"><i class=\"fas fa-home\"></i> Monitoring Dashboard</a>"
            var hostMaintenanceSiteLink = "";
            var hostManageSiteLink = "";
            var serverMonitorThresholdLink = "";
            var UserManagementLink = "";

            var modalLogin = document.getElementById("modal-login");

            getSites();
            modalLogin.style.display = "none";
            // restructureElementsForWallboardUser();
            document.getElementById("loginUserId").innerHTML = userlogin + "(" + userLevelDesc + ")";


            document.getElementById("homeSiteLink").innerHTML = homeSiteLink;
            document.getElementById("hostMaintenanceLink").innerHTML = hostMaintenanceSiteLink;
            document.getElementById("hostManageLink").innerHTML = hostManageSiteLink;
            document.getElementById("serverMonitorThresholdLink").innerHTML = serverMonitorThresholdLink;
            // 
            // document.getElementById("userManagementLink").innerHTML = UserManagementLink;
            document.getElementById("login-form").reset();


        }
        else {
            var userN = document.getElementById("username-login");
            var passW = document.getElementById("password-login");

            document.getElementById("errorMessage").innerHTML = "ERROR: [" + userlogin + "] You are not an authorized user please contact Inovo for further details.";

            document.getElementById("login-form").reset();
            passW.style.border = "1px solid #ff0000";
            userN.style.border = "1px solid #ff0000";
            userN.focus();
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
    insertHashParam(key);
}




function getDiskStats(hostId) {
    //	alert("getSQLStats");
    Plotly.newPlot(document.getElementById('dsk0'), [], {}, {});
    // Plotly.newPlot(document.getElementById('dsk1'), [], {}, {});
    // Plotly.newPlot(document.getElementById('dsk2'), [], {}, {});
    // Plotly.newPlot(document.getElementById('dsk3'), [], {}, {});
    // Plotly.newPlot(document.getElementById('dsk4'), [], {}, {});
    // Plotly.newPlot(document.getElementById('dsk5'), [], {}, {});
    doWaitCursor();

    var query = "SELECT diskDevice,diskSize/1024/1024/1024 as diskSize,diskSpaceUsed/1024/1024/1024 as diskSpaceUsed,updated FROM (SELECT MAX(id) as id2,diskDevice as dev2,DATE(updated) as updated2 FROM tblSvrDiskUsage t WHERE hostid=" + hostId + " group by dev2,updated2) k1 LEFT JOIN tblSvrDiskUsage s on s.id=k1.id2;";
    receiveReq.open("GET", serverURL + "/MonitorData?action=runopenquery&query=" + query, true);
    //Set the function that will be called when the XmlHttpRequest objects state changes.		
    receiveReq.onreadystatechange = getDiskStatsResults;
    receiveReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    receiveReq.send();
}

function getDiskStatsResults() {
    if (receiveReq.readyState == 4) {
        //Here we should have some JSON data !!

        var jsonObj = JSON.parse(showError(receiveReq.responseText, "Error Found"));

        var results = jsonObj['queryresult'];
        endWaitCursor();
        //		alert(JSON.stringify(results));


    }
}

function getCPUStats(hostId) {
    //	alert("getSQLStats");
    Plotly.newPlot(document.getElementById('dsk0'), [], {}, {});
    // Plotly.newPlot(document.getElementById('dsk1'), [], {}, {});
    // Plotly.newPlot(document.getElementById('dsk2'), [], {}, {});
    // Plotly.newPlot(document.getElementById('dsk3'), [], {}, {});
    // Plotly.newPlot(document.getElementById('dsk4'), [], {}, {});
    // Plotly.newPlot(document.getElementById('dsk5'), [], {}, {});
    doWaitCursor();


    var query = " SELECT "
        + "hostip, "
        + "cpuPers as cpuPercentage, "
        + "updated "
        + "FROM "
        + "(SELECT MAX(id) as id2,"
        + "hostip as dev2,DATE(updated) as updated2 "
        + "FROM tblSvrCpuUsage t "
        + "WHERE hostid=" + hostId + " "
        + "group by dev2,updated2) k1 "
        + "LEFT JOIN tblSvrCpuUsage s on s.id=k1.id2;";

    receiveCPUStatReq.open("GET", serverURL + "/MonitorData?action=runopenquery&query=" + query, true);
    //Set the function that will be called when the XmlHttpRequest objects state changes.		
    receiveCPUStatReq.onreadystatechange = getDiskStatsResults;
    receiveCPUStatReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    receiveCPUStatReq.send();
}

function getCPUStatsResults() {
    if (receiveCPUStatReq.readyState == 4) {
        //Here we should have some JSON data !!

        var jsonObj = JSON.parse(showError(receiveCPUStatReq.responseText, "Error Found"));

        var results = jsonObj['queryresult'];
        endWaitCursor();
        //		alert(JSON.stringify(results));


    }
}
function getMemStats(hostId) {
    //	alert("getSQLStats");
    Plotly.newPlot(document.getElementById('dsk0'), [], {}, {});
    // Plotly.newPlot(document.getElementById('dsk1'), [], {}, {});
    // Plotly.newPlot(document.getElementById('dsk2'), [], {}, {});
    // Plotly.newPlot(document.getElementById('dsk3'), [], {}, {});
    // Plotly.newPlot(document.getElementById('dsk4'), [], {}, {});
    // Plotly.newPlot(document.getElementById('dsk5'), [], {}, {});
    doWaitCursor();



    var query = "  SELECT  "
        + "hostname, "
        + "memoryTotal/1024/1024/1024 as memSize, "
        + "memoryUsed/1024/1024/1024 as memUsed, "
        + "updated  "
        + "FROM  "
        + "(SELECT  "
        + "MAX(id) as id2, "
        + "hostname as dev2,DATE(updated) as updated2  "
        + "FROM tblSvrMemoryUsage t  "
        + "WHERE hostid=" + hostId + " "
        + "group by dev2,updated2) k1  "
        + "LEFT JOIN tblSvrMemoryUsage s on s.id=k1.id2; ";

    receiveMemStatReq.open("GET", serverURL + "/MonitorData?action=runopenquery&query=" + query, true);
    //Set the function that will be called when the XmlHttpRequest objects state changes.		
    receiveMemStatReq.onreadystatechange = getDiskStatsResults;
    receiveMemStatReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    receiveMemStatReq.send();
}

function getMemStatsResults() {
    if (receiveCPUStatReq.readyState == 4) {
        //Here we should have some JSON data !!

        var jsonObj = JSON.parse(showError(receiveCPUStatReq.responseText, "Error Found"));

        var results = jsonObj['queryresult'];
        endWaitCursor();
        //		alert(JSON.stringify(results));


    }
}

function getDiskStatsChosenResults(diskDeviceChosen) {
    if (receiveReq.readyState == 4) {
        //Here we should have some JSON data !!

        var jsonObj = JSON.parse(receiveReq.responseText);

        var results = jsonObj['queryresult'];
        endWaitCursor();
        //		alert(JSON.stringify(results));

        var devArray = [];
        for (var n = 0; n < results.length; n++) {
            var valObj = results[n];
            devArray = getDevices(devArray, valObj['diskDevice']);
        }


        for (var i = 0; i < devArray.length; i++) {
            if (diskDeviceChosen == devArray[i]) {
                var diskTotalSpace = getObjDiskElementFromArray(results, 'diskSize', devArray[i], 0);
                var diskUsed = getObjDiskElementFromArray(results, 'diskSpaceUsed', devArray[i], 0);
                var jsonArrTimeStamp = getObjDiskElementFromArray(results, 'updated', devArray[i], 0);

                newGraph(document.getElementById('dsk0'), "Disk Usage (" + devArray[i] + ")", "Usage (GB)", jsonArrTimeStamp, diskUsed, devArray[i]);
                drawGraph(document.getElementById('dsk0'), "Disk Usage (" + devArray[i] + ")", "Usage (GB)", jsonArrTimeStamp, diskTotalSpace, devArray[i] + "_Total");
            }
        }
    }
}

function getCPUStatsChosenResults() {
    if (receiveCPUStatReq.readyState == 4) {
        //Here we should have some JSON data !!

        var jsonObj = JSON.parse(receiveCPUStatReq.responseText);

        var results = jsonObj['queryresult'];
        endWaitCursor();
        //		alert(JSON.stringify(results));

        var devArray = [];
        for (var n = 0; n < results.length; n++) {
            var valObj = results[n];
            devArray = getDevices(devArray, valObj['hostip']);
        }


        for (var i = 0; i < devArray.length; i++) {
            // if (diskDeviceChosen == devArray[i]) {
            var CPUTotalSpace = getObjCPULevelElementFromArray(results, '100');
            var CPUUsed = getObjCPUElementFromArray(results, 'cpuPers', devArray[i], 0);
            var jsonArrTimeStamp = getObjCPUElementFromArray(results, 'updated', devArray[i], 0);

            newGraph(document.getElementById('dsk0'), "CPU Usage (" + devArray[i] + ")", "Usage (GB)", jsonArrTimeStamp, CPUUsed, devArray[i]);
            drawGraph(document.getElementById('dsk0'), "CPU Usage (" + devArray[i] + ")", "Usage (GB)", jsonArrTimeStamp, CPUTotalSpace, devArray[i] + "_Total");
            // }
        }
    }
}

function getMemStatsChosenResults() {
    if (receiveMemStatReq.readyState == 4) {
        //Here we should have some JSON data !!

        var jsonObj = JSON.parse(receiveMemStatReq.responseText);

        var results = jsonObj['queryresult'];
        endWaitCursor();
        //		alert(JSON.stringify(results));

        var devArray = [];
        for (var n = 0; n < results.length; n++) {
            var valObj = results[n];
            devArray = getDevices(devArray, valObj['hostname']);
        }


        for (var i = 0; i < devArray.length; i++) {
            //if (diskDeviceChosen == devArray[i]) {
            var diskTotalSpace = getObjMemElementFromArray(results, 'memSize', devArray[i], 0);
            var diskUsed = getObjMemElementFromArray(results, 'memUsed', devArray[i], 0);
            var jsonArrTimeStamp = getObjMemElementFromArray(results, 'updated', devArray[i], 0);

            newGraph(document.getElementById('dsk0'), "Memory Usage (" + devArray[i] + ")", "Usage (GB)", jsonArrTimeStamp, diskUsed, devArray[i]);
            drawGraph(document.getElementById('dsk0'), "Memory Usage (" + devArray[i] + ")", "Usage (GB)", jsonArrTimeStamp, diskTotalSpace, devArray[i] + "_Total");
            //}
        }
    }
}

function getSites() {

    var query = "SELECT InovoMonitor.tblSites.id, "
        + "InovoMonitor.tblSites.sitename "
        + "FROM InovoMonitor.tblSites "
        + "INNER JOIN InovoMonitor.tblHosts ON InovoMonitor.tblSites.id = InovoMonitor.tblHosts.siteid "
        + "WHERE  InovoMonitor.tblHosts.enabled = 1 "
        + "GROUP BY InovoMonitor.tblSites.id, InovoMonitor.tblSites.sitename "
        + "ORDER BY InovoMonitor.tblSites.sitename;";



    // var check =  serverURL + "/MonitorData" + "action=runopenquery&query=" + query;

    receiveSitesReq.open("GET", serverURL + "/MonitorData?action=runopenquery&query=" + query, true);
    // receiveSitesReq.open("GET", serverURL + "/MonitorData", true);
    // receiveSitesReq.open("POST", serverURL + "/MonitorData", true);
    receiveSitesReq.onreadystatechange = getSitesResult;
    receiveSitesReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    receiveSitesReq.send();
    // receiveSitesReq.send("action=runopenquery&query=" + query);

}

function getSitesResult() {
    var siteTxtData, filData;
    if (receiveSitesReq.readyState == 4) {
        var siteData = JSON.parse(showError(receiveSitesReq.responseText, "Error Found"));

        if (Object.entries(siteData).length != 0) {
            siteProfile = siteData['queryresult'];

            filData = "<option selected=\"\" id=\"siteoption_"+siteProfile[0]['id']+"\" value=\"" + siteProfile[0]['id'] + "\">" + siteProfile[0]['sitename'] + "</option>";
            siteTxtData += filData;
            for (i = 1; i < siteProfile.length; i++) {
                var rowData = siteProfile[i];

                filData = "<option id=\"siteoption_"+rowData['id']+"\" value=\"" + rowData['id'] + "\">" + rowData['sitename'] + "</option>";

                siteTxtData += filData;
            }
            document.getElementById("siteInfo").innerHTML = siteTxtData;

            getHosts();
        }
    }
}

function getHosts() {
    // //	alert("getHosts");
    // receiveReq.open("GET", serverURL + "/ThresholdConfig?action=gethosts&agenttype=ServerMonitor", true);
    // //Set the function that will be called when the XmlHttpRequest objects state changes.		
    // receiveReq.onreadystatechange = getHostsResult;
    // receiveReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // //Make the actual request.		
    // // 	var query = "SELECT * FROM InovoMonitor.tblAlarms t WHERE currentstatus<>'RESET'";
    // receiveReq.send();
    if (modalSiteId != "") {


        //	alert("getHosts");
        var siteId = document.getElementById("siteInfo").value;
        var query = "SELECT  "
            + "InovoMonitor.tblHosts.hostname, "
            + "InovoMonitor.tblHosts.hostagentversion, "
            + "InovoMonitor.tblHosts.hostintip, "
            + "InovoMonitor.tblHosts.hostip, "
            + "InovoMonitor.tblHosts.id, "
            + "InovoMonitor.tblHosts.siteid, "
            + "InovoMonitor.tblHosts.agentid, "
            + "InovoMonitor.tblAgent.agenttype "
            + "FROM InovoMonitor.tblHosts "
            + "INNER JOIN InovoMonitor.tblAgent ON InovoMonitor.tblHosts.agentid = InovoMonitor.tblAgent.id "
            + "INNER JOIN InovoMonitor.tblSites ON InovoMonitor.tblSites.id = InovoMonitor.tblHosts.siteid  "
            + "WHERE InovoMonitor.tblHosts.enabled = 1 AND  InovoMonitor.tblAgent.agenttype in ('ServerMonitor','OpenGateMonitor') AND InovoMonitor.tblSites.id = " + modalSiteId + " "
            + "ORDER BY InovoMonitor.tblHosts.hostname asc;";
    }
    else {
        //	alert("getHosts");
        var siteId = document.getElementById("siteInfo").value;
        var query = "SELECT  "
            + "InovoMonitor.tblHosts.hostname, "
            + "InovoMonitor.tblHosts.hostagentversion, "
            + "InovoMonitor.tblHosts.hostintip, "
            + "InovoMonitor.tblHosts.hostip, "
            + "InovoMonitor.tblHosts.id, "
            + "InovoMonitor.tblHosts.siteid, "
            + "InovoMonitor.tblHosts.agentid, "
            + "InovoMonitor.tblAgent.agenttype "
            + "FROM InovoMonitor.tblHosts "
            + "INNER JOIN InovoMonitor.tblAgent ON InovoMonitor.tblHosts.agentid = InovoMonitor.tblAgent.id "
            + "INNER JOIN InovoMonitor.tblSites ON InovoMonitor.tblSites.id = InovoMonitor.tblHosts.siteid  "
            + "WHERE InovoMonitor.tblHosts.enabled = 1 AND  InovoMonitor.tblAgent.agenttype in ('ServerMonitor','OpenGateMonitor') AND InovoMonitor.tblSites.id = " + siteId + " "
            + "ORDER BY InovoMonitor.tblHosts.hostname asc;";
    }
    receiveHostReq.open("POST", serverURL + "/MonitorData?action=runopenquery&query=" + query, true);
    // receiveReq.open("POST", serverURL + "/MonitorData", true);
    // receiveReq.open("GET", serverURL + "/ThresholdConfig?action=gethosts&agenttype=ServerMonitor,OpengateMonitor", true);
    //Set the function that will be called when the XmlHttpRequest objects state changes.
    receiveHostReq.onreadystatechange = getHostsResult;
    receiveHostReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    //Make the actual request.

    // receiveReq.send("action=runopenquery&query=" + query);
    receiveHostReq.send();
}
function getHostsResult() {
    // //Check to see if the XmlHttpRequests state is finished.		
    // if (receiveReq.readyState == 4) {
    //     //Here we should have some JSON data !!
    //     //		alert(receiveReq.responseText);
    //     document.getElementById('hosts').innerHTML = receiveReq.responseText;
    //     hostselected();
    //     //		var jsonObj = JSON.parse(receiveReq.responseText);	
    //     //		var jsonLastUpdate = jsonObj['lastUpdate'];
    // }

    var filData = "";

    var hostTxtData = "";
    //Check to see if the XmlHttpRequests state is finished.
    if (receiveHostReq.readyState == 4) {
        var hostData = JSON.parse(showError(receiveHostReq.responseText, "Error Found"));

        if (Object.entries(hostData).length != 0) {
            var hostDetails = hostData['queryresult'];
            if (hostDetails.length != 0) {


                var agenttypeFil = hostDetails[0]['agenttype']

                if (agenttypeFil == "OpenGateMonitor") {

                    filData = "<select class=\"custom-select\" onchange=\"hostselected()\" id=\"hostInfo\"><option  selected=\"\" value=\"" + hostDetails[0]['id'] + "\">" + hostDetails[0]['hostname'] + " (" + hostDetails[0]['hostintip'] + ")" + " [OG]" + "</option>";
                }
                else {
                    filData = "<select class=\"custom-select\" onchange=\"hostselected()\" id=\"hostInfo\"><option  selected=\"\" value=\"" + hostDetails[0]['id'] + "\">" + hostDetails[0]['hostname'] + " (" + hostDetails[0]['hostintip'] + ")" + "</option>";
                }
                hostTxtData += filData;

                for (var iAlarm = 1; iAlarm < hostDetails.length; iAlarm++) {
                    var rowData = hostDetails[iAlarm];
                    var agenttypeFil2 = rowData['agenttype']

                    if (agenttypeFil2 == "OpenGateMonitor") {

                        filData = "<option  id=\"hostoption_"+rowData['id']+"\" value=\"" + rowData['id'] + "\">" + rowData['hostname'] + "(" + rowData['hostintip'] + ")" + " [OG]" + "</option>";
                    }
                    else {
                        filData = "<option  id=\"hostoption_"+rowData['id']+"\" value=\"" + rowData['id'] + "\">" + rowData['hostname'] + " (" + rowData['hostintip'] + ")" + "</option>";
                    }

                    hostTxtData += filData;
                }

                hostTxtData += "</select>"

                document.getElementById("hosts").innerHTML = hostTxtData;

                hostselected();
                //		var jsonObj = JSON.parse(receiveReq.responseText);
                //		var jsonLastUpdate = jsonObj['lastUpdate'];

            } else {

                filData = "<select class=\"custom-select\" onchange=\"hostselected()\" id=\"hostInfo\"><option  selected=\"\" value=\"null_1\">No Host Found</option></select>"



                hostTxtData += filData;
                document.getElementById("hosts").innerHTML = hostTxtData;
            }
        }
    }


}

function hostselected() {
    //	alert("hostselected");
    if (modalHostId != "") {
        d = modalHostId;

        document.getElementById('siteoption_'+modalSiteId).setAttribute('selected', "");
        document.getElementById('hostoption_'+modalHostId).setAttribute('selected', "");

        modalHostId = "";
        modalSiteId = "";
    }
    else {
        d = document.getElementById("hostInfo").value;
        //get the disk info for this
        //	alert(d)
    }
    getDiskStats(d);
    getCPUStats(d);
    getMemStats(d);
    getCardStats(d);
}


function getCardStats(hostid) {

    var query =
        "SELECT cpu.cpuPers as CPU, "
        + "mem.persUsed as RAM"
        + ",svr.days "
        + ",svr.hours "
        + ",svr.minutes "
        + "FROM InovoMonitor.vwCpuInfo as cpu "
        + "LEFT JOIN InovoMonitor.vwMemoryInfo as mem "
        + "on mem.hostid = cpu.hostid "
        + "LEFT JOIN InovoMonitor.vwServerUptime as svr "
        + "on svr.hostid = cpu.hostid "
        + "WHERE cpu.hostid = " + hostid + ";";

    var queryHDD =
        "SELECT cpu.cpuPers as CPU, "
        + "disk.diskDevice, "
        + "disk.persUsed as HDD "
        + "FROM InovoMonitor.vwCpuInfo as cpu "
        + "LEFT JOIN InovoMonitor.vwDiskInfo2 as disk "
        + "on disk.hostid = cpu.hostid "
        + "WHERE cpu.hostid = " + hostid + ";";


    // var query = "SELECT diskDevice,diskSize/1024/1024/1024/1024 as diskSize,diskSpaceUsed/1024/1024/1024/1024 as diskSpaceUsed,updated FROM (SELECT MAX(id) as id2,diskDevice as dev2,DATE(updated) as updated2 FROM tblSvrDiskUsage t WHERE hostid=" + hostId + " group by dev2,updated2) k1 LEFT JOIN tblSvrDiskUsage s on s.id=k1.id2;";
    receiveCardReq.open("GET", serverURL + "/MonitorData?action=runopenquery&query=" + query, true);
    //Set the function that will be called when the XmlHttpRequest objects state changes.		
    receiveCardReq.onreadystatechange = getCardStatsResults;
    receiveCardReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    receiveCardReq.send();
    // var query = "SELECT diskDevice,diskSize/1024/1024/1024/1024 as diskSize,diskSpaceUsed/1024/1024/1024/1024 as diskSpaceUsed,updated FROM (SELECT MAX(id) as id2,diskDevice as dev2,DATE(updated) as updated2 FROM tblSvrDiskUsage t WHERE hostid=" + hostId + " group by dev2,updated2) k1 LEFT JOIN tblSvrDiskUsage s on s.id=k1.id2;";
    receiveHDDCardReq.open("GET", serverURL + "/MonitorData?action=runopenquery&query=" + queryHDD, true);
    //Set the function that will be called when the XmlHttpRequest objects state changes.		
    receiveHDDCardReq.onreadystatechange = getCardStatsResults;
    receiveHDDCardReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    receiveHDDCardReq.send();
}

function getCardStatsResults() {
    if (receiveCardReq.readyState == 4 && receiveHDDCardReq.readyState == 4) {
        // 

        var uptimeCard = "";
        var ramCard = "";
        var hddCard = "";
        var cpuCard = "";
        var cardInfo;
        var cardData = JSON.parse(showErrorMain(receiveCardReq.responseText, "Error Found"));
        var hddCardData = JSON.parse(showErrorMain(receiveHDDCardReq.responseText, "Error Found"));

        if (Object.entries(cardData).length != 0) {
            cardInfo = cardData['queryresult'];
            hddCardInfo = hddCardData['queryresult'];

            if (cardInfo.length == 0 && hddCardInfo.length == 0) {

                uptimeCard =
                    "<div class=\"col-md-6 col-xl-3 mb-4\">"
                    + "<div class=\"card shadow border-left-primary py-2\">"
                    + "<div class=\"card-body\">"
                    + "<div class=\"row align-items-center no-gutters\">"
                    + "<div class=\"col mr-2\">"
                    + "<div class=\"text-uppercase text-primary font-weight-bold text-xs mb-1\"><span>UPTIME</span></div>"
                    // + "<div class=\"text-dark font-weight-bold h5 mb-0\"><span>" + cardInfo[0]['days'] + "D, " + cardInfo[0]['hours'] + "H, " + cardInfo[0]['minutes'] + "min </span></div>"
                    + "<div class=\"text-dark font-weight-bold h5 mb-0\"><span> N/A </span></div>"
                    + "</div>"
                    + "<div class=\"col-auto\"><i class=\"fas fa-arrow-circle-up fa-2x text-gray-300\"></i></div>"
                    + "</div>"
                    + "</div>"
                    + "</div>"
                    + " </div>";

                ramCard =

                    "<div class=\"col-md-6 col-xl-3 mb-4\" >"
                    + "<a class=\"infoModalPress\" onclick=\"getMemStatsChosenResults(); \" title=\"Click for More Info\">"
                    + "<div class=\"card shadow border-left-info py-2\">"
                    + "<div class=\"card-body\">"
                    + "<div class=\"row align-items-center no-gutters\">"
                    + "<div class=\"col mr-2\">"
                    + "<div class=\"text-uppercase text-info font-weight-bold text-xs mb-1\"><span>No RAM Usage %</span></div>"
                    + "<div class=\"row no-gutters align-items-center\">"
                    + "<div class=\"col-auto\">"
                    + "<div class=\"text-dark font-weight-bold h5 mb-0 mr-3\"><span> N/A </span></div>"
                    + "</div>"
                    + "<div class=\"col\">"
                    + "<div class=\"progress progress-sm\">"
                    + "<div class=\"progress-bar bg-info\" aria-valuenow=\"50\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 0%;\"><span class=\"sr-only\">0%</span></div>"
                    + "</div>"
                    + "</div>"
                    + "</div>"
                    + "</div>"
                    + "<div class=\"col-auto\"><i class=\"fas fa-microchip fa-2x text-gray-300\"></i></div>"
                    + "</div>"
                    + "</div>"
                    + "</div>"
                    + "</a>"
                    + "</div>";

                cpuCard =
                    "<div class=\"col-md-6 col-xl-3 mb-4\">"
                    + "<a class=\"infoModalPress\" onclick=\"getCPUStatsChosenResults(); \" title=\"Click for More Info\">"
                    + "<div class=\"card shadow border-left-info py-2\">"
                    + "<div class=\"card-body\">"
                    + "<div class=\"row align-items-center no-gutters\">"
                    + "<div class=\"col mr-2\">"
                    + "<div class=\"text-uppercase text-info font-weight-bold text-xs mb-1\"><span>No CPU Usage %</span></div>"
                    + "<div class=\"row no-gutters align-items-center\">"
                    + "<div class=\"col-auto\">"
                    + "<div class=\"text-dark font-weight-bold h5 mb-0 mr-3\"><span> N/A </span></div>"
                    + "</div>"
                    + "<div class=\"col\">"
                    + "<div class=\"progress progress-sm\">"
                    + "<div class=\"progress-bar bg-info\" aria-valuenow=\"50\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 0%;\"><span class=\"sr-only\"></span></div>"
                    + "</div>"
                    + "</div>"
                    + "</div>"
                    + "</div>"
                    + "<div class=\"col-auto\"><i class=\"fas fa-server fa-2x text-gray-300\"></i></div>"
                    + "</div>"
                    + "</div>"
                    + "</div>"
                    + "</a>"
                    + "</div>";



                for (let i = 0; i < hddCardInfo.length; i++) {
                    var diskDetail = hddCardInfo[i];

                    var htmlDisk =

                        "<div class=\"col-md-6 col-xl-3 mb-4\" id=\"MemoryCard\">"
                        // + "<a class=\"infoModalPress\" onclick=\"getDiskStatsChosenResults('" + diskDetail['diskDevice'] + "'); \" title=\"Click for More Info\">"
                        + "<a>"
                        + "<div class=\"card shadow border-left-info py-2\">" + "<div class=\"card-body\">"
                        + "<div class=\"row align-items-center no-gutters\">"
                        + "<div class=\"col mr-2\">"
                        + "<div class=\"text-uppercase text-info font-weight-bold text-xs mb-1\"><span>No Usage %</span></div>"
                        + "<div class=\"row no-gutters align-items-center\">"
                        + "<div class=\"col-auto\">"
                        + "<div class=\"text-dark font-weight-bold h5 mb-0 mr-3\"><span>0%</span></div>"
                        + "</div>"
                        + "<div class=\"col\">"
                        + "<div class=\"progress progress-sm\">"
                        + "<div class=\"progress-bar bg-info\" aria-valuenow=\"50\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 0%;\"><span class=\"sr-only\">0%</span></div>"
                        + "</div>"
                        + "</div>"
                        + "</div>"
                        + "</div>"
                        + "<div class=\"col-auto\"><i class=\"fas fa-hdd fa-2x text-gray-300\"></i></div>"
                        + "</div>"
                        + "</div>"
                        + "</div>"
                        + "</a>"
                        + "</div>";





                    hddCard += htmlDisk;


                }

            } else {
                uptimeCard =
                    "<div class=\"col-md-6 col-xl-3 mb-4\">"
                    + "<div class=\"card shadow border-left-primary py-2\">"
                    + "<div class=\"card-body\">"
                    + "<div class=\"row align-items-center no-gutters\">"
                    + "<div class=\"col mr-2\">"
                    + "<div class=\"text-uppercase text-primary font-weight-bold text-xs mb-1\"><span>UPTIME</span></div>"
                    + "<div class=\"text-dark font-weight-bold h5 mb-0\"><span>" + cardInfo[0]['days'] + "D, " + cardInfo[0]['hours'] + "H, " + cardInfo[0]['minutes'] + "min </span></div>"
                    + "</div>"
                    + "<div class=\"col-auto\"><i class=\"fas fa-arrow-circle-up fa-2x text-gray-300\"></i></div>"
                    + "</div>"
                    + "</div>"
                    + "</div>"
                    + " </div>";

                ramCard =

                    "<div class=\"col-md-6 col-xl-3 mb-4\" >"
                    + "<a class=\"infoModalPress\" onclick=\"getMemStatsChosenResults(); \" title=\"Click for More Info\">"
                    + "<div class=\"card shadow border-left-info py-2\">"
                    + "<div class=\"card-body\">"
                    + "<div class=\"row align-items-center no-gutters\">"
                    + "<div class=\"col mr-2\">"
                    + "<div class=\"text-uppercase text-info font-weight-bold text-xs mb-1\"><span>RAM Usage %</span></div>"
                    + "<div class=\"row no-gutters align-items-center\">"
                    + "<div class=\"col-auto\">"
                    + "<div class=\"text-dark font-weight-bold h5 mb-0 mr-3\"><span>" + cardInfo[0]['persUsed'] + "%</span></div>"
                    + "</div>"
                    + "<div class=\"col\">"
                    + "<div class=\"progress progress-sm\">"
                    + "<div class=\"progress-bar bg-info\" aria-valuenow=\"50\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: " + cardInfo[0]['persUsed'] + "%;\"><span class=\"sr-only\">" + cardInfo[0]['persUsed'] + "%</span></div>"
                    + "</div>"
                    + "</div>"
                    + "</div>"
                    + "</div>"
                    + "<div class=\"col-auto\"><i class=\"fas fa-microchip fa-2x text-gray-300\"></i></div>"
                    + "</div>"
                    + "</div>"
                    + "</div>"
                    + "</a>"
                    + "</div>";

                cpuCard =
                    "<div class=\"col-md-6 col-xl-3 mb-4\">"
                    + "<a class=\"infoModalPress\" onclick=\"getCPUStatsChosenResults(); \" title=\"Click for More Info\">"
                    + "<div class=\"card shadow border-left-info py-2\">"
                    + "<div class=\"card-body\">"
                    + "<div class=\"row align-items-center no-gutters\">"
                    + "<div class=\"col mr-2\">"
                    + "<div class=\"text-uppercase text-info font-weight-bold text-xs mb-1\"><span>CPU Usage %</span></div>"
                    + "<div class=\"row no-gutters align-items-center\">"
                    + "<div class=\"col-auto\">"
                    + "<div class=\"text-dark font-weight-bold h5 mb-0 mr-3\"><span>" + cardInfo[0]['cpuPers'] + "%</span></div>"
                    + "</div>"
                    + "<div class=\"col\">"
                    + "<div class=\"progress progress-sm\">"
                    + "<div class=\"progress-bar bg-info\" aria-valuenow=\"50\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: " + cardInfo[0]['cpuPers'] + "%;\"><span class=\"sr-only\"></span></div>"
                    + "</div>"
                    + "</div>"
                    + "</div>"
                    + "</div>"
                    + "<div class=\"col-auto\"><i class=\"fas fa-server fa-2x text-gray-300\"></i></div>"
                    + "</div>"
                    + "</div>"
                    + "</div>"
                    + "</a>"
                    + "</div>";



                for (let i = 0; i < hddCardInfo.length; i++) {
                    var diskDetail = hddCardInfo[i];

                    var htmlDisk =

                        "<div class=\"col-md-6 col-xl-3 mb-4\" id=\"MemoryCard\">"
                        + "<a class=\"infoModalPress\" onclick=\"getDiskStatsChosenResults('" + diskDetail['diskDevice'] + "'); \" title=\"Click for More Info\">"
                        + "<div class=\"card shadow border-left-info py-2\">" + "<div class=\"card-body\">"
                        + "<div class=\"row align-items-center no-gutters\">"
                        + "<div class=\"col mr-2\">"
                        + "<div class=\"text-uppercase text-info font-weight-bold text-xs mb-1\"><span>" + diskDetail['diskDevice'] + " Usage %</span></div>"
                        + "<div class=\"row no-gutters align-items-center\">"
                        + "<div class=\"col-auto\">"
                        + "<div class=\"text-dark font-weight-bold h5 mb-0 mr-3\"><span>" + diskDetail['persUsed'] + "%</span></div>"
                        + "</div>"
                        + "<div class=\"col\">"
                        + "<div class=\"progress progress-sm\">"
                        + "<div class=\"progress-bar bg-info\" aria-valuenow=\"50\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: " + diskDetail['persUsed'] + "%;\"><span class=\"sr-only\">" + diskDetail['persUsed'] + "%</span></div>"
                        + "</div>"
                        + "</div>"
                        + "</div>"
                        + "</div>"
                        + "<div class=\"col-auto\"><i class=\"fas fa-hdd fa-2x text-gray-300\"></i></div>"
                        + "</div>"
                        + "</div>"
                        + "</div>"
                        + "</a>"
                        + "</div>";





                    hddCard += htmlDisk;


                }
            }

            var finalCards = uptimeCard + cpuCard + ramCard

            document.getElementById("cardServerUsageDetails").innerHTML = finalCards;
            document.getElementById("cardHDDUsageDetails").innerHTML = hddCard;


        }
        else {
            document.getElementById("cardServerUsageDetails").innerHTML = "";
            document.getElementById("cardHDDUsageDetails").innerHTML = "";
        }
    }
}


function getDevices(devArr, dev) {
    for (var i = 0; i < devArr.length; i++) {
        if (devArr[i] == dev)
            return devArr;
    }
    devArr.push(dev);
    return devArr;
}

function getObjElementFromArray(jsonArr, element, factor) {
    var elementArr = [];
    alert('getObjElementFromArray');
    for (var n = 0; n < jsonArr.length; n++) {
        var valObj = jsonArr[n];
        if (factor > 0) {
            var newVal = parseFloat(valObj[element]) / factor;
            elementArr.push(newVal);
        } else {
            elementArr.push(valObj[element]);
        }
    }
    return elementArr;
}
function getObjCPULevelElementFromArray(jsonArr, element) {
    var elementArr = [];
    for (var n = 0; n < jsonArr.length; n++) {
        elementArr.push(element);
    }

    return elementArr;
}
function getObjCPUElementFromArray(jsonArr, element, device, factor) {
    var elementArr = [];
    for (var n = 0; n < jsonArr.length; n++) {
        var valObj = jsonArr[n];
        if (valObj['hostip'] == device) {
            if (factor > 0) {
                var newVal = parseFloat(valObj[element]) / factor;
                elementArr.push(newVal);
            } else {
                elementArr.push(valObj[element]);
            }
        }
    }
    return elementArr;
}
function getObjMemElementFromArray(jsonArr, element, device, factor) {
    var elementArr = [];
    for (var n = 0; n < jsonArr.length; n++) {
        var valObj = jsonArr[n];
        if (valObj['hostname'] == device) {
            if (factor > 0) {
                var newVal = parseFloat(valObj[element]) / factor;
                elementArr.push(newVal);
            } else {
                elementArr.push(valObj[element]);
            }
        }
    }
    return elementArr;
}
function getObjDiskElementFromArray(jsonArr, element, device, factor) {
    var elementArr = [];
    for (var n = 0; n < jsonArr.length; n++) {
        var valObj = jsonArr[n];
        if (valObj['diskDevice'] == device) {
            if (factor > 0) {
                var newVal = parseFloat(valObj[element]) / factor;
                elementArr.push(newVal);
            } else {
                elementArr.push(valObj[element]);
            }
        }
    }
    return elementArr;
}
function showError(resp, errorlabel) {

    if (resp.indexOf("Exception :") == 0) {
        //alert((errorlabel == undefined ?'':(errorlabel+'\r\n')) + resp);
        //set time 
        var toastDelayTime = 15000;
        // set title
        var toastTitle = (errorlabel == undefined ? 'Error!' : errorlabel);
        //Set Message
        var toastMessage = resp //"Please ensure the Site, Host and Schedule are selected before submitting to create a maintenance schedule.";

        //set objects
        var toastPopup = document.getElementById("mainPageToastAlert");
        var toastTITLEObj = document.getElementById("toastTitle");
        var toastMSGObj = document.getElementById("toastMessage");


        // run toast 
        toastPopup.setAttribute("data-delay", toastDelayTime);
        toastTITLEObj.innerHTML = toastTitle;
        toastMSGObj.innerHTML = toastMessage;
        $(function () { $('#mainPageToastAlert').toast('show'); });
        return "{}";
    }
    return resp;
}

function showErrorMain(resp, errorlabel) {

    if (resp.indexOf("Exception :") == 0) {
        //alert((errorlabel == undefined ?'':(errorlabel+'\r\n')) + resp);
        //set time 
        var toastPopV = "mainPageToastAlert";
        var toastTitleV = "toastTitle";
        var toastMsgV = "toastMessage";

        var toastDelayTime = 10000;
        // set title
        var toastTitle = (errorlabel == undefined ? 'Error!' : errorlabel);
        //Set Message
        var toastMessage = resp; //"Please ensure the Site, Host and Schedule are selected before submitting to create a maintenance schedule.";
        showToastMessage(toastPopV, toastTitleV, toastMsgV, toastMessage, toastTitle, toastDelayTime);

        return "{}";
    }
    return resp;
}

function showToastMessage(toastPopupVAR, toastTitleVAR, toastMessageVAR, tstMessage, tstTitle, tstDelayTime) {
    //set time 
    var toastDelayTime = tstDelayTime;
    // set title
    var toastTitle = tstTitle;
    //Set Message
    var toastMessage = tstMessage;
    var toastPopupID = '#' + toastPopupVAR + '';

    //set objects
    var toastPopup = document.getElementById(toastPopupVAR);
    var toastTITLEObj = document.getElementById(toastTitleVAR);
    var toastMSGObj = document.getElementById(toastMessageVAR);


    // run toast 
    toastPopup.setAttribute("data-delay", toastDelayTime);
    toastTITLEObj.innerHTML = toastTitle;
    toastMSGObj.innerHTML = toastMessage;
    $(function () { $(toastPopupID).toast('show'); });
}
function newGraph(destControl, title, yLegend, xValues, yValues, traceName) {
    var data = [{
        y: yValues,
        x: xValues,
        name: traceName,
        //	      y: [22.3, 23, 23.3, 2.00, 1.50, 22.2],
        //	      x: ["2001-06-11 11:00","2001-06-11 12:00","2001-06-11 13:00"],
        line: { width: 1 },
        //	      error_y: {
        //	        width: 0,
        //	        array: [2.73, 1.98, 1.87, 2.00, 1.50, 2.19],
        //	        thickness:0.5
        //	      },
        uid: "40abaa"
    }];

    var layout = {
        title: title,
        yaxis: { title: yLegend },      // set the y axis title
        xaxis: {
            showgrid: false,                  // remove the x-axis grid lines
            tickformat: "%Y-%m-%d"              // customize the date format to "month, day" : https://github.com/mbostock/d3/wiki/Time-Formatting
            //	        tickformat: "%H:%M"              // customize the date format to "month, day" : https://github.com/mbostock/d3/wiki/Time-Formatting
        },
        margin: {                           // update the left, bottom, right, top margin
            l: 150, b: 30, r: 10, t: 30
        }
    };

    Plotly.newPlot(destControl, data, layout);
}

function drawGraph(destControl, title, yLegend, xValues, yValues, traceName) {
    var data = [{
        y: yValues,
        x: xValues,
        name: traceName,
        //	      y: [22.3, 23, 23.3, 2.00, 1.50, 22.2],
        //	      x: ["2001-06-11 11:00","2001-06-11 12:00","2001-06-11 13:00"],
        line: { width: 1 },
        //	      error_y: {
        //	        width: 0,
        //	        array: [2.73, 1.98, 1.87, 2.00, 1.50, 2.19],
        //	        thickness:0.5
        //	      },
        uid: "40abaa"
    }];

    var layout = {
        yaxis: {
            title: yLegend,
            tickformat: ".1f"
        },      // set the y axis title
        xaxis: {
            showgrid: false,                  // remove the x-axis grid lines
            tickformat: "%H:%M"              // customize the date format to "month, day" : https://github.com/mbostock/d3/wiki/Time-Formatting
        },
        margin: {                           // update the left, bottom, right, top margin
            l: 50, b: 30, r: 10, t: 30
        }
    };
    Plotly.plot(destControl, data, layout);
}

function doWaitCursor() {
    document.body.style.cursor = 'progress';
    setTimeout(endWaitCursor, 10000);
}
function endWaitCursor() {
    document.body.style.cursor = 'default';
}

