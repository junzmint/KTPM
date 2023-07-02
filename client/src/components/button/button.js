import React from 'react'

function Button(props) {
    let { color } = props;

    return (
        <button type="button" onClick={props.onClick} className={`text-white bg-${color}-700 hover:bg-${color}-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-${color}-600 dark:hover:bg-${color}-700 `}>{props.text}</button>
    )
}

export default Button