import { HomeComponent } from './home/home.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


const routes: Routes = [
  { path: '', redirectTo: 'contact/list', pathMatch: 'full' },
  { path: 'contact/list', component: ContactListComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact/add', component: AddContactComponent },
  { path: 'contact/edit/:contactId', component: EditContactComponent },
  {path: 'contact/details/:contactId', component: ContactDetailsComponent},
  {path: '404', component: NotFoundComponent},
 {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
