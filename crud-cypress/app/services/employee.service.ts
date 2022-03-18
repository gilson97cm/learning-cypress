// import { EMPLOYEES } from '../resource/arrayEmployees';
import {Headers, Http, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { Injectable } from "@angular/core";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';


@Injectable()
export class EmployeeService {

    URL:string  = 'http://100.100.100.207:8080/api/contacts';

    headers = new Headers({'Content-Type': 'application/json' });
    options = new RequestOptions({headers:this.headers});

    constructor(private http:Http){}

    listOfContacts(){
         return this.http.get(this.URL)
             .map(resp => resp.json().contacts );
    }

    showContact(id:number){
        let showURL = this.URL+'/'+id;
        return this.http.get(showURL)
            .map(resp => resp.json().contact );
    }

    storeContact(contact:any){
        let body = JSON.stringify(contact);
        return this.http.post(this.URL, body,this.options)
            .toPromise()
            .then(resp => resp.json())
            .catch(this.ocurredAnError);
            // .map(resp => resp.json());
    }

    updateContact(contact:any, id:any){
        let updateURL = this.URL+'/'+id;
        let body = JSON.stringify(contact);
        return this.http.put(updateURL, body,this.options)
            .toPromise()
            .then(resp => resp.json())
            .catch(this.ocurredAnError);
            // .map(resp => resp.json());
    }

    deleteContact(id:any){
        let deleteURL = this.URL+'/'+id;
        return this.http.delete(deleteURL)
            .toPromise()
            .then(resp => resp.json())
            .catch(this.ocurredAnError);
            // .map(resp => resp.json());
    }


    private ocurredAnError(error:any){
        console.log('Ocurrio un error en el llamado HTTP ', error.message);
        return Promise.reject(error.message || error);

    }

}