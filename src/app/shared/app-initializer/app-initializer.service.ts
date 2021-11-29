import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable, InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAppExternalConfiguration } from 'functions/src/site/site.models';

export const baseUrl = environment.apiBaseUrl;
export const BASE_URL_TOKEN = new InjectionToken<string>(baseUrl);

export function initializerFactory(configRetriever: AppInitializerService): any {
    const promise = configRetriever.getConfiguration(baseUrl).then((value) => {
        console.log(`retrieved configuration => `, value);
    });
    return () => promise;
}


@Injectable({
    providedIn: 'root'
})
export class AppInitializerService {
    static configuration: IAppExternalConfiguration;
    private http: HttpClient;

    constructor(
      httpHandler: HttpBackend,
      ) {
        this.http = new HttpClient(httpHandler);
    }


    async getConfiguration(baseUrl: string) {
        const url = `${baseUrl}appConfiguration`;
        AppInitializerService.configuration = await this.http.get<IAppExternalConfiguration>(url).toPromise();
    }

}





export interface IPreviewFeature{
    id: string;
    displayName: string;
    status: PreviewFeatureStatusEnum;
    active: boolean;
}

export enum PreviewFeatureStatusEnum{
    Show = 'Show',
    Hide = 'Hide',
    Disable = 'Disable'
}
