(function () {
    "use strict";

    angular
        .module("cliApp")
        .controller("chatroomCtrl", chatroomCtrl);

    function chatroomCtrl(chatRequest, $timeout) {
        let vm = this;
        // 每当发送新消息或者接受新消息的时候都滚动到最下面
        let scroll = function (content, direction) {
            let obj = {
                direction: direction,
                content: content
            };
            vm
                .list
                .push(obj);
            // 刚push完毕页面还没渲染完成，渲染完成之后再滚动到最底部
            $timeout(function () {
                document
                    .getElementById('container')
                    .scrollTop = document
                    .getElementById('container')
                    .scrollHeight;
            });
        };
        // 消息列表
        vm.list = [
            {
                direction: "left",
                content: {
                    text: "尊贵的闹闹女王大人，你好，我是残心派来的小逗比~"
                }
            }
        ];
        // 发送按钮，当按enter也绑定到这上面
        vm.send = function () {
            let obj = {};
            obj.text = vm.message;
            if (!obj.text) {
                return;
            }
            scroll(obj, "right");
            chatRequest.chat({
                message: vm.message,
                successCb: function (data) {
                    scroll(data.data, "left");
                },
                errorCb: function () {
                    let data = {
                        text: "我好像出错了，你还爱我么~"
                    };
                    scroll(data, "left");
                }
            });
            angular
                .element("#inputtext")
                .focus();
            vm.message = "";
        };
        // 敲回车自动发送消息
        vm.enter = function (e) {
            if (e.which === 13) {
                vm.send();
            }
        };
        // 默认展示最顶端提示条，如果点击x则取消展示
        let titleHeight = "25px";// 如果以后要更改这个的高度就将其更改为要更改到的高度就ok了（将main.less中的title-height同步就ok了）
        vm.isShow = true;
        vm.toolTip = {
            'margin-top': titleHeight
        };
        vm.close = function () {
            vm.toolTip = {
                'margin-top': '0px'
            };
            vm.isShow = false;
        };
        // 5秒后最顶端自动消失
        $timeout(function(){
            vm.close();
        }, 5000);
    }
})();