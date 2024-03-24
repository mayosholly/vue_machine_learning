import {createRouter, createWebHistory} from 'vue-router';
import MainLayout from './components/layout/MainLayout.vue';
import Dashboard from './views/Dashboard.vue';
import Diabetes from './views/Diabetes.vue';
import Heart from './views/Heart.vue';
import Gold from './views/Gold.vue';
import GoldLn from './views/GoldLn.vue';
import GoldRf from './views/GoldRf.vue';
import GoldEt from './views/GoldEt.vue';
import GoldDt from './views/GoldDt.vue';
import Register from './views/Register.vue';
import Login from './views/Login.vue';
import Orchid from './views/Orchid.vue';

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: 'dashboard', name:'Dashboard', component: Dashboard,  meta: { public: false }
            },
            {
                path: 'diabetes', name:'Diabetes', component: Diabetes,  meta: { public: false }
            },
            {
                path: 'heart', name:'Heart', component: Heart, meta: { public: false }
            },
            {
                path: 'gold', name:'Gold', component: Gold, meta: { public: false }
            },
            {
                path: 'orchid', name:'Orchid', component: Orchid, meta: { public: false }
            },
            {
                path: 'gold-ln', name:'GoldLn', component: GoldLn, meta: { public: false }
            },
            {
                path: 'gold-dt', name:'GoldDt', component: GoldDt, meta: { public: false }
            },
            {
                path: 'gold-rf', name:'GoldRf', component: GoldRf, meta: { public: false }
            },
            {
                path: 'gold-et', name:'GoldEt', component: GoldEt, meta: { public: false }
            },
        ]
    },
    { path: '/register', name: 'Register', component: Register, meta: { public: true } },

    { path: '/login', name: 'Login', component: Login, meta: { public: true }  },

    
];

const router = createRouter({
    history: createWebHistory(),
    routes
});


router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token');
  
    if (!to.meta.public && !isAuthenticated) {
      next({ name: 'Login' });
    } else {
      next();
    }
  });

export default router;