//일부 구조 수정, async await 적용
let pieData = {};
/*let userId = chrome.identity.getProfileUserInfo((userInfo) =>
  JSON.stringify(userInfo.id)
);*/
const isLoaded = false;
const seconds = { today: 0, total: 0 },
  dates = { today: "", since: "" };
let CategoriesIsChanged = false,
  categories = {
    entertainment: {
      name: "entertainment",
      totalSeconds: 0,
      domains: {
        /*
        "hostname": { 
          name: "hostname", 
          totalSeconds: 0, 
          days: {
            "yyyy-mm-dd": {seconds : 0},
            "yyyy-mm-dd": {seconds : 0},
          } 
        },*/
      },
    },
    productivity: {
      name: "productivity",
      totalSeconds: 0,
      domains: {},
    },
    socialMedia: {
      name: "socialMedia",
      totalSeconds: 0,
      domains: {},
    },
    infoAndDocs: {
      name: "infoAndDocs",
      totalSeconds: 0,
      domains: {},
    },
    shopping: {
      name: "shopping",
      totalSeconds: 0,
      domains: {},
    },
    education: {
      name: "education",
      totalSeconds: 0,
      domains: {},
    },
    business: {
      name: "business",
      totalSeconds: 0,
      domains: {},
    },
    etc: {
      name: "etc",
      totalSeconds: 0,
      domains: {},
    },
  };

//start

prepareDatas();
updateCateEvery(1000);
saveCateAndTotal(1000);

function prepareDatas() {
  dates.today = getDateString();
  loadDateSince(dates.today);
  saveDateSince(); //TODO: 기본값 받아와서 수정하는 구조 수정할수있으면...<
  loadTotalSeconds();
  saveTotalSeconds();
  loadCategories();
}
function loadDateSince(todayString) {
  localStorage.load("dateSince", todayString, (storage) => {
    dates.since = storage["dateSince"];
  });
}
function saveDateSince() {
  localStorage.save("dateSince", dates.since);
}
function loadTotalSeconds() {
  localStorage.load("totalSeconds", 0, (storage) => {
    seconds.total = storage["totalSeconds"];
  });
}
function saveTotalSeconds() {
  localStorage.save("totalSeconds", seconds.total);
}
function loadCategories() {
  localStorage.load("categories", categories, (storage) => {
    categories = storage.categories || [];
    seconds.today = getTotalSecondsForDate(categories, getDateString());
    console.log("When start/ seconds.today :", seconds.today);
  });
}
function updateCateEvery(ms) {
  setInterval(() => {
    updateCategories();
  }, ms);
}
function saveCateAndTotal(ms) {
  setInterval(() => {
    CategoriesIsChanged && (saveCategories(), saveTotalSeconds());
    console.log(categories);
    pieData = getPieData();
  }, ms);
}
function updateCategories() {
  let activeTab,
    today = getDateString();
  dates.today === today || (dates.today == today, (seconds.today = 0));
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
      let classified = "etc"; //dummy
      if (tabHostname === "extensions") classified = "entertainment";
      else if (tabHostname === "www.naver.com") classified = "socialMedia";
      else if (tabHostname === "www.stackoverflow.com")
        classified = "education";
      else if (tabHostname === "velog.io") classified = "infoAndDocs";
      else if (tabHostname === "www.google.com") classified = "business";
      else if (tabHostname === "app.slack.com") classified = "business";

      if (
        focusedWindow.focused &&
        state === "active" &&
        categories.hasOwnProperty(classified)
      ) {
        let category = categories[classified];
        category.domains[tabHostname] =
          category.domains[tabHostname] || getDomainObj(tabHostname);
        let domainObj = category.domains[tabHostname];
        domainObj.days[dates.today] =
          domainObj.days[dates.today] || getDayObj();
        seconds.total += 1;
        seconds.today += 1;
        category.totalSeconds += 1;
        domainObj.totalSeconds += 1;
        domainObj.days[dates.today].seconds += 1;
        CategoriesIsChanged = true;
        console.log("todaySeconds: ", seconds.today);
      }
    });
  });
}
function saveCategories() {
  localStorage.save("categories", categories, () => {
    CategoriesIsChanged = false;
  });
}
function saveTotalSeconds() {
  localStorage.save("totalSeconds", seconds.total);
}
