if ( typeof window === 'undefined' ) {
  require('../../app/02-arrays-objects');
  var expect = require('chai').expect;
}

describe('arrays', function() {
  var a;

  beforeEach(function() {
    a = [ 1, 2, 3, 4 ];
  });

  it('you should be able to count the occurences of an item in an array', function() {
    var result = arraysAnswers.count([ 1, 2, 4, 4, 3, 4, 3 ], 4);

    expect(result).to.eql(3);
  });

  it('you should be able to remove all instances of a value from an array', function() {
    a.push(2); // Make sure the value appears more than one time
    a.push(2); // Make sure the value appears more than one time in a row
    var result = arraysAnswers.remove(a, 2);

    expect(result).to.have.length(3);
    expect(result.join(' ')).to.eql('1 3 4');
  });

  it('you should be able to find duplicates in an array', function() {
    var result = arraysAnswers.duplicates([ 1, 2, 4, 4, 3, 3, 1, 5, 3 ]);

    expect(result.sort()).to.eql([1, 3, 4]);
  });
});


describe('objects and context', function() {
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

  it('you should be able to alter the context in which a method runs', function() {
    // define a function for fn so that the following will pass
    expect(objectsAnswers.alterContext(a.sayIt, b)).to.eql('Yo, Rebecca!');
  });

  it('you should be able to iterate over an object\'s "own" properties', function() {
    // define a function for fn so that the following will pass
    C = function() {
        this.foo = 'bar';
        this.baz = 'bim';
    };

    C.prototype.bop = 'bip';

    var obj = new C();

    expect(objectsAnswers.iterate(obj)).to.eql([ 'foo: bar', 'baz: bim' ]);
  });
});
