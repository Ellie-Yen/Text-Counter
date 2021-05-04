import React from 'react';

function DetailButton(setname, val, setfunc){
    const [editMode, setMode] = React.useState(false);
    const handleChange = ()=> {
        if (editMode){
            const res = document.getElementById(setname).value;
            setfunc(res);
        }
        setMode(! editMode);
    }
    if (editMode){
        return (
            <div>
                <input id={setname}
                    type={typeof val}
                />
                <div onClick={handleChange}>save and close</div>
            </div>
        );
    }   
    return (
        <div id={setname} 
            onClick={handleChange}
        >
            {`${setname.replace("_", " ")}: ${val}`}
        </div>
    );
}

function CheckBoxButton(setname, val, setfunc){
    const handleChange = () => {
        setfunc(! val);
    };
    return ( 
        <span className={`btn checkbox_${val}`}
            onClick={handleChange}
            checked={val}
        >
            {setname}
        </span>
    );
}

export {DetailButton, CheckBoxButton};