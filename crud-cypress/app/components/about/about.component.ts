import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {Router} from '@angular/router';
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {Observable} from "rxjs";
import {Validators} from "@angular/forms";

@Component({
    selector: 'app-about',
    templateUrl: 'app/components/about/about.component.html',
})

export class AboutComponent implements OnInit {
    // contacts: Array<Object>;
    contacts: Observable<any[]>;
    contact: Object = {};
    response: Object = {};

    contactID: any;
    status: string;
    formContact: FormGroup;


    constructor(private employeeService: EmployeeService,
                private router: Router) {
        this.initForm();
    }

    ngOnInit() {
        this.listOfContacts();
    }

    listOfContacts() {
        this.employeeService.listOfContacts()
            .subscribe(contacts => this.contacts = contacts,
                error => console.error(`Error: ${error}`));

    }

    createContact(status: string) {
        this.status = status;
        this.cancel();
    }

    storeOrUpdateContact() {
        let contactData = {
            name: this.formContact.value.name,
            lastname: this.formContact.value.lastname,
            email: this.formContact.value.email,
            phone: this.formContact.value.phone,
            gender: this.formContact.value.gender,
            date: this.formContact.value.date,
            image: this.formContact.value.image,
        }

        if (this.status === 'store') {
            this.employeeService.storeContact(contactData)
                .then(
                    data => {
                        this.response = data;
                        this.listOfContacts();
                        if (data.statusCode === 200){
                            this.formContact.reset();
                        }

                        setTimeout(() => this.response = {},2000);
                    },
                    error => console.error(`Error ${error}`)
                );

        }

        if (this.status === 'update') {
            this.employeeService.updateContact(contactData, this.contactID)
                .then(
                    data => {
                        this.response = data;
                        this.listOfContacts();
                        setTimeout(() => this.response = {},2000);
                    },
                    error => console.error(`Error ${error}`)
                ).then(resp => this.listOfContacts());
        }


    }

    showContact(status: string, id?: number) {
        this.status = status;
        this.employeeService.showContact(id)
            .subscribe(contact => this.contact = contact,
                error => console.error(`Error: ${error}`))
        // .then(resp => this.contact = resp);

    }

    editContact(status: string, id?: number) {
        this.status = status;
        this.contactID = id;
        this.employeeService.showContact(id)
            .subscribe(contact => this.formContact.patchValue(contact),
                error => console.error(`Error: ${error}`))

    }

    deleteContact(status: string, id: any) {
        this.status = status;
        this.employeeService.deleteContact(id)
            .then(
                data => {
                    this.response = data;
                    this.listOfContacts();
                    setTimeout(() => this.response = {},2000);
                },
                error => console.error(`Error: ${error}`))
            .then(resp => this.listOfContacts());
    }

    private initForm() {
        this.formContact = new FormGroup({
            name: new FormControl('', [
                Validators.required,
                Validators.pattern("^[a-zA-ZÁ-Úá-ú\\s]+$")
            ]),
            lastname: new FormControl('', [
                Validators.required,
                Validators.pattern("^[a-zA-ZÁ-Úá-ú\\s]+$")
            ]),
            email: new FormControl('', [
                Validators.required,
            ]),
            phone: new FormControl('', [
                Validators.required,
            ]),
            gender: new FormControl('', [
                Validators.required,
            ]),
            date: new FormControl('', [
                Validators.required,
            ]),
            image: new FormControl('', [
                Validators.required,
            ]),
        });
    }

    private cancel() {
        this.contactID = null;
        this.formContact.reset();
    }

    fileChange(event): void {
        const file: File = event.target.files[0];
        if (file) {

            const formData = new FormData();
            formData.append('image', file);

            console.log(formData);
        }else{
            console.log('nor length')
        }
    }



    // selectedEmployee(employee:any){
    //     this.router.navigate(['employee',employee.id]);
    // }
}