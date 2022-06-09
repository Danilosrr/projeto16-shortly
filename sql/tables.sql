CREATE TABLE "users" (
	"id" serial NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"name" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"usersId" int NOT NULL,
	"token" TEXT NOT NULL UNIQUE,
	"createdAt" timestamp with time zone NOT NULL DEFAULT NOW(),
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "shortenedUrls" (
	"id" serial NOT NULL,
	"usersId" int NOT NULL,
	"url" TEXT NOT NULL,
	"shortUrl" TEXT NOT NULL UNIQUE,
	"createdAt" timestamp with time zone NOT NULL DEFAULT NOW(),
	"views" INT NOT NULL DEFAULT 0
	CONSTRAINT "shortenedUrls_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("usersId") REFERENCES "users"("id");

ALTER TABLE "shortenedUrls" ADD CONSTRAINT "shortenedUrls_fk0" FOREIGN KEY ("usersId") REFERENCES "users"("id");




