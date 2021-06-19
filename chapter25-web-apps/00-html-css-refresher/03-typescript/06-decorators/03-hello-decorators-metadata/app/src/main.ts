/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';

function parameterDecorator(target: any, methodName: string, parameterIndex: number) {
  const designType = Reflect.getMetadata('design:type', target, methodName);
  const designParamTypes = Reflect.getMetadata('design:paramtypes', target, methodName);
  const designReturnType = Reflect.getMetadata('design:returntype', target, methodName);


  console.log(`design:type=`, designType);
  designParamTypes.forEach((designParamType: any, index: number) => {
    console.log(`[${index}]: ${designParamType.name}`);
  });
  console.log(`design:returntype=`, designReturnType.name);
}

class MyClassWithDecoratedParameter {
  print(@parameterDecorator message: string, num: number, bool: boolean): number {
    console.log(message);
    return message.length;
  }
}

