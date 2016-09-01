var PERSISTENT_COOKIE_NAME = 'testPersistentCookie';
var SESSION_COOKIE_NAME = 'testSessionCookie';

var GOT_PERSISTENT_COOKIE_MSG = 'Persistent cookie: Got. ';
var GOT_SESSION_COOKIE_MSG = 'Session cookie: Got. ';
var NO_COOKIE_MSG = 'No cookies yet, let me set them...';

var COOKIE_MAX_AGE = 15552000; // 6 months in seconds

var persistentCookie = docCookies.getItem(PERSISTENT_COOKIE_NAME);
var sessionCookie = docCookies.getItem(SESSION_COOKIE_NAME);

var message = '';

if (persistentCookie) {
  message += GOT_PERSISTENT_COOKIE_MSG;
}

if (sessionCookie) {
  message += GOT_SESSION_COOKIE_MSG;
}

if (!message.length) {

  message = NO_COOKIE_MSG;

  docCookies.setItem(PERSISTENT_COOKIE_NAME, 'WebVR rocks!', COOKIE_MAX_AGE);
  docCookies.setItem(SESSION_COOKIE_NAME, 'WebVR rocks for this session!');

}

DemoScene.setMessage(message);

