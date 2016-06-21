if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function (require) {
    let _ = require('lodash');

    function BasePage(remote) {
        this.remote = remote;
        this.selectors = {};
    }

    BasePage.prototype = {
        constructor: BasePage,
        addSelectors: function(selObj){
            for (var key of Object.keys(selObj)) {
                let locators = _.pick(selObj[key], ['id', 'class', 'name', 'xpath']);
                if(Object.keys(locators).length!=0){
                    this.selectors[key]=selObj[key];
                } else {
                    throw `Key "${key}" in addSelectors() is not a valid locator strategy. Use ${locators}.`
                }
            }
            return this;
        },
        getSelector: function(selName){
            if(this.selectors.hasOwnProperty(selName)) return this.selectors[selName]
            else throw `Selector "${selName}" does not exist`
        },
        listSelectors: function(){
            return Object.keys(this.selectors)
        },
        addStep: function(name, func){
            if (!_.isFunction(func)) {
                throw `Step "${func}" should be a function for second arg"`
            } else if (!_.isString(name)) {
                throw `Step "${name}" should be a function for first arg"`
            } else {
                BasePage.prototype[name] = func;
                return this;
            }
        },
        listSteps: function(){
            let baseFunctions = ['addSelectors','getSelector','listSelectors','addStep','listSteps']
            return _.without(_.functionsIn(this), ...baseFunctions)
        }
    };

    return BasePage;
});