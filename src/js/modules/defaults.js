import {podalClasses} from './classes';
import {podal} from '../podal.jquery';
let defaults = {
    speed: 100, // in ms
    delay: 100, // in ms

    cancelText:  "",
    confirmText: "",
    deleteText:  "",
    message:     "",

    preProcess:  podal.noop(),
    postProcess: podal.noop(),
};

const podalHTML = `
<div class='${podalClasses.box}'>
    <div class='${podalClasses.loading} ${podalClasses.alert}'>
        <div class='${podalClasses.loader}'></div>
        <i class='fa fa-processing'></i>
        <div class='button-wrapper'>
            <button class"${podalClasses.cancel}"=>Cancel</button>
            <button class"${podalClasses.confirm}"=>OK</button>
            <button class"${podalClasses.delete}"=>Delete</button>
        </div>
    </div>
</div>
`.replace(/(^|\n)\s*/g, '');

export default defaults;
