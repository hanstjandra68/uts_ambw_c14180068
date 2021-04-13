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
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  isiData : Observable<note[]>;
  isiDataColl : AngularFirestoreCollection<note>;

  constructor(
    afs: AngularFirestore,
    public fotoService:FotoService,
    public afStorage : AngularFireStorage,
  ) {
    this.isiDataColl = afs.collection('datanotes');
    this.isiData = this.isiDataColl.valueChanges();
  }

  delete(){
    
  }

}
