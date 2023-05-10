import { Injectable } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/blog';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private postsCollection: CollectionReference<Post>;
  public readonly posts$: Observable<Post[]>;

  constructor(private firestore: Firestore) {
    this.postsCollection = collection(
      this.firestore,
      `/users/${environment.authorId}/posts`
    ) as CollectionReference<Post>;
    this.posts$ = collectionData(this.postsCollection);
  }
}
