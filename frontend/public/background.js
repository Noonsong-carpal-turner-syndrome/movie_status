//일부 구조 수정, async await 적용
//icon수정
chrome.identity.getProfileUserInfo(function (userInfo) {
  /* Use userInfo.email, or better (for privacy) userInfo.id
     They will be empty if user is not signed in in Chrome */
  console.log("userInfo.email:", userInfo.email, ", now:", new Date());
  // chrome.notifications.create("", {
  //   iconUrl: "./settings.png",
  //   title: "Just wanted to notify you",
  //   message: `your email: ${userInfo.email}`,
  //   type: "basic",
  // });
});
let sendObj = {
  url: "https://www.naver.com",
  title: "네이버",
  hostname: "www.naver.com",
};
fetch("https://a08b5a0fe602.ngrok.io/classification", {
  method: "POST",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  body: JSON.stringify(sendObj),
})
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {
    console.log(JSON.stringify(myJson));
  });

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
    ent: { todaySeconds: 0 },
    prod: { todaySeconds: 0 },
    sns: { todaySeconds: 0 },
    shop: { todaySeconds: 0 },
    edu: { todaySeconds: 0 },
    car: { todaySeconds: 0 },
    etc: { todaySeconds: 0 },
  },
};
let CategoriesIsChanged = false,
  categories = {
    ent: {
      todaySeconds: 0,
      name: "ent",
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
    prod: {
      todaySeconds: 0,
      name: "prod",
      totalSeconds: 0,
      domains: {},
    },
    sns: {
      todaySeconds: 0,
      name: "sns",
      totalSeconds: 0,
      domains: {},
    },
    shop: {
      todaySeconds: 0,
      name: "shop",
      totalSeconds: 0,
      domains: {},
    },
    edu: {
      todaySeconds: 0,
      name: "edu",
      totalSeconds: 0,
      domains: {},
    },
    car: {
      todaySeconds: 0,
      name: "car",
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

prepareDatas();
updateCateEvery(1000);
saveCateEvery(1000);
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
function saveCateEvery(ms) {
  setInterval(() => {
    CategoriesIsChanged && saveCategories();
  }, ms);
}
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
      if (tabs.hasOwnProperty(i) && tabs[i].active) {
        activeTab = tabs[i];
        break;
      }
    }
    chrome.idle.queryState(30, (state) => {
      //console.log("state: ", state);
      let tabId = activeTab.id,
        tabURL = new URL(activeTab.url),
        tabHostname = tabURL.hostname;
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
        chrome.browserAction.setBadgeText({
          tabId: tabId,
          text: getBadgeTimeString(domainObj.days[dates.today].seconds || "0"),
        });
      }
      update_timeEnd = Date.now();
      //console.log("update timeEnd:", update_timeEnd);
      //console.log("update milliseconds:", update_timeEnd - update_timeStart);
      CategoriesIsChanged = true;
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
  if (tabHostname === "extensions") classified = "ent";
  else if (tabHostname === "www.naver.com") classified = "sns";
  else if (tabHostname === "www.stackoverflow.com") classified = "edu";
  else if (tabHostname === "velog.io") classified = "edu";
  else if (tabHostname === "www.google.com") classified = "car";
  else if (tabHostname === "app.slack.com") classified = "car";
  else if (tabHostname === "stackoverflow.com") classified = "edu";
  else if (tabHostname === "developer.chrome.com") classified = "edu";
  else if (tabHostname === "snowboard.sookmyung.ac.kr") classified = "edu";
  else if (tabHostname === "search.naver.com") classified = "sns";
  else if (tabHostname === "chrome.google.com") classified = "car";
  return classified;
}
