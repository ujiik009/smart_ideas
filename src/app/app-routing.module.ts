import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'create-family', loadChildren: './create-family/create-family.module#CreateFamilyPageModule' },
  { path: 'create-child/:number', loadChildren: './create-child/create-child.module#CreateChildPageModule' },
  { path: 'child-detail', loadChildren: './child-detail/child-detail.module#ChildDetailPageModule' },
  { path: 'family-detail', loadChildren: './family-detail/family-detail.module#FamilyDetailPageModule' },
  { path: 'create-expert/:number', loadChildren: './create-expert/create-expert.module#CreateExpertPageModule' },
  { path: 'expert-detail', loadChildren: './expert-detail/expert-detail.module#ExpertDetailPageModule' },
  { path: 'evolution-list', loadChildren: './evolution-list/evolution-list.module#EvolutionListPageModule' },
  { path: 'evolution-add', loadChildren: './evolution-add/evolution-add.module#EvolutionAddPageModule' },
  { path: 'sing-up', loadChildren: './sing-up/sing-up.module#SingUpPageModule' },
  // { path: 'timeline', loadChildren: './timeline/timeline.module#TimelinePageModule' },
  // { path: 'family', loadChildren: './family/family.module#FamilyPageModule' },
  // { path: 'evolution', loadChildren: './evolution/evolution.module#EvolutionPageModule' },
  // { path: 'expert', loadChildren: './expert/expert.module#ExpertPageModule' }
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
