import { Type } from '@angular/core';
type Constuctor = { new (...args: any[]): any };

export function Interview<T extends Constuctor>(displayName?: string, description?: string, icon?: string, script?: string) {

  return (BaseClass: T) => {
    return class extends BaseClass {
      $metadata = {
        name: BaseClass.name,
        displayName,
        description,
        icon,
        script
      }
    };
  }

}
