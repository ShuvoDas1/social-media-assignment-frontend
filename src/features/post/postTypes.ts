export interface PostRequest {
  content: string;
  images: File[] | [];
  privacy: "public" | "private";
}

export interface Post {
  id: number;
  content: string;
  user_id: number;
  counts: {
    comment: number;
    like: number;
    unlike: number;
  };
  is_liked: boolean;
  visibility: "public" | "private";
  created_at: string;
  updated_at: string;
  images: {
    id: number;
    image_url: string;
  }[];
  user: {
    id: number;
    full_name: string;
    email: string;
  };
}

export interface Meta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export interface GetPostsResponse {
  code: number;
  success: boolean;
  message: string;
  data: Post[];
  meta: Meta;
}

export interface Reaction {
  id: number;
  post_id: number;
  react: string;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export interface GetPostReactionsResponse {
  code: number;
  success: boolean;
  message: string;
  data: Reaction[];
  meta: Meta;
}

export interface Comment {
  comment: string;
  id: number;
  like_count: number;
  parent_id: number | null;
  user_id: number;
  post_id: number;
  created_at: string;
  is_liked: boolean;
  user: {
    id: number;
    email: string;
    full_name: string;
  };
  replies: Comment[];
}

export interface GetPostCommentsResponse {
  code: number;
  success: boolean;
  message: string;
  data: Comment[];
  meta: Meta;
}
