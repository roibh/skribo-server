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