import { debounceTime } from 'rxjs/operators';
import { Injectable, Type } from '@angular/core';
import { FormGroup, Validators, AbstractControl, AbstractControlOptions } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InterviewManager } from './interview.manager';
import { IFieldMetadata, IVariable, Variable } from './interview.models';
import { Utilities } from 'src/app/shared/common/utilities';
import { UtilitiesDate } from 'src/app/shared/common/utilities.date';
import { TemplateService } from './template.service';
import { CustomValidators } from 'ngx-custom-validators';

export interface ITemplateHandler {
    formControl: AbstractControl;
    interviewManager: InterviewManager;
    subscriptions: Subscription[];
    variable: IVariable;
    name: string;

    createReactiveControlWithInternals(forceListeners?: boolean);

    createReactiveControl(form: FormGroup, templateService: TemplateService, setValueChangedEvent?: boolean);
    buildInitialFormControlValue();
    setVariableValue();
    clearVariableValue();

    setOnChangeEvent(formControl: AbstractControl, templateService: TemplateService): void;
    getDisplayValueForGrid(item: any): any;
    getValue(item: any): any;
    getDisplayValue(item: any): any;
    dispose(): void;
}

export abstract class BaseHandler implements ITemplateHandler {
    interviewManager: InterviewManager;
    name: string;
    variable: IVariable;
    formControl: AbstractControl;
    subscriptions: Subscription[] = [];
    typedValue: boolean;

    setOnChangeEventWithInternals(): void {
        this.setOnChangeEvent(this.formControl, this.interviewManager.templateService);
    }

    setOnChangeEvent(formControl: AbstractControl, templateService: TemplateService): void {
        const subscription = formControl.valueChanges.pipe(debounceTime(750)).subscribe(value => {
            this.setVariableValue();
            this.interviewManager.templateService.onValueChanged.next(this);
        });

        this.subscriptions.push(subscription);
    }


    setVariableValue() {
        // debugger;
        const keyField = this.variable.displayMetadata && this.variable.displayMetadata.templateData && this.variable.displayMetadata.templateData.keyField;
        if (keyField && this.formControl.value) {
            const keyFieldCamelCase = Utilities.getVariableCaseInsensitive(this.formControl.value, keyField);
            this.variable.value = this.formControl.value[keyFieldCamelCase];
        } else {
            this.variable.value = this.formControl.value;
        }
    }

    clearVariableValue() {
        this.variable.value = null;
        this.formControl.reset();
    }

    setInitialFormControlValue() {

    }


    createReactiveControlWithInternals(forceListeners = true) {
        //console.log(`${this.variable.name}: Dependencies(${this.variable.dependencies.length})`)
        this.createReactiveControl(this.interviewManager.interviewContext.form, this.interviewManager.templateService, ((forceListeners && this.variable.hasDependencies) || this.variable.forcePostback));
    }

    buildInitialFormControlValue() {
        return this.variable.value;
    }

    createReactiveControl(form: FormGroup, templateService: TemplateService, setValueChangedEvent: boolean = true) {
        const controlValue = this.buildInitialFormControlValue();
        this.formControl = templateService.fmBuilder.control(controlValue/*, {updateOn: 'blur'} as AbstractControlOptions*/);
        form.addControl(this.variable.name, this.formControl);

        this.setValidators(form.controls[this.variable.name]);

        if (setValueChangedEvent) {
            this.setVariableValue();
            this.setOnChangeEvent(form.controls[this.variable.name], templateService);
        }
    }
    protected setValidators(formControl: AbstractControl) { }

    protected setValidatorsWithInternals() {
        this.setValidators(this.formControl);
    }

    getDisplayValueForGrid(item: any): any {
        return (item && (item[Object.getOwnPropertyNames(item).find(itemName => Utilities.camelize(itemName) === Utilities.camelize(this.variable.name))])) || (this.variable.value);
    }

    getValue(item: any): any {
        if (item) {
            return item[Utilities.getVariableCaseInsensitive(item, this.variable.name)];
        } else {
            return this.formControl.value;
        }
    }

    getDisplayValue(item: any): any {
        if (item) {
            return item[Utilities.getVariableCaseInsensitive(item, this.variable.name)];
        } else {
            return this.variable.value;
        }
    }


