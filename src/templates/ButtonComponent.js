import React, { useState } from 'react';
import './ButtonComponent.css'

const Buttons = {
    "default setting": "bi bi-arrow-counterclockwise",
    "refresh": "bi bi-arrow-repeat",
    "clear": "bi bi-trash",
    "symbol": "bi bi-asterisk",
    "space": "bi bi-app",
    "enter": "bi bi-arrow-return-left",
    "edit": "bi bi-pencil-square",
    "save": "bi bi-check-circle",
    "cancel": "bi bi-x-circle",
    "light": "bi bi-sun-fill",
    "dark": "bi bi-moon-fill"
};

function CheckBoxBtn(name, val, setfunc){
    const handleClick = ()=> {
        setfunc(!val);
    }
    return (
        DetailBtn(name, handleClick, `checkboxbtn checked_${val}`)
    );
}
function DetailBtn(name, func, additionalcls=""){
    return (
        <div className={`btn detailbtn ${additionalcls}`}
            onClick={func}
        >
            <i
                className={Buttons[name]}
                onClick={func}
            />
            <small>{name}</small>
        </div>
    );
}
function EditBtn(name, val, default_val, setfunc){
    const [editMode, setMode] = useState(false);
    const refInput = React.useRef(null);
    const handleChange = ()=> {
        if (editMode){
            const res = refInput.current.value;
            setfunc(res);
        }
        setMode(! editMode);
    }
    const handleReset = () => {
        refInput.current.value = default_val;
    }
    const handleCancel = () => {
        setMode(! editMode);
    }
    const label = name.replace("_", " ");
    if (editMode){
        let editArea = 
            <textarea id={name}
                className="edit_input"
                defaultValue={val}
                ref={refInput}
            />
        ;
        if (typeof val === "number"){
            editArea = 
                <input id={name}
                    className="edit_input"
                    type="number"
                    defaultValue={val}
                    ref={refInput}
                />
            ;
        }
        return (
            <div className="edit_btn">
                <div className="label">
                    {label}
                </div>
                <div className="btn_container">
                    {PopMsgBtn("default setting", handleReset)}
                    {PopMsgBtn("save", handleChange)}
                    {PopMsgBtn("cancel", handleCancel)}
                </div>
                {editArea}
            </div>
        );
    }
    return (
        <div className="btn edit_btn"
            onClick={handleChange}
        >
            <div className="label">
                {label}
            </div>
            <i className={Buttons["edit"]}
                onClick={handleChange}
            />
        </div>
    );

}
function PopMsgBtn(name, func, additionalcls=""){
    // use for edit buttons
    return (
        <div className={`btn msg_btn ${additionalcls}`}
            onClick={func}
        >
            <i className={Buttons[name]}
                onClick={func}
            />
            <div className="msg">
                <p><small>{name}</small></p>
            </div>
        </div>
    );
}

export {CheckBoxBtn, DetailBtn, EditBtn};