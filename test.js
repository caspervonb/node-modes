var test = require('tape');
var spy = require('spy');
var modes = require('./');

test(function (t) {
  var handler = new modes.ModeHandler();
  t.ok(handler);
  t.equals(handler.peek(), undefined);

  var one = {
    activate: spy(),
    deactivate: spy(),
  };

  handler.push(one);
  t.ok(one.activate.called);
  t.equals(handler.peek(), one);

  var two = {
    activate: spy(),
    deactivate: spy(),
    fn: spy(),
  };

  handler.push(two);
  t.equals(handler.peek(), two);
  t.ok(two.activate.called);
  t.ok(one.deactivate.called);

  handler.pop();
  t.equals(handler.peek(), one);

  handler.change(two);
  t.equals(handler.peek(), two);

  handler.invoke('fn', 1);
  t.ok(two.fn.calledWith(1));

  handler.invoke('fn', 1, 2);
  t.ok(two.fn.calledWith(1, 2));

  handler.invoke('fn', 1, 2, 3);
  t.ok(two.fn.calledWith(1, 2, 3));

  handler.invoke('fn', 1, 2, 3, 4);
  t.ok(two.fn.calledWith(1, 2, 3, 4));

  handler.pop();
  t.equals(handler.peek(), undefined);

  t.end();
});
