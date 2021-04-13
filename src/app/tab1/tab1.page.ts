import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FotoService, Photo } from '../foto.service';
import { Observable } from 'rxjs';

interface note{
  judul: string,
  isi: string,
  tanggal: string,
  nilai: string,
  gambar: string
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  isiData : Observable<note[]>;
  isiDataColl : AngularFirestoreCollection<note>;

  urlimagtestorage:string;

  judul: string;
  isi : string;
  tanggal :Date;
  nilai: string;
  
  constructor(
    afs: AngularFirestore,
    public fotoService:FotoService,
    public afStorage : AngularFireStorage,
  ) {
    this.isiDataColl = afs.collection('datanotes');
    this.isiData = this.isiDataColl.valueChanges();
  }
  
  fototitle : string;
  fotoUpload : Photo;

  getNama(judulFoto : Photo) {
    this.fotoUpload = judulFoto;
    this.fototitle = judulFoto.filePath;
  }
  
  uploadGambar() {
    this.fotoService.tambahFoto();
  }

  uploadData() {
    const imgfilepath = `filestorage/${this.fotoUpload.filePath}`;
    this.afStorage.upload(imgfilepath, this.fotoUpload.dataImage).then((downloadURL)=> {
      // console.log(this.fotoUpload);
      console.log(downloadURL);
      alert("Berhasil upload gambar");
    });

    var refImage = this.afStorage.storage.ref('filestorage');
    refImage.listAll()
    .then((res) => {
      res.items.forEach((itemRef) => {
        itemRef.getDownloadURL().then((url) => {
          this.urlimagtestorage = url,
          this.isiDataColl.doc(this.judul).set({
            judul: this.judul,
            isi: this.isi,
            tanggal: this.tanggal.toString(),
            nilai: this.nilai,
            gambar: url
          });
        })
      });
    }).catch((error) => {
      console.log(error);
    });


    // this.isiDataColl.doc(this.judul).set({
    //   judul: this.judul,
    //   isi: this.isi,
    //   tanggal: this.tanggal.toString(),
    //   nilai: this.nilai,
    //   gambar: this.fotoUpload.filePath
    // });
  }

}
