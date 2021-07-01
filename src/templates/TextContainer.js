import React from 'react';
import './TextContainer.css'

function TextContainer(props){
  // props: content, input_func
  // content: object, {all: string, safe: [string], overflow: [string]}
  // input_func: function that handle inputs

  // set scroll behavior
  const [scrollTick, setScrollTick] = React.useState(false);
  const ref_fake_content = React.useRef(null);
  const syncScroll = (event)=>{
    // get offsetY of real text, and make fake text scrolls
    // idea is from https://www.html5rocks.com/en/tutorials/speed/animations/
    const newOffset = event.target.scrollTop;
    if (!scrollTick) {
      window.requestAnimationFrame(()=>{ 
        setScrollTick(false);
        // avoid fake content is unmounted yet
        if (ref_fake_content.current){
          ref_fake_content.current.scrollTop = newOffset;
        }
      });
      setScrollTick(true);
    }
  }
  return (
    <div id="text_container"
      className="container"
    >
      <FakeContent
        safe_content={props.content.safe}
        overflow_content={props.content.overflow}
        refs={ref_fake_content}
      />
      <textarea
        id="true_text" 
        className="text"
        onInput={props.input_func}
        onScroll={syncScroll}
        value={props.content.all}
        placeholder="start type something here :D"
      />
    </div>
  );
}

function FakeContent(props){
  // props: refs, safe_content, overflow_content
  // see above
  return (
    <div id="fake_text"
      className="text"
      ref={props.refs}
    >
      <p>                
        {props.safe_content.map((s, idx) => 
          <span key={`${idx}_safe_content`}>
            {s}
          </span>
        )}
        {props.overflow_content.map((s, idx) => 
          <span className="overflow_content" 
            key={`${idx}_overflow_content`}
          >
            {s}
          </span>
        )}
      </p>
    </div>
  );
}

export default TextContainer;