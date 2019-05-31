export const DataScripts = [
    `
CREATE SEQUENCE public."scripts_ID_seq";
ALTER SEQUENCE public."scripts_ID_seq"
OWNER TO postgres;`,
    `
CREATE TABLE public.scripts
(
    "Name" character varying
    (1024) COLLATE pg_catalog."default",
    "ID" integer NOT NULL DEFAULT nextval('"scripts_ID_seq"'::regclass),
    "Description" character varying COLLATE pg_catalog."default",
    "Code" text COLLATE pg_catalog."default",
    "GroupId" character varying COLLATE pg_catalog."default",
    "ScriptId" character varying COLLATE pg_catalog."default",
    "ResultsDescriptor" json,
    "Variables" character varying[] COLLATE pg_catalog."default"
)
WITH (
OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.scripts
OWNER to postgres;`,
    `CREATE SEQUENCE public."groups_ID_seq";
ALTER SEQUENCE public."groups_ID_seq"
OWNER TO postgres;`,
    `CREATE TABLE public.groups(
"Name" character varying COLLATE pg_catalog."default",
"Date" date,
"Status" character varying COLLATE pg_catalog."default",
"GroupId" character varying COLLATE pg_catalog."default" NOT NULL,
"ID" integer NOT NULL DEFAULT nextval('"groups_ID_seq"'::regclass),
CONSTRAINT groups_pkey PRIMARY KEY ("ID"))
WITH (OIDS = FALSE)
TABLESPACE pg_default;

ALTER TABLE public.groups
OWNER to postgres;`,
    `CREATE SEQUENCE public."user_groups_ID_seq";
ALTER SEQUENCE public."user_groups_ID_seq"
OWNER TO postgres;`,
    `CREATE TABLE public.user_groups(
"ID" integer NOT NULL DEFAULT nextval('"user_groups_ID_seq"'::regclass),
"GroupId" character varying COLLATE pg_catalog."default",
"UserId" character varying COLLATE pg_catalog."default",
CONSTRAINT user_groups_pkey PRIMARY KEY ("ID"))
WITH (OIDS = FALSE)
TABLESPACE pg_default;

ALTER TABLE public.user_groups
OWNER to postgres;`,
    `CREATE SEQUENCE public."embeds_ID_seq";
ALTER SEQUENCE public."embeds_ID_seq"
OWNER TO postgres;`,
    `CREATE TABLE public.embeds(
"ID" integer NOT NULL DEFAULT nextval('"embeds_ID_seq"'::regclass),
"GroupId" character varying COLLATE pg_catalog."default",
"ScriptId" character varying COLLATE pg_catalog."default",
"Variables" character varying[] COLLATE pg_catalog."default",
"EmbedId" character varying COLLATE pg_catalog."default",
"Page" character varying COLLATE pg_catalog."default",
"Name" character varying COLLATE pg_catalog."default",
CONSTRAINT embeds_pkey PRIMARY KEY ("ID"))
WITH (OIDS = FALSE)
TABLESPACE pg_default;

ALTER TABLE public.embeds
OWNER to postgres;`,
    `CREATE SEQUENCE public."logs_ID_seq";
ALTER SEQUENCE public."logs_ID_seq"
OWNER TO postgres;`,
    `CREATE TABLE public.logs(
"ID" bigint NOT NULL DEFAULT nextval('"logs_ID_seq"'::regclass),
"Log" text COLLATE pg_catalog."default",
"ScriptId" character varying COLLATE pg_catalog."default",
"GroupId" character varying COLLATE pg_catalog."default",
"EmbedId" character varying COLLATE pg_catalog."default",
CONSTRAINT logs_pkey PRIMARY KEY ("ID"))
WITH (OIDS = FALSE)
TABLESPACE pg_default;

ALTER TABLE public.logs
OWNER to postgres;`,
    `CREATE SEQUENCE public."results_ID_seq";
ALTER SEQUENCE public."results_ID_seq"
OWNER TO postgres;`,
    `CREATE TABLE public.results(
"ScriptId" character varying COLLATE pg_catalog."default",
"GroupId" character varying COLLATE pg_catalog."default",
"EmbedId" character varying COLLATE pg_catalog."default",
"Date" date,
"Variables" character varying[] COLLATE pg_catalog."default",
"Data" text COLLATE pg_catalog."default",
"ID" bigint NOT NULL DEFAULT nextval('"results_ID_seq"'::regclass),
"ResultId" character varying COLLATE pg_catalog."default",
CONSTRAINT results_pkey PRIMARY KEY ("ID"))
WITH (    OIDS = FALSE)
TABLESPACE pg_default;

ALTER TABLE public.results
OWNER to postgres;`

]