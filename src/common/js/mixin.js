import {mapGetters, mapMutations} from 'vuex';
export const playerMixin = {
  computed: {
    iconMode () {
      let icon = '';
      icon = this.mode === 0 ? 'icon-sequence' : this.mode === 1 ? 'icon-loop' : 'icon-random';
      return icon;
    },
    ...mapGetters([
      'mode'
    ])
  },
  methods: {
    changeMode () {
      let mode = (this.mode + 1) % 3;
      this.setMode(mode);
    },
    ...mapMutations({
      setMode: 'SET_MODE'
    })
  }
}
