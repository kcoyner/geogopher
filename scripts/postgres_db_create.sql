DROP TABLE IF EXISTS scores, users, games, polygons, polygon_types, polygon_regions, game_types, game_difficulties CASCADE;

CREATE TABLE "polygon_types" (
	"polygon_type_id" serial NOT NULL UNIQUE,
	"polygon_type_name" varchar NOT NULL,
	CONSTRAINT polygon_types_pk PRIMARY KEY ("polygon_type_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "polygon_regions" (
	"polygon_region_id" serial NOT NULL UNIQUE,
	"polygon_region_name" varchar NOT NULL,
	CONSTRAINT polygon_regions_pk PRIMARY KEY ("polygon_region_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "polygons" (
	"polygon_id" serial NOT NULL UNIQUE,
	-- in geojson this is the 'properties'
	-- value where the primaryName is specified
	"polygon_name" varchar NOT NULL,
	-- an array of all polygon coordinates
	"coordinates" varchar NOT NULL,
	-- object of different names and their categories
	"polygon_accepted_names" varchar NOT NULL,
	"polygon_type_id" integer NOT NULL REFERENCES polygon_types(polygon_type_id) on delete cascade,
	"polygon_region_id" integer NOT NULL REFERENCES polygon_regions(polygon_region_id),
	CONSTRAINT polygons_pk PRIMARY KEY ("polygon_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "games" (
	"game_id" serial NOT NULL UNIQUE,
	-- name of game, could be regions
	"game_name" varchar NOT NULL,
	-- description of game name
	"game_description" varchar NOT NULL,
	-- url for geojson
	"game_json" varchar NOT NULL,
	-- map init coords
	"game_center_coords" varchar NOT NULL,
	-- zoom level for the map on start
	"game_zoom" integer NOT NULL,
	"max_count_polygons" integer NOT NULL,
	-- base_time before difficulty settings are applied
	"base_time" integer NOT NULL,
	-- link to image thumbnail
	"img_asset" varchar NOT NULL,
	CONSTRAINT games_pk PRIMARY KEY ("game_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "game_types" (
	"game_type_id" serial NOT NULL UNIQUE,
	"game_type_name" varchar NOT NULL,
	"game_type_description" varchar NOT NULL,
	CONSTRAINT game_types_pk PRIMARY KEY ("game_type_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "game_difficulties" (
	"game_difficulty_id" serial NOT NULL UNIQUE,
	"game_difficulty_name" varchar NOT NULL,
	-- object with keys 'multiplier' and 'override'
	-- multiplier multiplies the base_time to get
	-- game_timer_start, or overrides completely
	"game_time_manipulation" varchar NOT NULL,
	CONSTRAINT game_difficulties_pk PRIMARY KEY ("game_difficulty_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "scores" (
	"score_id" serial NOT NULL UNIQUE,
	"user_id" integer NOT NULL,
	-- sum of polygons_answered and polygons_unanswered
	"count_polygons_entered" integer NOT NULL,
	-- total submissions including re-entry
	"count_total_submissions" integer NOT NULL,
	-- total hints used
	"count_total_hints" integer NOT NULL,
	-- array of polygon names
	"polygons_answered" varchar NOT NULL,
	-- array of polygon names left over.
	-- a player with all polygons answered will
	-- have an empty array
	"polygons_unanswered" varchar NOT NULL,
	-- array of polygon names skipped
	"polygons_skipped" varchar NOT NULL,
	-- array of unmatched entries
	"incorrect_entries" varchar NOT NULL,
	"game_id" integer NOT NULL,
	"game_type_id" integer NOT NULL,
	"game_difficulty_id" integer NOT NULL,
	-- initial time on timer after difficulty
	-- settings are made and before game
	-- starts
	"game_timer_start" integer NOT NULL,
	-- current value during game. this is 0
	-- for users who ran the clock to the end
	"game_timer_remaining" integer NOT NULL,
	"game_start_timestamp" TIMESTAMP WITH TIME ZONE,
	"game_end_timestamp" TIMESTAMP WITH TIME ZONE,
	"ip_where_game_played" varchar NOT NULL,
	CONSTRAINT scores_pk PRIMARY KEY ("score_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "users" (
	"user_id" serial NOT NULL UNIQUE,
	"google_id" varchar,
	"username" varchar,
	"password_hash" varchar,
	"password_salt" varchar,
	"count_games_played" integer,
	"last_login" TIMESTAMP WITH TIME ZONE,
	"is_first_login" BOOLEAN,
	"first_name" varchar,
	"last_name" varchar,
	"email" varchar,
	"user_ip" varchar,
	"token" varchar,
	CONSTRAINT users_pk PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "scores" ADD CONSTRAINT "scores_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("user_id");
ALTER TABLE "scores" ADD CONSTRAINT "scores_fk1" FOREIGN KEY ("game_id") REFERENCES "games"("game_id");
ALTER TABLE "scores" ADD CONSTRAINT "scores_fk2" FOREIGN KEY ("game_type_id") REFERENCES "game_types"("game_type_id");
ALTER TABLE "scores" ADD CONSTRAINT "scores_fk3" FOREIGN KEY ("game_difficulty_id") REFERENCES "game_difficulties"("game_difficulty_id");
