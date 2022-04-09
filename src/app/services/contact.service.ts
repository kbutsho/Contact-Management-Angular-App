import { IGroup } from './../models/IGroup';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IContact } from '../models/IContact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private serverUrl: string = `http://localhost:9000`;
  constructor(private httpCLient: HttpClient) { }
  // get all contact
  public getAllContact(): Observable<IContact[]> {
    let dataURL: string = `${this.serverUrl}/contacts`;
    return this.httpCLient.get<IContact[]>(dataURL).pipe(catchError(this.handelError));
  }
  // get single contact by id
  public getContactById(contactId: string): Observable<IContact> {
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpCLient.get<IContact>(dataURL).pipe(catchError(this.handelError));
  }
  // create a contact 
  public createContact(contact: IContact): Observable<IContact> {
    let dataURL: string = `${this.serverUrl}/contacts`;
    return this.httpCLient.post<IContact>(dataURL, contact).pipe(catchError(this.handelError));
  }
  // update contact 
  public updateContact(contact: IContact, contactId: string): Observable<IContact> {
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpCLient.put<IContact>(dataURL, contact).pipe(catchError(this.handelError));
  }
  // delete contact 
  public deleteContact(contactId: string): Observable<{}> {
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpCLient.delete<{}>(dataURL).pipe(catchError(this.handelError));
  }
  // get all groups
  public getAllGroup(): Observable<IGroup[]> {
    let dataURL: string = `${this.serverUrl}/groups`;
    return this.httpCLient.get<IGroup[]>(dataURL).pipe(catchError(this.handelError));
  }
   // get single group by id
   public getGroupById(groupId: string): Observable<IGroup> {
    let dataURL: string = `${this.serverUrl}/groups/${groupId}`;
    return this.httpCLient.get<IGroup>(dataURL).pipe(catchError(this.handelError));
  }
  // error handel
  public handelError(error: HttpErrorResponse) {
    let errorMessage: string = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error : ${error.error.message}`
    } else {
      errorMessage = `Status: ${error.status} \n Message: ${error.message}`
    }
    return throwError(errorMessage);
  }
}


