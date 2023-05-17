import { Injectable } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
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
    this.posts$ = collectionData(this.postsCollection, { idField: 'id' });
    this.draftsCollection = collection(
      this.firestore,
      `/users/${environment.authorId}/drafts`
    ) as CollectionReference<Post>;
    this.drafts$ = collectionData(this.draftsCollection, { idField: 'id' });
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
}
