import { VicePresidenciesResolver } from './components/vice-presidencies/guards/vice-presidencies.resolver';
import { ProjectsResolver } from './components/projects/guards-projects/projects.resolver';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

// GUARDS
import { AuthGuard } from './guards/auth.guard';

// RESOLVERS
import { ProjectDetailsResolver } from './components/project-details/guards/project-details.resolver';
import { CompaniesResolver } from './components/companies/guards-companies/companies.resolver';
import { CompanyTypesResolver } from './components/company-types/guards-company-types/company-types.resolver';
import { PhasesResolver } from './components/phases/guards-phases/phases.resolver';
import { DashboardProjectsResolver } from './components/projects/guards-projects/dashboard-projects.resolver';
import { ProjectsByVicepresidencyResolver } from './components/projects-by-vicepresidency/guards/projects-by-vicepresidency.resolver';
import { StatesResolver } from './components/states/guards-states/states.resolver';
import { ApplicationsResolver } from './components/applications/guards-applications/applications.resolver';
import { AreasResolver } from './components/areas/guards-areas/areas.resolver';
import { ManagementsResolver } from './components/managements/guards-managements/managements.resolver';
import { PrioritiesResolver } from './components/priorities/guards-priorities/priorities.resolver';
import { ProgramsResolver } from './components/programs/guards-programs/programs.resolver';
import { RiskLevelsResolver } from './components/risk-levels/guards-managements/risk-levels.resolver';
import { StagesResolver } from './components/stages/guards-stages/stages.resolver';
import { StrategicApproachesResolver } from './components/strategic-approachs/guards-strategic-approaches/strategic-approaches.resolver';
import { TypificationsResolver } from './components/typifications/guards-typifications/typifications.resolver';
import { StateByPhasesResolver } from './components/states-by-phases/guards-state-by-phases/state-by-phases.resolver';
import { ApplicationsByProjectsResolver } from './components/project-details/guards/applications-by-projects.resolver';
import { AreasByProjectsResolver } from './components/project-details/guards/areas-by-projects.resolver';
import { CompaniesByProjectsResolver } from './components/project-details/guards/companies-by-projects.resolver';
import { TestUsersByProjectsResolver } from './components/project-details/guards/test-users-by-projects.resolver';
import { BenefitsByProjectsResolver } from './components/project-details/guards/benefits-by-projects.resolver';
import { HighlightsByProjectsResolver } from './components/project-details/guards/highlights-by-projects.resolver';
import { KpisByProjectsResolver } from './components/project-details/guards/kpis-by-projects.resolver';
import { RisksByProjectsResolver } from './components/project-details/guards/risk-by-projects.resolver';
import { WeeksByProjectsResolver } from './components/project-details/guards/weeks-by-projects.resolver';
import { GoalsByWeeksResolver } from './components/project-details/guards/goals-by-weeks.resolver';
import { NextActivitiesByWeeksResolver } from './components/project-details/guards/next-activities-by-weeks.resolver';
import { ObseravtionsByWeeksResolver } from './components/project-details/guards/observations-by-weeks.resolver';
import { DesviationCausesBySourceResolver } from './components/desviation-causes/guards-desviation-causes/desviation-causes-by-source.resolver';
import { DesviationCausesByTypificationsResolver } from './components/desviation-causes/guards-desviation-causes/desviation-causes-by-typifications.resolver';
import { DesviationCausesByVicepresidenciesResolver } from './components/desviation-causes/guards-desviation-causes/desviation-causes-by-vicepresidencies.resolver';
import { DesviationCausesByAreasResolver } from './components/desviation-causes/guards-desviation-causes/desviation-causes-by-areas.resolver';
import { GeneralUsersResolver } from './components/general-users/guards-general-users/general-users.resolver';
import { DesviationByProjectResolver } from './components/project-details/guards/desviation-by-project.resolver';
import { PagesResolver } from './components/pages/guards/pages.resolver';
import { MenuModulesResolver } from './components/pages/guards/menu-modules.resolver';
import { ProjectsDashboardOwnResolver } from './components/projects/guards-projects/projects-dashboard-own.resolver';

// COMPONENTS
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProjectsOwnResolver } from './components/projects/guards-projects/projects-own.resolver';
import { PersonsResolver } from './components/persons/guards-persons/persons.resolver';
import { ProjectProgressCreateResolver } from './components/project-progress-create/guards-project-progress-create/project-progress-create.resolver';
import { InterrelationsResolver } from './components/project-details/guards/interrelations.resolver';
import { InitialGraphResolver } from './components/demo-gephi/guards-demo-gephi/initial-graph.resolver';