    dispose(): void {
        // clean variable's handler subscriptions
        this.subscriptions.forEach(subscription => {
            if (!subscription.closed) {
                subscription.unsubscribe();
                subscription = null;
            }
        });

        if (this.formControl) {
            this.formControl.clearValidators();
            this.formControl.clearAsyncValidators();
        }

    }

}


export class SingleSelectHandler extends BaseHandler {
    get keyField() {
        const templateData = this.variable.displayMetadata.templateData;
        const firstItem = (templateData.list || templateData.List)[0];
        return Utilities.getVariableCaseInsensitive(firstItem, templateData.keyField || templateData.KeyField);
    }



    buildInitialFormControlValue() {
        const metadata = this.variable.displayMetadata;
        if (metadata.templateData) {
            if (this.variable.value != null) {
                const list = (metadata.templateData.list || metadata.templateData.List) as any[];
                return list.find(item => item[this.keyField] === this.variable.value) || this.variable.value;
            } else {
                return null;
            }
        }

        // debugger;
        return this.variable.value;
    }

    createReactiveControl(form: FormGroup, templateService: TemplateService, setValueChangedEvent: boolean = true) {
        const controlValue = this.buildInitialFormControlValue();

        this.formControl = templateService.fmBuilder.control(controlValue);
        form.addControl(this.variable.name, this.formControl);

        if (setValueChangedEvent) {
            this.setOnChangeEvent(form.controls[this.variable.name], templateService);
            this.setVariableValue();
        }
    }

    getValue(item: any): any {
        if (item) {
            const wrapperValue = item[Utilities.getVariableCaseInsensitive(item, this.variable.name)];
            const variableName = Utilities.getVariableCaseInsensitive(item, this.variable.name);
            const propertyName = Utilities.getVariableCaseInsensitive(item[variableName], this.variable.displayMetadata.templateData.keyField);

            let result = wrapperValue;
            if (wrapperValue && propertyName) {
                result = wrapperValue[propertyName];
            }

            return result;
        } else {
            const result = this.formControl.value;
            return result != null ? result[this.keyField] : result;
        }
    }

    getDisplayValue(item: any): any {
        const tempData = this.variable.displayMetadata.templateData;
        if (tempData && tempData.keyField) {
            if (item) {
                const wrapperValue = item[Utilities.getVariableCaseInsensitive(item, this.variable.name)];
                const variableName = Utilities.getVariableCaseInsensitive(item, this.variable.name);
                const propertyName = Utilities.getVariableCaseInsensitive(item[variableName], this.variable.displayMetadata.templateData.keyField);

                let result = wrapperValue;
                if (wrapperValue && propertyName) {
                    result = wrapperValue[propertyName];
                }

                return result;
            } else {
                const result = this.variable.value;
                return result != null ? result[this.keyField] : result;
            }
        } else {
            return tempData;
        }
    }
}


export class MultiSelectHandler extends SingleSelectHandler {


    setVariableValue() {
        const keyField = Utilities.camelize(this.variable.displayMetadata && this.variable.displayMetadata.templateData && this.variable.displayMetadata.templateData.keyField);
        this.variable.value = keyField ? (this.formControl.value && (this.formControl.value as any[]).map(selectedItem => selectedItem[keyField])) : this.formControl.value;
    }

    getValue(item: any): any {
        // debugger;
        if (item) {
            const wrapperValue = item[Utilities.getVariableCaseInsensitive(item, this.variable.name)];
            const variableName = Utilities.getVariableCaseInsensitive(item, this.variable.name);
            const propertyName = Utilities.getVariableCaseInsensitive(item[variableName], this.variable.displayMetadata.templateData.keyField);

            let result = wrapperValue;
            if (wrapperValue && propertyName) {
                result = wrapperValue[propertyName];
            }

            return result;
        } else {
            const result = this.formControl.value;
            return result != null ? result.map(selectionItem => selectionItem[this.keyField]) : result;
        }
    }

    getDisplayValue(item: any): any {
        const tempData = this.variable.displayMetadata.templateData;
        if (tempData && tempData.keyField) {
            if (item) {
                const wrapperValue = item[Utilities.getVariableCaseInsensitive(item, this.variable.name)];
                const variableName = Utilities.getVariableCaseInsensitive(item, this.variable.name);
                const propertyName = Utilities.getVariableCaseInsensitive(item[variableName], this.variable.displayMetadata.templateData.keyField);

                let result = wrapperValue;
                if (wrapperValue && propertyName) {
                    result = wrapperValue[propertyName];
                }

                return result;
            } else {
                const result = this.variable.value;
                return result != null ? result.map(selectionItem => selectionItem[this.keyField]) : result;
            }
        } else {
            return tempData;
        }
    }
}

