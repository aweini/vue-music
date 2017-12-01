<template>
  <div class="singer">
    <listview :data="singers"></listview>
  </div>
</template>
<script>
  import { getSingers } from '@api/singer';
  import { ERR_OK } from '@api/config';
  import listview from '@base/listview/listview';
  import Singer from '@common/js/singer';

  const HOT_NAME = '热门';
  const HOT_SINGER_LEN = 10;

  export default{
    components: {
      listview
    },
    props: {

    },
    created () {
      this._getSingers();
    },
    data () {
      return {
        singers: []
      }
    },
    methods: {
      _getSingers () {
        getSingers().then((res) => {
          if (ERR_OK === res.code) {
            this.singers = res.data.list;
            this.singers = this._normalizeSinger(this.singers)
            console.log(this.singers);
          }
        })
      },
      _normalizeSinger (list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }

        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid
            }))
          }
          if (!map[item.Findex]) {
            map[item.Findex] = {
              title: item.Findex,
              items: []
            }
          }
          map[item.Findex].items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        })

        console.log('map.......')
        console.log(map);

        let hot = [];
        let ret = [];
        for (let key in map) {
          if (key === 'hot') {
            hot.push(map[key])
          } else if (key.match(/[a-zA-Z]/)) {
            ret.push(map[key])
          }
        }

        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })

        let normalizeList = hot.concat(ret);
        console.log('normalizeList........')
        console.log(normalizeList);
        return normalizeList;
      }
    }
  }
</script>
<style lang="scss">
.singer{
  position: fixed;
  top: 88px;
  bottom: 0px;
  width: 100%;
}
</style>