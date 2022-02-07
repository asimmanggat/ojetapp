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
      'ojs/ojasyncvalidator-length',
      'ojs/ojarraydataprovider',
      'ojs/ojlabel',
      'ojs/ojinputtext',
      'ojs/ojinputnumber',
      'ojs/ojtable',
      'ojs/ojformlayout',
      'ojs/ojdatetimepicker',
      'ojs/ojbutton',
      'ojs/ojvalidationgroup'
    ],

 function(accUtils, ko, $, AsyncLengthValidator, ArrayDataProvider) {

    function DashboardViewModel(){
      var self = this;
    self.usersArray = ko.observableArray([]);
    self.activityDataProvider = ko.observable(); 

    
      
    let datafromservice;
      async function getData(){
        const api_url = "https://jsonplaceholder.typicode.com/users";  
        try{
          const response = await fetch(api_url);
          if(!response.ok) throw Error("Something went wrong...");
          datafromservice = await response.json();
        }catch (error){
          console.log(error);
        }
        datafromservice.forEach(element => {
          self.usersArray.push(new userConstructor(element.name, element.username, element.email));
        });
        
      }  
      function userConstructor(name, username, email){
        var self = this;

        self.name = name;
        self.username = username;
        self.email = email;
      }
      getData();
      
      self.activityDataProvider = new ArrayDataProvider(self.usersArray, { keyAttributes: 'name' });  
  }

  return DashboardViewModel;
  });
