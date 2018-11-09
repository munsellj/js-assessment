if ( typeof window === 'undefined' ) {
  require('../../app/04-concepts');
  var expect = require('chai').expect;
  var sinon = require('sinon');
}

// Async
describe('async behavior', function() {

  /* eslint-disable no-console */
  describe('', function () {
    var nums;
    var origConsoleLog;

    beforeEach(function () {
      nums = [];

      if (typeof console === 'undefined') {
        console = {
          log: null
        };
      }
      origConsoleLog = console.log;
      console.log = function (val) {
        nums.push(val);
      };

      this.clock = sinon.useFakeTimers();
    });

    afterEach(function () {
      console.log = origConsoleLog;

      this.clock.restore();
    });

    it('should count from start number to end number, one per 1/10th of a second', function () {
      this.timeout(600);
      asyncAnswers.count(1, 5);

      for (var i = 1; i <= 5; i++) {
        expect(nums.length).to.eql(i);

        this.clock.tick(100);
      }

      expect(nums.length).to.eql(5);
      expect(nums[0]).to.eql(1);
      expect(nums[4]).to.eql(5);
    });

    it('should provide a method to cancel the counting', function () {
      this.timeout(600);

      var counter = asyncAnswers.count(1, 5);
      counter.cancel();

      this.clock.tick(550);

      expect(nums.length < 5).to.be.ok;
    });
  });

  /* eslint-enable no-console */

  describe('', function () {
    it('you should understand how to use promises to handle asynchronicity', function (done) {
      var flag = false;
      var finished = 0;
      var total = 2;

      function finish(_done) {
        if (++finished === total) {
          _done();
        }
      }

      asyncAnswers.async(true).then(function (result) {
        flag = result;
        expect(flag).to.eql(true);
        finish(done);
      });

      asyncAnswers.async('success').then(function (result) {
        flag = result;
        expect(flag).to.eql('success');
        finish(done);
      });

      expect(flag).to.eql(false);
    });

    it('you should be able to retrieve data from the server and return a sorted array of names', function (done) {
      var url = '/data/testdata.json';

      asyncAnswers.manipulateRemoteData(url).then(function (result) {
        expect(result).to.have.length(5);
        expect(result.join(' ')).to.eql('Adam Alex Matt Paul Rebecca');
        done();
      });
    });
  });
});

// Modules
describe('the module pattern', function() {
  it('you should be able to create a function that returns a module', function() {
    var module = modulesAnswers.createModule('hello', 'matt');

    expect(module.sayIt).to.be.a('function');
    expect(module.name).to.eql('matt');
    expect(module.greeting).to.eql('hello');
    expect(module.sayIt()).to.eql('hello, matt');

    module.name = 'katniss';
    module.greeting = 'hi';
    expect(module.name).to.eql('katniss');
    expect(module.greeting).to.eql('hi');
    expect(module.sayIt()).to.eql('hi, katniss');
  });
});

// More Arrays
describe('more arrays', function() {
  var a;

  beforeEach(function() {
      a = [ 1, 2, 3, 4 ];
  });

  it('you should be able to remove all instances of a value from an array, returning the original array', function() {
    a.splice( 1, 0, 2 );
    a.push( 2 );
    a.push( 2 );

    var result = moreArraysAnswers.removeWithoutCopy(a, 2);

    expect(result).to.have.length(3);
    expect(result.join(' ')).to.eql('1 3 4');

    // make sure that you return the same array instance
    expect(result).equal(a);
  });
});

// More Objects
describe('more objects and context', function() {
  var a;
  var b;
  var C;

  beforeEach(function() {
    a = {
      name: 'Matt',
      greeting: 'Hello',
      sayIt: function() {
        return this.greeting + ', ' +
            this.name + '!';
      }
    };

    b = {
      name: 'Rebecca',
      greeting: 'Yo'
    };

    C = function(name) {
      this.name = name;
      return this;
    };
  });

  it('you should be able to alter multiple objects at once', function() {
    // define a function for fn so that the following will pass
    var obj1 = new C('Rebecca');
    var obj2 = new C('Melissa');
    var greeting = 'What\'s up';

    moreObjectsAnswers.alterObjects(C, greeting);

    expect(obj1.greeting).to.eql(greeting);
    expect(obj2.greeting).to.eql(greeting);
    expect(new C('Ellie').greeting).to.eql(greeting);
  });
});

