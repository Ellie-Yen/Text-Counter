import './LengthComponent.css';

function LengthComponent(title, value){
    let additionalcls = "";
    if (value < 0){
        title = "overflow";
        additionalcls = "overflow";
    }

    return (
        <div className="length">
          <header className="length_title">
            {title}
          </header>
          <div className={`length_val ${additionalcls}`}>
            {value}
          </div>
        </div>
    );
}

export default LengthComponent;