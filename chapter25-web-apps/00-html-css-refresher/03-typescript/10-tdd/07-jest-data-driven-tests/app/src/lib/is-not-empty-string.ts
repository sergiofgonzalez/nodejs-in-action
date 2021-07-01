export function isNotEmptyString(value: string): boolean {
  if ( value && value.length > 0 && value.trim().length > 0) {
    return true;
  }
  return false;
}