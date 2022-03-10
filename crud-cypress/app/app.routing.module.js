"use strict";
var router_1 = require("@angular/router");
var home_component_1 = require("./components/home/home.component");
var about_component_1 = require("./components/about/about.component");
var contact_component_1 = require("./components/contact/contact.component");
var employees_component_1 = require("./components/employees/employees.component");
var appRoutes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'about', component: about_component_1.AboutComponent },
    { path: 'contact', component: contact_component_1.ContactComponent },
    { path: 'employee/:id', component: employees_component_1.EmployeesComponent },
    { path: '**', component: home_component_1.HomeComponent }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.module.js.map