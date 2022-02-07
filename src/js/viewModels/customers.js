/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your customer ViewModel code goes here
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
'ojs/ojvalidationgroup'],
 function(accUtils, ko, $, AsyncLengthValidator) {
    function CustomerViewModel() {
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
    CustomerViewModel.prototype._initAllFields = function(){
    this.firstname = ko.observable("");
    this.lastname = ko.observable("");
    this.middlename = ko.observable("");
    this.age = ko.observable(null);
    this.birthday = ko.observable(null);
    this.groupValid = ko.observable();

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
  CustomerViewModel.prototype._initValidators = function(){
    //Form Inputs Length Validators
    this.inputNamesLengthValidator = ko.observableArray([
      new AsyncLengthValidator({
        min:2,
        max:20
        }),  
    ]);
  };
 
  //Initialialize all Event Listeners
  CustomerViewModel.prototype._initEventListerners = function(){
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
    };

    //On Submit Click
    this._onSubmitClick = async function(){
      //Perform Form Validation
      const valid = this._checkValidation();
      if (valid) {
      
        const jsonServiceRequest = {
          firstname: this.firstname(),
          middlename: this.middlename(),
          lastname: this.lastname(),
          fullname: this.fullname(),
          age: this.age(),
          dob: this.birthday(),
        }
        let data;
        try{
          //Save User
          data = await saveUser(jsonServiceRequest);
          console.log(data); 
          this._onResetClick();
        }catch (error){
          console.log(error)
        }    
    }
    };
    this._checkValidation = function(){
      const tracker = document.getElementById("formValidationGroup");
      if (tracker.valid === "valid") {
        return true;
    }
    else {
        tracker.showMessages();
        tracker.focusOn("@firstInvalidShown");
        return false;
      }
    };

    async function saveUser(params){
      const api_url = "https://jsonplaceholder.typicode.com/users";
      let datafromservice;
      try{
        const response = await fetch(api_url);
        if(!response.ok) throw Error("Something went wrong...");
        datafromservice = await response.json();
      }catch (error){
        console.log(error);
      }
      console.log(datafromservice);
      
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
   
    return CustomerViewModel;
  }
);
