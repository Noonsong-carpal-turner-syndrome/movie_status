import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./css/Setting.css";
import SiteSettingForm from "./SiteSettingForm";
import SiteList from "./SiteList";
import { IoIosArrowBack } from "react-icons/io";
import { HiOutlinePlusSm } from "react-icons/hi";

const Setting = () => {
  //get from backend
  const nextId = useRef(0);
  const [formMode, setFormMode] = useState({
    floating: false,
    mode: "", //""||edit||create||look
  });
  const [siteInfos, setSiteInfos] = useState([]);
  const [inputs, setInputs] = useState({
    id: nextId.current,
    name: "",
    hostname: "",
    alarm: "0",
    category: "auto",
    favorite: "false",
  });

  function onChange(e) {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  }
  function onAdd() {
    resetState();
    setFormMode({ floating: true, mode: "create" });
  }
  function onCancel() {
    setFormMode({ floating: false, mode: "" });
    resetState();
  }
  function onSubmit(mode, id) {
    setFormMode({ floating: false, mode: "" });
    if (mode === "edit") {
      setSiteInfos(
        siteInfos.map((siteInfo) => (siteInfo.id === id ? inputs : siteInfo))
      );
    } else if (mode === "create") {
      setSiteInfos([...siteInfos, inputs]);
      nextId.current += 1;
    }
    //save in backend: inputs,id
    resetState();
  }
  function onDelete(id) {
    setSiteInfos(siteInfos.filter((siteInfo) => siteInfo.id !== id));
    setFormMode({ floating: false, mode: "" });
    resetState();
    //save in backend: inputs
  }
  function resetState() {
    setInputs({
      id: nextId.current,
      name: "",
      hostname: "",
      alarm: "0",
      category: "auto",
      favorite: false,
    });
  }
  function onItemClick(id) {
    let [clickedItem] = siteInfos.filter((siteInfo) => siteInfo.id === id);
    //console.log("clicked Item:", clickedItem);
    setInputs(clickedItem);
    setFormMode({ floating: true, mode: "look" });
  }
  function onEdit() {
    setFormMode({ floating: true, mode: "edit" });
  }
  return (
    <div className="setting">
      <div className="setting-header">
        <Link to="/" className="back-button">
          <IoIosArrowBack />
        </Link>
        <div className="title">사이트 관리</div>
        <a href="#" className="add-button" onClick={onAdd}>
          <HiOutlinePlusSm />
        </a>
      </div>
      <div className="menu">
        {formMode.floating ? (
          <SiteSettingForm
            mode={formMode.mode}
            formData={inputs}
            onSubmit={onSubmit}
            onDelete={onDelete}
            onCancel={onCancel}
            onChange={onChange}
            onEdit={onEdit}
          />
        ) : (
          <SiteList siteInfos={siteInfos} onItemClick={onItemClick} />
        )}
      </div>
    </div>
  );
};

export default Setting;
