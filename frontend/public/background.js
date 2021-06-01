//일부 구조 수정, async await 적용
chrome.identity.getProfileUserInfo(function (userInfo) {
  /* Use userInfo.email, or better (for privacy) userInfo.id
     They will be empty if user is not signed in in Chrome */
  console.log("userInfo.email:", userInfo.email);
});
let sendObj = { url: "https://www.naver.com" };
// fetch("/classification", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json;charset=utf-8",
//   },
//   body: JSON.stringify(sendObj),
// })
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (myJson) {
//     console.log(JSON.stringify(myJson));
//   });

let pieData = {};
let barChartData = {};
const isLoaded = false;
const seconds = {
    today: 0,
    //total: 0
  },
  dates = { today: "", since: "" };
let todayBarData = {
  todayTotalSeconds: 0,
  categories: {
    entertainment: { todaySeconds: 0 },
    productivity: { todaySeconds: 0 },
    socialMedia: { todaySeconds: 0 },
    infoAndDocs: { todaySeconds: 0 },
    shopping: { todaySeconds: 0 },
    education: { todaySeconds: 0 },
    business: { todaySeconds: 0 },
    etc: { todaySeconds: 0 },
  },
};
let CategoriesIsChanged = false,
  categories = {
    entertainment: {
      todaySeconds: 0,
      name: "entertainment",
      totalSeconds: 0,
      domains: {
        /*
        "hostname": { 
          name: "hostname", 
          totalSeconds: 0,
          todaySeconds: 0, 
          days: {
            "yyyy-mm-dd": {seconds : 0},
            "yyyy-mm-dd": {seconds : 0},
          } 
        },*/
      },
    },
    productivity: {
      todaySeconds: 0,
      name: "productivity",
      totalSeconds: 0,
      domains: {},
    },
    socialMedia: {
      todaySeconds: 0,
      name: "socialMedia",
      totalSeconds: 0,
      domains: {},
    },
    infoAndDocs: {
      todaySeconds: 0,
      name: "infoAndDocs",
      totalSeconds: 0,
      domains: {},
    },
    shopping: {
      todaySeconds: 0,
      name: "shopping",
      totalSeconds: 0,
      domains: {},
    },
    education: {
      todaySeconds: 0,
      name: "education",
      totalSeconds: 0,
      domains: {},
    },
    business: {
      todaySeconds: 0,
      name: "business",
      totalSeconds: 0,
      domains: {},
    },
    etc: {
      todaySeconds: 0,
      name: "etc",
      totalSeconds: 0,
      domains: {},
    },
  };

//start
chrome.tabs.onActivated.addListener((tab) => {
  let hostname,
    classified,
    tabID = tab.tabId;
  chrome.tabs.get(tabID, (tab) => {
    hostname = new URL(tab.url).hostname;
    setBadge(tabID, "");
    classified = getClassified(hostname);
    categories[classified].domains[hostname] &&
      categories[classified].domains[hostname].days[dates.today] &&
      setBadge(
        tabID,
        getBadgeTimeString(
          categories[classified].domains[hostname].days[dates.today].seconds
        )
      );
  });
});
let getPieData_timeStart = 0;
let getPieData_timeEnd = 0;
let update_timeStart = 0;
let update_timeEnd = 0;
prepareDatas();
updateCateEvery(1000);
//saveCateAndTotal(1000);
saveTodayBarData(1000);

function prepareDatas() {
  dates.today = getDateString();
  loadDateSince(dates.today);
  // loadTotalSeconds();
  // saveTotalSeconds();
  loadCategories();
  pieData = getPieData();
}
function loadDateSince(todayString) {
  localStorage.load("dateSince", todayString, (storage) => {
    dates.since = storage["dateSince"];
    saveDateSince();
  });
}
function saveDateSince() {
  localStorage.save("dateSince", dates.since);
}
// function loadTotalSeconds() {
//   localStorage.load("totalSeconds", 0, (storage) => {
//     seconds.total = storage["totalSeconds"];
//   });
// }
// function saveTotalSeconds() {
//   localStorage.save("totalSeconds", seconds.total);
// }
function loadCategories() {
  localStorage.load("categories", categories, (storage) => {
    categories = storage.categories || [];
    seconds.today = getTotalSecondsForDate(categories, getDateString());
  });
}
function updateCateEvery(ms) {
  setInterval(() => {
    updateCategories();
  }, ms);
}
// function saveCateAndTotal(ms) {
//   setInterval(() => {
//     CategoriesIsChanged && saveCategories();
//     pieData = getPieData();
//   }, ms);
// }
function updateCategories() {
  //update_timeStart = Date.now();
  //console.log("update timeStart:", update_timeStart);
  let activeTab,
    today = getDateString();
  if (dates.today !== today) {
    clearTodayData();
  }
  chrome.windows.getLastFocused({ populate: true }, (focusedWindow) => {
    let tabs = focusedWindow.tabs;
    for (let i in tabs) {
      if (tabs[i].active) {
        activeTab = tabs[i];
        break;
      }
    }
    chrome.idle.queryState(30, (state) => {
      console.log("state: ", state);
      let tabId = activeTab.id,
        tabURL = new URL(activeTab.url),
        tabHostname = tabURL.hostname;
      /*
      TODO 외부 API 모델 사용
      */
      let classified = getClassified(tabHostname);
      if (
        focusedWindow.focused &&
        state === "active" &&
        categories.hasOwnProperty(classified)
      ) {
        //seconds.total += 1;
        seconds.today += 1;
        let category = categories[classified];
        category.domains[tabHostname] =
          category.domains[tabHostname] || getDomainObj(tabHostname);
        let domainObj = category.domains[tabHostname];
        domainObj.days[dates.today] =
          domainObj.days[dates.today] || getDayObj();
        category.totalSeconds += 1;
        category.todaySeconds += 1;
        domainObj.totalSeconds += 1;
        domainObj.days[dates.today].seconds += 1;
        CategoriesIsChanged = true;
        chrome.action.setBadgeText({
          tabId: tabId,
          text: getBadgeTimeString(domainObj.days[dates.today].seconds || "0"),
        });
      }
      update_timeEnd = Date.now();
      //console.log("update timeEnd:", update_timeEnd);
      //console.log("update milliseconds:", update_timeEnd - update_timeStart);
      saveCategories();
      pieData = getPieData();
    });
  });
}
function saveCategories() {
  localStorage.save("categories", categories, () => {
    CategoriesIsChanged = false;
  });
}
// function saveTotalSeconds() {
//   localStorage.save("totalSeconds", seconds.total);
// }
function saveTodayBarData(ms) {
  setInterval(() => {
    let dateArray = getDateArray();
    todayBarData.todayTotalSeconds = seconds.today;
    for (let i in categories) {
      todayBarData.categories[i].todaySeconds = categories[i].todaySeconds;
    }
    localStorage.save(dates.today, todayBarData);
    localStorage.loadSeveral(dateArray, (values) => {
      let weekTotalSeconds = 0;
      for (let i in values) {
        if (!isEmpty(values[i]))
          weekTotalSeconds += values[i].todayTotalSeconds;
      }
      barChartData.weekTotalSeconds = weekTotalSeconds;
      barChartData.barData = values;
    });
  }, ms);
}

function clearTodayData() {
  console.log("clearTodayData", new Date());
  seconds.today = 0;
  dates.today = getDateString();
  todayBarData.todayTotalSeconds = 0;
  for (let i in categories) {
    todayBarData.categories[i].todaySeconds = 0;
    categories[i].todaySeconds = 0;
  }
  saveCategories();
}

function getDateArray() {
  let dateArray = [];
  let tempDate;
  for (let i = 0; i < 7; i++) {
    tempDate = getDateString(i);
    if (dates.since <= tempDate) {
      dateArray.push(tempDate);
    }
  }
  return dateArray;
}

function getClassified(tabHostname) {
  let classified = "etc"; //dummy
  if (tabHostname === "extensions") classified = "entertainment";
  else if (tabHostname === "www.naver.com") classified = "socialMedia";
  else if (tabHostname === "www.stackoverflow.com") classified = "education";
  else if (tabHostname === "velog.io") classified = "infoAndDocs";
  else if (tabHostname === "www.google.com") classified = "business";
  else if (tabHostname === "app.slack.com") classified = "business";
  else if (tabHostname === "stackoverflow.com") classified = "education";
  else if (tabHostname === "developer.chrome.com") classified = "education";
  else if (tabHostname === "snowboard.sookmyung.ac.kr")
    classified = "education";
  else if (tabHostname === "search.naver.com") classified = "infoAndDocs";
  else if (tabHostname === "chrome.google.com") classified = "business";
  return classified;
}
