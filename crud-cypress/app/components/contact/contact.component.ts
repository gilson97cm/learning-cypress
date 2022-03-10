import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-contact',
    templateUrl: 'app/components/contact/contact.component.html'
})

export class ContactComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }

    sendContact(form:NgForm){
        console.log(form)
    }
}