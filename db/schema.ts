import { relations } from 'drizzle-orm';
import { boolean, index, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

const created_at = timestamp("created_at").notNull().defaultNow();
const updated_at = timestamp("updated_at").notNull().defaultNow()
.$onUpdate(()=> new Date());


export const UserTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  profession: varchar({ length: 255 }).notNull(),
  create_at: created_at,
  updated_at
});


export const TodoTable = pgTable("todos", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar({ length: 255 }).notNull(),
  completed: boolean("completed").default(false).notNull(),
  user_id: uuid("user_id").notNull(),
  create_at: created_at,
  updated_at,
},
  table => ({
    userIdIndex: index("user_id_index").on(table.user_id),
  }),
);


// Define the relations between Todo and User
export const UsersRelations = relations(UserTable, ({ many }) => ({
  todos: many(TodoTable), // A User can have many Todos
}));

export const TodosRelations = relations(TodoTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [TodoTable.user_id], // Foreign key in TodosTable
    references: [UserTable.id],  // Primary key in UsersTable
  }),
}));