// More Functions
describe('more functions', function() {
  it('you should be able to apply functions with arbitrary numbers of arguments', function () {
    (function () {
      var a = Math.random();
      var b = Math.random();
      var c = Math.random();

      var wasITake2ArgumentsCalled = false;
      var iTake2Arguments = function (firstArgument, secondArgument) {
        expect(arguments.length).to.eql(2);
        expect(firstArgument).to.eql(a);
        expect(secondArgument).to.eql(b);

        wasITake2ArgumentsCalled = true;
      };

      var wasITake3ArgumentsCalled = false;
      var iTake3Arguments = function (firstArgument, secondArgument, thirdArgument) {
        expect(arguments.length).to.eql(3);
        expect(firstArgument).to.eql(a);
        expect(secondArgument).to.eql(b);
        expect(thirdArgument).to.eql(c);

        wasITake3ArgumentsCalled = true;
      };

      moreFunctionsAnswers.callIt(iTake2Arguments, a, b);
      moreFunctionsAnswers.callIt(iTake3Arguments, a, b, c);

      expect(wasITake2ArgumentsCalled).to.be.ok;
      expect(wasITake3ArgumentsCalled).to.be.ok;
    }());
  });

  it('you should be able to create a "partial" function for variable number of applied arguments', function () {
    var partialMe = function (x, y, z) {
      return x / y * z;
    };

    var a = Math.random();
    var b = Math.random();
    var c = Math.random();
    expect(moreFunctionsAnswers.partialUsingArguments(partialMe)(a, b, c)).to.eql(partialMe(a, b, c));
    expect(moreFunctionsAnswers.partialUsingArguments(partialMe, a)(b, c)).to.eql(partialMe(a, b, c));
    expect(moreFunctionsAnswers.partialUsingArguments(partialMe, a, b)(c)).to.eql(partialMe(a, b, c));
    expect(moreFunctionsAnswers.partialUsingArguments(partialMe, a, b, c)()).to.eql(partialMe(a, b, c));
  });

  it('you should be able to curry existing functions', function () {
    var curryMe = function (x, y, z) {
      return x / y * z;
    };

    var a = Math.random();
    var b = Math.random();
    var c = Math.random();
    var result;

    result = moreFunctionsAnswers.curryIt(curryMe);
    expect(typeof result).to.eql('function');
    expect(result.length).to.eql(1);

    result = moreFunctionsAnswers.curryIt(curryMe)(a);
    expect(typeof result).to.eql('function');
    expect(result.length).to.eql(1);

    result = moreFunctionsAnswers.curryIt(curryMe)(a)(b);
    expect(typeof result).to.eql('function');
    expect(result.length).to.eql(1);

    result = moreFunctionsAnswers.curryIt(curryMe)(a)(b)(c);
    expect(typeof result).to.eql('number');
    expect(result).to.eql(curryMe(a, b, c));
  });
});

// Recursion
describe('recursion', function() {
    var fileData = {
        dir: 'app',
        files: [
            'index.html',
            {
                dir: 'js',
                files: [
                    'main.js',
                    'app.js',
                    'misc.js',
                    {
                        dir: 'vendor',
                        files: [
                            'jquery.js',
                            'underscore.js'
                        ]
                    }
                ]
            },
            {
                dir: 'css',
                files: [
                    'reset.css',
                    'main.css'
                ]
            }
        ]
    };

    it('you should be able to return a list of files from the data', function() {
        var result = recursionAnswers.listFiles(fileData);
        expect(result.length).to.eql(8);
        expect(result.indexOf('index.html') > -1).to.be.ok;
        expect(result.indexOf('main.js') > -1).to.be.ok;
        expect(result.indexOf('underscore.js') > -1).to.be.ok;
    });

    it('you should be able to return a list of files in a subdir', function() {
        var result = recursionAnswers.listFiles(fileData, 'js');
        expect(result.length).to.eql(5);
        expect(result.indexOf('main.js') > -1).to.be.ok;
        expect(result.indexOf('underscore.js') > -1).to.be.ok;
    });
});

// Permutation
describe('permutation', function() {
  var arr = [ 1, 2, 3, 4 ];
  var answer = [
    [1, 2, 3, 4],
    [1, 2, 4, 3],
    [1, 3, 2, 4],
    [1, 3, 4, 2],
    [1, 4, 2, 3],
    [1, 4, 3, 2],
    [2, 1, 3, 4],
    [2, 1, 4, 3],
    [2, 3, 1, 4],
    [2, 3, 4, 1],
    [2, 4, 1, 3],
    [2, 4, 3, 1],
    [3, 1, 2, 4],
    [3, 1, 4, 2],
    [3, 2, 1, 4],
    [3, 2, 4, 1],
    [3, 4, 1, 2],
    [3, 4, 2, 1],
    [4, 1, 2, 3],
    [4, 1, 3, 2],
    [4, 2, 1, 3],
    [4, 2, 3, 1],
    [4, 3, 1, 2],
    [4, 3, 2, 1]
  ];

  it('you should be able to return the permutations of an array', function() {
    var result = permutationAnswers.permute(arr);
    var resultStrings = _.map(result, function(r) { return r.join(''); });

    expect(result.length).to.eql(answer.length);

    _.each(answer, function(a) {
      expect(resultStrings.indexOf(a.join('')) > -1).to.be.ok;
    });
  });

  it('you should be able to return the nth number in a fibonacci sequence', function() {
    expect(permutationAnswers.fibonacci(2)).to.eql(1);
    expect(permutationAnswers.fibonacci(6)).to.eql(8);
  });

  it('you should be able to return the set of all valid combinations of n pairs of parentheses.', function() {
    var expected = [ '((()))', '(()())', '(())()', '()(())', '()()()'];
    var result = permutationAnswers.validParentheses(3);

    expect(result.length).to.eql(5);
    _.each(expected, function(c) {
      expect(result).to.contain(c);
    });
  });
});

// Fun w/ Strings
describe('fun w/ strings', function() {
  it('you should be able to reduce duplicate characters to a desired minimum', function() {
    expect(stringsAnswers.reduceString('aaaabbbb', 2)).to.eql('aabb');
    expect(stringsAnswers.reduceString('xaaabbbb', 2)).to.eql('xaabb');
    expect(stringsAnswers.reduceString('aaaabbbb', 1)).to.eql('ab');
    expect(stringsAnswers.reduceString('aaxxxaabbbb', 2)).to.eql('aaxxaabb');
  });

  it('you should be able to wrap lines at a given number of columns, without breaking words', function() {
    var wrapCol = 5;
    var inputStrings = [
      'abcdef abcde abc def',
      'abc abc abc',
      'a b c def'
    ];
    var outputStrings = [
      'abcdef\nabcde\nabc\ndef',
      'abc\nabc\nabc',
      'a b c\ndef'
    ];
    var formattedStr;

    inputStrings.forEach(function(str, index) {
      formattedStr = stringsAnswers.wordWrap(str, wrapCol);
      expect(formattedStr).to.eql(outputStrings[index]);
    });
  });
});
