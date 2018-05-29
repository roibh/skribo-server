import { Body, Method, MethodConfig, MethodType, Param, Response, Query, Verbs, MethodError, MethodResult } from '@methodus/server';

import { DB } from '../db';
import { Script } from '../models/script.model';

@MethodConfig('Scripts')
export class Scripts {


    @Method(Verbs.Get, '/scripts/list')
    public static async list() {


        try {
            const client = await DB();
            const res = await client.query('SELECT * FROM public.scripts ORDER BY "ID" ASC');
            if (res.rows) {
                console.log(res.rows[0].message) // Hello world!
            }
            return new MethodResult(res.rows);
            // await client.end()
        }
        catch (error) {
            console.error(error);
        }


    }


    @Method(Verbs.Get, '/scripts/:id')
    public static async get(@Param() id: any) {
        const client = await DB();


        try {
            await client.connect()
            const script: Script = await client.query('SSELECT * FROM public.scripts WHERE "ID"=$1', [id]);
            return new MethodResult(script);

        }
        catch (error) {
            console.error(error);
        }


    }
    @Method(Verbs.Post, '/scripts/')
    public static async create(@Body() script: Script) {
        const client = await DB();
        if (!script.Variables)
            script.Variables = {};

        try {
            await client.connect()
            const id = await client.query('INSERT INTO public.scripts("Name", "Code", "Variables", "Decription") VALUES($1,$2,$3) RETURNING "ID"', [script.name, script.code, script.variables, script.Decription])
            await client.end()
        }
        catch (error) {
            console.error(error);
        }


    }


}