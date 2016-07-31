(function(module) {
  var webDB = {};

  // Private function to configure the underlying database connection via the html5sql library:
  function _config(isVerbose) {
    var msg;
    if (isVerbose) {
      html5sql.logInfo = true;
      html5sql.logErrors = true;
      html5sql.putSelectResultsInArray = true;
      msg = 'html5sql verbosity on';
    } else {
      html5sql.logInfo = false;
      html5sql.logErrors = false;
      html5sql.putSelectResultsInArray = false;
      msg = 'html5sql verbosity off';
    }
    console.log(msg);
  };

  // Public interface method to set up the initial database connection:
  webDB.init = function(isVerbose) {
    // Open and init DB
    try {
      if (openDatabase) {
        _config(isVerbose);
        html5sql.openDatabase('blogDB', 'Blog Database', 5*1024*1024);
      } else {
        console.log('Web Databases not supported.');
      }
    } catch (e) {
      console.error('Error occured during DB init. Web Database may not be supported.');
    }
  };

  // Public interface method to run some SQL and pass the result to a callback function:
  webDB.execute = function (sql, callback) {
    callback = callback || function() {};
    html5sql.process(
      sql,
      function (tx, result, resultArray) {
        callback(resultArray, result, tx); // Reorder the args, because we usually want JUST the resultArray.
      }
    );
  };

  module.webDB = webDB;
})(window)

// We can go ahead and set up the basic db connection now:
webDB.init(true);
