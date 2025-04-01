import { Component } from '@angular/core';
import { PostService } from '../../service/post-service.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Comment {
  id: number;
  postId: number;
  content: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  comments: Comment[];
}

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  imports: [CommonModule],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  addPost(title: string): void {
    this.postService.addPost({ title }).subscribe(post => {
      this.posts.push(post);
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
}

