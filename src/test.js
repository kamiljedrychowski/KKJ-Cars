let test = {
  tests: [],
  invalidCodePath: function(err) {
    test.assert(!'invalid codepath', err)
  },
  assert:
      function(expr, msg) {
        if (!expr) {
          console.trace()
          console.log(msg)
          debugger
        }
      },
  run:
      function() {
        for (let i = 0; i < test.tests.length; i++) {
          test.tests[i]()
        }
      },
  push:
      function(func) {
        test.tests.push(func)
      }
};

module.exports = test
