import { Timestamp } from '@angular/fire/firestore';

export type PostData = {
  title: string;
  subtitle: string;
  content: string;
  published_date?: Timestamp;
  image?: Image;
  tags: string[];
};

export type Post = PostData & {
  id: string;
};

export type Image = {
  url: string;
};

export type TagData = {
  name: string;
  description: string;
};

export type Tag = TagData & {
  id: string;
};
