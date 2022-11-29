import HttpHeadler from "../lib/net/http/HttpHeadler";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    start () {
        // init logic
        this.label.string = this.text;

        HttpHeadler.setServer('http://192.168.1.5', 8081);
    }

    onClick() {
        HttpHeadler.sendHttpGet('getData', {
            id: 1992,
            ps: 'nick'
        });
    }

    onClick2() {
        HttpHeadler.sendHttpPost('process_post', {
            first_name: 'zh',
            last_name: 'judy'
        });
    }
}
