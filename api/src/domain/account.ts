import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import {getUnixDate } from '../common/time';
const SALT = "123456";

export class Account {
    public id: string;
    public email: string;
    private passwordHash: string;
    private dateCreated: string;
    public lastLogin: string = '';

    constructor(id:string, email: string, passwordHash: string, dateCreated: string) {
        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
        if (passwordHash.length !== 128) {
            console.log('PasswordHash length is not 128!!!! remove this in produktive mode!');
            this.passwordHash = this.createPasswordHash(passwordHash, dateCreated);   
        }
        this.dateCreated = dateCreated;
    }
    ValidateJWT(token: string): boolean {
        try {
            jwt.verify(token, SALT);
            return true;
        } catch (error) {
            return false;
        }
    }
    CreateJWT(): string {
        var dateNow:string = getUnixDate();
        this.lastLogin = dateNow;
        const payload: jwt.JwtPayload = {
            id: this.id,
            email: this.email,
            iat: parseInt(dateNow)
        };
        const options:jwt.SignOptions = {
            algorithm: 'HS512',
            expiresIn: '1h'
        };
        const token = jwt.sign(payload, SALT, options);
        return token;
    }
    CreateAccount(email: string, password: string): Account {
        var dateCreated: string = getUnixDate();
        var passwordHash: string = this.createPasswordHash(password, dateCreated);
        var uuid = crypto.randomUUID();
        return new Account(uuid, email, passwordHash, dateCreated);
    }
    CheckPassword(password: string): boolean {
        var passwordHash: string = this.createPasswordHash(password, this.dateCreated);
        return passwordHash === this.passwordHash;
    }
    private createPasswordHash(password: string, dateCreated:string): string {
        var salt: string = SALT;
        var hash:crypto.Hmac = crypto.createHmac('sha512', salt);
        hash.update( password + dateCreated);
        return hash.digest('hex');
    }

    
}