import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageService } from '../services/blog/image.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent {
  @Output() imageUploaded = new EventEmitter<string>();
  @Input() postId?: string;

  constructor(private imageService: ImageService) {}

  uploadImage(input: HTMLInputElement): void {
    const file: File | null | undefined = input.files?.item(0);

    if (file) {
      console.log('Uploading image');
      this.imageService.uploadImage(file, this.postId).subscribe((url) => {
        console.log(`Image uploaded: ${url}`);
        this.imageUploaded.emit(url);
        input.value = '';
      });
    } else {
      alert('Please select a file to upload.');
    }
  }
}
