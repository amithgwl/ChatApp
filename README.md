# ChatApp

#Steps To Run Chat Application(for windows)


#A.	Setup Open Fire Server.
    *	Download and install http://www.igniterealtime.org/downloads/index.jsp#openfire from this URL.
    *	Open ‘openfire .exe’ as Administrator and click on ‘Launch Admin’ button to open Admin console.
    *	For the first time, setup will open automatically. Select ‘Language’,  Select ‘Embeded database’,  enter admin email : ‘admin’ and password: ‘admin’.
    *	Login to admin dashboard by giving credentials id : admin, password : admin. 

#B.	Setup XAMPP for Apache Server
    *	Download and install https://www.apachefriends.org/index.html from this URL.
    *	Open xampp control panel and ‘Start’ Apache Server’.
    *	Navigate to path: (in windows) “c:/xampp/htdocs” and create a directory and copy & paste the source code.
    *	Open ‘chrome’ browser to test whether server is running or not and hit this url : ’http://localhost’ and verify.

#C.	Running Application
    *	Before running, Open ‘js/main.js’ file and find ‘@Your_Computer_Name’ in source code replace with your pc name. [Ex:‘@Current_Pc_Name’] 
    *	Open http://localhost/Your_Directory_Name/ to run the application. By default, Your_Directory_Name will be 'ChatApp'
    *	Source code should be copied before running this url and make sure about directory name.
    *	Click on ‘List of Contacts’ to fetch all Contacts

#E.	Fetching all contacts
    *	If not logged in, SignIn button will display and Click on ‘Sign in’ button to fetch all contacts which are saved in google account and all are hyperlinked.



#F.	Create test users in Open Fire Server
    *	Open admin console of openfire server by clicking ‘Launch Admin’ button or http://127.0.0.1:9090/ 
    *	Click on ‘Users/Groups’ >’Create User’.
    *	Open 2 browsers. we reccommend 'chrome' and 'chromium', 'firefox' is not supported right now.
    *   with 2 browsers, open our application 'http://localhost/ChatApp'. Press F12 > Select Resources tab > LocalStorage menu > 'http://localhost' option > and copy the key value of 'ngStorage-loggedUserid'. This is loggedin users google_Plus_Id. or you will get this id in google plus account.(ID is 21 digis only, without any special characters)
    *   use this ID as UserId while creating user. password: ‘admin’. Do not change password, it should be ‘admin’.(For time being, it is hardcoded and users will be signed in automatically.)
    *   Continue the same procedure for test user 2 also with another browser(Chromium)
    *   So as of now 2 users are created. Reload the application and select the created user from list of contacts in both browsers to start chat.
    *   Ex: User1 is loggedIn & in his url User2's id should be visible and viceversa. If confused, paste your created google plus id in another browser url at the end and viceversa.

#G.	Start Chat
    *	Make sure that another person id is visible in url and viceversa.
    *	In web application, enter message and click on send button to send message, another browser will notify you about the incoming message and all messages are logged in user chat page.
    *	They are connected.


