(function () {
    "use strict";

    angular
        .module("cliApp")
        .controller("module1Ctrl", module1Ctrl);

    function module1Ctrl(chatRequest, $timeout) {
        let vm = this;
        let scroll = function (content, direction) {
            let obj = {
                direction: direction,
                content: content
            };
            vm.list.push(obj);
            // 刚push完毕页面还没渲染完成，渲染完成之后再滚动到最底部
            $timeout(function () {
                document.getElementById('container').scrollTop = document.getElementById('container').scrollHeight;
            });
        };
        vm.list = [
            {
                direction: "left",
                content: {
                    text: "尊贵的闹闹女王大人，你好，我是残心派来的小逗比~"
                }
            }
        ];
        vm.send = function () {
            let obj = {
                text: vm.message
            };
            scroll(obj, "right");
            chatRequest.chat({
                message: vm.message,
                successCb: function(data){
                    debugger;
                    scroll(data.data, "left");
                },
                errorCb: function(){
                    debugger;
                    let data = {
                        text: "我好像出错了，你还爱我么~"
                    };
                    scroll(data, "left");
                }
            });
            angular.element("#inputtext").focus();
            vm.message = "";
        };
    }
})();