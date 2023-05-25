import { Injectable } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { Observable, from, map, mergeMap } from 'rxjs';
import { Tag, TagData } from 'src/app/models/blog';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private tagsCollection: CollectionReference<Tag>;
  public readonly tags$: Observable<Tag[]>;

  constructor(private firestore: Firestore) {
    this.tagsCollection = collection(
      this.firestore,
      `/users/${environment.authorId}/tags`
    ) as CollectionReference<Tag>;
    this.tags$ = collectionData(this.tagsCollection, { idField: 'id' });
  }

  getTag(id: string): Observable<Tag | undefined> {
    // Get draft from this.drafts$
    return this.tags$.pipe(map((tags) => tags.find((tag) => tag.id === id)));
  }

  createTag(id: string, data?: TagData): Observable<void> {
    let tag: TagData = data || {
      name: '',
      description: '',
    };
    let tagRef = doc(this.tagsCollection, id);
    return from(getDoc(tagRef)).pipe(
      map((doc) => {
        if (doc.exists()) {
          throw new Error('Tag already exists');
        }
      }),
      mergeMap(() => from(setDoc(tagRef, tag)))
    );
  }

  updateTag(id: string, data: Partial<Tag>): Observable<void> {
    let tagRef = doc(this.tagsCollection, id);
    return from(setDoc(tagRef, data, { merge: true }));
  }

  deleteTag(id: string): Observable<void> {
    let tagRef = doc(this.tagsCollection, id);
    return from(deleteDoc(tagRef));
  }
}
