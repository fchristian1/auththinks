import crypto from 'crypto';
import {getUnixDate } from '../common/time';
const SALT = "123456";

export class Account {
    public id: string;
    public email: string;
    private passwordHash: string;
    private dateCreated: string

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