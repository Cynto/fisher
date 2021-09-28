import { addDays, compareAsc, format } from 'date-fns';

const createTimeStamp = (fishObject: any) => {
  const createdDate: any = fishObject.createdAt.toDate();
  const dayAfterDate = addDays(new Date(createdDate), 1);
  const currentDate: any = new Date();
  let dateToUse: string = '0';

  //  checks if fish was made less than a day ago
  if (compareAsc(dayAfterDate, currentDate) === 1) {
    const hourToUse = Math.floor(Math.abs(currentDate - createdDate) / 36e5);
    dateToUse = `${hourToUse}h`;

    if (hourToUse <= 0) {
      let differenceUnformatted = Math.abs(currentDate - createdDate) / 1000;
      differenceUnformatted /= 60;
      const minuteToUse = Math.abs(Math.floor(differenceUnformatted));
      dateToUse = `${minuteToUse}m`;
      if (minuteToUse <= 0) {
        const secondToUse = Math.floor(
          (currentDate.getTime() - createdDate.getTime()) / 1000,
        );
        dateToUse = `${secondToUse}s`;
      }
    }
  } else {
    const dayToUse = format(createdDate, 'd MMM');
    dateToUse = dayToUse;
  }
  return dateToUse;
};
export default createTimeStamp;
