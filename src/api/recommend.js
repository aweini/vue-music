import jsonp from '@common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

// const debug = process.env.NODE_ENV !== 'production'

export function getRecommend () {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

// 这个歌单接口jsonp的方式不行
// 因为qq音乐上这个接口的 request headers 里有 referer为https://y.qq.com/portal/playlist.html
// request headers里的这个值不能通过前端操作绕过， 因此需要 服务器代理
export function getDiscList1 () {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random()
  });
  return jsonp(url, data, options);
}

export function getDiscList () {
  const url = '/api/getDiscList';
  const data = Object.assign({}, commonParams, {
    format: 'json',
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random()
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    // 静态方法 Promise.resolve返回一个promise对象，这个promise对象是被解析后（resolved）的。
    return Promise.resolve(res.data);
  })
}

export function getDiscSongList (disstid) {
  const url = '/api/getCdInfo';
  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  })
}
