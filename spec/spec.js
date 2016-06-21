'use strict';
let BasePage = require('../index.js');
let _ = require('lodash');
describe("The enhanced Page Object", function() {
    let sels = {
        username: {id: 'username'},
        password: {name: 'password'},
        submitButton: {id: '_submit'}
    };
    it("can have new selectors added to it", function() {
        let TempPage = new BasePage();
        TempPage.addSelectors(sels)
        expect(_.isEqual(TempPage.selectors, sels)).toBe(true);
    });
    it("can get a single selector by name", function() {
        let TempPage = new BasePage();
        TempPage.addSelectors(sels)
        expect(_.isEqual(TempPage.getSelector('username'), {id: 'username'})).toBe(true);
    });
    it("can get a list of all selectors", function() {
        let TempPage = new BasePage();
        TempPage.addSelectors(sels)
        expect(_.isEqual(TempPage.listSelectors('username'), ['username','password','submitButton'])).toBe(true);
    });
    it("can have new steps added to it", function() {
        let TempPage = new BasePage();
        TempPage.addStep('steply', function(){return 'this is steply'})
        expect(TempPage.steply()).toBe('this is steply');
    });
    it("can get a list of all steps", function() {
        let TempPage = new BasePage();
        TempPage
            .addStep('steply', function(){return 'this is steply'})
            .addStep('endly', function(){return 'this is endly'})
        expect(_.isEqual(TempPage.listSteps(),['steply','endly'])).toBe(true);
    });
});