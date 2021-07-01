import './ButtonComponent.css'

function ToggleBtn(props){
  // props: func, content, is_toggled
  // func: function that to display when cliking it
  // content: string as the button description
  // is_toggled: bool indicates the status of the button
  return (
    <div className={`toggle_btn-${props.is_toggled}`}
      onClick={props.func}
    >
      <span className={`slider-${props.is_toggled} circle btn`}/>
      <span className={`toggle_content`}>
        {props.content}
      </span>
    </div>
  );
}
function CheckboxBtn(props){
  // props: is_checked, content, func
  // content: string as the button description
  // func: function that to display when cliking it
  // is_checked: bool indicates the status of the button
  return (
    <div className={`checkbox_btn btn`}
      onClick={props.func}
    >
      <i className={`bi bi-${props.is_checked ? "check-circle-fill checked": "circle"}`}/>
      {props.content}
    </div>
  );
}
function PopMsgBtn(props){
  // props: func, icon_cls_name, msg, btn_style
  // func: function that to display when cliking it
  // icon_cls_name: string of bootstrap icon
  // msg: string as the button description
  // btn_style: string of additional style of button
  return (
    <div className={`btn msg_btn ${props.btn_style || ""}`}
      onClick={props.func}
    >
      <i className={props.icon_cls_name}/>
      <div className="msg_container">
        <p className="msg">
          {props.msg}
        </p>
      </div>
    </div>
  );
}

export {CheckboxBtn, ToggleBtn, PopMsgBtn};