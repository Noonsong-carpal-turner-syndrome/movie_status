import React from "react";

const SiteSettingForm = ({
  mode,
  formData,
  onSubmit,
  onCancel,
  onDelete,
  onChange,
  onEdit,
}) => {
  function handleSubmit(e) {
    onSubmit(e, mode, formData.id);
  }
  mode === "" && console.log("wrong mode in Setting");
  if (mode === "look") {
    const { name, hostname, favorite, alarm, category } = formData;
    return (
      <div className="add-new-site">
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
        <div>{name}</div>
        <div>{hostname}</div>
        <div>{alarm}</div>
        <div>{category}</div>
        <div>{favorite}</div>
      </div>
    );
  } else {
    //create or edit
    return (
      <div className="add-new-site">
        <form onSubmit={handleSubmit}>
          <div className="buttons">
            <input type="submit" />
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
          <input
            type="text"
            id="input-name"
            name="name"
            placeholder="Name"
            required
            size="8"
            autoComplete="off"
            value={formData.name}
            onChange={onChange}
          />
          <label>
            hostname:
            <input
              type="text"
              id="hostname"
              name="hostname"
              placeholder=""
              required
              size="10"
              autoComplete="off"
              value={formData.hostname}
              onChange={onChange}
            />
          </label>
          <label>
            alarm:
            <select name="alarm" onChange={onChange} value={formData.alarm}>
              <option value="0">사용하지 않음</option>
              <option value="10">10분 이상 사용시</option>
              <option value="30">30분 이상 사용시</option>
              <option value="60">1시간 이상 사용시</option>
              <option value="120">2시간 이상 사용시</option>
              <option value="180">3시간 이상 사용시</option>
              <option value="240">4시간 이상 사용시</option>
            </select>
          </label>
          <label>
            category:
            <select
              name="category"
              onChange={onChange}
              value={formData.category}
            >
              <option value="auto">자동</option>
              <option value="entertainment">ent</option>
              <option value="etc">etc</option>
              <option value="etc">etc</option>
              <option value="etc">etc</option>
              <option value="etc">etc</option>
              <option value="etc">etc</option>
              <option value="etc">etc</option>
            </select>
          </label>
          <label>
            시간관리
            <input
              type="checkbox"
              name="favorite"
              value={true}
              onClick={onChange}
            />
          </label>
        </form>
      </div>
    );
  }
};

export default SiteSettingForm;
