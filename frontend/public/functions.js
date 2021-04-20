const getDateString = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let d = date.getDate();
  let dateString;

  month = month < 10 ? "0" + month : month;
  d = d < 10 ? "0" + d : d;
  dateString = `${year}-${month}-${d}`;

  return dateString;
};

const getTotalSecondsForDate = (categories, dateString) => {
  let secondsSum = 0;
  for (let category in categories) {
    secondsSum += categories[category].days[dateString]
      ? categories[category].days[dateString].seconds
      : 0;
  }
  return secondsSum;
};

const getDayObj = () => ({ seconds: 0 });
