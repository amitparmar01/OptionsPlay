define(['jquery',
		'knockout',
		'modules/localizer',
		'modules/dropDownList',
		'events',
		'dataContext',
		'modules/orderEnums',
		'modules/kendoWindow',
		'modules/context',
		'modules/combinationHelpers',
		'knockout-kendo'],
function ($, ko, localizer, DropDownList, events, dataContext, orderEnums, kendoWindow, context, combinationHelpers) {

    var paramSet = function () {
        self = this;
        var change;
        if (window.localStorage.getItem("noConfirmWhenPlaceOrderInStore") == "true") { change = true; } else { change = false; }
        self.noConfirmWhenPlaceOrder = ko.observable(change);
        self.setting1 = function () {
            var noConfirmWhenPlaceOrderForStore = self.noConfirmWhenPlaceOrder();
            window.localStorage.setItem("noConfirmWhenPlaceOrderInStore", noConfirmWhenPlaceOrderForStore);
            console.log(window.localStorage.getItem("noConfirmWhenPlaceOrderInStore"));


        };
        self.noConfirmWhenPlaceOrder.subscribe(self.setting1);


        if (window.localStorage.getItem("noConfrimWhenCancelOrderInStore") == "true") { change = true; } else { change = false; }
        self.noConfrimWhenCancelOrder = ko.observable(change);
        self.setting2 = function () {
            var noConfrimWhenCancelOrderForStore = self.noConfrimWhenCancelOrder();
            window.localStorage.setItem("noConfrimWhenCancelOrderInStore", noConfrimWhenCancelOrderForStore);
           
        };
        self.noConfrimWhenCancelOrder.subscribe(self.setting2);


        if (window.localStorage.getItem("illegalDataForStoreInStore") == "true") { change = true; } else { change = false; }
        self.illegalData = ko.observable(change);
        self.setting3 = function () {
            var illegalDataForStore = self.illegalData();
            window.localStorage.setItem("illegalDataForStoreInStore", illegalDataForStore);
        };
        self.illegalData.subscribe(self.setting3);


        if (window.localStorage.getItem("placeOrdermanuallyForStoreInStore") == "true") { change = true; } else { change = false; }
        self.placeOrdermanually = ko.observable(change);
        self.setting4 = function () {
            var placeOrdermanuallyForStore = self.placeOrdermanually();
            window.localStorage.setItem("placeOrdermanuallyForStoreInStore", placeOrdermanuallyForStore);
        };
        self.placeOrdermanually.subscribe(self.setting4);


        if (window.localStorage.getItem("changeToCompetitorRateInStore") == "true") { change = true; } else { change = false; }
        self.changeToCompetitorRate = ko.observable(change);
        self.setting5 = function () {
            var changeToCompetitorRateForStore = self.changeToCompetitorRate();
            window.localStorage.setItem("changeToCompetitorRateInStore", changeToCompetitorRateForStore);
            console.log(changeToCompetitorRateForStore);
        };
        self.changeToCompetitorRate.subscribe(self.setting5);








        self.adjustPriceForStore;
         self.adjustPrice = ko.observable({
             decimals: 0,
             format: '#',
             step: 1,
             min: 1,
             max: 10,

        });
      
        
        self.minutesOption = ko.observable();
        self.minutesOption = {
            decimals: 0,
            format: '#',
            step: 1,
            min: 1,
            max: 10,
        };
    }
    return paramSet;
})
