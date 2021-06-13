const getDateString = (before) => {
  let date = new Date();
  if (before !== undefined) {
    date.setDate(date.getDate() - before);
  }
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let d = date.getDate();
  let dateString;

  month = month < 10 ? "0" + month : month;
  d = d < 10 ? "0" + d : d;
  dateString = `${year}-${month}-${d}`;

  return dateString;
};

const getBadgeTimeString = (seconds) => {
  let badgeString = "";
  if (seconds < 60) badgeString = seconds + "s";
  else {
    if (seconds < 3600) badgeString = `${parseInt(seconds / 60)}m`;
    else badgeString = `${parseInt(seconds / 60 / 60)}h`;
  }
  return badgeString;
};

const getTotalSecondsForDate = (categories, dateString) => {
  let secondsSum = 0;
  for (let c in categories) {
    let domains = categories[c].domains;
    for (let d in domains) {
      domains[d].days[dateString] &&
        (secondsSum += domains[d].days[dateString].seconds);
    }
  }
  return secondsSum;
};

const getDayObj = () => ({ seconds: 0 });

const getDomainObj = (hostname) => {
  const domainObj = {
    name: hostname,
    totalSeconds: 0,
    days: {},
  };
  return domainObj;
};

getPercentageStr = (percentage) => {
  let n = parseInt(100 * percentage).toString(),
    aboveDemical = n.substr(0, n.length - 2) || 0,
    underDemical = n.substr(-2);
  underDemical < 10 && (underDemical = "0" + parseInt(underDemical));
  aboveDemical < 10 && (aboveDemical = "0" + parseInt(aboveDemical));
  return `${aboveDemical}.${underDemical}%`;
};
