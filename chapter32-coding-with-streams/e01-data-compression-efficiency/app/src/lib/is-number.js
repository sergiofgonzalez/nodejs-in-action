export function isNumber(val) {
  if (Number.isNaN(Number.parseFloat(val))) {
    return false;
  } else {
    return true;
  }
}