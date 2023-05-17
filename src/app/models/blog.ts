import { Timestamp } from '@angular/fire/firestore';

export type PostData = {
  title: string;
  subtitle: string;
  content: string;
  published_date?: Timestamp;
  tags: string[];
};

export type Post = PostData & {
  id: string;
};