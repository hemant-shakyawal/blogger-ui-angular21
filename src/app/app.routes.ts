import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Layout } from './shared/components/layout/layout';
import { Dashboard } from './components/admin/dashboard/dashboard';
import { authGuard } from './shared/components/auth/auth-guard';

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
            },
            {
                path: 'blog/:url',
                loadComponent: () =>
                    import('./components/blog-details/blog-details').then(c => c.BlogDetails),
            }
        ],
    },

    {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                redirectTo: 'category',
                pathMatch: 'full'
            },

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

            {
                path: 'blog-post',
                loadComponent: () =>
                    import('./components/admin/blog-post/blogpost-list/blogpost-list')
                        .then(c => c.BlogpostList),
            },
            {
                path: 'add-blog-post',
                loadComponent: () =>
                    import('./components/admin/blog-post/add-blogpost/add-blogpost')
                        .then(c => c.AddBlogpost),
            },
            {
                path: 'edit-blog-post/:id',
                loadComponent: () =>
                    import('./components/admin/blog-post/edit-blogpost/edit-blogpost')
                        .then(c => c.EditBlogpost),
            },
            {
                path: 'delete-blog-post/:id',
                loadComponent: () =>
                    import('./components/admin/blog-post/delete-blogpost/delete-blogpost')
                        .then(c => c.DeleteBlogpost),
            },
        ],

    },
];