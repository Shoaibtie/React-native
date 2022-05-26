import moment from 'moment';

const DateHelper = {
  // function to handle time 12 hrs clock vise
  timeConvert: time => {
    // Check correct time format and split into components
    time = time && time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  },

  // function that handle day name
  getDayName: (data, d) => {
    if (d.getDay() === 1) {
      data.day = 'Mon';
    } else if (d.getDay() === 2) {
      data.day = 'Tue';
    } else if (d.getDay() === 3) {
      data.day = 'Wed';
    } else if (d.getDay() === 4) {
      data.day = 'Thur';
    } else if (d.getDay() === 5) {
      data.day = 'Fri';
    }
  },

  // function to handle date format
  dateFormatHandler: date => {
    let getMonth =
      date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let getDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return date.getFullYear() + '-' + getMonth + '-' + getDate;
  },

  dateFormatCoverter: (date, formatType) => {
    let startDate = date.split('-');
    let readableDate;
    if (formatType === 'reverse') {
      readableDate = startDate[1] + '/' + startDate[2] + '/' + startDate[0];
    } else {
      readableDate = startDate[0] + '/' + startDate[1] + '/' + startDate[2];
    }
    return readableDate;
  },
  momentDateConverter: (date) => {
    const format = "MM/DD/YYYY"
    const formattedCurrentDate = moment(date).format(format);
    return formattedCurrentDate;
  },
  momentGetDayName: (date) => {
    var check = moment(date, 'YYYY/MM/DD');
    var day = check.format('dddd');
    return day;
  },
  removeTextFromDate: (date) => {
    const splittedDate = date ? date.split('T') : null;
    const formattedDate = date != null ? DateHelper.momentDateConverter(splittedDate[0]) + ' ' + DateHelper.timeConvert(splittedDate[1]) : null;
    return formattedDate;
  },
  correctFormatOfTime: (date) => {
    const splittedDate = date ? date.split('T') : null;
    const formattedDate = date != null ? DateHelper.momentDateConverter(splittedDate[0]) + ' ' + splittedDate[1] : null;
    return formattedDate;
  }
};
export default DateHelper;
