import { ContactService } from './../../services/contact.service';
import { IGroup } from './../../models/IGroup';
import { IContact } from './../../models/IContact';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  public errorMessage: string | null = null;
  public loading: boolean =    false;
  public contact:IContact = {} as IContact;
  public group:IGroup[] = [] as IGroup[];


  constructor(private contactService: ContactService, private router: Router) { }

  ngOnInit(): void {
    this.contactService.getAllGroup().subscribe((data)=>{
      this.group = data;
    }, (error)=>{
      this.errorMessage = error;
    });
  }
  public createSubmit(){
    this.contactService.createContact(this.contact).subscribe((data)=>{
      this.router.navigate(['/contact/list']).then();
    },(error)=>{
      this.errorMessage = error;
      this.router.navigate(['/contact/add']).then();
    })
  }

}
