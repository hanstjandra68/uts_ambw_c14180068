import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  judul;
  isi;
  nilai;
  tanggal;
  gambar;
  constructor(private route:ActivatedRoute) {
    const parameter = this.route.snapshot.paramMap;
    this.judul = parameter.get('judul');
    this.isi = parameter.get("isi");
    this.nilai = parameter.get("nilai");
    this.tanggal = parameter.get("tanggal");
    this.gambar = parameter.get("gambar");
   }

}
