const moment = require('moment');
function toHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours} giờ ${minutes} phút`;
}

function formatDateTime(dateTime) {
  return moment(dateTime).format('HH:mm DD/MM/YYYY');
}
function formatDate(date) {
  return moment(date).format('DD/MM/YYYY');
}
function formatTime(time) {
  return moment(time).format('HH:mm');
}

function formatNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

function isValidEmail(email) {
  return emailRegex.test(email);
}

module.exports = { formatDateTime, formatNumber };
