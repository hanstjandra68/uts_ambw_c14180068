import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  isiData : Observable<note[]>;
  isiDataColl : AngularFirestoreCollection<note>;

  judul;
  isi;
  nilai;
  tanggal;
  gambar;
  constructor(private route:ActivatedRoute, afs: AngularFirestore,) {
    const parameter = this.route.snapshot.paramMap;
    this.judul = parameter.get('judul');
    this.isi = parameter.get("isi");
    this.nilai = parameter.get("nilai");
    this.tanggal = parameter.get("tanggal");
    this.gambar = parameter.get("gambar");
    this.isiDataColl = afs.collection('datanotes');

    this.isiData = this.isiDataColl.valueChanges();
   }

  ngOnInit() {
  }

  editData(){
    this.isiDataColl.doc(this.judul).set({
      judul: this.judul,
      isi: this.isi,
      tanggal: this.tanggal.toString(),
      nilai: this.nilai,
      gambar: this.gambar
    });
    alert("berhasil edit");
  }
}
