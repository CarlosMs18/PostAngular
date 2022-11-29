import { HeaderService } from './../../services/header.service';
import { Component, OnInit } from '@angular/core';
import { headerI } from 'src/app/interfaces/header.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  headerMenu : headerI[] = [];

  constructor(private headerService : HeaderService) {
    this.headerMenu = headerService.headerMenu;

  }

  ngOnInit(): void {
  }

}
