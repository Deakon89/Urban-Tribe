import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  imports: [MatButtonModule, MatIconModule],
})
export class UserDetailComponent {
  @Input() user: any;

  loadUserPosts(userId: number) {
    console.log('Loading posts for user ID');
  }
  
}
