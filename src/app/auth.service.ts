import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Http, Headers } from "@angular/http";

@Injectable()
export class AuthService {

    isAuthenticated: boolean = false;
    userId;

    constructor(private _router: Router, private _http: Http ){}

    obtainAccessToken(){

        var headers = new Headers();
/*        headers.append('Content-Type', 'application/json');
        headers.append('audience', 'https://api-sandbox.safetrek.io');
        headers.append('client_id', 'cC0Zc5YcCG5xp31RJ01W0jose3Y4hbg6');
        headers.append('response_type', 'code');
        headers.append('redirect_uri', 'localhost:4200');
        headers.append('scope', 'openid phone offline_access');
        headers.append('state', 'testing');*/

        return new Promise((resolve) => {
            this._http.get('https://account-sandbox.safetrek.io/authorize', {headers: headers}).subscribe((data) => {
                    if(data.json().success) {
                        this.saveToken(data);
                        this.isAuthenticated = true;
                    }
                    resolve(this.isAuthenticated);
                }
            )

        });

    }

    saveToken(token){
        var expireDate = new Date().getTime() + (1000 * token.expires_in);
        localStorage.setItem("access_token", JSON.stringify(token.access_token));
    }
/*
    getResource(resourceUrl) : Observable<any>{
        var headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Bearer '+ localStorage.getItem("access_token")});
        var options = new RequestOptions({ headers: headers });
        return this._http.get(resourceUrl, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }*/

    checkCredentials(){
        let storedToken:string = localStorage.getItem("access_token");
        if (!storedToken){
        }
    }

    logout() {
        localStorage.removeItem("access_token")
    }
}