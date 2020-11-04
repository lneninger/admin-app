export class EnumItemTyped<T, V> {
    key: T;
    value: V;
    extras?: { [key: string]: any };
}

export class EnumItem<T> extends EnumItemTyped<T, string> {
}


export const yesNoItems: EnumItem<boolean>[] = [
    {
        key: true,
        value: 'Yes',
        extras: { id: 'Y' }
    },
    {
        key: false,
        value: 'No',
        extras: { id: 'N' }
    },
];

export interface LabelValueLowerGeneric<T> {
    label: string;
    value: T;
}

export interface LabelValueLower extends LabelValueLowerGeneric<string> {
}

export interface LabelValueUpperGeneric<T> {
    Label: string;
    Value: T;
}

export interface LabelValueUpper extends LabelValueUpperGeneric<string> {
}
