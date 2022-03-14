import { Observable } from 'rxjs';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Json } from '@angular/core/src/facade/lang';

@Component({
    selector: 'app-home',
    templateUrl: 'app/components/home/home.component.html',
    styles:[` 
    .my-custom-scrollbar {
        position: relative;
        height: 500px;
        overflow: auto;
      }
      .table-wrapper-scroll-y {
        display: block;
      }`
      ]
})

export class HomeComponent implements OnInit {
    _formContact: FormGroup;
    contacts: Observable<any[]>;
    contact: Object;
    response: Object;
    status: string;
    currentId: string;
    search: string;


    constructor(private contactService: EmployeeService) {
        this.contacts = null;
        this.contact = {};
        this.response = {};
        this.status = '';
        this.currentId = '';       
        this.search = '';

    }

    ngOnInit() {
        this.listOfContacts();
        this.initForm();
    }

    listOfContacts() {
        this.contactService.listOfContacts()
            .subscribe(contacts => this.contacts = contacts,
                error => console.error(`Error: ${error}`));

        setTimeout(() => this.response = {}, 2000);
    }


    showContact(status, id?) {
        this.status = status;

        if (status == 'save') {
            this.currentId = '';
            this._formContact.reset();
        }

        if (id) {
            this.currentId = id;
            this.contactService.showContact(id)
                .subscribe(contact => this.contact = contact,
                    error => console.error(`Error: ${error}`))
        }
    }

    addOrEditContact() {

        let contactData = {
            name: this._formContact.value.name,
            lastname: this._formContact.value.lastname,
            email: this._formContact.value.email,
            phone: this._formContact.value.phone,
            gender: this._formContact.value.gender,
            date: this._formContact.value.date,
        }

        localStorage.setItem('contactData',Json.stringify(contactData));

        if (this.currentId) {
            this.contactService.updateContact(contactData, this.currentId)
                .then(resp => {
                    this.listOfContacts();
                    this.response = resp;
                });

        } else {
            this.contactService.storeContact(contactData)
                .then(resp => {
                    this.listOfContacts();
                    this.response = resp;
                });
        }

        this.showContact('');
    }




    editContact(id) {
        this.showContact('edit');
        this.currentId = id;
        this.contactService.showContact(id)
            .subscribe(contact => this._formContact.patchValue(contact),
                error => console.error(`Error: ${error}`))
    }


    deleteContact(id) {
        this.contactService.deleteContact(id)
            .then(resp => {
                this.listOfContacts();
                this.response = resp;
            });
    }
    
    private initForm() {
        
        this._formContact = new FormGroup({
            name: new FormControl('', [
                Validators.required,
                Validators.pattern("^.{4,}$")
            ]),
            lastname: new FormControl('', [
                Validators.required,
                Validators.pattern("^.{4,}$")
            ]),
            email: new FormControl('', [
                Validators.required, 
                Validators.pattern("[a-zA-Z0-9!#$%&'*_+-]([\.]?[a-zA-Z0-9!#$%&'*_+-])+@[a-zA-Z0-9]([^@&%$\/()=?¿!.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?")
            ]),
            phone: new FormControl('',[
                Validators.pattern("[0-9]{10}")
            ]),
            gender: new FormControl(''),
            date: new FormControl(''),
            file: new FormControl(''),
            range: new FormControl(''),
            radios: new FormControl('',[Validators.required]),
            checkbox1: new FormControl('',[Validators.required]),
       
            
        });
    }
    
    // onSearch(searchValue: string): void {  
    
    //    if(searchValue == ''){
    //        this.listOfContacts();
    //    }else{
    //     console.log(searchValue);
    
    //     let aux = this.contacts.filter(x => x.name.toLowerCase() == searchValue.toLowerCase());
        
    //     if(aux.length > 0){
    //         this.contacts = aux;
    //     }
    
    //    console.log(this.contacts);
    //    }
       
    //   }
}