export class ButtonGroupHandler extends BaseHandler {

    get keyField() {
        const templateData = this.variable.displayMetadata.templateData;
        const firstItem = (templateData.list || templateData.List)[0];
        return Utilities.getVariableCaseInsensitive(firstItem, templateData.keyField || templateData.KeyField);
    }

    get displayField() {
        const templateData = this.variable.displayMetadata.templateData;
        const firstItem = (templateData.list || templateData.List)[0];
        return Utilities.getVariableCaseInsensitive(firstItem, templateData.displayField || templateData.DisplayField);
    }

    buildInitialFormControlValue() {
        const metadata = this.variable.displayMetadata;
        if (metadata.templateData) {
            return this.variable.value != null ? ((metadata.templateData.list || metadata.templateData.List) as any[]).find(item => item[this.keyField] === this.variable.value) || this.variable.value : null;
        }

        return this.variable.value;
    }

    createReactiveControl(form: FormGroup, templateService: TemplateService, setValueChangedEvent: boolean = true) {

        // format fields
        this.formatTemplateData();

        const controlValue = this.buildInitialFormControlValue();

        this.formControl = templateService.fmBuilder.control(controlValue);
        form.addControl(this.variable.name, this.formControl);

        if (setValueChangedEvent) {
            this.setOnChangeEvent(form.controls[this.variable.name], templateService);
            this.setVariableValue();
        }
    }

    formatTemplateData() {
        const templateData = this.variable.displayMetadata && this.variable.displayMetadata.templateData;
        if (!Object.getOwnPropertyNames(templateData).find(prop => prop === 'keyField')) {
            templateData.keyField = templateData.KeyField;
            templateData.displayField = templateData.DisplayField;
            templateData.list = templateData.List;
            if (templateData.list.length > 0) {
                (templateData.list as any[]).forEach(item => {
                    item[Utilities.camelize(templateData.keyField)] = item[templateData.KeyField];
                    item[Utilities.camelize(templateData.displayField)] = item[templateData.DisplayField];
                });
            }
        }
    }

    getDisplayValueForGrid(item: any): any {
        const variableName = Utilities.getVariableCaseInsensitive(item, this.variable.name);
        const value = item[variableName];
        const templateData = this.variable.displayMetadata.templateData;

        if (value == null) {
            return null;
        } else {
            let itemValue = null;
            if (value[this.displayField]) {
                itemValue = value[this.displayField];
            }

            if (itemValue == null) {
                return ((templateData.list || templateData.List) as any[]).find(listItem => listItem[this.keyField] === value)[this.displayField];
            } else {
                return itemValue;
            }
        }
    }

    getValue(item: any): any {
        if (item) {
            const wrapperValue = item[Utilities.getVariableCaseInsensitive(item, this.variable.name)];
            const variableName = Utilities.getVariableCaseInsensitive(item, this.variable.name);
            const propertyName = Utilities.getVariableCaseInsensitive(item[variableName], this.variable.displayMetadata.templateData.keyField);

            let result = wrapperValue;
            if (wrapperValue && propertyName) {
                result = wrapperValue[propertyName];
            }

            return result;
        } else {
            const result = this.formControl.value;
            return result != null ? result[this.keyField] : result;
        }
    }

    getDisplayValue(item: any): any {
        const tempData = this.variable.displayMetadata.templateData;
        if (tempData && tempData.keyField) {
            let tempValue = null;
            if (item) {
                const wrapperValue = item[Utilities.getVariableCaseInsensitive(item, this.variable.name)];
                const variableName = Utilities.getVariableCaseInsensitive(item, this.variable.name);
                const propertyName = Utilities.getVariableCaseInsensitive(item[variableName], this.variable.displayMetadata.templateData.keyField);

                tempValue = wrapperValue;
                if (wrapperValue && propertyName) {
                    tempValue = wrapperValue[propertyName];
                }


            } else {
                // debugger;
                tempValue = this.variable.value;

            }

            if (tempValue != null) {

                const keyField = this.variable.displayMetadata.templateData.keyField;
                const matchItem = this.variable.displayMetadata.templateData.list.find(listItem => listItem[Utilities.getVariableCaseInsensitive(listItem, keyField)] == tempValue);
                if (matchItem) {
                    const displayField = this.variable.displayMetadata.templateData.displayField;
                    return matchItem[Utilities.getVariableCaseInsensitive(matchItem, displayField)];
                }

            }

            return 'N/A';
        } else {
            return tempData;
        }
    }
}

