import { Component } from '@angular/core';
import { PostService } from '../../service/post-service.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


export interface Comment {
  id: number;
  postId: number;
  content: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;  // Aggiunto per supportare il corpo del post
  user_id: number;  // Aggiunto per memorizzare il nome dell'utente
  comments: Comment[];
}

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  postForm : FormGroup;
  pageSize: number = 10;

  constructor(private postService: PostService) {
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
    this.postService.getPosts(this.pageSize).subscribe(posts => {
      this.posts = posts;
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
  }

  addComment(postId: number, content: string): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts.map(post => ({
        ...post,
        comments: post.comments || [] 
      }));
    });
  }

  getComments(postId: number): void {
    console.log('Fetching comments for post', postId);
    this.postService.getComments(postId).subscribe(comments => {
      console.log('Comments for post', postId, 'fetched:', comments);
      const postIndex = this.posts.findIndex(post => post.id === postId);

      if (postIndex !== -1) {
        this.posts[postIndex].comments = [...(this.posts[postIndex].comments || []), ...comments];
      }
    });
  }
}

