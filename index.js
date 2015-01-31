"use strict";

function ModeHandler() {
  this._modes = undefined;
}

ModeHandler.prototype.invoke = function invoke(fn) {
  if (!this._modes) {
    this._modes = [];
  }

  var stack = this._modes;
  var current = stack[stack.length - 1];
  if (current && current[fn]) {
    current[fn].apply(current, [].slice.call(arguments,1));
  }

};

ModeHandler.prototype.change = function change(mode) {
  if (!this._modes) {
    this._modes = [];
  }

  var stack = this._modes;

  while (stack.length) {
    var current = stack[stack.length - 1];
    if (current && mode.deactivate) {
      current.deactivate();
    }

    stack.pop();
  }

  if (mode && mode.activate) {
    mode.activate();
  }

  stack.push(mode);
}

ModeHandler.prototype.push = function push(mode) {
  if (!this._modes) {
    this._modes = [];
  }

  var stack = this._modes;

  var current = stack[stack.length - 1];
  if (current && current.deactivate) {
    current.deactivate();
  }

  if (mode && mode.activate) {
    mode.activate();
  }

  stack.push(mode);
};


ModeHandler.prototype.pop = function pop() {
  if (!this._modes) {
    this._modes = [];
  }

  var stack = this._modes;

  var current = stack.pop();
  if (current) {
    current.deactivate();
  }

  var previous = stack[stack.length - 1];
  if (previous) {
    previous.activate();
  }

  return current;
};

ModeHandler.prototype.peek = function peek() {
  if (!this._modes) {
    this._modes = [];
  }

  var stack = this._modes;
  return stack[stack.length - 1];
};

module.exports = ModeHandler;
module.exports.ModeHandler = ModeHandler;
