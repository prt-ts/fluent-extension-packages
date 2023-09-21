
/**
 *
 * @param date date to compare
 * @param refDate date to compare against
 * @param format @default "days" format to return the difference in days, months, years
 *
 * @returns
 */
export const getDateDiff = (
  date: Date,
  refDate: Date,
  format: 'days' | 'months' | 'years' = 'years'
): number => {
  const diffTime = Math.abs(date.getTime() - refDate.getTime());

  switch (format) {
    case 'months':
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));

    case 'years':
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30 * 12));

    case 'days':
    default:
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
};
