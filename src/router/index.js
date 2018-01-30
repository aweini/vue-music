import Vue from 'vue';
import Router from 'vue-router';
import Recommend from '@components/recommend/recommend';
import Singer from '@components/singer/singer';
import Rank from '@components/rank/rank';
import Search from '@components/search/search';
import SingerDetail from '@components/singer-detail/singer-detail';
import Test from '@components/test/test';
import DiscDetail from '@components/disc-detail/disc-detail';
import TopList from '@components/top-list/top-list';

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