export class BooleanHandler extends ButtonGroupHandler {
    getTypes() {
        return [
            { label: 'Yes', value: true, icon: 'pi pi-check' },
            { label: 'No', value: false, icon: 'pi-times' },
        ];
    }

    formatTemplateData() {
        // debugger;
        const templateData = this.variable.displayMetadata && this.variable.displayMetadata.templateData;

        if (templateData) {
            templateData.keyField = 'value';
            templateData.displayField = 'label';
            templateData.list = this.getTypes();
        }
    }

    getDisplayValue(item: any): any {
        let tempResult: any;
        if (item) {
            const wrapperValue = item[Utilities.getVariableCaseInsensitive(item, this.variable.name)];
            const variableName = Utilities.getVariableCaseInsensitive(item, this.variable.name);
            const propertyName = Utilities.getVariableCaseInsensitive(item[variableName], this.variable.displayMetadata.templateData.keyField);

            tempResult = wrapperValue;
            if (wrapperValue && propertyName) {
                tempResult = wrapperValue[propertyName];
            }

        } else {
            tempResult = this.variable.value;
        }

        return tempResult ? 'Yes' : 'No';
    }
}


export class NullableBooleanHandler extends BooleanHandler {
    getTypes() {
        return [
            // { label: 'None', value: null, icon: null },
            { label: 'Yes', value: true, icon: 'pi pi-check' },
            { label: 'No', value: false, icon: 'pi-times' },
        ];
    }

    getDisplayValue(item: any): any {
        let tempResult: any;
        if (item) {
            const wrapperValue = item[Utilities.getVariableCaseInsensitive(item, this.variable.name)];
            const variableName = Utilities.getVariableCaseInsensitive(item, this.variable.name);
            const propertyName = Utilities.getVariableCaseInsensitive(item[variableName], this.variable.displayMetadata.templateData.keyField);

            tempResult = wrapperValue;
            if (wrapperValue && propertyName) {
                tempResult = wrapperValue[propertyName];
            }

        } else {
            tempResult = this.variable.value;
        }

        if (tempResult === true) {
            return 'Yes';
        } else if (tempResult === false) {
            return 'No';
        } else {
            return 'N/A';
        }
    }

}

export class CalendarHandler extends BaseHandler {
    formatValue(value: string) {
        if (!value) {
            return null;
        }

        // debugger;
        const date = UtilitiesDate.formatDate(value);
        return date;
        // return moment(value).format('MM/DD/YYYY');
    }

    setValue() {
        const originalValue = this.formControl.value;
        const formattedValue = originalValue && this.formatValue(originalValue);
        this.variable.value = formattedValue;
    }

    createReactiveControl(form: FormGroup, templateService: TemplateService, setValueChangedEvent: boolean = true) {

        const controlValue = this.formatValue(this.buildInitialFormControlValue());

        // debugger;
        this.formControl = templateService.fmBuilder.control(controlValue);
        form.addControl(this.variable.name, this.formControl);

        if (setValueChangedEvent) {
            this.setOnChangeEvent(form.controls[this.variable.name], templateService);
            this.setVariableValue();
        }
    }

    getDisplayValueForGrid(item: any): any {
        const value = item[this.variable.name] || item[this.variable.displayName];
        return value == null ? null : this.formatValue(value);
    }

    getDisplayValue(item: any): any {
        if (item) {
            return item[Utilities.getVariableCaseInsensitive(item, this.variable.name)];
        } else {
            // debugger;
            return UtilitiesDate.formatDate(this.variable.value, 'MM/dd/yyyy');
        }
    }
}

export class InputHandler extends BaseHandler {

    constructor() {
        super();
        this.typedValue = true;
    }

}

export class CheckboxHandler extends BaseHandler {

}

