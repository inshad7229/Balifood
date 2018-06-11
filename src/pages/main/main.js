var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Camera } from '@ionic-native/camera';
import { DomSanitizer } from "@angular/platform-browser";
import { ModalController } from 'ionic-angular';
import { StreamingMedia } from '@ionic-native/streaming-media';
var MainPage = /** @class */ (function () {
    function MainPage(modalCtrl, streamingMedia, domSanitizer, loadingCtrl, alertCtrl, camera, socialSharing, securityProvider, navCtrl) {
        this.modalCtrl = modalCtrl;
        this.streamingMedia = streamingMedia;
        this.domSanitizer = domSanitizer;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.camera = camera;
        this.socialSharing = socialSharing;
        this.securityProvider = securityProvider;
        this.navCtrl = navCtrl;
        this.shownGroup = null;
        this.b = [];
        this.thumbnail_image = 'assets/imgs/add-new-recipe.png';
        this.main = {};
        this.add_rec = {};
        this.u_id = localStorage['user_id'];
        this.Recipes = {};
        this.camera_pop = false;
        this.checkmark = false;
        this.recipedata = [];
        this.dataOffset = 0;
        this.paginate = "showPaginate";
    }
    MainPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MainPage');
    };
    MainPage.prototype.ionViewDidEnter = function () {
        //this.getRecipeData(0)
        // this.getfav_sav_Status()
    };
    MainPage.prototype.getSafeUrl = function (url) {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    };
    MainPage.prototype.onDivClick = function (showComments) {
        if (!showComments.show) {
            showComments.show = true;
        }
        else {
            showComments.show = false;
        }
        //showComments.show = !showComments.show;
    };
    /////////////straming media/////////
    MainPage.prototype.playvideo1 = function (url) {
        var options = {
            successCallback: function () { console.log('Video played'); },
            errorCallback: function (e) { console.log('Error streaming'); },
        };
        this.streamingMedia.playVideo(url, options);
    };
    MainPage.prototype.ngOnInit = function () {
        this.getRecipeData(0);
        this.getfav_sav_Status();
    };
    MainPage.prototype.toggleGroup = function (group) {
        if (this.isGroupShown(group)) {
            this.shownGroup = null;
        }
        else {
            this.shownGroup = group;
        }
    };
    ;
    MainPage.prototype.isGroupShown = function (group) {
        return this.shownGroup === group;
    };
    ;
    MainPage.prototype.getRecipeData = function (offset) {
        var _this = this;
        this.securityProvider.MainRecipe(offset)
            .subscribe(function (data) {
            if (localStorage["private"] == 0) {
                _this.recipedata = _this.recipedata.concat(data.Recipes);
                // this.recipedata = data.Recipes;
            }
            else {
                _this.recipedata = _this.recipedata.concat(data.Recipes);
            }
            _this.recipedata2 = data.Recipes;
            console.log('recipedata' + JSON.stringify(_this.recipedata2));
        }),
            function (error) { };
    };
    MainPage.prototype.getRecipeDataPaginated = function (offset, infScroll) {
        var _this = this;
        this.securityProvider.MainRecipe(offset)
            .subscribe(function (data) {
            if (localStorage["private"] == 0) {
                _this.recipedata = _this.recipedata.concat(data.Recipes);
                // this.recipedata = data.Recipes;
                _this.paginate = "hidePaginate";
                infScroll.complete();
            }
            else {
                _this.recipedata = _this.recipedata.concat(data.Recipes);
                infScroll.complete();
                _this.paginate = "hidePaginate";
            }
            _this.recipedata2 = data.Recipes;
            console.log('recipedata' + JSON.stringify(_this.recipedata2));
        }),
            function (error) { };
    };
    MainPage.prototype.doInfinite = function (infiniteScroll) {
        this.paginate = "showPaginate";
        console.log('Begin async operation');
        this.dataOffset++;
        this.getRecipeDataPaginated(this.dataOffset, infiniteScroll);
        console.log('Async operation has ended');
    };
    MainPage.prototype.getfav_sav_Status = function () {
        var _this = this;
        var a = localStorage['user_id'];
        this.securityProvider.get_status(a)
            .subscribe(function (data) {
            var a = data.myRecipes;
            _this.mySavedRecipe = data.myRecipes;
            var b = _this.recipedata;
            var c = [];
            console.log('get_status' + JSON.stringify(a));
        }),
            function (error) { };
    };
    MainPage.prototype.getStatusFOrdisabled = function (id) {
        var data = this.mySavedRecipe.filter(function (arg) { return arg.recipe_id == id; });
        if (data.length > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    MainPage.prototype.getCommentCount = function (comment) {
        return comment.length;
    };
    MainPage.prototype.getCommentSeen = function (user_id) {
        if (localStorage['user_id'] == user_id) {
            return true;
        }
        else {
            return false;
        }
    };
    MainPage.prototype.getItems = function (ev) {
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.recipedata = this.recipedata.filter(function (p) {
                if (p.recipeTitle) {
                    return (p.recipeTitle.toLowerCase().indexOf(val.toLowerCase()) > -1);
                }
            });
        }
        else {
            this.recipedata = this.recipedata2;
        }
    };
    MainPage.prototype.onLike = function (recipe_id) {
        var _this = this;
        var a = {
            recipe_id: recipe_id,
            user_id: localStorage['user_id']
        };
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.securityProvider.Likes(a); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.ngOnInit();
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    MainPage.prototype.onViewDetail = function (recipe_id, recipe_data) {
        var _this = this;
        this.navCtrl.push('ViewRecipesPage', {
            recipe_data: recipe_data
        });
        console.log("recipe_data" + JSON.stringify(recipe_data));
        var a = {
            recipe_id: recipe_id,
            user_id: localStorage['user_id']
        };
        this.securityProvider.View_detail(a)
            .subscribe(function (data) {
            console.log('View_data' + JSON.stringify(data));
            _this.ngOnInit();
        }),
            function (error) { };
    };
    MainPage.prototype.share = function (recipeTitle, img) {
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var message = 'Shared by baliFood App';
        var subject = recipeTitle;
        var file = img;
        var url = 'https://www.dropbox.com/s/796mk502mbpee64/android-debug.apk?dl=0';
        this.socialSharing.share(message, subject, file, url).then(function (data) {
            loading.dismiss();
        }).catch(function (error) {
            loading.dismiss();
        });
    };
    MainPage.prototype.addmyRecipe = function (recipe_id, userName) {
        var _this = this;
        this.add_rec.recipe_id = recipe_id;
        this.add_rec.user_id = localStorage['user_id'];
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.securityProvider.AddtoMyRecipe(_this.add_rec); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.ngOnInit();
                var a = data;
                if (a.message == "Data Saved") {
                    var alert_1 = _this.alertCtrl.create({
                        subTitle: 'Recipe successfully saved',
                        buttons: ['OK']
                    });
                    alert_1.present();
                }
                else {
                    var alert_2 = _this.alertCtrl.create({
                        subTitle: 'Recipe is deleted from your saved list.',
                        buttons: ['OK']
                    });
                    alert_2.present();
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () {
                var alert = _this.alertCtrl.create({
                    title: 'Alert!',
                    subTitle: error,
                    buttons: ['OK']
                });
                alert.present();
            });
        });
    };
    MainPage.prototype.addcomment = function (recipe_id, comment, allcomments) {
        var _this = this;
        //alert(recipe_id+' '+comment);
        var a = {
            recipe_id: recipe_id,
            user_id: localStorage['user_id'],
            comment: comment,
            userName: localStorage['username']
        };
        allcomments.comments.unshift(a);
        allcomments.comment_value = null;
        allcomments.show = true;
        this.securityProvider.Addcomment(a)
            .subscribe(function (data) {
            //allcomments.comments=data;
            console.log("data" + JSON.stringify(data));
            _this.comment_value = '';
            _this.ngOnInit();
        }),
            function (error) { };
    };
    MainPage.prototype.creatRecipeCamera = function () {
        var _this = this;
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.CAMERA,
            encodingType: this.camera.EncodingType.JPEG,
            saveToPhotoAlbum: false,
            allowEdit: true
        }).then(function (imageData) {
            var base64Image = imageData;
            _this.ppic = 'data:image/jpeg;base64,' + imageData;
            var cameraImage = base64Image;
            _this.Recipes.recipeImages = base64Image;
            var modal = _this.modalCtrl.create('CreatRecipeCameraPage', { ppic: _this.ppic, orgPic: imageData });
            modal.present();
            console.log(cameraImage);
        }, function (err) {
            _this.camera_pop = false;
            console.log('camera not working');
        });
    };
    MainPage.prototype.nextFun = function (ppic, orgPic) {
        var modal = this.modalCtrl.create('CreatRecipeCameraPage', { ppic: ppic, orgPic: orgPic });
        modal.present();
    };
    MainPage.prototype.onPostRecipe = function () {
        this.navCtrl.push('MyRecipesPage', {
            post: 'post_data'
        });
    };
    MainPage.prototype.onCamerapostRecipe = function () {
        var _this = this;
        var a = {
            email: localStorage['email'],
            userName: localStorage['username'],
            user_id: localStorage['user_id'],
            mainImage: this.Recipes.recipeImages
        };
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.securityProvider.addRecipes(a); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                var a = data;
                if (a.success == true) {
                    var alert_3 = _this.alertCtrl.create({
                        subTitle: 'Post successfully!',
                        buttons: ['OK']
                    });
                    alert_3.present();
                    _this.ngOnInit();
                    _this.camera_pop = false;
                }
                else {
                    var alert_4 = _this.alertCtrl.create({
                        title: 'Alert!',
                        subTitle: 'Something went wrong!',
                        buttons: ['OK']
                    });
                    alert_4.present();
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    MainPage.prototype.onCameraPostCancel = function () {
        this.camera_pop = false;
    };
    MainPage.prototype.onAttachedRecipe = function () {
        var a = "camera_post";
        this.camera_pop = false;
        this.navCtrl.push('MyRecipesPage', {
            camera_post: this.Recipes.recipeImages
        });
    };
    MainPage.prototype.onEditComment = function (comment_id, recipe_id, edit_comment) {
        var _this = this;
        this.edit_id = comment_id;
        var a = {
            recipe_id: recipe_id,
            commentId: comment_id,
            comment: edit_comment
        };
        this.securityProvider.EditComment(a)
            .subscribe(function (data) {
            console.log("data" + JSON.stringify(data));
            _this.editcomment = 45745;
            _this.ngOnInit();
            _this.checkmark = false;
        }),
            function (error) { };
    };
    MainPage.prototype.onDeleteComment = function (comment_id, recipe_id) {
        var _this = this;
        var a = {
            recipe_id: recipe_id,
            commentId: comment_id
        };
        this.securityProvider.DeleteComment(a)
            .subscribe(function (data) {
            console.log("data" + JSON.stringify(data));
            var a = data;
            if (a.success == true || a.success == "true") {
                _this.ngOnInit();
            }
        }),
            function (error) { };
    };
    MainPage.prototype.edit_comment = function (user_id, comment_id) {
        this.editcomment = comment_id;
        if (user_id == localStorage['user_id']) {
            this.checkmark = true;
        }
    };
    MainPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-main',
            templateUrl: 'main.html',
        }),
        __metadata("design:paramtypes", [ModalController, StreamingMedia, DomSanitizer, LoadingController, AlertController, Camera, SocialSharing, SecurityProvider, NavController])
    ], MainPage);
    return MainPage;
}());
export { MainPage };
//# sourceMappingURL=main.js.map