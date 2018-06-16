const eventsFeatureEvents = () => {
  $('#eventsBtn').click(() => {
    $('#events').removeClass('hide');
    $('#welcome').addClass('hide');
  });

  $('.dashboard').click(() => {
    $('#events').addClass('hide');
    $('#welcome').removeClass('hide');
  });
};

module.exports = {
  eventsFeatureEvents,
};
