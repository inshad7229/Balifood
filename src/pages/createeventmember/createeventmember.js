var CreateeventmemberPage = /** @class */ (function () {
    function CreateeventmemberPage(translate, alertCtrl, securityProvider, navCtrl, navParams) {
        this.translate = translate;
        this.alertCtrl = alertCtrl;
        this.securityProvider = securityProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.member_id = [];
        this.event_id = this.navParams.get('event_id');
        this.data = [{
                id: 1,
                name: 'rohit smith',
                color: 'color-red',
                img: 'assets/imgs/profile_img.png'
            },
            {
                id: 2,
                name: 'john smith',
                color: 'color-green',
                img: 'assets/imgs/balifood.jpg'
            },
            {
                id: 3,
                name: 'ravi jain',
                color: 'color-red',
                img: 'assets/imgs/Bebek-and-Ayam-Betutu.jpg'
            },
            {
                id: 4,
                name: 'mohit',
                color: 'color-green',
                img: 'assets/imgs/profile_img.png'
            },
            {
                id: 5,
                name: 'sahil thukral',
                color: 'color-red',
                img: 'assets/imgs/korean.jpg'
            },
            {
                id: 6,
                name: 'john smith',
                color: 'color-green',
                img: 'assets/imgs/profile_img.png'
            },
            {
                id: 7,
                name: 'ashish garg',
                color: 'color-red',
                img: 'assets/imgs/profiler.png'
            },
            {
                id: 8,
                name: 'rahul sohal',
                color: 'color-green',
                img: 'assets/imgs/profile_img.png'
            }
        ];
        this.a = this.data;
    }
    CreateeventmemberPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad CreateeventmemberPage');
        console.log('ionViewDidLoad ImportcontactsPage');
        var a = localStorage['user_id'];
        this.securityProvider.AllUserFriend(a)
            .subscribe(function (data) {
            var a = data;
            _this.allUser = _this.getOrderData(a.allUsers);
            _this.allUser2 = _this.getOrderData(a.allUsers);
            _this.onCheck();
        }),
            function (error) { };
    };
    CreateeventmemberPage.prototype.getOrderData = function (data) {
        var a = data.sort(function (x, z) { return (x.username.toLowerCase() < z.username.toLowerCase() ? -1 : 1); });
        return a;
    };
    CreateeventmemberPage.prototype.getItems = function (ev) {
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.allUser = this.allUser.filter(function (p) {
                if (p.username) {
                    return (p.username.toLowerCase().indexOf(val.toLowerCase()) > -1);
                }
            });
        }
        else {
            this.allUser = this.allUser2;
        }
    };
    CreateeventmemberPage.prototype.onCheckmember = function (index, a) {
        this.allUser[index].checkStatus = !this.allUser[index].checkStatus;
        this.onCheck();
    };
    CreateeventmemberPage.prototype.onremovemember = function (index) {
        this.allUser[index].checkStatus = !this.allUser[index].checkStatus;
        this.onCheck();
    };
    CreateeventmemberPage.prototype.onCheck = function () {
        if (this.allUser) {
            var data = this.allUser.filter(function (arg) { return arg.checkStatus == true; });
            if (data.length > 0) {
                this.extradata = data;
                console.log("da" + JSON.stringify(data));
            }
            else {
                this.extradata = [];
            }
        }
    };
    CreateeventmemberPage.prototype.onAddMembers = function () {
        var _this = this;
        console.log('member' + JSON.stringify(this.extradata));
        for (var _i = 0, _a = this.extradata; _i < _a.length; _i++) {
            var a_1 = _a[_i];
            var b = a_1._id;
            if (a_1.profileImage) {
                var p = a_1.profileImage;
            }
            else {
                var p = null;
            }
            var e = a_1.email;
            var u = a_1.username;
            this.member_id.push({ member_id: b, profileImage: p, email: e, username: u });
        }
        var a = {
            event_id: this.event_id,
            members: this.member_id
        };
        console.log(JSON.stringify("member_data" + a));
        this.securityProvider.addMembers(a)
            .subscribe(function (data) {
            var a = data;
            if (a.success == true) {
                var alert_1 = _this.alertCtrl.create({
                    subTitle: _this.member_id.length + _this.translate.instant('popup.members_add_to_event'),
                    buttons: [_this.translate.instant('popup.ok')]
                });
                alert_1.present();
                _this.navCtrl.pop();
            }
        }),
            function (error) { };
    };
    return CreateeventmemberPage;
}());
export { CreateeventmemberPage };
//# sourceMappingURL=createeventmember.js.map