const routes: Routes = [
  {
    path: 'applications',
    loadChildren: () => import('./components/applications/applications.module').then(m => m.ApplicationsModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: {
      applications: ApplicationsResolver
    }
  },
  {
    path: 'areas',
    loadChildren: () => import('./components/areas/areas.module').then(m => m.AreasModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: {
      areas: AreasResolver
    }
  },
  {
    path: 'companies',
    loadChildren: () => import('./components/companies/companies.module').then(m => m.CompaniesModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: {
      companies: CompaniesResolver
    }
  },
  {
    path: 'company-types',
    loadChildren: () => import('./components/company-types/company-types.module').then(m => m.CompanyTypesModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: {
      companyTypes: CompanyTypesResolver
    }
  },
  {
    path: 'demo-gephi',
    loadChildren: () => import('./components/demo-gephi/demo-gephi.module').then(m => m.DemoGephiModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: {
      interrelationsInitial: InitialGraphResolver
    }
  },
  {
    path: 'desviation-causes',
    loadChildren: () => import('./components/desviation-causes/desviation-causes.module').then(m => m.DesviationCausesModule) ,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: {
      desviationCausesBySource: DesviationCausesBySourceResolver,
      desviationCausesByTypifications: DesviationCausesByTypificationsResolver,
      desviationCausesByVicepresidencies: DesviationCausesByVicepresidenciesResolver,
      desviationCausesByAreas: DesviationCausesByAreasResolver
    }
  },
  {
    path: 'general-users',
    loadChildren: () => import('./components/general-users/general-users.module').then(m => m.GeneralUsersModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: {
      generalUsers: GeneralUsersResolver,
    }
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'managements',
    loadChildren: () => import('./components/managements/managements.module').then(m => m.ManagementsModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: {
      managements: ManagementsResolver
    }
  },
  {
    path: 'pages',
    loadChildren: () => import('./components/pages/pages.module').then(m => m.PagesModule),
    resolve: {
      pagesWithoutModule: PagesResolver,
      pagesModules: MenuModulesResolver
    }
  },
  {
    path: 'phases',
    loadChildren: () => import('./components/phases/phases.module').then(m => m.PhasesModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: {
      phases: PhasesResolver
    }
  },
  {
    path: 'priorities',
    loadChildren: () => import('./components/priorities/priorities.module').then(m => m.PrioritiesModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: {
      priorities: PrioritiesResolver
    }
  },
  {
    path: 'programs',
    loadChildren: () => import('./components/programs/programs.module').then(m => m.ProgramsModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: {
      programs: ProgramsResolver
    }
  },
  {
    path: 'project-details/:id',
    loadChildren: () => import('./components/project-details/project-details.module').then(m => m.ProjectDetailsModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: {
      project: ProjectDetailsResolver,
      applicationsByProject: ApplicationsByProjectsResolver,
      areasByProject: AreasByProjectsResolver,
      companiesByProject: CompaniesByProjectsResolver,
      testUsersByProject: TestUsersByProjectsResolver,
      benefitsByProject: BenefitsByProjectsResolver,
      highlightsByProject: HighlightsByProjectsResolver,
      kpisByProject: KpisByProjectsResolver,
      risksByProject: RisksByProjectsResolver,
      weeksByProject: WeeksByProjectsResolver,
      goalsByWeeks: GoalsByWeeksResolver,
      nextActivitiesByWeek: NextActivitiesByWeeksResolver,
      obseravtionsByWeek: ObseravtionsByWeeksResolver,
      desviationsByProject: DesviationByProjectResolver,
      interrelations: InterrelationsResolver
    }
  },
  {
    path: 'project-progress-report',
    loadChildren: () => import('./components/project-progress-report/project-progress-report.module')
      .then(m => m.ProjectProgressReportModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'projects',
    loadChildren: () => import('./components/projects/projects.module').then(m => m.ProjectsModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: {
      projects: ProjectsResolver,
      dashboard: DashboardProjectsResolver,
      dashboardOwn: ProjectsDashboardOwnResolver,
      projectsOwn: ProjectsOwnResolver,
    }
  },
  {
    path: 'projects-by-vicepresidency/:id',
    loadChildren: () => import('./components/projects-by-vicepresidency/projects-by-vicepresidency.module').then(m => m.ProjectsByVicepresidencyModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: {
      //projects: ProjectsResolver,
      projects: ProjectsByVicepresidencyResolver,
    }
  },
  {
    path: 'risk-levels',
    loadChildren: () => import('./components/risk-levels/risk-levels.module').then(m => m.RiskLevelsModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: {
      riskLevels: RiskLevelsResolver
    }
  },
  {
    path: 'stages',
    loadChildren: () => import('./components/stages/stages.module').then(m => m.StagesModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: {
      stages: StagesResolver
    }
  },
  {
    path: 'states',
    loadChildren: () => import('./components/states/states.module').then(m => m.StatesModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: {
      states: StatesResolver
    }
  },
  {
    path: 'states-by-phases',
    loadChildren: () => import('./components/states-by-phases/states-by-phases.module').then(m => m.StatesByPhasesModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: {
      stateByPhases: StateByPhasesResolver
    }
  },
  {
    path: 'strategic-approachs',
    loadChildren: () => import('./components/strategic-approachs/strategic-approachs.module').then(m => m.StrategicApproachsModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: {
      strategicApproaches: StrategicApproachesResolver
    }
  },
  {
    path: 'typifications',
    loadChildren: () => import('./components/typifications/typifications.module').then(m => m.TypificationsModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: {
      typifications: TypificationsResolver
    }
  },
  {
    path: 'vice-presidencies',
    loadChildren: () => import('./components/vice-presidencies/vice-presidencies.module')
      .then(m => m.VicePresidenciesModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: {
      vicePresidencies: VicePresidenciesResolver
    }
  },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { 
    path: 'pages-profiles', 
    loadChildren: () => import('./components/pages-profiles/pages-profiles.module').then(m => m.PagesProfilesModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  { path: 'indicators-report',
    loadChildren: () => import('./components/indicators-report/indicators-report.module').then(m => m.IndicatorsReportModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  { 
    path: 'projects-create', 
    loadChildren: () => import('./components/projects-create/projects-create.module').then(m => m.ProjectsCreateModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  { path: 'persons',
    loadChildren: () => import('./components/persons/persons.module').then(m => m.PersonsModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: {
      persons: PersonsResolver
    }
  },
  { path: 'project-progress-create/:id',
    loadChildren: () => import('./components/project-progress-create/project-progress-create.module').then(m => m.ProjectProgressCreateModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: {
      projectProgressCreateResolver: ProjectProgressCreateResolver
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
