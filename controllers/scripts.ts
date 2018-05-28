import { Body, Method, MethodConfig, MethodType, Param, Response, Query, Verbs, MethodError, MethodResult } from '@methodus/server';



@MethodConfig('Api')
export class Scripts {
    @Method(Verbs.Get, '/scripts/list')
    public async list() {

        const { Client } = require('pg')
        const client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'skribo',
            password: '1234',
            port: 5432,
        })
        try{
            await client.connect()

            const res = await client.query('SELECT * FROM public.scripts ORDER BY "ID" ASC')
            console.log(res.rows[0].message) // Hello world!
            await client.end()
        }
        catch(error)
        {
            console.error(error);
        }
       

    }





}