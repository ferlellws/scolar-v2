import { VicePresidenciesResolver } from './components/vice-presidencies/guards/vice-presidencies.resolver';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { ProjectsResolver } from './components/projects/guards-projects/projects.resolver';
import { CompaniesResolver } from './components/companies/guards-companies/companies.resolver';
import { CompanyTypesResolver } from './components/company-types/guards-company-types/company-types.resolver';
import { PhasesResolver } from './components/phases/guards-phases/phases.resolver';
import { StatesResolver } from './components/states/guards-states/states.resolver';
import { ApplicationsResolver } from './components/applications/guards-applications/applications.resolver';

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
    canLoad: [AuthGuard],
    resolve: {
      vicePresidencies: VicePresidenciesResolver
    }
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'states',
    loadChildren: () => import('./components/states/states.module').then(m => m.StatesModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: {
      states: StatesResolver
    }
  },
  { path: 'phases',
    loadChildren: () => import('./components/phases/phases.module').then(m => m.PhasesModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: {
      phases: PhasesResolver
    }
  },
  { path: 'applications',
    loadChildren: () => import('./components/applications/applications.module').then(m => m.ApplicationsModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: {
      applications: ApplicationsResolver
    }
  },
  { path: 'company-types',
    loadChildren: () => import('./components/company-types/company-types.module').then(m => m.CompanyTypesModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: {
      companyTypes: CompanyTypesResolver
    }
  },
  { path: 'states-by-phases', loadChildren: () => import('./components/states-by-phases/states-by-phases.module').then(m => m.StatesByPhasesModule) },
  { path: 'companies',
    loadChildren: () => import('./components/companies/companies.module').then(m => m.CompaniesModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: {
      companies: CompaniesResolver
    }
  },
  { path: 'strategic-acpproachs', loadChildren: () => import('./components/strategic-approachs/strategic-approachs.module').then(m => m.StrategicApproachsModule) },
  { path: 'programs', loadChildren: () => import('./components/programs/programs.module').then(m => m.ProgramsModule) },
  { path: 'priorities', loadChildren: () => import('./components/priorities/priorities.module').then(m => m.PrioritiesModule) },
  { path: 'typifications', loadChildren: () => import('./components/typifications/typifications.module').then(m => m.TypificationsModule) },
  { path: 'managements', loadChildren: () => import('./components/managements/managements.module').then(m => m.ManagementsModule) },
  { path: 'stages', loadChildren: () => import('./components/stages/stages.module').then(m => m.StagesModule) },
  { path: 'risk-levels', loadChildren: () => import('./components/risk-levels/risk-levels.module').then(m => m.RiskLevelsModule) },
  { path: 'projects', 
  loadChildren: () => import('./components/projects/projects.module').then(m => m.ProjectsModule),
  canActivate: [AuthGuard],
  canLoad: [AuthGuard],
  resolve: {
    projects: ProjectsResolver
  }
  },
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
