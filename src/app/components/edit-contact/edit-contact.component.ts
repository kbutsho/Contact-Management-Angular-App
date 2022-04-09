import { ContactService } from './../../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IGroup } from './../../models/IGroup';
import { IContact } from './../../models/IContact';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  public contactId: string | null = null;
  public loading: boolean = false;
  public contact: IContact = {} as IContact;
  public group: IGroup[] = [] as IGroup[];
  public errorMessage: string | null = null;

  constructor(private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.paramMap.subscribe((param) => {
      this.contactId = param.get('contactId');
    })
    if (this.contactId) {
      this.contactService.getContactById(this.contactId).subscribe((data) => {
        this.contact = data;
        this.contactService.getAllGroup().subscribe((data) => {
          this.group = data;
        })
        this.loading = false;
      }, (error) => {
        this.errorMessage = error;
        this.loading = false;
      })
    }
  }

  public updateSubmit() {
    if (this.contactId) {
      this.contactService.updateContact(this.contact, this.contactId).subscribe((data) => {
        this.router.navigate(['/contact/list']).then();
      }, (error) => {
        this.errorMessage = error;
        this.router.navigate([`/contact/edit/${this.contactId}`]).then();
      })
    }
  }

}
