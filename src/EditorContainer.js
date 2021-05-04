import React from 'react';

function EditorContainer(content, setfunc){
    return (
        <div id="editor_container">
            <div id="fake_editor" className="editor">
                <div className="fake_content">
                    <p>
                        {content.safe.map((s, idx) => 
                            <React.Fragment key={idx}>{s}</React.Fragment>
                        )}
                        <span className="overflow_content">
                            {content.overflow.map((s, idx) => 
                            <React.Fragment key={idx}>{s}</React.Fragment>
                        )}
                        </span>
                    </p>
                </div>
            </div>
            <textarea className="editor"
                onInput={setfunc}
                value={content.all}
                />
        </div>
    );
}

export default EditorContainer;