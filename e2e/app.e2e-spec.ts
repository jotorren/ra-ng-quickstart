import {browser, element, by} from 'protractor';

describe('ra-ng quickstart E2E Tests', function () {

    let expectedMsg = 'ra-ng quickstart 2.0.0-rc23';

    beforeEach(function () {
        browser.get('');
    });

    it('should display: ' + expectedMsg, function (done) {
        expect(element(by.css('h2')).getText()).toEqual(expectedMsg);
        done();
    });

});

