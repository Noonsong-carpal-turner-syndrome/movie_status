import React from "react";
import "./css/SiteList.css";

const SiteList = ({ siteInfos, onItemClick }) => {
  return (
    <div className="site-list">
      {siteInfos.map((siteInfo) => (
        <SiteItem siteInfo={siteInfo} onItemClick={onItemClick} />
      ))}
    </div>
  );
};
export default SiteList;
const SiteItem = ({ siteInfo, onItemClick }) => {
  return (
    <div
      className="site-item"
      key={siteInfo.id}
      onClick={() => onItemClick(siteInfo.id)}
    >
      <div className="item-name">{siteInfo.name}</div>
      <div className="item-hostname">{siteInfo.hostname}</div>
    </div>
  );
};
