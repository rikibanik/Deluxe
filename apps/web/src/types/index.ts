export type User = {
  id: string;
  username: string;
  email: string;
  display_name?: string;
};

export type Repository = {
  id: string;
  owner_id: string;
  name: string;
  description?: string;
  visibility: "public" | "private";
  default_branch: string;
  is_empty: boolean;
  size_bytes: number;
  pushed_at?: string;
  created_at: string;
};

export type TreeEntry = {
  name: string;
  path: string;
  type: "file" | "dir";
  size?: number;
};

export type Commit = {
  sha: string;
  message: string;
  author: string;
  committed_at: string;
};
