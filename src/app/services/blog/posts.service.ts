import { Injectable } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  orderBy,
  query,
  setDoc,
} from '@angular/fire/firestore';
import { Observable, from, map, mergeMap } from 'rxjs';
import { Post, PostData } from 'src/app/models/blog';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private postsCollection: CollectionReference<Post>;
  private draftsCollection: CollectionReference<Post>;
  public readonly posts$: Observable<Post[]>;
  public readonly drafts$: Observable<Post[]>;

  constructor(private firestore: Firestore) {
    this.postsCollection = collection(
      this.firestore,
      `/users/${environment.authorId}/posts`
    ) as CollectionReference<Post>;
    this.posts$ = collectionData(
      query(this.postsCollection, orderBy('published_date', 'desc')),
      { idField: 'id' }
    );
    this.draftsCollection = collection(
      this.firestore,
      `/users/${environment.authorId}/drafts`
    ) as CollectionReference<Post>;
    this.drafts$ = collectionData(
      query(this.draftsCollection, orderBy('published_date', 'desc')),
      { idField: 'id' }
    );
  }

  getDraft(id: string): Observable<Post | undefined> {
    // Get draft from this.drafts$
    return this.drafts$.pipe(
      map((drafts) => drafts.find((draft) => draft.id === id))
    );
  }

  createDraft(id: string, data?: PostData): Observable<void> {
    let draft: PostData = data || {
      title: '',
      subtitle: '',
      content: '',
      tags: [],
    };
    let draftRef = doc(this.draftsCollection, id);
    return from(getDoc(draftRef)).pipe(
      map((doc) => {
        if (doc.exists()) {
          throw new Error('Draft already exists');
        }
      }),
      mergeMap(() => from(setDoc(draftRef, draft)))
    );
  }

  updateDraft(id: string, data: Partial<PostData>): Observable<void> {
    let draftRef = doc(this.draftsCollection, id);
    return from(setDoc(draftRef, data, { merge: true }));
  }

  deleteDraft(id: string): Observable<void> {
    let draftRef = doc(this.draftsCollection, id);
    return from(deleteDoc(draftRef));
  }

  publishDraft(id: string): Observable<void> {
    let draftRef = doc(this.draftsCollection, id);
    let postRef = doc(this.postsCollection, id);
    return from(getDoc(draftRef)).pipe(
      map((doc) => {
        if (!doc.exists()) {
          throw new Error('Draft does not exist');
        }
        return doc.data();
      }),
      mergeMap((data) => from(setDoc(postRef, data)))
    );
  }

  getPost(id: string): Observable<Post | undefined> {
    // Get draft from this.drafts$
    return this.posts$.pipe(
      map((posts) => posts.find((post) => post.id === id))
    );
  }

  deletePost(id: string): Observable<void> {
    let postRef = doc(this.postsCollection, id);
    return from(deleteDoc(postRef));
  }
}
