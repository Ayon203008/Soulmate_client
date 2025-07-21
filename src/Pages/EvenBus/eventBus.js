// eventBus.js
const listeners = {};

export function on(event, callback) {
  if (!listeners[event]) listeners[event] = [];
  listeners[event].push(callback);

  // Unsubscribe করার জন্য একটি ফাংশন রিটার্ন করবে
  return () => {
    listeners[event] = listeners[event].filter(fn => fn !== callback);
  };
}

export function emit(event, data) {
  if (!listeners[event]) return;
  listeners[event].forEach(callback => callback(data));
}
