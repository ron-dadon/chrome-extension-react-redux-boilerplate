import UUID from 'uuid'

const SHORT_ARROW_FUNCTION = /\(.*\)\s+=>\s+[^{]/
const CAPTURE_SHORT_ARROW_FUNCTION = /\(.*\)\s+=>\s+(.+)/

export const executeScript = ({ fn, print = false }) => {
  if (typeof fn === 'function') {
    return injectCode({ fn: functionToString(fn), print })
  }
  return injectCode({ fn, print })
}

export const executeAsyncScript = ({ fn, print = false }) => new Promise((resolve, reject) => {
  const listenerName = UUID.v4()
  const listener = ({ detail }) => {
    window.removeEventListener(listenerName, listener)
    if (detail === null) return reject()
    return resolve(detail)
  }
  document.addEventListener(listenerName, listener)
  if (typeof fn === 'function') {
    return injectAsyncCode({ fn: functionToString(fn), listenerName, print })
  }
  return injectAsyncCode({ fn, listenerName, print })
})

const injectCode = ({ code, print }) => {
  const scriptTag = document.createElement('script')
  scriptTag.innerText = `(() => {${code}})()`
  document.body.appendChild(scriptTag)
  if (isFunction(print)) print('Run script', code)
}

const injectAsyncCode = ({ fn, listenerName, print }) => {
  const scriptTag = document.createElement('script')
  scriptTag.innerText = `(() => {
    const asyncCode = () => {
      ${fn}
    };
    let result = null;
    try { result = asyncCode() } catch (e) {}
    document.dispatchEvent(new CustomEvent('${listenerName}', { detail: result }));
  })()`
  document.body.appendChild(scriptTag)
  if (isFunction(print)) {
    print(fn)
  }
}

const functionToString = (fn) => {
  const fnStr = fn.toString()
  if (SHORT_ARROW_FUNCTION.test(fnStr)) {
    return CAPTURE_SHORT_ARROW_FUNCTION.exec(fnStr)[1]
  }
  const firstBracket = fnStr.indexOf('{')
  return fnStr.substring(firstBracket + 1, fnStr.length - 1)
}

const isFunction = fn => fn && typeof fn === 'function'
