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
var router_1 = require("@angular/router");
var employee_service_1 = require("../../services/employee.service");
var EmployeesComponent = (function () {
    function EmployeesComponent(activateRoute, employeeSvc, router) {
        this.activateRoute = activateRoute;
        this.employeeSvc = employeeSvc;
        this.router = router;
        this.employee = {};
    }
    EmployeesComponent.prototype.ngOnInit = function () {
        // let id = +this.activateRoute.snapshot.params['id'];
        // let h= this.employeeSvc.infoEmployee(id)
        //     .then(employee => this.employee = employee);
    };
    EmployeesComponent.prototype.backAbout = function () {
        this.router.navigate(['about']);
    };
    EmployeesComponent = __decorate([
        core_1.Component({
            selector: 'app-employees',
            templateUrl: 'app/components/employees/employees.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, employee_service_1.EmployeeService, router_1.Router])
    ], EmployeesComponent);
    return EmployeesComponent;
}());
exports.EmployeesComponent = EmployeesComponent;
//# sourceMappingURL=employees.component.js.map