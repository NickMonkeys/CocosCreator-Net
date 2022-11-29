type BaseType = number|string|boolean;
type BaseMap = {[key: string]: BaseType};
type StringMap = {[key: string]: string};

enum HttpMethod {
    Get = 'GET',
    Post = 'POST',
}

type HttpParams = {
    url: string,
    onResponse: (code: number, data: any) => void,
    payload?: BaseMap,  // 请求参数
    timeout?: number,   // 超时时间
    header?: StringMap, // http请求头
}

export default class Http {
    public static Method = HttpMethod;

    public static post(params: HttpParams) {
        new Http(HttpMethod.Post, params);
    }

    public static get(params: HttpParams) {
        new Http(HttpMethod.Get, params);
    }

    private xhr: XMLHttpRequest = null;
    private method: string = null;
    private params: HttpParams = null;
    constructor(method: HttpMethod, params: HttpParams) {
        this.method = method;
        this.params = params;

        this.xhr = new XMLHttpRequest();
        this.xhr.timeout = params.timeout;

        let url = params.url;
        if (method === HttpMethod.Get) {
            url += this.buildGetParam();
        }
        this.xhr.open(method, url, true);

        // 添加请求头
        this.setHeader(params.header);

        this.xhr.ontimeout = this.onTimeout.bind(this);
        this.xhr.onreadystatechange = this.onReadyStateChange.bind(this);

        if (method === HttpMethod.Get) {
            this.xhr.send();
        } else if (method === HttpMethod.Post) {
            const payload = this.buildPostParam();
            this.xhr.send(payload);
        }
    }

    // 构建GET请求的参数
    private buildGetParam() {
        const payload = this.params.payload;
        let param = '';
        for (const key in payload) {
            if (Object.prototype.hasOwnProperty.call(payload, key)) {
                const value = payload[key];
                param += `${key}=${value}&`;
            }
        }
        return param.length ? ('?' + param) : param;
    }

    // 构建POST请求的参数
    private buildPostParam() {
        const payload = this.params.payload;
        return JSON.stringify(payload);
    }

    // 设置请求头
    private setHeader(header: StringMap) {
        if (header) {
            for (const key in header) {
                if (Object.prototype.hasOwnProperty.call(header, key)) {
                    const value = header[key];
                    this.xhr.setRequestHeader(key, value);
                }
            }
        } else {
            this.xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
        }
    }

    // 超时回调
    onTimeout() {
        console.log('请求超时:', this.params);
        this.params.onResponse(-1, null);
    }

    // 响应回调
    onReadyStateChange() {
        if (this.xhr.readyState === 4) {
            if (this.xhr.status === 200) {
                const response = this.xhr.response;
                const resData = JSON.parse(response);
                console.log('response', resData);
                if (resData) {
                    this.params.onResponse(resData.code, resData.data);
                } else {
                    this.params.onResponse(-3, null);
                }

            } else {
                console.error('http error', this.xhr.status);
                this.params.onResponse(-2, null);
            }
        }
    }
}
