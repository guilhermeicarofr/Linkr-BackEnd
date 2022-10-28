CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" varchar(50) NOT NULL UNIQUE,
	"email" varchar(100) NOT NULL UNIQUE,
	"password" varchar(250) NOT NULL,
	"picture" varchar(255) NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
	"deletedAt" TIMESTAMP DEFAULT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "hashtags" (
	"id" serial NOT NULL,
	"name" varchar(100) NOT NULL UNIQUE,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
	"deletedAt" TIMESTAMP DEFAULT NULL,
	CONSTRAINT "hashtags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "posts" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"url" varchar(255) NOT NULL,
	"description" varchar(250) NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
	"deletedAt" TIMESTAMP DEFAULT NULL,
	CONSTRAINT "posts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "likes" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"postId" integer NOT NULL,
	CONSTRAINT "likes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "postsHashtags" (
	"id" serial NOT NULL,
	"hashtagId" integer NOT NULL,
	"postId" integer NOT NULL,
	CONSTRAINT "postsHashtags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "follows" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"followedBy" integer NOT NULL,
	CONSTRAINT "follows_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "comments" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"postId" integer NOT NULL,
	"comment" varchar(250) NOT NULL,
	CONSTRAINT "comments_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "share" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"postId" integer NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
	"deletedAt" TIMESTAMP DEFAULT NULL,
	CONSTRAINT "share_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "likes" ADD CONSTRAINT "likes_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "likes" ADD CONSTRAINT "likes_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("id");

ALTER TABLE "postsHashtags" ADD CONSTRAINT "postsHashtags_fk0" FOREIGN KEY ("hashtagId") REFERENCES "hashtags"("id");
ALTER TABLE "postsHashtags" ADD CONSTRAINT "postsHashtags_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("id");

ALTER TABLE "follows" ADD CONSTRAINT "follows_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "follows" ADD CONSTRAINT "follows_fk1" FOREIGN KEY ("followedBy") REFERENCES "users"("id");

ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("id");

ALTER TABLE "share" ADD CONSTRAINT "share_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "share" ADD CONSTRAINT "share_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("id");


