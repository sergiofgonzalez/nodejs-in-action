
function getColorForValue(value) {
  if (value < 0) {
    return 'red';
  } else if (value == 0) {
    return '';
  } else {
    return 'green';
  }
}

export default getColorForValue;