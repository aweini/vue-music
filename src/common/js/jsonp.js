import originJsonp from 'jsonp';

export default function jsonp (url, data, options) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);
  let promise = new Promise((resolve, reject) => {
    originJsonp(url, options, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
  // 因为执行jsonp函数后 要得到promise，所以return出去，否则可以直接在这里用promise.then()
  return promise;
}

export function param (data) {
  let url = '';
  for (var k in data) {
    let value = (data[k] === undefined) ? '' : data[k];
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
