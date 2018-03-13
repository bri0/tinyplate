module.exports = (title, body) => {
  $('#modal #modal-title').text(title ? title : '');
  $('#modal #modal-body').text(body ? body : '');
  $('#modal').modal();
};
