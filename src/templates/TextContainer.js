import React from 'react';
import './TextContainer.css'

function TextContainer(content, setfunc, font_color){
    // set scroll behavior
    const [scrollTick, setScrollTick] = React.useState(false);
    const refFakeText = React.useRef(null);
    const syncScroll = (event)=>{
        // get offsetY of real text, and make fake text scrolls
        // idea is from https://www.html5rocks.com/en/tutorials/speed/animations/
        const newOffset = event.target.scrollTop;
        if (!scrollTick) {
            window.requestAnimationFrame(()=>{ 
                setScrollTick(false);
                refFakeText.current.scrollTop = newOffset;
            });
            setScrollTick(true);
          }
    }
    
    const colorset = {"color": font_color, "borderColor": font_color};

    return (
        <div id="text_container"
            className="container"
        >
            <div id="fake_text"
                className="text"
                ref={refFakeText}
                style={colorset}
            >
                <p>                
                    {content.safe.map((s, idx) => 
                        <span key={`${idx}_safe_content`}>
                            {s}
                        </span>
                    )}
                    {content.overflow.map((s, idx) => 
                        <span className="overflow_content" 
                            key={`${idx}_overflow_content`}
                        >
                            {s}
                        </span>
                    )}
                </p>
            </div>
            <textarea
                id="true_text" 
                className="text"
                onInput={setfunc}
                onScroll={syncScroll}
                value={content.all}
                style={colorset}
            />
        </div>
    );
}

export default TextContainer;