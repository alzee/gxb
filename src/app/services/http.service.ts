import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    constructor(private http: HttpClient) {}

    post(serviceName: string, data: any) {
        const headers = new HttpHeaders('Content-Type: application/ld+json');
        const options = { headers, withCredintials: false };
        const url = environment.apiUrl + serviceName;

        return this.http.post(url, JSON.stringify(data), options);
    }

    patch(serviceName: string, data: any) {
        const headers = new HttpHeaders('Content-Type: application/merge-patch+json');
        const options = { headers, withCredintials: false };
        const url = environment.apiUrl + serviceName;

        return this.http.patch(url, JSON.stringify(data), options);
    }

    get(serviceName: string) {
        const headers = new HttpHeaders('accept: application/json');
        const options = { headers, withCredintials: false };
        const url = environment.apiUrl + serviceName;
        return this.http.get<any[]>(url);
    }
}
