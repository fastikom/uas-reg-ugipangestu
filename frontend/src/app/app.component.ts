import { Component, OnInit } from '@angular/core';

import { MahasiswaService } from './mahasiswa.service';
import { Mahasiswa } from './models/mahasiswa';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isNewForm: boolean;
  showForm: boolean;
  formMahasiswa: Mahasiswa;
  mahasiswas: Mahasiswa[];

  constructor(private mahasiswaService: MahasiswaService) { }

  ngOnInit() {
    this.mahasiswaService.getMahasiswa()
      .subscribe(
        mahasiswas => this.mahasiswas = mahasiswas,
        error =>  console.log(<any>error)
      );
  }

  showMahasiswaForm(mahasiswa: Mahasiswa) {
    if(!mahasiswa) {
      mahasiswa = new Mahasiswa();
      this.isNewForm = true;
    }

    this.showForm = true;
    this.formMahasiswa = mahasiswa;
  }

  removeMahasiswa(mahasiswa: Mahasiswa) {
    this.mahasiswaService.deleteMahasiswa(mahasiswa)
      .subscribe(
        () => this.removeMahasiswaFromList(mahasiswa),
        error => console.log(error)
      );
  }

  saveMahasiswa(mahasiswa: Mahasiswa) {
    if(mahasiswa) {
      if(this.isNewForm) {
        this.mahasiswaService.insertMahasiswa(mahasiswa)
          .subscribe((insertedMahasiswa) => {
            this.mahasiswas.push(insertedMahasiswa),
            error => console.log(error)
          });
      }
      else {
        this.mahasiswaService.updateMahasiswa(mahasiswa)
                          .subscribe(
                            () => {},
                            error => console.log(error)
                          );
      }

      this.showForm = false;
      this.isNewForm = false;
      mahasiswa = null;
    }
  }

  private removeMahasiswaFromList(mahasiswa: Mahasiswa) {
      var index = this.mahasiswas.indexOf(mahasiswa, 0);

      if (index > -1) {
          this.mahasiswas.splice(index, 1);
      }
  }
}