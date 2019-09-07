import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'system', loadChildren: './system/system.module#SystemModule'},// lazy loading
  //{path: '**', component: NotFoundComponent} //error 404 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules // lazy loading
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
