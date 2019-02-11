import format from 'date-fns/format';
import isValid from 'date-fns/is_valid';

export default function formatDate(date, locale) {
  if (!date || !isValid(new Date(date))) {
    return date;
  }
  return format(date, 'MM/DD/YYYY');
}
