import { NgModule } from '@angular/core';


import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';


const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:
      [
        {
          path: 'timeline',
          children:
            [
              {
                path: '',
                loadChildren: '../timeline/timeline.module#TimelinePageModule'
              }
            ]
        },
        {
          path: 'family',
          children:
            [
              {
                path: '',
                loadChildren: '../family/family.module#FamilyPageModule'
              }
            ]
        },
        {
          path: 'evolution',
          children:
            [
              {
                path: '',
                loadChildren: '../evolution/evolution.module#EvolutionPageModule'
              }
            ]
        },
        {
            path: 'expert',
            children:
              [
                {
                  path: '',
                  loadChildren: '../expert/expert.module#ExpertPageModule'
                }
              ]
          },
        {
          path: '',
          redirectTo: '/tabs/timeline',
          pathMatch: 'full'
        }
      ]
  },
  {
    path: '',
    redirectTo: '/tabs/timeline',
    pathMatch: 'full'
  }
];

@NgModule({
  imports:
    [
      RouterModule.forChild(routes)
    ],
  exports:
    [
      RouterModule
    ]
})
export class TabsPageRoutingModule {}
