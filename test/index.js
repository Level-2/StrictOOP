
var StrictOOP = require('../strict-oop');

var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;

describe('private property', function() {
	it('set a private property externally', function() {

		var obj = {};
		var oop = new StrictOOP(obj);
		oop.property('foo').is('private');

		//Setting a private property should cause
		//an error
		expect(function() {
			obj.foo = 'bar';
		}).to.throw(Error);
	});

	it('read a private property externally', function() {

		var obj = {'foo': 'bar'};
		var oop = new StrictOOP(obj);
		oop.property('foo').is('private');

		//read a private property should cause
		//an error
		expect(function() {
			var x = obj.foo;
		}).to.throw(Error);
	});

	it('set a private property internally', function() {
		var MyClass = class {
			method() {
				this.foo = 'bar';
			}
		}

		var obj = new MyClass();

		var oop = new StrictOOP(obj);
		oop.property('foo').is('private');

		//read a private property should cause
		//an error
		expect(function() {
			obj.method();
		}).to.not.throw(Error);
	});

	it('set a private property internally', function() {
		var MyClass = class {
			constructor() {
				this.foo = 'bar';
			}

			getFoo() {
				return this.foo;
			}
		}

		var obj = new MyClass();

		var oop = new StrictOOP(obj);
		oop.property('foo').is('private');

		var result = obj.getFoo();
		expect(result).to.equal('bar');
	});
});


describe('public property', function() {
	it('set a public property externally', function() {

		var obj = {};
		var oop = new StrictOOP(obj);
		oop.property('foo').is('public');

		//Setting a public property should not cause
		//an error
		expect(function() {
			obj.foo = 'bar';
		}).to.not.throw(Error);
	});

	it('read a public property externally', function() {

		var obj = {'foo': 'bar'};
		var oop = new StrictOOP(obj);
		oop.property('foo').is('public');

		//read a private property should not cause
		//an error
		expect(function() {
			var x = obj.foo;
		}).to.not.throw(Error);
	});


	it('set a public property internally', function() {
		var MyClass = class {
			method() {
				this.foo = 'bar';
			}
		}

		var obj = new MyClass();

		var oop = new StrictOOP(obj);
		oop.property('foo').is('public');

		//read a private property should cause
		//an error
		expect(function() {
			obj.method();
		}).to.not.throw(Error);
	});

	it('set a public property internally', function() {
		var MyClass = class {
			constructor() {
				this.foo = 'bar';
			}

			getFoo() {
				return this.foo;
			}
		}

		var obj = new MyClass();

		var oop = new StrictOOP(obj);
		oop.property('foo').is('public');

		var result = obj.getFoo();
		expect(result).to.equal('bar');
	});
});


describe('strict types on properties', function() {
	it('check type string (valid)', function() {
		var obj = {};
		var oop = new StrictOOP(obj);
		oop.property('foo').type('string');

		//should allow strings
		expect(function() {
			obj.foo = 'bar';
		}).to.not.throw(Error);
	});

	it('check type string (invalid)', function() {

		var obj = {};
		var oop = new StrictOOP(obj);
		oop.property('foo').type('string');

		//Should throw an error when an int is set
		expect(function() {
			obj.foo = 123;
		}).to.throw(Error);
	});


	it('check type number (valid)', function() {
		var obj = {};
		var oop = new StrictOOP(obj);

		oop.property('foo').type('number');

		//should allow strings
		expect(function() {
			obj.foo = 123;
		}).to.not.throw(Error);
	});

	it('check type number (invalid)', function() {
		var obj = {};
		var oop = new StrictOOP(obj);

		oop.property('foo').type('number');

		//Should throw an error when an int is set
		expect(function() {
			obj.foo = 'aaa';
		}).to.throw(Error);
	});

	it('check type class (invalid)', function() {
		var MyType = new function() {};

		var obj = {};
		var oop = new StrictOOP(obj);
		oop.property('foo').type('MyType');

		//Should throw an error when an int is set
		expect(function() {
			obj.foo = 'aaa';
		}).to.throw(Error);
	});

	it('check type class (invalid)', function() {
		var MyType = new function() {};

		var obj = {};
		var oop = new StrictOOP(obj);
		oop.property('foo').type('MyType');

		//Should throw an error when an int is set
		expect(function() {
			obj.foo = new MyType();
		}).to.throw(Error);
	});

});


describe('private method', function() {
	it('call externally', function() {
		var MyClass = class MyClass {
			foo() {
				this.bar();
			}

			bar() {
				return 'called';
			}
		};

		var obj = new MyClass();

		var oop = new StrictOOP(obj);
		oop.method('bar').is('private');

		expect(function() {
			obj.bar();
		}).to.throw(Error);
	});


	it('call internally', function() {
		var MyClass = class MyClass {
			foo() {
				this.bar();
			}

			bar() {
				return 'called';
			}
		};

		var obj = new MyClass();

		var oop = new StrictOOP(obj);
		oop.method('bar').is('private');

		expect(function() {
			obj.foo();
		}).to.not.throw(Error);
	});

});


describe('public method', function() {
	it('call externally', function() {
		var MyClass = class MyClass {
			foo() {
				this.bar();
			}

			bar() {
				return 'called';
			}
		};

		var obj = new MyClass();

		var oop = new StrictOOP(obj);
		oop.method('bar').is('public');

		expect(function() {
			obj.bar();
		}).to.not.throw(Error);
	});


	it('call internally', function() {
		var MyClass = class MyClass {
			foo() {
				this.bar();
			}

			bar() {
				return 'called';
			}
		};

		var obj = new MyClass();

		var oop = new StrictOOP(obj);
		oop.method('bar').is('public');

		expect(function() {
			obj.foo();
		}).to.not.throw(Error);
	});
});

describe('return values', function() {

	it('return string (valid)', function() {
		var MyClass = class MyClass {
			foo() {
				this.bar();
			}

			bar() {
				return 'called';
			}
		};

		var obj = new MyClass();

		var oop = new StrictOOP(obj);
		oop.method('bar').returns('string');

		expect(function() {
			obj.foo();
		}).to.not.throw(Error);
	});

	it('return string (valid)', function() {
		var MyClass = class MyClass {
			foo() {
				this.bar();
			}

			bar() {
				return 123;
			}
		};

		var obj = new MyClass();

		var oop = new StrictOOP(obj);
		oop.method('bar').returns('string');

		expect(function() {
			obj.foo();
		}).to.throw(Error);
	});

	it('return int (valid)', function() {
		var MyClass = class MyClass {
			foo() {
				this.bar();
			}

			bar() {
				return 'called';
			}
		};

		var obj = new MyClass();

		var oop = new StrictOOP(obj);
		oop.method('bar').returns('number');

		expect(function() {
			obj.foo();
		}).to.throw(Error);
	});

	it('return int (valid)', function() {
		var MyClass = class MyClass {
			foo() {
				this.bar();
			}

			bar() {
				return 123;
			}
		};

		var obj = new MyClass();

		var oop = new StrictOOP(obj);
		oop.method('bar').returns('number');

		expect(function() {
			obj.foo();
		}).to.not.throw(Error);
	});

});