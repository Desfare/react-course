import React from "react";
import classes from './MyButton.module.css';

//props.children передает информацию о тексте вставленном в корне App в нашем случае
// {...props} разворачивает всевозможные props в корень App чтобы мы могли задавать свойства например disabled кнопки
const MyButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.myBtn}>
            {children}            
        </button>
    )
}

export default MyButton;