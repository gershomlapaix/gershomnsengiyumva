const changeFromTimeStamp = (timestamp) => {
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  
    var date_not_formatted = new Date(timestamp);
  
    var formatted_date = date_not_formatted.getFullYear() + ".";
  
    if (date_not_formatted.getMonth() < 9) {
      formatted_date += "";
    }
    formatted_date += months[date_not_formatted.getMonth()];
    formatted_date += ".";
  
    if (date_not_formatted.getDate() < 10) {
      formatted_date += "0";
    }
    formatted_date += date_not_formatted.getDate();
  
    let words = [];
    let currentWord = "";
    let formatted_dateLength = formatted_date.length + 1;
  
    for (var i = 0; i < formatted_dateLength; i++) {
      if (formatted_date[i] !== "." && i !== formatted_date.length) {
        currentWord += formatted_date[i];
      } else if (i === formatted_date.length) {
        words.unshift(currentWord);
      } else {
        words.unshift(currentWord);
        words.unshift(" ");
        currentWord = "";
      }
    }
  
    return words.join("");
  };
  
  export default changeFromTimeStamp;
  