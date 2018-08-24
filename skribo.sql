

-- SEQUENCE: public."embeds_ID_seq"

-- DROP SEQUENCE public."embeds_ID_seq";

CREATE SEQUENCE public."embeds_ID_seq";

ALTER SEQUENCE public."embeds_ID_seq"
    OWNER TO postgres;
    
     -- Table: public.embeds

-- DROP TABLE public.embeds;

CREATE TABLE public.embeds
(
    "ID" integer NOT NULL DEFAULT nextval('"embeds_ID_seq"'::regclass),
    "GroupId" character varying COLLATE pg_catalog."default",
    "ScriptId" character varying COLLATE pg_catalog."default",
    "Variables" character varying COLLATE pg_catalog."default",
    "EmbedId" character varying COLLATE pg_catalog."default",
    "Name" character varying COLLATE pg_catalog."default",
    "Page" character varying COLLATE pg_catalog."default",
    CONSTRAINT embeds_pkey PRIMARY KEY ("ID")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.embeds
    OWNER to postgres;

ALTER TABLE public.embeds
    OWNER to postgres;
    
-- SEQUENCE: public."user_groups_ID_seq"

-- DROP SEQUENCE public."user_groups_ID_seq";

CREATE SEQUENCE public."user_groups_ID_seq";

ALTER SEQUENCE public."user_groups_ID_seq"
    OWNER TO postgres;
    
    
    
-- Table: public.user_groups

-- DROP TABLE public.user_groups;

CREATE TABLE public.user_groups
(
    "ID" integer NOT NULL DEFAULT nextval('"user_groups_ID_seq"'::regclass),
    "GroupId" character varying COLLATE pg_catalog."default",
    "UserId" character varying COLLATE pg_catalog."default",
    CONSTRAINT user_groups_pkey PRIMARY KEY ("ID")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.user_groups
    OWNER to postgres;