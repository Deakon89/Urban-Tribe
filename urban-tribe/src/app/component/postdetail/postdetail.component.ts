import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../service/user-service.service';

@Component({
  selector: 'app-postdetail',
  imports: [CommonModule],
  templateUrl: './postdetail.component.html',
  styleUrl: './postdetail.component.css'
})
export class PostdetailComponent {
  user: any;
  posts: any[] = [];
  constructor(private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PostdetailComponent>
  ) {console.log('Data received in dialog:', this.data);}
}

