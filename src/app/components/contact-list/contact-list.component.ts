import { IContact } from './../../models/IContact';
import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  public loading: boolean = false;
  public contacts: IContact[] = [];
  public errorMessage: string | null = null;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getAllContactFromServer();
  }

  public getAllContactFromServer(){
    this.loading = true;
    this.contactService.getAllContact().subscribe((data) => {
      this.contacts = data;
      this.loading = false;
    }, (error) => {
      this.errorMessage = error;
      this.loading = false
    })
  }
 public deleteContact(contactId: string | undefined){
   if(contactId){
     this.contactService.deleteContact(contactId).subscribe((data)=>{
       this.getAllContactFromServer();
     }, (error)=>{
       this.errorMessage = error;
     })
   }
 }

}
