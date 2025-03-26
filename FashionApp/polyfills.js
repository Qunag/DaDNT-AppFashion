// polyfills.js
if (typeof setImmediate === 'undefined') {
    global.setImmediate = (callback, ...args) => {
        return setTimeout(() => callback(...args), 0);
    };
    console.log('setImmediate polyfill applied');
} else {
    console.log('setImmediate already exists');
}