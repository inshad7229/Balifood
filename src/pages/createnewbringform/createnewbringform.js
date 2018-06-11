import { Observable } from 'rxjs/Rx';
var CreatenewbringformPage = /** @class */ (function () {
    function CreatenewbringformPage(translate, alertCtrl, securityProvider, loadingCtrl, viewCtrl, modalCtrl, navCtrl, navParams) {
        this.translate = translate;
        this.alertCtrl = alertCtrl;
        this.securityProvider = securityProvider;
        this.loadingCtrl = loadingCtrl;
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Menu = {};
        this.event_id = this.navParams.get('event_id');
        this.menu_id = this.navParams.get('menu_id');
        this.bringitems = [];
        this.Menu.bringItems = [];
        this.Menu.memberName = localStorage['username'];
        this.Menu.memberId = localStorage['user_id'];
        this.Menu.status = 'pending';
    }
    CreatenewbringformPage.prototype.onChangeMet = function () {
        this.Menu.bringitems = this.navParams.get('event_id');
        this.Menu.memberName = this.navParams.get('memberName');
        this.Menu.eventType = this.navParams.get('eventType');
        this.Menu.memberId = localStorage['user_id'];
        this.Menu.menuType = "MutualEvent";
    };
    CreatenewbringformPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreatenewbringformPage');
    };
    CreatenewbringformPage.prototype.addmore = function () {
        this.bringitems.push(this.bringitem);
        this.items = this.bringitems;
        this.bringitem = '';
    };
    CreatenewbringformPage.prototype.onSaveMenu = function () {
        var _this = this;
        this.Menu.eventId = this.event_id;
        this.Menu.bringItems = this.bringitem;
        var loading = this.loadingCtrl.create({
            content: this.translate.instant('popup.Please_wait')
        });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.securityProvider.bringItem(_this.Menu); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                var a = data;
                if (a.success == true) {
                    var alert_1 = _this.alertCtrl.create({
                        subTitle: _this.translate.instant('popup.Item_assigned_successfully'),
                        buttons: [_this.translate.instant('popup.ok')]
                    });
                    alert_1.present();
                    var b = a.eventData;
                    _this.viewCtrl.dismiss(b);
                }
                else {
                    var alert_2 = _this.alertCtrl.create({
                        subTitle: _this.translate.instant('popup.Something_went_wrong'),
                        buttons: [_this.translate.instant('popup.ok')]
                    });
                    alert_2.present();
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    CreatenewbringformPage.prototype.Ownername = function () {
        var _this = this;
        var Modal = this.modalCtrl.create('CreateMenuOwnerPage');
        Modal.onDidDismiss(function (data) {
            if (data) {
                console.log("Owner_data" + JSON.stringify(data));
                var a = data;
                _this.Menu.memberName = a.userName;
                _this.Menu.memberId = a.user_id;
            }
        });
        Modal.present();
    };
    CreatenewbringformPage.prototype.onClose = function () {
        this.viewCtrl.dismiss();
    };
    return CreatenewbringformPage;
}());
export { CreatenewbringformPage };
//# sourceMappingURL=createnewbringform.js.map