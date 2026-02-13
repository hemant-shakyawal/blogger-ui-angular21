import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Layout } from './shared/components/layout/layout';
import { Dashboard } from './components/admin/dashboard/dashboard';

export const routes: Routes = [
    { path: 'login', component: Login },

    {
        path: '',
        component: Layout,
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./components/home/home').then(c => c.Home),
            },
            {
                path: 'home',
                loadComponent: () =>
                    import('./components/home/home').then(c => c.Home),
            }
        ],
    },

    {
        path: 'dashboard',
        component: Dashboard,
        children: [
            {
                path: 'add-category',
                loadComponent: () =>
                    import('./components/admin/add-category/add-category')
                        .then(c => c.AddCategory),
            },
        ],
    },
];