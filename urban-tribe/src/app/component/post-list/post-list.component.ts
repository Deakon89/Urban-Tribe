import { Component } from '@angular/core';
import { PostService } from '../../service/post-service.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../spinner/spinner.component';

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string; 
}


export interface Post {
  id: number;
  title: string;
  body: string;  
  user_id: number; 
  comments: Comment[];
}

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  imports: [CommonModule, SpinnerComponent, ReactiveFormsModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  postForm : FormGroup;
  pageSize: number = 10;
  loading: boolean = true;
  

  constructor(private postService: PostService, private router: Router) {
  this.postForm = new FormGroup({
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
    user_id: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')])
  });
}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    this.postService.getPosts(this.pageSize).subscribe(posts => {
      this.posts = posts;
      this.loading = false;
      this.posts.forEach(post => {
        this.getComments(post.id);
      });
    }, error => {
      console.error('Error fetching posts:', error);
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      console.log('Sending data:', this.postForm.value);
      this.addPost(this.postForm.value);
    } else {
      console.log('Form is not valid');
    }
  }

  addPost(postData: any) {
    this.postService.addPost(postData).subscribe({
      next: (response) => console.log('Post added:', response),
      error: (error) => console.log('Failed to add post:', error)
    });

    this.postForm.reset();
  }

  addComment(postId: number, commentContent: string, commentInput: HTMLInputElement): void {
    if (!commentContent.trim()) {
      console.warn('Comment content is empty.');
      return;
    }
  
    const newComment = {
      post_id: postId, 
      name: "Nome Utente",
      email: "email@esempio.it", 
      body: commentContent
    };
  
    this.postService.addComment(postId, newComment).subscribe({
      next: (comment) => {
        const postIndex = this.posts.findIndex(p => p.id === postId);
        if (postIndex !== -1) {
          this.posts[postIndex].comments = [...this.posts[postIndex].comments, comment];
          console.log('Comment added:', comment);
        }
        commentInput.value = ''; 
      },
      error: ({ error }) => {
        console.error('Failed to add comment:', error);
        alert(`Failed to add comment: ${error}`);
      }
    });
  }
  
  getComments(postId: number): void {
    console.log('Fetching comments for post', postId);
    this.postService.getComments(postId).subscribe(comments => {
      const formattedComments = comments.map(comment => ({
        id: comment.id,
        postId: comment.post_id,
        name: comment.name,
        email: comment.email,
        body: comment.body  
      }));
      console.log('Comments for post', postId, 'fetched:', formattedComments);
      const postIndex = this.posts.findIndex(post => post.id === postId);
  
      if (postIndex !== -1) {
         this.posts[postIndex].comments = formattedComments;
       }
    });
  }

  backToDash(){
    this.router.navigate(['/dashboard']);
  }
}

