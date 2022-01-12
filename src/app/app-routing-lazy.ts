import { NgModuleFactory, Type } from '@angular/core';

export const LazyLoadedWidgets = {
    APP_SETTIGNS: 'settings',

    //#region Tasks
    TASK_SURVEY: 'tasks-survey'
    //#endregion

};

// This will create a dedicated JS bundle for lazy module
export const lazyWidgets: { path: string, loadChildren: () => Promise<NgModuleFactory<any> | Type<any>> }[] = [
    // Headers
    {
        path: LazyLoadedWidgets.APP_SETTIGNS,
        loadChildren: () => import('./main/options/app-settings/app-settings.module').then(m => m.AppSettingsModule),
    }

];

// This function will work as a factory for injecting lazy widget array in the main module
export function lazyArrayToObj() {
    const result = {};
    for (const w of lazyWidgets) {
        result[w.path] = w.loadChildren;
    }
    return result;
}
