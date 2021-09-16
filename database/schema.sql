set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"yearsExperience" integer,
	"sportTrainingFor" TEXT,
	"injuries" TEXT,
	"daysPerWeek" integer,
	"trainingDuration" TEXT,
	"prId" integer,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."prs" (
	"prId" serial NOT NULL,
	"weight" integer NOT NULL,
	"reps" integer NOT NULL,
	"userId" integer NOT NULL,
	"exerciseId" integer NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."trainingLog" (
	"userId" integer NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"sets" json NOT NULL,
	"exerciseId" integer NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."exerciseList" (
	"exerciseId" serial NOT NULL,
	"exercise" TEXT NOT NULL UNIQUE,
	"description" TEXT,
	"videoPath" TEXT,
	CONSTRAINT "exerciseList_pk" PRIMARY KEY ("exerciseId")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("prId") REFERENCES "prs"("prId");

ALTER TABLE "prs" ADD CONSTRAINT "prs_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "prs" ADD CONSTRAINT "prs_fk1" FOREIGN KEY ("exerciseId") REFERENCES "exerciseList"("exerciseId");

ALTER TABLE "trainingLog" ADD CONSTRAINT "trainingLog_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "trainingLog" ADD CONSTRAINT "trainingLog_fk1" FOREIGN KEY ("exerciseId") REFERENCES "exerciseList"("exerciseId");
