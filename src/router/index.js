import Vue from 'vue';
import Router from 'vue-router';
const Singer = () => import(/* webpackChunkName: "singer" */ '@components/singer/singer');
const Rank = () => import(/* webpackChunkName: "rank" */ '@components/rank/rank');
const Search = () => import(/* webpackChunkName: "search" */ '@components/search/search');
const SingerDetail = () => import(/* webpackChunkName: "singerDetail" */ '@components/singer-detail/singer-detail');
const Test = () => import(/* webpackChunkName: "test" */ '@components/test/test');
const DiscDetail = () => import(/* webpackChunkName: "discDetail" */ '@components/disc-detail/disc-detail');
const TopList = () => import(/* webpackChunkName: "topList" */ '@components/top-list/top-list');
const Recommend = () => import(/* webpackChunkName: "recommend" */ '@components/recommend/recommend');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: DiscDetail
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          name: 'topList',
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/test',
      component: Test
    }
  ]
})
