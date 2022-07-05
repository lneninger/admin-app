export function Field(order: number, displayName?: string, description?: string, icon?: string, script?: string){

   return (target: any, memberName: string) => {
    target.$metadata = target.$metadata || {};
    target.$metadata.fields = target.$metadata.fields || [];

    target.$metadata.fields.push({
      name: memberName,
      order,
      displayName,
      description,
      icon,
      script
    });
  };
}
