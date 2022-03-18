import VueRouter from 'vue-router';
import Dashboard from '../components/Dashboard.vue';
import CreateTweet from '../components/CreateTweet.vue';
import TweetMetrics from '../components/TweetMetrics.vue';


const routes = [{
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
},
{
    path: '/create-tweet',
    name: 'create-tweet',
    component: CreateTweet
},
{
    path: '/tweet-metrics/:tweet',
    name: 'tweet-metrics',
    component: TweetMetrics
}
];

const router = new VueRouter({
    mode: 'history',
    base: "",
    routes
});

export default router;