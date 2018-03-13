const request = require('../lib/request');
const actions = require('../actions');
const util = require('../lib/util');

const objectifyForm = (formArray) => {
  const returnArray = {};
  for (let i = 0; i < formArray.length; i++){
    returnArray[formArray[i]['name']] = formArray[i]['value'];
  }
  return returnArray;
};

module.exports = function bindFormSubmit() {
  $('form').on('submit', function (event) {
    const method = $(this).attr('method') ? $(this).attr('method') : 'POST';
    const url = $(this).attr('action') ? $(this).attr('action') : '';
    let callback = Function.prototype;
    if ($(this).attr('callback')) {
      const action = util.get(actions, $(this).attr('callback'));
      if (util.isFunction(action)) {
        callback = action;
      }
    }
    event.preventDefault();
    request(method, url, objectifyForm($(this).serializeArray()), callback);
  });
};
