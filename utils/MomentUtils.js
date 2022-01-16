import moment from "moment";

export const getDateInString = (date) => {
    if (!date || date == "") {
      return null;
    }
    return moment(date).format("YYYY-MM-DD").toString();
}

export const getAWeekAgoDate = (date) => {
    if (!date || date == "") {
        return null;
      }
      return moment(date).add(-7, 'days').format("YYYY-MM-DD").toString();
}