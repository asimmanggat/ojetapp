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
      'ojs/ojbutton'
    ],

 function(accUtils, ko, $, AsyncLengthValidator) {

    function DashboardViewModel(){
    
      this._initAllFields();
      this._initValidators();
      this._initEventListerners(); 
      this.onInputFirstNameRawValueChanged = this._onInputFirstNameRawValueChanged.bind(this);
      this.onInputLastNameRawValueChanged = this._onInputLastNameRawValueChanged.bind(this);
      this.onInputMiddleNameRawValueChanged = this._onInputMiddleNameRawValueChanged.bind(this);
      this.onSubmitClick = this._onSubmitClick.bind(this);
      this.onResetClick = this._onResetClick.bind(this);
  }

  
  //Initialize all observables
  DashboardViewModel.prototype._initAllFields = function(){
    this.firstname = ko.observable("");
    this.lastname = ko.observable("");
    this.middlename = ko.observable("");
    this.age = ko.observable(null);
    this.birthday = ko.observable(null);
    this.inputFirstNameCustomMessage = ko.observable([]);
    this.inputLastNameCustomMessage = ko.observable([]);
    this.inputMiddleNameCustomMessage = ko.observable([]);


    this.fullname = ko.computed(function(){
      if(this.firstname() && this.lastname() && this.middlename()){
        return this.firstname()+ " " + this.middlename() + " "+ this.lastname();
      }else{
        return null;
      }
    }, this);   
  };


  //Input Validators
  DashboardViewModel.prototype._initValidators = function(){
    //Form Inputs Length Validators
    this.inputNamesLengthValidator = ko.observableArray([
      new AsyncLengthValidator({
        min:2,
        max:20
        }),  
    ]);
  };
 
  //Initialialize all Event Listeners
  DashboardViewModel.prototype._initEventListerners = function(){
    //On First Name Value changed Validation
    this._onInputFirstNameRawValueChanged = function(event){
      const value = event.detail.value;
      if(value){
      event.currentTarget.validate();     
      if(value.length >= 2 && value.length <= 20){
        this.inputFirstNameCustomMessage([{
          detail: "Looks Good!",
          summary: "",
          severity: "confirmation",
        }])
      }
    }
  }

    //On Middle Name Value changed Validation
    this._onInputMiddleNameRawValueChanged = function(event){
      const value = event.detail.value;
      if(value){
      event.currentTarget.validate();     
      if(value.length >= 2 && value.length <= 20){
        this.inputMiddleNameCustomMessage([{
          detail: "Looks Good!",
          summary: "",
          severity: "confirmation",
        }])
      }
      }
    }

    //On Last Name Value changed Validation
    this._onInputLastNameRawValueChanged = function(event){
      const value = event.detail.value;
      if(value){
      event.currentTarget.validate();     
      if(value.length >= 2 && value.length <= 20){
        this.inputLastNameCustomMessage([{
          detail: "Looks Good!",
          summary: "",
          severity: "confirmation",
        }])
      }
      }
    }

    //On Submit Click
    this._onSubmitClick = function(){
      window.alert("Submit");
    }

    
    //On Reset Click
    this._onResetClick = function(){
    this.firstname(null);
    this.lastname(null);
    this.middlename(null);
    this.age(null);
    this.birthday(null);
    }  
 };

    
  return DashboardViewModel;
  });
