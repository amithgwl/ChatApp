

/**
 * Main AngularJS Web Application
 */
var app = angular.module('demoWeb', [
  'ngRoute','ngStorage',
]);

app.run(function($rootScope) {
    $rootScope.$on("$locationChangeStart", function(event, next, current) { 
        console.log("Route change detected");   
    });
});

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    // Pages
    .when("/contacts", {templateUrl: "partials/contacts.html", controller: "contactCtrl"})
  
    .when("/chat/people/:peopleid", {templateUrl: "partials/chat.html", controller: "chatCtrl"})

    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function () {
  console.log("Page Controller of home.");
});

app.controller('chatCtrl',['$scope','$routeParams','$localStorage','$sessionStorage', function ($scope,$routeParams,$localStorage,$sessionStorage) {
  console.log("Page Controller of chat.");
    // Log messages to the output area
var output = document.getElementById("output");
function log(message) {
    var line = document.createElement("div");
    line.textContent = message;
    var alertClass="alert alert-success";
    var findmsg=message.substr(0,2);
    if(findmsg=='Fr')
        alertClass="alert alert-info";
    else if(findmsg=='To')
        alertClass="alert alert-warning"
    line.className=alertClass;
    output.appendChild(line);
}
function connectHandler(cond) {
 if (cond == Strophe.Status.CONNECTED) {
 log("connected");
 connection.send($pres());
 }
}
var url = "http://localhost:7070/http-bind/";
var connection = null;
 var username = $localStorage.loggedUserid+'@Your_Computer_Name';
 var password = 'admin';
 connection = new Strophe.Connection(url);
 connection.connect(username, password, connectHandler);
// Set up handlers
 connection.addHandler(messageHandler, null, "message", "chat");
 connection.addHandler(presenceHandler, null, "presence", null);
 connection.addHandler(pingHandler, "urn:xmpp:ping", "iq", "get");


function presenceHandler(presence) {
 var from = presence.getAttribute("from");
 var show = "";
 var status = "";
    Strophe.forEachChild(presence, "show", function(elem) {
 show = elem.textContent;
});
Strophe.forEachChild(presence, "status", function(elem) {
 status = elem.textContent;
});
if (show || status){
 log("[presence] " + from + ":" + status + " " + show);
}
// Indicate that this handler should be called repeatedly
 return true;
}


    
$scope.sendMsg = function (){
 var message = $msg({to: $routeParams.peopleid+'@amith', type:"chat"})
 .c("body").t($scope.textmessage);
 connection.send(message);
    log("To : "+$routeParams.peopleid+", Message : "+$scope.textmessage);
    $scope.textmessage="";
}

function messageHandler(message) {
 var from = message.getAttribute("from");
 var body = "";
 Strophe.forEachChild(message, "body", function(elem) {
 body = elem.textContent;
});
// Log message if body was present
if (body) {
 log("From: "+from + ", Message: " + body);
}
    // Indicate that this handler should be called repeatedly
 return true;
}
function pingHandler(ping) {
 var pingId = ping.getAttribute("id");
 var from = ping.getAttribute("from");
 var to = ping.getAttribute("to");
 var pong = $iq({type: "result", "to": from, id: pingId, "from": to});
 connection.send(pong);
// Indicate that this handler should be called repeatedly
 return true;
}
  
}]);

app.controller('contactCtrl',['$rootScope','$scope','$http','$location','$localStorage', function ($rootScope, $scope, $http, $location, $localStorage) {
  //console.log("In contacts page: "+JSON.stringify($location));
    //$scope.allContactsList;
   
     
    //$scope.auth=function () {
          var CLIENT_ID = '214178526480-3t559glotngfd4n8pshsik3ajnd22cmb.apps.googleusercontent.com';

      var SCOPES = ["https://www.googleapis.com/auth/contacts.readonly"];
    
    
   // function SignInController($scope) {
    // This flag we use to show or hide the button in our HTML.
    $scope.signedIn = false;
 
    // Here we do the authentication processing and error handling.
    // Note that authResult is a JSON object.
    $scope.processAuth = function(authResult) {
         var allContacts=[], loggedInUser=[];
        // Do a check if authentication has been successful.
        if(authResult['access_token']) {
            // Successful sign in.
            $scope.signedIn = true;
 console.log("signed in...");

            
            gapi.client.load('plus','v1', function(){ 
                var getUserDetailsRequest = gapi.client.plus.people.get({'userId' : 'me'});
                getUserDetailsRequest.execute(function(response) {
                   
                     var usrInfo = response;
                 
                    $localStorage.loggedUserName=usrInfo.displayName;
                    $localStorage.loggedUserid=usrInfo.id;

                });
            });
          
         

        gapi.client.load('people', 'v1', listConnectionNames);


      function listConnectionNames() {
          
        var request = gapi.client.people.people.connections.list({
           'resourceName': 'people/me'
         });

         request.execute(function(resp) {
             
           var conn = resp.connections;
           //console.info('Connections:'+JSON.stringify(connections));

           if (conn.length) {
             for (i = 0; i < conn.length; i++) {
               var person = conn[i];
               if (person.names && person.names.length > 0) {
                  allContacts.push({
                        name: person.names[0].displayName,
                        res: person.resourceName
                    });
               } else {
                 console.info("No display name found for connection.");
               }
             }
           } else {
             console.info('No upcoming events found.');
           }
             
             console.info("Contacts loaded...");
             $scope.$apply($scope.allContactsList=allContacts);
             
         }); 
          
      }
            

            //     ...
        } else if(authResult['error']) {
            // Error while signing in.
            $scope.signedIn = false;
 console.log("NOt signed In");
            // Report error.
        }
    };
 
    // When callback is received, we need to process authentication.
    $scope.signInCallback = function(authResult) {
        
        $scope.$apply(function() {
            $scope.processAuth(authResult);
        });
    };
 
    // Render the sign in button.
    $scope.renderSignInButton = function() {
        gapi.signin.render('signInButton',
            {
                'callback': $scope.signInCallback, // Function handling the callback.
                'clientid': '214178526480-3t559glotngfd4n8pshsik3ajnd22cmb.apps.googleusercontent.com', // CLIENT_ID from developer console which has been explained earlier.
                'requestvisibleactions': 'http://schemas.google.com/AddActivity', // Visible actions, scope and cookie policy wont be described now,
 // as their explanation is available in Google+ API Documentation.
                'scope': 'https://www.googleapis.com/auth/contacts.readonly',
                'cookiepolicy': 'single_host_origin'
            }
        );
    }
 
    // Start function in this example only renders the sign in button.
    $scope.start = function() {
        $scope.renderSignInButton();
    };
 
    // Call start function on load.
    $scope.start();
    


}]);

