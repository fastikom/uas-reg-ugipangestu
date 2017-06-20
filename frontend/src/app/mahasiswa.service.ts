import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Mahasiswa } from './models/mahasiswa';

@Injectable()
export class MahasiswaService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private mahasiswasUrl = 'http://localhost:8000/api/mahasiswa';

    constructor(private http:Http) {}
    
    getMahasiswa(): Observable<Mahasiswa[]> {
        return this.http.get(this.mahasiswasUrl)
                        .map(response => response.json() as Mahasiswa[])
                        .catch(this.handleError);
    }

    deleteMahasiswa(mahasiswa: Mahasiswa): Observable<any> {
        let updateUrl = `${this.mahasiswasUrl}/${mahasiswa.id}`;
        return this.http.delete(updateUrl)
                        .map(this.success)
                        .catch(this.handleError);
    }

    insertMahasiswa(mahasiswa: Mahasiswa): Observable<Mahasiswa> {
        return this.http.post(this.mahasiswasUrl, JSON.stringify(mahasiswa), { headers: this.headers })
                        .map(response => response.json() as Mahasiswa)
                        .catch(this.handleError);
    }

    updateMahasiswa(mahasiswa: Mahasiswa): Observable<any> {
        let updateUrl = `${this.mahasiswasUrl}/${mahasiswa.id}`;

        return this.http.put(updateUrl, JSON.stringify(mahasiswa), { headers: this.headers })
                        .catch(this.handleError);
    }

    private success(): Observable<any> {
        return Observable.create();
    }

    private handleError(response: Response): Observable<any> {
        let errorMessage = `${response.status} - ${response.statusText}`;
        return Observable.throw(errorMessage);
    }
}