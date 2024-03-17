function getCurrentTimeDate(){
    const moment = require("moment");
    const now = moment();
    const formattedDate = now.format('hh:mm A - DD MMMM, YYYY');
    return (formattedDate);
}

module.exports = {
    getCurrentTimeDate
}