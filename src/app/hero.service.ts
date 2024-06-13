import { Injectable } from '@angular/core';

import { Observable, catchError, of, tap } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

	private heroesUrl = 'api/heroes';  // Web APIのURL

  constructor(private http: HttpClient,
  private messageService: MessageService) { }

	/** サーバーからヒーローを取得する */
	getHeroes(): Observable<Hero[]> {
		return this.http.get<Hero[]>(this.heroesUrl)
			.pipe(
				tap(heroes => this.log('fetched heroes')),
				catchError(this.handleError<Hero[]>('getHeroes', []))
			);
	}

  /** IDによりヒーローを取得する。見つからなかった場合は404を返却する。 */
	getHero(id: number): Observable<Hero> {
		const url = `${this.heroesUrl}/${id}`;
		return this.http.get<Hero>(url).pipe(
			tap(_ => this.log(`fetched hero id=${id}`)),
			catchError(this.handleError<Hero>(`getHero id=${id}`))
		);
	}

	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

	/** PUT: サーバー上でヒーローを更新 */
	updateHero(hero: Hero): Observable<any> {
		return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
			tap(_ => this.log(`updated hero id=${hero.id}`)),
			catchError(this.handleError<any>('updateHero'))
		);
	}

	/** POST: サーバーに新しいヒーローを登録する */
	addHero(hero: Hero): Observable<Hero> {
		return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
			tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
			catchError(this.handleError<Hero>('addHero'))
		);
	}

	/** DELETE: サーバーからヒーローを削除 */
	deleteHero(id: number): Observable<Hero> {
		const url = `${this.heroesUrl}/${id}`;
		return this.http.delete<Hero>(url, this.httpOptions).pipe(
			tap(_ => this.log(`deleted hero id=${id}`)),
			catchError(this.handleError<Hero>('deleteHero'))
		);
	}

	/** HeroServiceのメッセージをMessageServiceを使って記録 */
	private log(message: string) {
		this.messageService.add(`HeroService: ${message}`);
	}

	/**
 * 失敗したHttp操作を処理します。
 * アプリを持続させます。
 *
 * @param operation - 失敗した操作の名前
 * @param result - observableな結果として返す任意の値
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: リモート上のロギング基盤にエラーを送信する
    console.error(error); // かわりにconsoleに出力

    // TODO: ユーザーへの開示のためにエラーの変換処理を改善する
    this.log(`${operation} failed: ${error.message}`);

    // 空の結果を返して、アプリを持続可能にする
    return of(result as T);
  };
}

}
