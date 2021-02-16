import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
   },
  { path: 'login', component: LoginComponent },
  {
    path: 'vice-presidencies',
    loadChildren: () => import('./components/vice-presidencies/vice-presidencies.module').then(m => m.VicePresidenciesModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'states', loadChildren: () => import('./components/states/states.module').then(m => m.StatesModule) },
  { path: 'phases', loadChildren: () => import('./components/phases/phases.module').then(m => m.PhasesModule) },
  { path: 'applications', loadChildren: () => import('./components/applications/applications.module').then(m => m.ApplicationsModule) },
  { path: 'companyTypes', loadChildren: () => import('./components/company-types/company-types.module').then(m => m.CompanyTypesModule) },
  { path: 'statesByPhases', loadChildren: () => import('./components/states-by-phases/states-by-phases.module').then(m => m.StatesByPhasesModule) },
  { path: 'companies', loadChildren: () => import('./components/companies/companies.module').then(m => m.CompaniesModule) },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      relativeLinkResolution: 'legacy',
      useHash: true,
      preloadingStrategy: PreloadAllModules
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
