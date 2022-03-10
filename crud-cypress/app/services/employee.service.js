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
// import { EMPLOYEES } from '../resource/arrayEmployees';
var http_1 = require("@angular/http");
require('rxjs/add/operator/toPromise');
var core_1 = require("@angular/core");
require('rxjs/add/operator/map');
var EmployeeService = (function () {
    function EmployeeService(http) {
        this.http = http;
        this.URL = 'http://192.168.0.113/api/contacts';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.options = new http_1.RequestOptions({ headers: this.headers });
    }
    EmployeeService.prototype.infoEmployee = function (id) {
        var URL = "https://jsonplaceholder.typicode.com/users/" + id;
        return this.http.get(URL)
            .toPromise()
            .then(function (resp) { return resp.json(); })
            .catch(this.ocurredAnError);
    };
    EmployeeService.prototype.listOfContacts = function () {
        return this.http.get(this.URL)
            .map(function (resp) { return resp.json().contacts; });
    };
    EmployeeService.prototype.showContact = function (id) {
        var showURL = this.URL + '/' + id;
        return this.http.get(showURL)
            .map(function (resp) { return resp.json().contact; });
    };
    EmployeeService.prototype.storeContact = function (contact) {
        var body = JSON.stringify(contact);
        return this.http.post(this.URL, body, this.options)
            .toPromise()
            .then(function (resp) { return resp.json(); })
            .catch(this.ocurredAnError);
        // .map(resp => resp.json());
    };
    EmployeeService.prototype.updateContact = function (contact, id) {
        var updateURL = this.URL + '/' + id;
        var body = JSON.stringify(contact);
        return this.http.put(updateURL, body, this.options)
            .toPromise()
            .then(function (resp) { return resp.json(); })
            .catch(this.ocurredAnError);
        // .map(resp => resp.json());
    };
    EmployeeService.prototype.deleteContact = function (id) {
        var deleteURL = this.URL + '/' + id;
        return this.http.delete(deleteURL)
            .toPromise()
            .then(function (resp) { return resp.json(); })
            .catch(this.ocurredAnError);
        // .map(resp => resp.json());
    };
    EmployeeService.prototype.ocurredAnError = function (error) {
        console.log('Ocurrio un error en el llamado HTTP ', error.message);
        return Promise.reject(error.message || error);
    };
    EmployeeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], EmployeeService);
    return EmployeeService;
}());
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=employee.service.js.map