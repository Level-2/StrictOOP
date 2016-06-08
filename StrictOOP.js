"use strict";

var StrictOOP = class {
	constructor(obj) {
		this.obj = obj;
		this.properties = [];
		this.methods = [];
	}

	property(name) {
		if (!this.properties[name]) {
			this.properties[name] = new StrictOOP.Property(this, name);
		}
		return this.properties[name];
	}

	method(name) {
		if (!this.methods[name]) {
			this.methods[name] = new StrictOOP.Method(this, name);
		}
		return this.methods[name];
	}

	getCallerName(n) {
		try {
			throw new Error('Generating a stack trace');
		}
		catch (e) {
		//	console.log(e.stack);
			var callerLine = e.stack.split('\n')[n];
			return callerLine.split('at ')[1].split(' (')[0];
		}
	}

	checkvisibility(visibility, error) {
		var caller = this.getCallerName(3);

		//For methods there is an extra call in the stack
		if (caller.indexOf('.parent.obj.(anonymous function)') > -1) {
			var caller = this.getCallerName(4);
		}
		
		if (caller.indexOf(this.obj.constructor.name) == -1 && visibility == 'private') {
			throw new Error(error);
		}
	}

	checktype(expected, actual, error) {
		if (!(typeof actual == expected || this.obj.constructor.name == expected)) {
				throw new Error(error);
		}
	}
};


StrictOOP.Method = class {
	constructor(parent, name) {
		this.parent = parent;

		var oldFunc = parent.obj[name];

		var self = this;

		parent.obj[name] = function() {
			parent.checkvisibility(self.visibility, 'Cannot call private method ' + name);
 			
 			var result = oldFunc.apply(parent.obj, arguments);

 			if (self.otype) {
 				parent.checktype(self.otype, result, 'Method ' + name + ' must return a ' + self.otype);
 			}
			
			return result;
		};
	}

	is(visibility) {
		this.visibility = visibility;
		return this;
	}

	returns(type) {
		this.otype = type;
		return this;
	}
};

StrictOOP.Property = class {
	constructor(parent, name) {
		this.value = parent.obj[name];
		delete parent.obj[name];
		this.visibility = 'public';
		this.otype = null;

		var self = this;

		Object.defineProperty(parent.obj, name, {
			get: function() {
				var objtype = (typeof value == 'object') ? value.constructor.name : self.otype;

				parent.checkvisibility(self.visibility, 'Cannot read private property ' + parent.obj.constructor.name + '.' + name);
				
				return self.value;
			},
			set: function(value) {

				var objtype = (typeof value == 'object') ? value.constructor.name : self.otype;

				parent.checkvisibility(self.visibility, 'Cannot set private property ' + parent.obj.constructor.name + '.' + name);
				
				if (self.otype) {
					parent.checktype(self.otype, value, 'Cannot set property ' + name + ' to ' + value + ', expecting ' + self.otype);
				}

				if (self.otype && !(typeof value == self.otype || obj.constructor.name == self.otype)) {
					throw new Error('Cannot set property ' + parent.obj.constructor.name + '.' + name + ' to ' + value + '. Expecting ' + self.otype + ' but ' + objtype + ' given.');
				}
				else self.value = value;
			}
		});
	}

	is(visibility) {
		this.visibility = visibility;
		return this;
	}

	type(type) {
		this.otype = type;
		return this;
	}
}

module.exports.StrictOOP;