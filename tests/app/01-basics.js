if ( typeof window === 'undefined' ) {
    require('../../app/01-basics');
    var expect = require('chai').expect;
}

// Best Practices
describe('best practices', function(){
it('you should avoid global variables', function() {
    bestPracticesAnswers.globals();
    expect(window.myObject).not.to.be.ok;
});

it('you should understand strict comparison', function() {
    expect(bestPracticesAnswers.comparison(1, '1')).to.eql(false);
    expect(bestPracticesAnswers.comparison(1, 1)).to.eql(true);
    expect(bestPracticesAnswers.comparison(0, false)).to.eql(false);
});
});

// Logical Operators
describe('logical operators', function(){
    it('you should be able to work with logical or', function() {
        expect(logicalOperatorsAnswers.or(false, true)).to.be.ok;
        expect(logicalOperatorsAnswers.or(true, false)).to.be.ok;
        expect(logicalOperatorsAnswers.or(true, true)).to.be.ok;
        expect(logicalOperatorsAnswers.or(false, false)).not.to.be.ok;
        expect(logicalOperatorsAnswers.or(3, 4)).to.not.eq(7);
    });

    it('you should be able to work with logical and', function() {
        expect(logicalOperatorsAnswers.and(false, true)).not.to.be.ok;
        expect(logicalOperatorsAnswers.and(false, false)).not.to.be.ok;
        expect(logicalOperatorsAnswers.and(true, false)).not.to.be.ok;
        expect(logicalOperatorsAnswers.and(true, true)).to.be.ok;
        expect(logicalOperatorsAnswers.and(3, 4)).to.be.ok;
    });
});

// Flow Control
describe('flow control', function() {
    it('you should be able to conditionally branch your code', function() {
        var num = 0;

        while (num % 3 === 0 || num % 5 === 0) {
            num = Math.floor(Math.random() * 10) + 1;
        }

        expect(flowControlAnswers.fizzBuzz()).not.to.be.ok;
        expect(flowControlAnswers.fizzBuzz('foo')).not.to.be.ok;
        expect(flowControlAnswers.fizzBuzz(2)).to.eql(2);
        expect(flowControlAnswers.fizzBuzz(101)).to.eql(101);

        expect(flowControlAnswers.fizzBuzz(3)).to.eql('fizz');
        expect(flowControlAnswers.fizzBuzz(6)).to.eql('fizz');
        expect(flowControlAnswers.fizzBuzz(num * 3)).to.eql('fizz');

        expect(flowControlAnswers.fizzBuzz(5)).to.eql('buzz');
        expect(flowControlAnswers.fizzBuzz(10)).to.eql('buzz');
        expect(flowControlAnswers.fizzBuzz(num * 5)).to.eql('buzz');

        expect(flowControlAnswers.fizzBuzz(15)).to.eql('fizzbuzz');
        expect(flowControlAnswers.fizzBuzz(num * 3 * 5)).to.eql('fizzbuzz');
    });
});
