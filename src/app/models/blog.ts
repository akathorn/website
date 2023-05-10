import { Timestamp } from '@angular/fire/firestore';

export type Post = {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  published_date: Timestamp;
  tags: string[];
};
