import { relations } from "drizzle-orm";
import {
  AnyPgColumn,
  boolean,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { AdapterAccount } from "next-auth/adapters";


export const users = pgTable("user", {
  id: text("id").primaryKey(),
  username: text("username").notNull().default("username").unique(),
  name: text("name").notNull().default("user"),
  email: text("email").notNull().default("examplemail@example.com").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  passwordHash: text("pw_hash").unique(),
  image: text("image"),
  verified: boolean("verified").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const userRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  likes: many(likes),
  replies: many(replies),
  comments: many(comments),
  messages: many(messages)
}))

export const posts = pgTable(
  "posts", {
  id: text("id").primaryKey(),
  content: text("content").notNull(),
  authorId: text("author_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const postImages = pgTable("post_images", {
  id: text("id").primaryKey(),
  url: text("url").notNull(),
  postId: text("post_id").notNull().references(() => posts.id, { onDelete: 'cascade' }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const postsRelations = relations(posts, ({ many, one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id]
  }),
  comments: many(comments),
  likes: many(likes),
  images: many(postImages)
}))

export const likes = pgTable("likes", {
  id: text("id").primaryKey(),
  authorId: text("author_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  commentId: text("comment_id").references(() => comments.id, { onDelete: 'cascade' }),
  replyId: text("reply_id").references(() => replies.id, { onDelete: 'cascade' }),
  postId: text("post_id").references(() => posts.id, { onDelete: 'cascade' }),
  createdAt: timestamp("created_at").notNull().defaultNow()
})

export const likesRelations = relations(likes, ({ one }) => ({
  post: one(posts, {
    fields: [likes.postId],
    references: [posts.id]
  }),
  author: one(users, {
    fields: [likes.authorId],
    references: [users.id]
  }),
  comment: one(comments, {
    fields: [likes.commentId],
    references: [comments.id]
  }),
  reply: one(replies, {
    fields: [likes.replyId],
    references: [replies.id]
  })
}))

export const replies = pgTable("replies", {
  id: text("id").primaryKey(),
  content: text("content").notNull(),
  commentId: text("comment_id").references(() => comments.id, { onDelete: "set null" }),
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  replyId: text("reply_id").references((): AnyPgColumn => replies.id, { onDelete: 'set null' }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const repliesRelations = relations(replies, ({ many, one }) => ({
  likes: many(likes),
  replies: many(replies),
  comment: one(comments, {
    fields: [replies.commentId],
    references: [comments.id]
  })
}))

export const comments = pgTable("comments", {
  id: text("id").primaryKey(),
  content: text("content").notNull(),
  userId: text("user_id").references(() => users.id, { onDelete: 'set null' }),
  postId: text("post_id").notNull().references(() => posts.id, { onDelete: 'cascade' }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const commentsRelations = relations(comments, ({ many }) => ({
  replies: many(replies),
  likes: many(likes),
}))

export const messages = pgTable("messages", {
  id: text("id").primaryKey(),
  senderId: text("sender_id").references(() => users.id, { onDelete: 'set null' }),
  receiverId: text("receiver_id").references(() => users.id, { onDelete: 'set null' }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const messagesRelations = relations(messages, ({ one }) => ({
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
    relationName: 'sender'
  }),
  receiver: one(users, {
    fields: [messages.receiverId],
    references: [users.id],
    relationName: 'receiver'
  }),
}))

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
  })
)

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
)
