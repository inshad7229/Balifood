var CreateWhatToBringPage = /** @class */ (function () {
    function CreateWhatToBringPage(translate, modalCtrl, navCtrl, navParams) {
        this.translate = translate;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Menu_event = [];
        this.Menu = {};
        this.event_id = this.navParams.get('event_id');
        this.eventType = this.navParams.get('eventType');
        this.menu_id = this.navParams.get('menu_id');
    }
    CreateWhatToBringPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreateWhatToBringPage');
    };
    CreateWhatToBringPage.prototype.onEvent = function () {
        // this.navCtrl.push('EventsPage');
        this.navCtrl.pop();
    };
    CreateWhatToBringPage.prototype.onAdd = function () {
        var _this = this;
        var Modal = this.modalCtrl.create('CreatenewbringformPage', {
            event_id: this.event_id,
            eventType: this.eventType,
            menu_id: this.menu_id
        });
        Modal.onDidDismiss(function (data) {
            if (data) {
                //alert("event_bringitem" + JSON.stringify(data));
                _this.Menu_event = data.whatToBring;
            }
        });
        Modal.present();
    };
    return CreateWhatToBringPage;
}());
export { CreateWhatToBringPage };
//# sourceMappingURL=create-what-to-bring.js.map