import jsonp from '@common/js/jsonp';
import {commonParams, options} from './config';
// import axios from 'axios';

export function getSingers () {
  let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';
  let data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0
  })
  return jsonp(url, data, options)
}
