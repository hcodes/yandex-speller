'use strict';

const yaspeller = require('../lib/yandex-speller');
const assert = require('chai').assert;
const fs = require('fs');
const getFile = name => fs.readFileSync(name).toString('utf-8');

describe('checkText()', function() {
    this.timeout(10000);

    it('ignoreUppercase on', function(done) {
        const text = getFile('./test/texts/ignore_uppercase.txt');
        yaspeller.checkText(text, function(err, data) {
            assert.equal(err, null);
            assert.equal(data.length, 0);
            done();
        }, {
            lang: 'ru',
            options: { ignoreUppercase: true }
        });
    });

    it('ignoreUppercase on, html', function(done) {
        const text = getFile('./test/texts/ignore_uppercase_html.txt');
        yaspeller.checkText(text, function(err, data) {
            assert.equal(err, null);
            assert.equal(data.length, 0);
            done();
        }, {
            lang: 'ru,en',
            format: 'html',
            options: { ignoreUppercase: true }
        });
    });

    // Does not work in the new API
    it.skip('ignoreUppercase off', function(done) {
        var text = getFile('./test/texts/ignore_uppercase.txt');
        yaspeller.checkText(text, function(err, data) {
            assert.equal(err, null);
            assert.equal(data.length, 1);
            done();
        }, { lang: 'ru' });
    });

    it('ignoreDigits on', function(done) {
        const text = getFile('./test/texts/ignore_digits.txt');
        yaspeller.checkText(text, function(err, data) {
            assert.equal(err, null);
            assert.equal(data.length, 0);
            done();
        }, {lang: 'ru', options: { ignoreDigits: true }});
    });

    // Does not work in the new API
    it.skip('ignoreDigits off', function(done) {
        const text = getFile('./test/texts/ignore_digits.txt');
        yaspeller.checkText(text, function(err, data) {
            assert.equal(err, null);
            assert.equal(data.length, 1);
            done();
        }, {lang: 'ru', format: 'plain'});
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
            options: { ignoreUrls: true }
        });
    });

    it('ignoreUrls off', function(done) {
        const text = getFile('./test/texts/ignore_urls.txt');
        yaspeller.checkText(text, function(err, data) {
            assert.equal(err, null);
            assert.equal(data.length, 1);
            done();
        });
    });

    it('ignoreCapitalization on', function(done) {
        const text = getFile('./test/texts/ignore_capitalization.txt');
        yaspeller.checkText(text, function(err, data) {
            assert.equal(err, null);
            assert.equal(data.length, 0);
            done();
        }, {
            lang: 'ru',
            format: 'plain',
            options: { ignoreCapitalization: true }
        });
    });

    // Does not work in the new API
    it.skip('ignoreCapitalization off', function(done) {
        const text = getFile('./test/texts/ignore_capitalization.txt');
        yaspeller.checkText(text, function(err, data) {
            assert.equal(err, null);
            assert.equal(data.length, 1);
            done();
        }, {lang: 'ru'});
    });

    // Does not work in the new API
    it.skip('findRepeatWords on', function(done) {
        const text = getFile('./test/texts/find_repeat_words.txt');
        yaspeller.checkText(text, function(err, data) {
            assert.equal(err, null);
            assert.equal(data.length, 1);
            done();
        }, {
            lang: 'ru',
            options: { findRepeatWords: true }
        });
    });

    // Does not work in the new API
    it.skip('findRepeatWords off', function(done) {
        const text = getFile('./test/texts/find_repeat_words.txt');
        yaspeller.checkText(text, function(err, data) {
            assert.equal(err, null);
            assert.equal(data.length, 0);
            done();
        }, {
            lang: 'ru',
            format: 'plain'
        });
    });


    // old API
    it.skip('ignoreLatin on', function(done) {
        const text = getFile('./test/texts/ignore_latin.txt');
        yaspeller.checkText(text, function(err, data) {
            assert.equal(err, null);
            assert.equal(data.length, 0);
            done();
        }, {
            lang: ['en', 'ru'],
            format: 'plain',
            options: { ignoreLatin: true }
        });
    });

    // old API
    it.skip('ignoreLatin off', function(done) {
        const text = getFile('./test/texts/ignore_latin.txt');
        yaspeller.checkText(text, function(err, data) {
            assert.equal(err, null);
            assert.equal(data.length, 1);
            done();
        });
    });

    // old API
    it.skip('ignoreRomanNumerals on', function(done) {
        const text = getFile('./test/texts/ignore_roman_numerals.txt');
        yaspeller.checkText(text, function(err, data) {
            assert.equal(err, null);
            assert.equal(data.length, 0);
            done();
        }, {
            lang: 'en,ru',
            format: 'plain',
            options: { ignoreRomanNumerals: true }
        });
    });

    // old API
    it.skip('ignoreRomanNumerals off', function(done) {
        const text = getFile('./test/texts/ignore_roman_numerals.txt');
        yaspeller.checkText(text, function(err, data) {
            assert.equal(err, null);
            assert.equal(data.length, 1);
            done();
        }, { lang: 'en,ru', format: 'plain' });
    });

    // old API
    it.skip('flagLatin on', function(done) {
        const text = getFile('./test/texts/flag_latin.txt');
        yaspeller.checkText(text, function(err, data) {
            assert.equal(err, null);
            assert.equal(data.length, 1);
            done();
        }, {
            lang: 'ru',
            format: 'plain',
            options: { flagLatin: true }
        });
    });

    // old API
    it.skip('flagLatin off', function(done) {
        const text = getFile('./test/texts/flag_latin.txt');
        yaspeller.checkText(text, function(err, data) {
            assert.equal(err, null);
            assert.equal(data.length, 0);
            done();
        }, {lang: 'ru', format: 'plain'});
    });
});

describe('checkTexts()', function() {
    // Does not work in the new API
    it.skip('ignoreUppercase on, html', function(done) {
        const text = getFile('./test/texts/ignore_uppercase_html.txt');
        yaspeller.checkTexts([text, text], function(err, data) {
            assert.equal(err, null);
            assert.equal(data.length, 2);
            assert.equal(data[0].length, 2);
            assert.equal(data[1].length, 2);
            done();
        }, {
            lang: 'ru,en',
            options: { ignoreUppercase: true }
        });
    });
});
