import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../service/user-service.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { PostdetailComponent } from '../postdetail/postdetail.component';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  imports: [MatButtonModule, MatIconModule, MatDialogModule],
})
export class UserDetailComponent {
  @Input() user: any;
  posts: any[] = [];

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit() {
    if (this.user) {
      this.loadUserPosts(this.user.id);
    }
  }

  loadUserPosts(userId: number) {
    this.userService.getUserPosts(userId).subscribe({
      next: (posts) => {
        this.posts = posts;
        this.dialog.open(PostdetailComponent, {
          width: '80%',
          data: { user: this.user, posts: posts }
        });
        console.log('Posts loaded:', posts);
      },
      error: (error) => console.error('Error loading posts:', error)
    });
  }
}