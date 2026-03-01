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
            {
                path: 'category',
                loadComponent: () =>
                    import('./components/admin/category/category')
                        .then(c => c.Category),
            },
            {
                path: 'edit-category/:id',
                loadComponent: () =>
                    import('./components/admin/edit-category/edit-category')
                        .then(c => c.EditCategory),
            },
          
            {
                path: 'delete-category/:id',
                loadComponent: () =>
                    import('./components/admin/delete-category/delete-category')
                        .then(c => c.DeleteCategory),
            },

        ],
    },
];