/*
*        notification.js :通知功能模組
*/
const {Notification} = require("electron");

function notification() {
       /*視窗打開*/
       this.start = function () {
                    new Notification({ title: '系統通知',body: '己打開' }).show();   
        };
        /*系統要準備進入休眠模式*/
        this.suspend = function () {
                    new Notification({ title: '系統通知',body: '系統己快要進入休眠模式' }).show();            
        };
        /*視窗関閉*/
        this.close = function () {
                   new Notification({ title: '系統通知',body: '己関閉' }).show();    
        };
}

module.exports =  notification;


/* 原有功能
function startNotification() {
           new Notification({ title: '系統通知',body: '己打開' }).show();
 }

function suspendNotification() {
           new Notification({ title: '系統通知',body: '系統己快要進入休眠模式' }).show();
}

function closeNotification() {
           new Notification({ title: '系統通知',body: '己関閉' }).show();
}
*/
