let queue = [];
let listeners = [];

export const show = item => {
  const { id = Date.now(), ...rest } = { ...item };
  queue.push({ id, ...rest });
  emitChange();
};

export const hide = value => {
  if (value) {
    const index = queue.findIndex(({ id }) => id === value);
    queue.splice(index, 1);
  } else {
    queue.shift();
  }
  emitChange();
};

export const clear = () => {
  queue = [];
  emitChange();
};

const store = {
  subscribe(listener) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },
  getSnapshot() {
    return Boolean(queue.length);
  },
  getServerSnapshot() {
    return true;
  },
};

export default store;

// auxiliary
function emitChange() {
  for (const listener of listeners) listener();
}
