import { Routes } from '@angular/router';
import { ClientShellComponent } from './layout/client-shell/client-shell.component';
import { ProductsComponent } from './features/products/products.component';
import { OrdersComponent } from './features/orders/orders.component';
import { AdminShellComponent } from './layout/admin-shell/admin-shell.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { AuthComponent } from './features/auth/auth.component';
import { ConfirmAccountComponent } from './features/confirm-account/confirm-account.component';
import { ResetPasswordComponent } from './features/reset-password/reset-password.component';

export const routes: Routes = [
    {
        path: '',
        component: ClientShellComponent,
        children: [
            { path: '', component: ProductsComponent },
            { path: 'orders', component: OrdersComponent, canActivate: [] }
        ]
    },
    {
        path: 'admin',
        component: AdminShellComponent,
        canActivate: [],
        children: [
            { path: '', component: DashboardComponent },
        ]
    },
    { path: 'login', component: AuthComponent },
    {path:'confirm-account', component: ConfirmAccountComponent},
    {path:'reset-password', component: ResetPasswordComponent},
    { path: '**', component: NotFoundComponent }
];
