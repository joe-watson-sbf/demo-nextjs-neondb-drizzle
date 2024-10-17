
export interface User {
  id: string;
  name: string;
  profession: string;
  created_at: Date;
  updated_at: Date;
  todos?: Todo[]; // Optional, relation to multiple Todo items
}


export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  user?: User; // Optional, relation to the User who created the Todo
}
