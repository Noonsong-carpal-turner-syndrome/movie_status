const getColorOfCategory = (name) => {
  let color;
  switch (name) {
    case "entertainment":
      color = "#ffa600";
      break;
    case "productivity":
      color = "#ff7c43";
      break;
    case "socialMedia":
      color = "#f95d6a";
      break;
    case "infoAndDocs":
      color = "#d45087";
      break;
    case "shopping":
      color = "#a05195";
      break;
    case "education":
      color = "#665191";
      break;
    case "business":
      color = "#2f4b7c";
      break;
    case "etc":
      color = "#003f5c";
      break;
    default:
      color = "#969696";
      break;
  }
  return color;
};
const getPieData = () => {
  const obj = {
    categories: [],
    total: {
      name: "Total",
      seconds: 0,
      percentage: 100,
      percentageText: "100.00 %",
    },
  };
  let percentage,
    percentageStr,
    isIncluded = true;

  for (let category in categories) {
    //업데이트 되기전의 categories...
    let domains = categories[category].domains;
    let secondsSum = 0;
    for (let i in domains) {
      if (domains[i].days.hasOwnProperty(dates.today)) {
        secondsSum += domains[i].days[dates.today].seconds;
      }
    }
    if (!secondsSum) continue;
    percentage = (secondsSum / seconds.today) * 100;
    percentageStr = getPercentageStr(percentage);
    isIncluded = percentage > MIN_PERCENTAGE_GRAPH;

    obj.categories.push({
      domains: domains,
      name: categories[category].name,
      seconds: secondsSum,
      percentage: percentage,
      percentageStr: percentageStr,
      isIncluded: isIncluded,
    });
  }

  obj.total.seconds = seconds.today;
  obj.categories.sort((o, t) => t.percentage - o.percentage);

  let startPercentages = [];
  for (let i = 0; i < obj.categories.length; i++) {
    obj.categories[i].isIncluded &&
      (obj.categories[i].color = getColorOfCategory(obj.categories[i].name));
    if (i === 0) {
      startPercentages.push(0);
    } else {
      startPercentages.push(
        startPercentages[i - 1] + obj.categories[i - 1].percentage
      );
    }
    obj.categories[i].startPercentage = startPercentages[i];
  }

  return obj;
};

function isEmpty(obj) {
  return obj && Object.keys(obj).length === 0;
}
function ping() {
  chrome.runtime.onMessage.addListener(function (
    message,
    sender,
    sendResponse
  ) {
    if (message.request === "PIE_DATA") {
      if (isEmpty(pieData)) {
        console.log("pieData is empty | getPieData.js");
        setTimeout(ping, 10);
      } else {
        console.log("pieData | getPieData.js");
        sendResponse({ msg: pieData });
      }
    } else if (message.request === "BAR_CHART_DATA") {
      if (barChartData) {
        console.log("barChartData | getPieData.js :", barChartData);
        sendResponse({ msg: barChartData });
      } else {
        console.log("barChartData is empty | getPieData.js");
        setTimeout(ping, 1000);
      }
    }
  });
}
ping();
