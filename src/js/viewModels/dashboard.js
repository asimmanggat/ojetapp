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
    ],

 function(accUtils, ko, $, AsyncLengthValidator) {

    function DashboardViewModel(){
    
      this._initAllFields();
      this._initValidators();
      this._initEventListerners();
    
  }
  //Input Validators
  DashboardViewModel.prototype._initValidators = function(){
    //Form Inputs Length Validators
    this.inputNamesLengthValidator = ko.observableArray([
      new AsyncLengthValidator({
        min:2,
        max:20
        }),  
    ]);

  }
 

  //Initialize all observables
  DashboardViewModel.prototype._initAllFields = function(){
    this.firstname = ko.observable("");
    this.lastname = ko.observable("");
    this.middlename = ko.observable("");
    this.age = ko.observable();
    this.inputCustomMessages = ko.observableArray([]);
    this.fullname = ko.computed(function(){
      if(this.firstname() && this.lastname() && this.middlename()){
        return this.firstname()+ " " + this.middlename() + " "+ this.lastname();
      }else{
        return null;
      }
    }, this);

    
  };

  //Initialialize all Event Listeners
  DashboardViewModel.prototype._initEventListerners = function(){
    //On Value changed Validation
   this.onInputRawValueChanged = function(event){
     const value = event.detail.value;
     if(value){
     event.currentTarget.validate();
     this.inputCustomMessages([{
      summary: "Confirmation Message",
      detail: "Looks Good!",
      severity: "confirmation",
    }]);
       if(value.length >= 2 && value.length <=20){
         console.log(value);
         
       }      
     }
   }
 };




  return DashboardViewModel;
  });
