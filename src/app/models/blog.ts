import { Timestamp } from '@angular/fire/firestore';

export type Image = {
  url: string;
};

export type PostData = {
  title: string;
  subtitle: string;
  content: string;
  published_date?: Timestamp;
  tags: string[];
  image?: Image;
};

export type Post = PostData & {
  id: string;
};

export type TagData = {
  name: string;
  description: string;
};

export type Tag = TagData & {
  id: string;
};
