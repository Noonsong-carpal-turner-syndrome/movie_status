export const getDateString = () => {
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

export function getTimeString(second) {
  let tempSec = second;
  const hour = Math.floor(tempSec / (60 * 60));
  tempSec = tempSec - hour * 60 * 60;
  let min = Math.floor(tempSec / 60);
  let hourString = "";
  let minString = "";
  if (hour) {
    hour = hour < 10 ? "0" + hour : hour;
    hourString = `${hour}시간 `;
  }
  min = min < 10 ? "0" + min : min;
  minString = `${min}분`;
  return `${hourString}${minString}`;
}
export const CATEGORIES = {
  entertainment: {
    name: "엔터테인먼트",
  },
  productivity: {
    name: "생산성 및 금융",
  },
  socialMedia: {
    name: "소셜미디어",
  },
  infoAndDocs: {
    name: "정보 및 문서",
  },
  shopping: {
    name: "쇼핑 및 음식",
  },
  education: {
    name: "학습",
  },
  business: {
    name: "사무 및 경력",
  },
  etc: {
    name: "기타",
  },
};

const MIN_PERCENTAGE_GRAPH = 7;