export class TriStateCheckboxHandler extends BaseHandler {

}


export class SliderHandler extends BaseHandler {

    constructor() {
        super();
        this.typedValue = true;
    }

    setValidators(formControl: AbstractControl) {
        formControl.setValidators(Validators.compose([CustomValidators.min(0)]));
    }

}

export class ScriptHandler extends BaseHandler {

    setValidators(formControl: AbstractControl) {
    }

}

export class VariableSpecificHandler extends BaseHandler {

    setValidators(formControl: AbstractControl) {
    }

}



export class DataGridHandler extends BaseHandler {
    setVariableValue() {
        const currentValue = this.formControl.value;
        let result: any[] = [];
        const recordVariables = (this as any).fieldVariables as IVariable[];
        if (!recordVariables) {
            result = currentValue;
        } else {
            result = currentValue && (currentValue as any[]).map(record => {
                const recordResult = {} as any;
                recordVariables.forEach(fieldVariable => {
                    recordResult[fieldVariable.name] = fieldVariable.displayMetadata.handler.getValue(record);
                });

                return recordResult;
            });

        }

        this.variable.value = result;
    }

    createReactiveControl(form: FormGroup, templateService: TemplateService, setValueChangedEvent: boolean = true) {
        const controlValue = this.buildInitialFormControlValue();

        this.formControl = templateService.fmBuilder.control(controlValue);
        form.addControl(this.variable.name, this.formControl);

        if (setValueChangedEvent) {
            this.setOnChangeEvent(form.controls[this.variable.name], templateService);
            this.setVariableValue();
        }
    }

    getValue(item: any): any {
        // debugger;
        const formFields = this.createFormFields();
        const array: any[] = item ? [item] : (this.variable.value || []);

        const valueMapping = array.map(arrayItem => {
            const itemResult = {};
            formFields.forEach(formField => {
                itemResult[formField.name] = formField.displayMetadata.handler.getValue(arrayItem);
            });

            return itemResult;
        });

        formFields.forEach(field => field.displayMetadata.handler.dispose());

        return item ? valueMapping[0] : valueMapping;
    }



    createFormFields(): IVariable[] {
        const fields = this.variable.displayMetadata.templateData.formFields as IFieldMetadata[];
        const result = fields.map(field => {
            const variable = ({
                order: field.order,
                name: Utilities.camelize(field.propertyName),
                categoryName: null,
                display: true,
                displayMetadata: {
                    template: field.template,
                    templateData: field.templateData,
                },
                displayName: field.displayName
            } as IVariable);

            return new Variable(variable, this.variable.displayMetadata.handler.interviewManager);
        });

        return result;
    }

    getDisplayValue(item: any): any {
        let tempValue: any[] = null;
        if (item) {
            tempValue = item[Utilities.getVariableCaseInsensitive(item, this.variable.name)];
        } else {
            // debugger;
            tempValue = this.variable.value;
        }

        if (tempValue) {
            return `List of ${tempValue.length} items`;
        } else {
            return 'N/A';
        }
    }
}

@Injectable({ providedIn: 'root' })
export class TemplateFactoryService {

    static TemplateMapping: { [key: string]: Type<ITemplateHandler> } = {
        buttongroup: ButtonGroupHandler,
        grid: DataGridHandler,
        numeric: SliderHandler,
        input: InputHandler,
        singleselect: SingleSelectHandler,
        multiselect: MultiSelectHandler,
        multiselectlist: MultiSelectHandler,
        slider: SliderHandler,
        datetime: CalendarHandler,
        boolean: BooleanHandler,
        nullableboolean: NullableBooleanHandler,
        variablespecific: VariableSpecificHandler,
        script: ScriptHandler
    };

    constructor() { }


    static buildTemplateHandler(variable: IVariable, interviewManager: InterviewManager) {
        let template = variable.displayMetadata && variable.displayMetadata.template;
        template = (template || 'input').toLowerCase();
        const handlerType = TemplateFactoryService.TemplateMapping[template];
        const instance = new handlerType();
        instance.variable = variable;
        instance.interviewManager = interviewManager;

        return instance;
    }

    buildTemplate(variable: IVariable, interviewManager: InterviewManager) {
        return TemplateFactoryService.buildTemplateHandler(variable, interviewManager);
    }
}

