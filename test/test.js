'use strict';

const yaspeller = require('../lib/yandex-speller');
const assert = require('chai').assert;
const fs = require('fs');
const getFile = name => fs.readFileSync(name).toString('utf-8');

describe('checkText()', function() {
    this.timeout(10000);

    it('text', function(done) {
        const text = getFile('./test/texts/text.txt');
        yaspeller.checkText(text, function(err, data) {
            assert.equal(err, null);
            assert.equal(data.length, 3);
            done();
        }, {
            lang: 'ru',
            format: 'plain'
        });
    });

    it('html, format=text', function(done) {
        const text = getFile('./test/texts/text.html');
        yaspeller.checkText(text, function(err, data) {
            assert.equal(err, null);
            assert.equal(data.length, 2);
            done();
        }, {
            lang: 'ru',
            format: 'plain'
        });
    });

    it('html, format=html', function(done) {
        const text = getFile('./test/texts/text.html');
        yaspeller.checkText(text, function(err, data) {
            assert.equal(err, null);
            assert.equal(data.length, 0);
            done();
        }, {
            lang: 'ru',
            format: 'html'
        });
    });

    it('ignoreUrls on', function(done) {
        const text = getFile('./test/texts/ignore_urls.txt');
        yaspeller.checkText(text, function(err, data) {
            assert.equal(err, null);
            assert.equal(data.length, 0);
            done();
        }, {
            lang: 'en,ru',
            format: 'plain',
            options: {ignoreUrls: true}
        });
    });

    it('ignoreUrls off', function(done) {
        const text = getFile('./test/texts/ignore_urls.txt');
        yaspeller.checkText(text, function(err, data) {
            assert.equal(err, null);
            assert.equal(data.length, 2);
            done();
        });
    });
});

describe('checkTexts()', function() {
    it('text', function(done) {
        const text = getFile('./test/texts/text.txt');
        yaspeller.checkTexts([text, text], function(err, data) {
            assert.equal(err, null);
            assert.equal(data.length, 2);
            assert.equal(data[0].length, 3);
            assert.equal(data[0].length, 3);
            done();
        }, {
            lang: 'ru'
        });
    });
});
