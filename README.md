# Podal
----------------------------------------------------------
#Take the Power of Modals into your hands!
[Powercode](https://powercode.com/)'s Power Modal project. Pull requests are welcome!

Modal - A Powercode Popup | Documentation

The podal is a lightbox popup that is used to include forms or text inside a page.

Class Wrappers:
````
podal-title: the title area of your podal - it by default will include a H3 Title - Title of your Podal and fa-close icon
````
````
podal-body: the body is where your content will go. padded by default, you can place forms, paragraphs,
even images inside this area
````
````
podal-footer: the form submission buttons, confirm buttons, or cancel buttons go here
````
Your podal html should look something like this: 

````
<div id="myPodal" class="podal-wrapper">
    <div class="podal-box">
        <div class="podal-title">
            <h3>My Cool Title Here<i class="fa fa-times podal-close"></i></h3>
        </div>
        <div class="podal-body">
            A form or input here
        </div>
        <div class="podal-footer">
            <button type="submit">My submit button!</button>
        </div>
    </div>
</div>
````

The podal is triggered by a click or event - your podal will be wrapped by a 
.podal-wrapper, and to target your specific podal you should add a unique id to it. 
This can then be triggered with:
````
podal({
    show: true
});
````
There are several different parameters that you can pass through to podal:

show:
````
 - true | shows podal
 - false | hides podal
 ````
processing:
````
 - save | shows a saving icon and loader overlay on the podal
 - load | shows a loading icon and loader overlay on the podal
 - success | shows a success icon and loader overlay on the podal
 - failed | shows a failed icon and loader overlay on the podal
 ````
settings - <i>optional</i>

speed:
````
 - the speed of podal animations in ms (e.g. 3000 = 3 seconds)
 ````
delay:
````
 - the amount of time before a podal action executes in ms
````
The podal content should be written in HTML, and invoked or updated when interacted with. 

EXAMPLES:

If one were to want to show the modal, and have it fadeIn over 300ms.
````
podal({
    show: true,
    speed: 300
});
````
If one were to want to show the saving icon while an ajax request is processing.
````
podal({
    processing: 'save',
    speed: 300
});
````
If one were to close the podal, but delay it for 3 seconds.
````
podal({ 
    show: false,
    delay: 3000,
    speed: 300
});
````
If one were to want a completion message if the update ajax was successful.
````
podal({
    processing: 'success',
    message: "Report updated successfully",
    speed: 300
});
````
If one were to want a failed message because of a validation issue wit the form.
````
podal({
    processing: 'failed',
    message: "There was a validation issue with your submission."
});
````
NOTE: You can pass a php validation error $e->getMessage() by returning the json_encoded message to javascript.

# Contributing and Support

Your [contributions](https://github.com/fallen-rve/podal/blob/master/CONTRIBUTING.md) and [support tickets](https://github.com/fallen-rve/podal/issues) are welcome. Please file an [issue](https://github.com/fallen-rve/podal/issues) before submitting a pull request.
