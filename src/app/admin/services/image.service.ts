import { Injectable } from '@angular/core';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from '@angular/fire/storage';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private storage: Storage) {}

  uploadImage(file: File, postId?: string): Observable<string> {
    let path = postId ? `images/post/${postId}` : `images/${file.name}`;
    let imageRef = ref(this.storage, path);
    let task = uploadBytesResumable(imageRef, file);
    return new Observable((observer) => {
      task.then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          observer.next(url);
          observer.complete();
        });
      });
    });
  }

  deletePostImage(postId: string): Observable<void> {
    let reference = ref(this.storage, `images/post/${postId}`);
    return from(deleteObject(reference));
  }
}
