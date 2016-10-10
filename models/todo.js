// Clog model

const fs = require('fs');
const path = require('path');

const uuid = require('uuid');

const filename = path.join(__dirname, '../data/todo.json');



// getAll = read from file, parse the data
// write = stringigy some data, write the data string to the filename

// create - push new item

exports.getAll = function(cb) {
  fs.readFile(filename, (err, buffer) => {
    if (err) return cb(err);

    try {
      var data = JSON.parse(buffer);
    } catch(e) {
      var data = [];
    }

    cb(null, data);
  })
}



exports.write = function(newData, cb) {
  let json = JSON.stringify(newData);

  fs.writeFile(filename, json, cb);
}

exports.create = function(newItem, cb) {

  newItem.id = uuid();
  newItem.isComplete = false;
  exports.getAll((err, items) => {
    if(err) return cb(err);

    items.push(newItem);

    exports.write(items, cb);
  })
}

exports.remove = function(id, cb) {
  
}
