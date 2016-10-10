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

exports.getComplete = function(cb) {
  exports.getAll((err, list) => {
    if(err) return cb(err);

    newList = list.filter(task => {
      return task.isComplete;
    })
    console.log('newList', newList);
    cb(null, newList);

  });
}

exports.getIncomplete = function(cb) {
  exports.getAll((err, list) => {
    if(err) return cb(err);

    newList = list.filter(task => {
      return task.isComplete === false;
    })
    console.log('newList', newList);
    cb(null, newList);

  });
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
  exports.getAll((err, items) => {
    if(err) return cb(err);

    let newItems = items.filter(task => {
      return task.id !== id;
    })
    exports.write(newItems, cb);

  })
}

exports.removeComplete = function(cb) {
  exports.getAll((err, items) => {
    if(err) return cb(err);

    let newItems = items.filter(task => {
      return task.isComplete === false;
    })
    exports.write(newItems, cb);
  })
}

exports.toggle = function(id, cb) {

  exports.getAll((err, items) => {
    if(err) return cb(err);

    let taskToToggle = items.filter(task => {
      return task.id === id;
    })

    let newItems = items.filter(task => {
      return task.id !== id;
    })

    if (taskToToggle[0].isComplete) {
      taskToToggle[0].isComplete = false;
    } else {
      taskToToggle[0].isComplete = true;
    }

    newItems.push(taskToToggle[0]);
    exports.write(items, cb);




    // exports.write(newItems, cb);

  })




}
