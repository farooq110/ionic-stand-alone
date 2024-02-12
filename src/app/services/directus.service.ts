import { Injectable } from '@angular/core';
import { LocalStoreService } from './local-store.service';
import { authentication, createDirectus, createItem, readItems, refresh, rest } from '@directus/sdk';
import { environment } from 'src/environments/environment';
import { jwtDecode } from "jwt-decode"

@Injectable({
  providedIn: 'root'
})
export class DirectusService {
  private client:any;
  private authKey= "auth"

  constructor(
    private ls:LocalStoreService,
  ) {
    this.client = createDirectus(environment.baseUrl).with(authentication('json')).with(rest());
  }

  async login(paylaod:any) {
    try {
      const auth = await this.client.login(paylaod.email, paylaod.password);
      this.ls.setItem(this.authKey, auth)
      await this.client.setToken(auth?.access_token)
      return auth
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async refresh() {
    try {
      const localeTokes = this.ls.getItem(this.authKey)
      const refreshToken = localeTokes.refresh_token
      // const decodedToken = jwtDecode(refreshToken);
      // console.log(decodedToken, "decodedToken");
      if(!refreshToken) return null
      const refreshTokens = await this.client.request(refresh("json",refreshToken));
      console.log(refreshTokens,"refresh")
      return refreshTokens;
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async logout() {
    try {
      this.ls.clear()
      return await this.client.logout();
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async getQuestion(){
    try {
      const collection:any= 'pulses?fields[]=questions.question_id.*.*.*'
      const tokens = this.ls.getItem(this.authKey)
      const accessToken = tokens.access_token
      await this.client.setToken(accessToken)
      const result = await this.client.request(readItems((collection as never)));
      const questions = result?.flatMap((item:any) => {
        return item.questions})
        console.log(questions)
        
      return questions
      // return data
    } catch (error) {
      console.log(error)
      return []
    }
  }

  async submitAnswers(payload:any){
    try {
      const insertionPromises: Promise<any>[] = [];
      const collection:any= 'answers'
      const tokens = this.ls.getItem(this.authKey)
      const accessToken = tokens.access_token
      await this.client.setToken(accessToken)
      payload.forEach((object:any) => {
        const insertionPromise = this.client.request(createItem((collection as never),(object as never)));
        insertionPromises.push(insertionPromise);
      });
      // const result = await this.client.request(createItem((collection as never),(payload as never)));
      const result = await Promise.all(insertionPromises)
      console.log(result)
      return result
    } catch (error) {
      console.log(error)
      return []
    }
  }

  isTokenExpired(){
    try {
      const currentDate = new Date()
      const tokens = this.ls.getItem(this.authKey)
      if(!tokens) return true
      const expiredAt = tokens.expired_at
      console.log(currentDate >=expiredAt, "check")
      if(currentDate >=expiredAt) return false
      return true
    } catch (error) {
      console.log(error)
      return true
    }
  }
  isLoggedin() {
    return !!this.ls.getItem(this.authKey);
  }
}
