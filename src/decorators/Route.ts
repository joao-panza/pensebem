type RequestMethods = 'get' | 'post';

interface RouteDefinition {
    path: string;
    requestMethod: RequestMethods;
    methodName: string;
}

export const routes: Array<RouteDefinition> = [];

export function Route(path: string, requestMethod: RequestMethods) {
    return function (target: any, propertyKey: string): void {
        routes.push({
            path,
            requestMethod,
            methodName: propertyKey
        });
    };
}