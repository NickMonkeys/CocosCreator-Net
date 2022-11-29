import Http from "./Http";

type Param = {

};

export default class HttpHeadler {
    private static host: string = null;
    private static port: number = null;

    // 设置服务器地址
    public static setServer(host: string, port) {
        this.host = host;
        this.port = port;
    }

    // 发GET请求
    public static sendHttpGet(method: string, params?: {[key: string]: any}) {
        Http.get({
            url: this.getUrl(method),
            payload: params,
            timeout: 2000,
            onResponse: () => {},
        });
    }

    // 发POST请求
    public static sendHttpPost(method: string, params?: {[key: string]: any}) {
        const header = {
            'Content-type': 'application/json',
        };
        Http.post({
            url: this.getUrl(method),
            payload: params,
            timeout: 1000,
            header,
            onResponse: () => {},
        });
    }

    // 获取Url
    private static getUrl(method: string) {
        let url = this.host;
        if (this.port) {
            url += ':' + this.port;
        }
        url += '/' + method;
        return url;
    }
}
