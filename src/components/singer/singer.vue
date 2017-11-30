<template>
  <div>singer</div>
</template>
<script>
  import { getSingers } from '@api/singer';
  import { ERR_OK } from '@api/config';
  export default{
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
            console.log(this.singers);
          }
        })
      }
    }
  }
</script>
<style lang="scss">
</style>