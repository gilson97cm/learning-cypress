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
var core_1 = require('@angular/core');
var employee_service_1 = require("../../services/employee.service");
var router_1 = require('@angular/router');
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var AboutComponent = (function () {
    function AboutComponent(employeeService, router) {
        this.employeeService = employeeService;
        this.router = router;
        this.contact = {};
        this.response = {};
        this.initForm();
    }
    AboutComponent.prototype.ngOnInit = function () {
        this.listOfContacts();
    };
    AboutComponent.prototype.listOfContacts = function () {
        var _this = this;
        this.employeeService.listOfContacts()
            .subscribe(function (contacts) { return _this.contacts = contacts; }, function (error) { return console.error("Error: " + error); });
    };
    AboutComponent.prototype.createContact = function (status) {
        this.status = status;
        this.cancel();
    };
    AboutComponent.prototype.storeOrUpdateContact = function () {
        var _this = this;
        var contactData = {
            name: this.formContact.value.name,
            lastname: this.formContact.value.lastname,
            email: this.formContact.value.email,
            phone: this.formContact.value.phone,
            gender: this.formContact.value.gender,
            date: this.formContact.value.date,
            image: this.formContact.value.image,
        };
        if (this.status === 'store') {
            this.employeeService.storeContact(contactData)
                .then(function (data) {
                _this.response = data;
                _this.listOfContacts();
                if (data.statusCode === 200) {
                    _this.formContact.reset();
                }
                setTimeout(function () { return _this.response = {}; }, 2000);
            }, function (error) { return console.error("Error " + error); });
        }
        if (this.status === 'update') {
            this.employeeService.updateContact(contactData, this.contactID)
                .then(function (data) {
                _this.response = data;
                _this.listOfContacts();
                setTimeout(function () { return _this.response = {}; }, 2000);
            }, function (error) { return console.error("Error " + error); }).then(function (resp) { return _this.listOfContacts(); });
        }
    };
    AboutComponent.prototype.showContact = function (status, id) {
        var _this = this;
        this.status = status;
        this.employeeService.showContact(id)
            .subscribe(function (contact) { return _this.contact = contact; }, function (error) { return console.error("Error: " + error); });
        // .then(resp => this.contact = resp);
    };
    AboutComponent.prototype.editContact = function (status, id) {
        var _this = this;
        this.status = status;
        this.contactID = id;
        this.employeeService.showContact(id)
            .subscribe(function (contact) { return _this.formContact.patchValue(contact); }, function (error) { return console.error("Error: " + error); });
    };
    AboutComponent.prototype.deleteContact = function (status, id) {
        var _this = this;
        this.status = status;
        this.employeeService.deleteContact(id)
            .then(function (data) {
            _this.response = data;
            _this.listOfContacts();
            setTimeout(function () { return _this.response = {}; }, 2000);
        }, function (error) { return console.error("Error: " + error); })
            .then(function (resp) { return _this.listOfContacts(); });
    };
    AboutComponent.prototype.initForm = function () {
        this.formContact = new forms_1.FormGroup({
            name: new forms_1.FormControl('', [
                forms_2.Validators.required,
                forms_2.Validators.pattern("^[a-zA-ZÁ-Úá-ú\\s]+$")
            ]),
            lastname: new forms_1.FormControl('', [
                forms_2.Validators.required,
                forms_2.Validators.pattern("^[a-zA-ZÁ-Úá-ú\\s]+$")
            ]),
            email: new forms_1.FormControl('', [
                forms_2.Validators.required,
            ]),
            phone: new forms_1.FormControl('', [
                forms_2.Validators.required,
            ]),
            gender: new forms_1.FormControl('', [
                forms_2.Validators.required,
            ]),
            date: new forms_1.FormControl('', [
                forms_2.Validators.required,
            ]),
            image: new forms_1.FormControl('', [
                forms_2.Validators.required,
            ]),
        });
    };
    AboutComponent.prototype.cancel = function () {
        this.contactID = null;
        this.formContact.reset();
    };
    AboutComponent.prototype.fileChange = function (event) {
        var file = event.target.files[0];
        if (file) {
            var formData = new FormData();
            formData.append('image', file);
            console.log(formData);
        }
        else {
            console.log('nor length');
        }
    };
    AboutComponent = __decorate([
        core_1.Component({
            selector: 'app-about',
            templateUrl: 'app/components/about/about.component.html',
        }), 
        __metadata('design:paramtypes', [employee_service_1.EmployeeService, router_1.Router])
    ], AboutComponent);
    return AboutComponent;
}());
exports.AboutComponent = AboutComponent;
//# sourceMappingURL=about.component.js.map