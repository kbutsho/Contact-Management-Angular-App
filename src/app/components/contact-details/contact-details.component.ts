import { IGroup } from './../../models/IGroup';
import { ContactService } from './../../services/contact.service';
import { IContact } from './../../models/IContact';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  public contactId: string | null = null;
  public loading: boolean = false;
  public contact: IContact = {} as IContact;
  public group: IGroup = {} as IGroup;
  public errorMessage: string | null = null;


  constructor(private activatedRoute: ActivatedRoute, private contactService: ContactService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.contactId = param.get('contactId');
    })
    if (this.contactId) {
      this.contactService.getContactById(this.contactId).subscribe((data) => {
        this.contact = data;
        this.contactService.getGroupById(data.groupId).subscribe((data) => {
          this.group = data;
        })
        this.loading = false;
      }, (error) => {
        this.errorMessage = error;
        this.loading = false;
      });
    }
  }
  public isNotEmpty() {
    return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0;
  }

}
