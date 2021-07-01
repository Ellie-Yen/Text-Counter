import './LengthContainer.css';

function LengthContainer(props){
  // props: cur_length, limit
  // cur_length, limit: int of current length/ limit length of texts
  return(
    <div id="length_container"
      className="container"
    >
      <LengthComponent
        title="current"
        value={props.cur_length}
      />
      <LengthComponent
        title="remain"
        value={props.limit - props.cur_length}
      />
      <LengthComponent
        title="limit"
        value={props.limit}
      />
    </div>
  );
}

function LengthComponent(props){
  // props: title, value
  // title: string as label, value: int to display
  let additionalcls = "";
  let title = props.title;
  if (props.value < 0){
    title = "overflow";
    additionalcls = "overflow";
  }

  return (
    <div className="length">
      <header className="length_title">
        {title}
      </header>
      <div className={`length_val ${additionalcls}`}>
        {props.value}
      </div>
    </div>
  );
}

export default LengthContainer;