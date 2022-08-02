import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './components/order/order.component';
import { ProductComponent } from './components/product/product.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {path: '', component: ProductComponent},
  {path: 'index', component: ProductComponent},
  {path: 'product', component: ProductComponent},
  {path: 'order', component: OrderComponent},
  {path: 'user', component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
