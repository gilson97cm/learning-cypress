import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {EmployeeService} from "../../services/employee.service";


@Component({
    selector: 'app-employees',
    templateUrl: 'app/components/employees/employees.component.html'
})

export class EmployeesComponent implements OnInit {

    employee: Object = {};

    constructor(private activateRoute: ActivatedRoute,
                private employeeSvc: EmployeeService,
                private router: Router) {
    }

    ngOnInit() {
        // let id = +this.activateRoute.snapshot.params['id'];
        // let h= this.employeeSvc.infoEmployee(id)
        //     .then(employee => this.employee = employee);
    }

    backAbout() {
        this.router.navigate(['about']);
    }


}