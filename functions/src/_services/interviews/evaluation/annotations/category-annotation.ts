
export function Category<T extends {new(...args:any[]):{}}>(type: T, order: number, displayName?: string){
   return (target: any, memberName: string) => {

     const currentValue = target[memberName];
     if(!currentValue?.constructor?.name){
       target[memberName] = new type();
       Object.assign(target[memberName], currentValue);
     }

      target.$categories = target.$categories || [];
      target.$categories.push({
       index: order,
       member: memberName,
       type: target[memberName].constructor?.name,
       displayName: displayName
     });

    Object.defineProperty(target, memberName, {
      // setter
    set: (value) => {
      const $category = target.$categories.find(i => i.member === memberName);
      console.log('$category => ', $category)
      $category.value = new type();
      Object.assign($category.value, value);
    },
    // getter
    get: () => {
      const $category = target.$categories.find(i => i.member === memberName);
      return $category.value;
    }
    });
  };
}
