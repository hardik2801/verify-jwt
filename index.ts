import {sign, verify} from 'jsonwebtoken';
import * as bcrypt from "bcrypt";
import {error} from "util";

export class YapsodyAuth {

    private jwtSecret: string = process.env.JWT_SECRET || 'Yapsody_auth';

    static async comparePasswords(pass1: string | undefined, pass2: string | undefined): Promise<boolean> {
        if(pass1 && pass2) {
            return bcrypt.compare(pass1, pass2);
        } else {
            return false;
        }
    }

    public async verifyAccessToken(accessToken) {
        try {
            if(!accessToken)
                // throw new ValidationError('No Token Found');
                throw error('No Token Found');
           return verify(accessToken, this.jwtSecret, (err, decodedToken: any) => {
                if(!decodedToken) {
                    // throw new AuthError('Invalid Token');
                    console.log('token is not valid');
                    throw error('Invalid Token!!');
                }
                return decodedToken;
            });

        }
        catch (error) {
            // throw err
        }
    }

}