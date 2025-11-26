export interface Note {
  id?: number;
  title: string;
  content: string;
  color: string;
  is_pinned: boolean;
  created_at?: string;
  updated_at?: string;
}
