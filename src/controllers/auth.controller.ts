
import { Body, Method, MethodConfig, Verbs, MethodError, MethodResult } from '@methodus/server';
import { Query as DataQuery, ReturnType } from '@methodus/data';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { UserModel } from '..';

// PRIVATE and PUBLIC key
const enum SignOptions {
    Issuer = 'Skribo Corp.',
    Subject = 'info@skribo.com',
    Audience = 'https://skribo.herokuapps.com',
}

// SIGNING OPTIONS
const signOptions = {
    algorithm: 'RS256',
    audience: SignOptions.Audience,
    expiresIn: '12h',
    issuer: SignOptions.Issuer,
    subject: SignOptions.Subject,
};

const privateKEY = fs.readFileSync('./certs/private.key', 'utf8');
const publicKEY = fs.readFileSync('./certs/public.key', 'utf8');

@MethodConfig('Auth')
export class Auth {
    @Method(Verbs.Post, '/api/auth/signup')
    public static async signup(@Body('userOptions') userOptions: any): Promise<MethodResult<any>> {
        try {
            const query = new DataQuery(UserModel);
            let logedInUser = null;
            if (userOptions.provider) {
                logedInUser = await query.filter({
                    Email: userOptions.email,
                }).run(ReturnType.Single);
            } else {
                logedInUser = await query.filter({
                    Email: userOptions.Email,
                }).run(ReturnType.Single);
            }
            if (logedInUser) {
                throw new MethodError(`USER_EXISTS`, 403);
            } else {
                if (userOptions.provider) {
                    userOptions.Email = userOptions.email;
                    delete userOptions.email;
                }
                // insert into user collection
                const result: any = await UserModel.insert(userOptions);


                const token = jwt.sign(result, privateKEY, signOptions);
                return new MethodResult({ token });
            }
        } catch (error) {
            throw new MethodError(error, 500);
        }
    }

    @Method(Verbs.Post, '/api/auth/token')
    public static async token(@Body('userOptions') userOptions: any): Promise<MethodResult<any>> {
        try {
            const token = jwt.sign(userOptions, privateKEY, signOptions);
            return new MethodResult({ token, user: userOptions });
        } catch (error) {
            throw new MethodError(error, 500);
        }
    }

    @Method(Verbs.Get, '/api/auth/verify')
    public static async verify(@Body('token') token: string): Promise<MethodResult<any>> {
        try {
            return new MethodResult(jwt.decode(token, { complete: true }));
        } catch (error) {
            throw new MethodError(error, 500);
        }
    }
}
