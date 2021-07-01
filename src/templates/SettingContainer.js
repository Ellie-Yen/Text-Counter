import React, { useState } from 'react';
import {PopMsgBtn, ToggleBtn} from './ButtonComponent';
import {default as display_icon} from '../AppIconSetting.json';  
import './SettingContainer.css';

function SettingContainer(props){
  // props: operation, theme, more_setting
  // operation: array of {title: string, func: function to display, btn_style: string}
  // theme: {title: string, state: React.useState array}
  // more_setting: 
  // {state: React useState object, title: string, defaullt_val: any, input_type: string}

  return (
    <div id="setting_container"
      className="container"
    >
      <ToggleBtn
        is_toggled={props.theme.state[0]}
        func={props.theme.state[1]}
        content={<i className={display_icon[props.theme.title]}/>}
      />
      <DropSettingComponent
        more_setting={props.more_setting}
      />
      {props.operation.map((item, i)=>
        <PopMsgBtn
          func={item.func}
          icon_cls_name={display_icon[item.title]}
          msg={item.title}
          btn_style={`circle ${item.btn_style}`}
          key={`setting_operation-${i}`}
        />
      )}
    </div>
  );
}

function DropSettingComponent(props){
  // props: more_setting: array of object, inherit from setting container

  const [hide, setHide] = useState(true);
  const handleDisplay = () => {
    setHide(! hide);
  }
  /*
  const handleChange = ()=> {
    item_list.forEach(item => {
      item.state[1](item.ref_input.current.value);
    });
    handleDisplay();
  }
  const handleReset = () => {
    item_list.forEach(item => {
      item.ref_input.current.value = item.default_val;
    });
  }
  */
  return (
    <div className="drop_setting_container">
      <PopMsgBtn
        func={handleDisplay}
        icon_cls_name={display_icon["edit"]}
        msg="more settings"
        btn_style="circle primary"
      />
      <div className={`drop_content-${hide ? "hide": "display"}`}>
        {props.more_setting.map((item, i)=>
          <InputComponent
            title={item.title}
            input_type={item.input_type}
            setfunc={item.state[1]}
            cur_val={item.state[0]}
            reset_val={item.reset_val}
            ref_input={item.ref_input}
            key={`more_setting-${i}`}
          />
        )}
      </div>
    </div>
  );
}
function InputComponent(props){
  // props: title, setfunc, input_type, cur_val, reset_val
  // title, input_type, cur_val, reset_val: string
  // setfunc: function that handle change

  const ref_input = React.useRef(null);
  const handleChange = ()=> {
    props.setfunc(ref_input.current.value);
  }
  const handleReset = () => {
    ref_input.current.value = props.reset_val;
  }
  const handleCancel = () => {
    console.log(props.cur_val);
    ref_input.current.value = props.cur_val;
  }
  let EditArea;
  if (! props.input_type){
    EditArea = (
      <textarea className="edit_input"
        defaultValue={props.cur_val}
        ref={ref_input}
      />
    );
  }
  else {
    EditArea = (
      <input className="edit_input"
        type={props.input_type}
        defaultValue={props.cur_val}
        ref={ref_input}
      />
    );
  }
  return (
    <>
    <label>{props.title}</label>
    {EditArea}
    <EditButtonGroup
      handleChange={handleChange}
      handleReset={handleReset}
      handleCancel={handleCancel}
    />
    </>
  );
}
function EditButtonGroup(props){
  // props:handleChange, handleCancel, handleReset
  // functions inherit from drop setting component
  return (
    <div className="container edit_btn_group">
      <PopMsgBtn
        func={props.handleReset}
        icon_cls_name={display_icon["reset"]}
        msg="reset"
      />
      <PopMsgBtn
        func={props.handleCancel}
        icon_cls_name={display_icon["cancel"]}
        msg="cancel"
      />
      <PopMsgBtn
        func={props.handleChange}
        icon_cls_name={display_icon["save"]}
        msg="save"
        btn_style="primary"
      />
    </div>
  );
}

export default SettingContainer;