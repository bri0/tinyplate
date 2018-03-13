const showModal = require('../lib/modal');

module.exports = {
  handleLoginResponse: (err, res) => {
    console.log(err, res);
    showModal('Sample Title', 'Sample Body');
  }
};
