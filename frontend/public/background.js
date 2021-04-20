//일부 구조 수정, async await 적용
const seconds = { today: 0, total: 0 },
  dates = { today: "", since: "" };
let CategoriesIsChanged = false,
  categories = {
    entertainment: {
      name: "엔터테인먼트",
      totalSeconds: 0,
      days: {},
    },
    productivity: {
      name: "생산성 및 금융",
      totalSeconds: 0,
      days: {},
    },
    socialMedia: {
      name: "소셜미디어",
      totalSeconds: 0,
      days: {},
    },
    InfoAndDocs: {
      name: "정보 및 문서",
      totalSeconds: 0,
      days: {},
    },
    shopping: {
      name: "쇼핑 및 음식",
      totalSeconds: 0,
      days: {},
    },
    education: {
      name: "학습",
      totalSeconds: 0,
      days: {},
    },
    business: {
      name: "사무 및 경력",
      totalSeconds: 0,
      days: {},
    },
    etc: {
      name: "기타",
      totalSeconds: 0,
      days: {},
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
      let tabId = activeTab.id;
      /*
      TODO 외부 API 모델 사용
      */
      let classified = "entertainment"; //dummy
      if (
        focusedWindow.focused &&
        state === "active" &&
        categories.hasOwnProperty(classified)
      ) {
        let category = categories[classified];
        category.days[dates.today] = category.days[dates.today] || getDayObj();
        CategoriesIsChanged = true;
        seconds.total += 1;
        seconds.today += 1;
        category.totalSeconds += 1;
        category.days[dates.today].seconds += 1;
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
