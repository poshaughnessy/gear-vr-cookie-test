var COOKIE_NAME = 'myTestCookie';
var GOT_COOKIE_MSG = 'You got a cookie';
var NO_COOKIE_MSG = 'No cookie yet, let me set one...';

var myCookie = docCookies.getItem(COOKIE_NAME);

if (myCookie) {

  DemoScene.setMessage(GOT_COOKIE_MSG + ': ' + myCookie);

} else {

  DemoScene.setMessage(NO_COOKIE_MSG);

  docCookies.setItem(COOKIE_NAME, 'Hello WebVR!');

}
