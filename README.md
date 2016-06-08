# StrictOOP

## Strict Object-Oriented Programming for Javascript

Strict OOP is a way of bringing strict Object-Oriented Programming concepts to Javascript. 

StrictOOP has been tested for node.js but should also work in most modern browsers/

Currently it supports:

- Public/Private properties
- Strict typing for class properties
- Public/Private methods
- Strict typing for return values

Strict OOP can be used with ECMA6 classes or ECMA5 OOP via functions.

The features above can all be applied to an object after it's been constructed or inside the object's constructor.


## Examples

### Private Properties

Properties can be made private so they are inaccessible from methods outside the class.

```js

var StrictOOP = require('strict-oop');

//Firstly declare the class as normal
class Car {
	constructor() {
		this.speed = 0;
	}

	accellerate() {
		this.speed += 5;
	}

}

var car = new Car();

//Add strict OOP rules to the `car` object
var oop = new StrictOOP(car);

//set the speed property to private
oop.property('speed').is('private');

//Now, trying to set it will cause an error to be thrown
car.speed = 100;

//This will update the speed as expected because the accellerate method is inside the class
car.accellerate();
```

The example above can also be expressed as:


```js

var StrictOOP = require('strict-oop');

//Firstly declare the class as normal
class Car {
	constructor() {
		//Add strict OOP rules to this instance
		var oop = new StrictOOP(this);
		oop.property('speed').is('private');

		this.speed = 0;
	}

	accellerate() {
		this.speed += 5;
	}

}

//Create an instance of `Car` as normal:
var car = new Car();

//But trying to set it will cause an error to be thrown
car.speed = 100;

//This will update the speed as expected because the accellerate method is inside the class
car.accellerate();

```

This approach gives class authors the ability to define whether they want to enforce strict OOP in their classes.


### Strict types

StrictOOP also supports any types supported natively by javascript:


```js

var StrictOOP = require('strict-oop');

//Firstly declare the class as normal
class Car {
	constructor() {
		//Add strict OOP rules to this instance
		var oop = new StrictOOP(this);
		oop.property('speed').type('number');

		this.speed = 0;
	}

	accellerate() {
		this.speed += 5;
	}

}

//Create an instance of `Car` as normal:
var car = new Car();


//Causes an error:
car.speed = 'REALLY FAST';

//Allowed:
car.speed = 100;
```

This will thrown an error because the `speed` property now only accepts numbers.

### Private + Type

Visibility and types can be combined:


```js

var StrictOOP = require('strict-oop');

//Firstly declare the class as normal
class Car {
	constructor() {
		//Add strict OOP rules to this instance
		var oop = new StrictOOP(this);
		oop.property('speed').visibility('private').type('number');

		this.speed = 0;
	}

	accellerate() {
		//This will error due to type checking
		this.speed = 'FAST';
	}

}

//Create an instance of `Car` as normal:
var car = new Car();


//This will errror because of visiblity
car.speed = 100;
```


### Methods

StrictOOP also allows setting visibility and return type checks on methods:


```js

var StrictOOP = require('strict-oop');

//Firstly declare the class as normal
class Car {
	constructor() {
		//Add strict OOP rules to this instance
		var oop = new StrictOOP(this);
		oop.method('getSpeed').is('public').returns('number');

		oop.method('accellerate').is('private');

		this.speed = 0;
	}

	accellerate() {
		//This will error due to type checking
		this.speed = 'FAST';
	}

	getSpeed() {
		return 'FAST';
	}

}

//Create an instance of `Car` as normal:
var car = new Car();

//Errors because it returns a string instead of a number
car.getSpeed();

//Errors because the method is private
car.accellerate();

```



## Limitations


Anonymous classes and functions *must* have names for StrictOOP to work correctly.


*Wrong:*

```js

var MyClass = function() {
	this.foo = function() {
		alert(1);
	}
}


var MyClass2 = class {
	constructor() {

	}
}

```

*Right:*

```js

var MyClass = function MyClass() {
	this.foo = function() {
		alert(1);
	}
}

var MyClass2 = class MyClass2 {
	constructor() {

	}
}

```