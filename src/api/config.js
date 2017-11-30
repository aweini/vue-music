export const commonParams = {
  g_tk: 1928093487,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}

// jsonpCallback=jp0/jp1......  jsonpCallback是和后台约定的传过去的参数 返回的参数在jpx函数里 如jp0({....})
export const options = {
  param: 'jsonpCallback',
  prefix: 'jp'
}
export const ERR_OK = 0
