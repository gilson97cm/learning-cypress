"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var forms_1 = require('@angular/forms');
var forms_2 = require('@angular/forms');
var forms_3 = require('@angular/forms');
var core_1 = require('@angular/core');
var employee_service_1 = require('../../services/employee.service');
var HomeComponent = (function () {
    function HomeComponent(contactService) {
        this.contactService = contactService;
        this.contacts = null;
        this.contact = {};
        this.response = {};
        this.status = '';
        this.currentId = '';
        this.search = '';
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.listOfContacts();
        this.initForm();
    };
    HomeComponent.prototype.listOfContacts = function () {
        var _this = this;
        this.contactService.listOfContacts()
            .subscribe(function (contacts) { return _this.contacts = contacts; }, function (error) { return console.error("Error: " + error); });
        setTimeout(function () { return _this.response = {}; }, 2000);
    };
    HomeComponent.prototype.showContact = function (status, id) {
        var _this = this;
        this.status = status;
        if (status == 'save') {
            this.currentId = '';
            this._formContact.reset();
        }
        if (id) {
            this.currentId = id;
            this.contactService.showContact(id)
                .subscribe(function (contact) { return _this.contact = contact; }, function (error) { return console.error("Error: " + error); });
        }
    };
    HomeComponent.prototype.addOrEditContact = function () {
        var _this = this;
        var contactData = {
            name: this._formContact.value.name,
            lastname: this._formContact.value.lastname,
            email: this._formContact.value.email,
            phone: this._formContact.value.phone,
            gender: this._formContact.value.gender,
            date: this._formContact.value.date,
        };
        if (this.currentId) {
            this.contactService.updateContact(contactData, this.currentId)
                .then(function (resp) {
                _this.listOfContacts();
                _this.response = resp;
            });
        }
        else {
            this.contactService.storeContact(contactData)
                .then(function (resp) {
                _this.listOfContacts();
                _this.response = resp;
            });
        }
        this.showContact('');
    };
    HomeComponent.prototype.editContact = function (id) {
        var _this = this;
        this.showContact('edit');
        this.currentId = id;
        this.contactService.showContact(id)
            .subscribe(function (contact) { return _this._formContact.patchValue(contact); }, function (error) { return console.error("Error: " + error); });
    };
    HomeComponent.prototype.deleteContact = function (id) {
        var _this = this;
        this.contactService.deleteContact(id)
            .then(function (resp) {
            _this.listOfContacts();
            _this.response = resp;
        });
    };
    HomeComponent.prototype.initForm = function () {
        this._formContact = new forms_3.FormGroup({
            name: new forms_2.FormControl('', [
                forms_1.Validators.required,
                forms_1.Validators.pattern("^.{4,}$")
            ]),
            lastname: new forms_2.FormControl('', [
                forms_1.Validators.required,
                forms_1.Validators.pattern("^.{4,}$")
            ]),
            email: new forms_2.FormControl('', [forms_1.Validators.required]),
            phone: new forms_2.FormControl(''),
            gender: new forms_2.FormControl(''),
            date: new forms_2.FormControl(''),
            file: new forms_2.FormControl(''),
            range: new forms_2.FormControl(''),
            radios: new forms_2.FormControl('', [forms_1.Validators.required]),
            checkbox1: new forms_2.FormControl('', [forms_1.Validators.required]),
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: 'app/components/home/home.component.html',
            styles: [" \n    .my-custom-scrollbar {\n        position: relative;\n        height: 200px;\n        overflow: auto;\n      }\n      .table-wrapper-scroll-y {\n        display: block;\n      }"
            ]
        }), 
        __metadata('design:paramtypes', [employee_service_1.EmployeeService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map