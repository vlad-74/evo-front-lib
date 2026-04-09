import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Config} from '../config';
import {RestServiceSearchRequestParams} from './interface/search-request-params.interface';

@Injectable({ providedIn: 'root'})
export class RestService {

    public prefix = 'ext/';

    public constructor(
        private http: HttpClient,
    ) {
    }

    public search<T>(collection: string, params?: RestServiceSearchRequestParams): Promise<T> {
        const url = Config.server + this.prefix + 'search/' + collection;

        if (!params) {
            params = { search: { search: [] } };
        }

        return this.http.post(url, params).toPromise().then(
            (response: any) => {
                return Promise.resolve(response);
            },
            (error) => {
                return Promise.reject(error);
            },
        );
    }



    public find<T>(collection: string, id: string, projection: string | null = null): Promise<T> {
        let url = Config.server + this.prefix + 'find/' + collection + '?mainId=' + id;

        if (projection) {
            url += '&prj=' + projection;
        }

        return this.http.get(url).toPromise().then(
            (response: any) => {
                return Promise.resolve(response);
            },
            (error) => {
                return Promise.reject(error);
            },
        );
    }

    public findAll<T>(collection: string, params?: RestServiceSearchRequestParams): Promise<T> {
        const url = Config.server + this.prefix + 'search/' + collection;

        if (!params) {
            params = { search: { search: [] } };
        }

        if (params && !params.size) {
            params.size = 20;
        }

        return this.http.post(url, params).toPromise().then(
            (response: any) => {
                if (response.numberOfElements !== response.totalElements) {
                    const promises = [];

                    for (let i = 1; i < response.totalPages; i++) {
                        promises.push(this.http.post(url, { ...params, page: i }).toPromise());
                    }

                    return Promise
                        .all(promises)
                        .then((responses: any[]) => {
                            responses.unshift(response);

                            return Promise.resolve(responses
                                .reduce((previousValue, currentItem) =>
                                    ([...previousValue, ...currentItem.content]), []));
                        });
                } else {
                    return Promise.resolve(response.content);
                }
            },
            (error) => {
                return Promise.reject(error);
            },
        );
    }
}
