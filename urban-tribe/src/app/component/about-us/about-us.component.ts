import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  // example team members
  teamMembers = [
    { name: 'Francesco Rossi', role: 'Frontend Developer', avatar: 'https://i.pravatar.cc/201' },
    { name: 'Ilenia Bianchi', role: 'Project Manager', avatar: 'https://i.pravatar.cc/202' },
    { name: 'Marco Verde', role: 'Backend Developer', avatar: 'https://i.pravatar.cc/203' },
  ];
}
