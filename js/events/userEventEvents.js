const eventsFeatureEvents = () => {
  $('#eventsBtn').click(() => {
    $('#events').removeClass('hide');
    $('#welcome').addClass('hide');
  });

  $('#eventsBackBtn').click(() => {
    $('#events').addClass('hide');
    $('#welcome').removeClass('hide');
  });
};

module.exports = {
  eventsFeatureEvents,
};
