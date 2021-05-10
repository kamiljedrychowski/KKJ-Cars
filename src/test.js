let test = {
  tests: [],
  invalidCodePath: function (err) {
    test.assert(!'invalid codepath', err)
  },
  assert:
    function (expr, msg) {
      if (!expr) {
        console.trace()
        console.log(msg)
        debugger
      }
    },
  run:
    function () {
      for (let i = 0; i < test.tests.length; i++) {
        console.log(test.tests[i][0])
        test.tests[i][1]()
      }
    },
  push:
    function (desc, func) {
      test.tests.push([desc, func])
    }
};

module.exports = test
