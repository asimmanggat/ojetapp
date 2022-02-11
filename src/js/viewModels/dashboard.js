/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */


define(['../accUtils',
      'knockout',
      'jquery',
      'ojs/ojarraydataprovider',
      'ojs/ojlabel',
      'ojs/ojselectsingle',
      'ojs/ojchart',
      'ojs/ojlistview',
      'ojs/ojinputtext',
      'ojs/ojtable'
    ],


 function(accUtils, ko, $, ArrayDataProvider) {

    function DashboardViewModel() {
      var self = this;

            
      self.nid = ko.observable("");
      self.accnumber = ko.observable("");

      self.check = ko.computed(function(){
        if(self.nid() && self.accnumber()){
          return false;
        }else{
          return true;
        }
      });
          
      self.usersArray = ko.observableArray([]);
      self.messageArray = ko.observableArray([]);
      

      var url = "http://localhost:8080/JavaAPI/users";  //defines link to local data file
      self.activityDataProvider = ko.observable(); 
      self.messageDataProvider = ko.observable(); 
      // Get Activities objects from file using jQuery method and a method to return a Promise
      
      self.checkDisabled = function(){
        if(self.nid() && self.accnumber()){
          self.next();
        }
      }
      self.next = function(){
        
        var i = 0;
        var j = 0;
        var found = 0;
        let message = "";
        $.getJSON(url, function(data){
          console.log(data);
            
            for(i; i<data.Users.length; i++)
            {           
              if(self.nid() === data.Users[i].nationalID){                 
                      found = 1;
                      message += `${data.Users[i].title}, ${data.Users[i].firstName} ${data.Users[i].lastName} 
                      you have Following list of accounts`;
                      for(j; j<data.Accounts.length; j++){
                          if(checkUsers(data.Accounts[j].username, data.Users[i].username)){
                              var a = data.Accounts[j].accountnumber;
                              var b = data.Accounts[j].title;
                              var obj = new accInfo(a,b);
                              self.usersArray.push(obj);
                          }
                      }     
                  }                                          
            }
      
            if(found == 0){
                message += "<p><strong>User doesn’t exist with the input details</strong></p>";
            }
            document.getElementById("message").innerHTML = message;
            self.activityDataProvider(new ArrayDataProvider(self.usersArray, { keyAttributes: 'account' }));
            self.messageDataProvider(new ArrayDataProvider(self.messageArray, { keyAttributes: 'title' }));          
        });
        self.usersArray.removeAll();
        self.messageArray.removeAll();
 
        }
            


      this.connected = () => {
        accUtils.announce('Dashboard page loaded.', 'assertive');
        document.title = "Dashboard";
        // Implement further logic if needed
      };

   
      this.disconnected = () => {
        // Implement if needed
      };

      this.transitionCompleted = () => {
        // Implement if needed
      };
    }

    return DashboardViewModel;
  }
);

function accInfo(account, title) {
  var self = this;
  self.account = account
  self.title = title;

}
     //Usersnames Check
     function checkUsers(value1, value2){
         return value1 === value2;
     }

     //Matched user info
     function matchInfo(title, firstname, lastname) {
      var self = this;

      self.title = title;
      self.firstname = firstname;
      self.lastname = lastname;
      }

 