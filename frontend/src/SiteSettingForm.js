import React from "react";
import "./css/SiteSettingForm.css";
import { CATEGORIES } from "./js/popup-config";

const SiteSettingForm = ({
  mode,
  formData,
  onSubmit,
  onCancel,
  onDelete,
  onChange,
  onEdit,
}) => {
  function handleSubmit() {
    onSubmit(mode, formData.id);
  }
  mode === "" && console.log("wrong mode in Setting");
  const { name, hostname, favorite, alarm, category } = formData;
  if (mode === "look") {
    return (
      <div className="add-new-site">
        <form>
          <div className="buttons">
            <a href="#" className="edit button" onClick={onEdit}>
              edit
            </a>
            <a
              href="#"
              className="delete button"
              onClick={() => onDelete(formData.id)}
            >
              delete
            </a>
            <a href="#" className="cancel button" onClick={onCancel}>
              X
            </a>
          </div>
          <div className="input-wrapper">
            <label>Name</label>
            <div className="site-info">{name}</div>
          </div>
          <div className="input-wrapper">
            <label>Hostname</label>
            <div className="site-info">{hostname}</div>
          </div>
          <div className="input-wrapper">
            <label>Alarm</label>
            <div className="site-info">{alarmText[alarm]}</div>
          </div>
          <div className="input-wrapper">
            <label>Category</label>
            <div className="site-info">{CATEGORIES[category].name}</div>
          </div>
          <div className="input-wrapper">
            <label>Favorite</label>
            <div className="site-info">{favoriteText[favorite]}</div>
          </div>
        </form>
      </div>
    );
  } else {
    //create or edit
    return (
      <div className="add-new-site">
        <form>
          <div className="buttons">
            <a href="#" className="submit button" onClick={handleSubmit}>
              submit
            </a>
            <a
              href="#"
              className="delete button"
              onClick={() => onDelete(formData.id)}
            >
              delete
            </a>
            <a href="#" className="cancel button" onClick={onCancel}>
              X
            </a>
          </div>
          <div className="input-wrapper">
            <label for="name">Name</label>
            <input
              type="text"
              id="input-name"
              name="name"
              required
              size="8"
              autoComplete="off"
              value={name}
              onChange={onChange}
            />
          </div>
          <div className="input-wrapper">
            <label for="hostname">Hostname</label>
            <input
              type="text"
              id="hostname"
              name="hostname"
              placeholder=""
              required
              size="10"
              autoComplete="off"
              value={hostname}
              onChange={onChange}
            />
          </div>
          <div className="input-wrapper">
            <label for="alarm">Alarm</label>
            <select name="alarm" id="alarm" onChange={onChange} value={alarm}>
              <option value="0">{alarmText[0]}</option>
              <option value="10">{alarmText[10]}</option>
              <option value="30">{alarmText[30]}</option>
              <option value="60">{alarmText[60]}</option>
              <option value="120">{alarmText[120]}</option>
              <option value="180">{alarmText[180]}</option>
              <option value="240">{alarmText[240]}</option>
            </select>
          </div>
          <div className="input-wrapper">
            <label for="category">Category</label>
            <select
              name="category"
              id="category"
              onChange={onChange}
              value={category}
            >
              <option value="auto">자동</option>
              <option value="ent">{CATEGORIES["ent"].name}</option>
              <option value="prod">{CATEGORIES["prod"].name}</option>
              <option value="sns">{CATEGORIES["sns"].name}</option>
              <option value="shop">{CATEGORIES["shop"].name}</option>
              <option value="edu">{CATEGORIES["edu"].name}</option>
              <option value="car">{CATEGORIES["car"].name}</option>
              <option value="etc">{CATEGORIES["etc"].name}</option>
            </select>
          </div>
          <div className="input-wrapper">
            <label for="favorite">Favorite</label>
            <select
              name="favorite"
              id="favorite"
              onChange={onChange}
              value={favorite}
            >
              <option value="true">등록</option>
              <option value="false">등록 안함</option>
            </select>
          </div>
        </form>
      </div>
    );
  }
};

export default SiteSettingForm;

const alarmText = {
  0: "사용하지 않음",
  10: "10분 이상 사용시",
  30: "30분 이상 사용시",
  60: "1시간 이상 사용시",
  120: "2시간 이상 사용시",
  180: "3시간 이상 사용시",
  240: "4시간 이상 사용시",
};

const favoriteText = {
  true: "등록",
  false: "등록 안함",
};
