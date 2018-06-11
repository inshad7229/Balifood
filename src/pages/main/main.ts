import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { NavController, IonicPage ,LoadingController, AlertController } from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/security/security';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {
    DomSanitizer
} from "@angular/platform-browser";
import { ModalController } from 'ionic-angular';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { TranslateService } from "@ngx-translate/core";



@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})


export class MainPage {
  main
  recipedata
  dataOffset
  recipedata2
  add_rec
  u_id
  comment_value
  mySavedRecipe
  paginate
  Recipes;
  shownGroup = null;
  camera_pop: boolean
  ppic
  edit_id
  b=[]
  cardImage
  checkmark:boolean
  editcomment
  thumbnail_image='assets/imgs/add-new-recipe.png'
  constructor(public translateService:TranslateService,public modalCtrl: ModalController,private streamingMedia: StreamingMedia,private domSanitizer: DomSanitizer,public loadingCtrl: LoadingController, public alertCtrl: AlertController, private camera: Camera, private socialSharing: SocialSharing, public securityProvider: SecurityProvider, public navCtrl: NavController) {
    this.main = {}
    this.add_rec = {}
    this.u_id = localStorage['user_id'];
    this.Recipes = {};
    this.camera_pop = false;
    this.checkmark=false;
	this.recipedata=[];
	this.dataOffset=0;
	this.paginate="showPaginate";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
	
  }
  
  ionViewDidEnter(){
	//this.getRecipeData(0)
   // this.getfav_sav_Status()
  }
getSafeUrl(url) {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    }
	
	onDivClick(showComments) {
		if(!showComments.show){
			showComments.show=true;
		}else{
			showComments.show=false;
		}
        //showComments.show = !showComments.show;
    }

    /////////////straming media/////////
    playvideo1(url){
      let options: StreamingVideoOptions = {
  successCallback: () => { console.log('Video played') },
  errorCallback: (e) => { console.log('Error streaming') },
};

this.streamingMedia.playVideo(url, options);
    }

  ngOnInit() {
    this.getRecipeData(0)
    this.getfav_sav_Status()
   
  }
  
  toggleGroup(group) {
		if (this.isGroupShown(group)) {
			this.shownGroup = null;
		} else {
			this.shownGroup = group;
		}
	};
	isGroupShown(group) {
		return this.shownGroup === group;
	};
	  

  getRecipeData(offset) {
    this.securityProvider.MainRecipe(offset)
      .subscribe(data => {
		  if(localStorage["private"]==0){
		this.recipedata = this.recipedata.concat(data.Recipes);
       // this.recipedata = data.Recipes;
		  }else{
			 this.recipedata = this.recipedata.concat(data.Recipes);
		  }
        this.recipedata2 = data.Recipes;
        console.log('recipedata' + JSON.stringify(this.recipedata2))
      }),
      error => {}
  }
  
    getRecipeDataPaginated(offset, infScroll) {
    this.securityProvider.MainRecipe(offset)
      .subscribe(data => {
		  if(localStorage["private"]==0){
		this.recipedata = this.recipedata.concat(data.Recipes);
       // this.recipedata = data.Recipes;
	    this.paginate="hidePaginate";
	      infScroll.complete();
		  }else{
			 this.recipedata = this.recipedata.concat(data.Recipes);
			 infScroll.complete();
			   this.paginate="hidePaginate";
		  }
        this.recipedata2 = data.Recipes;
        console.log('recipedata' + JSON.stringify(this.recipedata2))
      }),
      error => {}
  }
  
   doInfinite(infiniteScroll) {
	   this.paginate="showPaginate";
    console.log('Begin async operation');
	this.dataOffset++;
      this.getRecipeDataPaginated(this.dataOffset, infiniteScroll);
      console.log('Async operation has ended');
   
  }

  getfav_sav_Status() {
    var a = localStorage['user_id']
    this.securityProvider.get_status(a)
      .subscribe(data => {
        var a = data.myRecipes;
        this.mySavedRecipe = data.myRecipes
        var b = this.recipedata
        var c = []

        console.log('get_status' + JSON.stringify(a))
      }),
      error => {}
  }

  getStatusFOrdisabled(id) {
    let data = this.mySavedRecipe.filter(arg => arg.recipe_id == id)
    if (data.length > 0) {
      return true
    } else {
      return false
    }
  }

getCommentCount(comment){
	return comment.length;
}

  getCommentSeen(user_id){
if(localStorage['user_id']==user_id){
  return true
}
else{
  return false
}
  }

  getItems(ev: any) {
    var val = ev.target.value;

    if (val && val.trim() != '') {

      this.recipedata = this.recipedata.filter((p) => {
        if (p.recipeTitle) {
          return (p.recipeTitle.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
      })
    } else {
      this.recipedata = this.recipedata2;
    }
  }



  onLike(recipe_id) {
    var a = {
      recipe_id: recipe_id,
      user_id: localStorage['user_id']
    }
    let loading = this.loadingCtrl.create({
      content: this.translateService.instant('popup.Please_wait')
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.securityProvider.Likes(a))
      .subscribe(data =>
        loading.dismiss().then(() => {
          this.ngOnInit()
        }),
        error =>
        loading.dismiss().then(() => {})
      );
  }
  onViewDetail(recipe_id, recipe_data) {
    this.navCtrl.push('ViewRecipesPage', {
      recipe_data: recipe_data
    });
    console.log("recipe_data" + JSON.stringify(recipe_data));
    var a = {
      recipe_id: recipe_id,
      user_id: localStorage['user_id']
    }

    this.securityProvider.View_detail(a)
      .subscribe(data => {
        console.log('View_data' + JSON.stringify(data));
        this.ngOnInit();

      }),
      error => {}
  }

  share(recipeTitle, img) {
    let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });

  loading.present();
    var message = 'Shared by baliFood App';
    var subject = recipeTitle;
    var file = img;
      var url='https://www.dropbox.com/s/796mk502mbpee64/android-debug.apk?dl=0';

    this.socialSharing.share(message, subject, file, url).then((data) => {
loading.dismiss();
    }).catch((error) => {
      loading.dismiss();
    });
  }

  addmyRecipe(recipe_id, userName) {
    this.add_rec.recipe_id = recipe_id
    this.add_rec.user_id = localStorage['user_id']
    let loading = this.loadingCtrl.create({
      content:this.translateService.instant('popup.Please_wait')
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.securityProvider.AddtoMyRecipe(this.add_rec))
      .subscribe(data =>
        loading.dismiss().then(() => {
          this.ngOnInit();
          var a = data;
          if (a.message == "Data Saved") {
            let alert = this.alertCtrl.create({
              subTitle:this.translateService.instant('popup.recipe_saved'),
              buttons: [this.translateService.instant('popup.ok')]
            });
            alert.present();
          } else {
            let alert = this.alertCtrl.create({
              subTitle: this.translateService.instant('popup.Recipe_deleted'),
              buttons: [this.translateService.instant('popup.ok')]
            });
            alert.present();
          }
        }),
        error =>
        loading.dismiss().then(() => {
          let alert = this.alertCtrl.create({
            title: this.translateService.instant('popup.tilte'),
            subTitle: error,
            buttons: [this.translateService.instant('popup.ok')]
          });
          alert.present();
        })
      );

  }


  addcomment(recipe_id, comment, allcomments) {
	  //alert(recipe_id+' '+comment);
    var a = {
      recipe_id: recipe_id,
      user_id: localStorage['user_id'],
      comment: comment,
      userName: localStorage['username']
    }
	allcomments.comments.unshift(a);
	allcomments.comment_value=null;
	allcomments.show=true;
    this.securityProvider.Addcomment(a)
      .subscribe(data => {
		//allcomments.comments=data;
        console.log("data" + JSON.stringify(data));
        this.comment_value = '';
        this.ngOnInit();
		
      }),
      error => {}
  }
  creatRecipeCamera() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false,
      allowEdit:true
    }).then((imageData) => {
      let base64Image = imageData;
       this.ppic = 'data:image/jpeg;base64,' + imageData;
      var cameraImage = base64Image;
      this.Recipes.recipeImages = base64Image;
       let modal = this.modalCtrl.create('CreatRecipeCameraPage',{ppic:this.ppic,orgPic:imageData});
    modal.present();
      console.log(cameraImage);
    }, (err) => {
       this.camera_pop = false;
      console.log('camera not working');
    })

  }
  
  nextFun(ppic,orgPic){
 let modal = this.modalCtrl.create('CreatRecipeCameraPage',{ppic:ppic,orgPic:orgPic});
    modal.present();
    }
  onPostRecipe() {
    this.navCtrl.push('MyRecipesPage', {
      post: 'post_data'
    });
  }

  onCamerapostRecipe() {
    var a = {
      email: localStorage['email'],
      userName: localStorage['username'],
      user_id: localStorage['user_id'],
      mainImage: this.Recipes.recipeImages
    }


    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.securityProvider.addRecipes(a))
      .subscribe(data =>
        loading.dismiss().then(() => {
          var a = data;
          if (a.success == true) {
            let alert = this.alertCtrl.create({
              subTitle: 'Post successfully!',
              buttons: [this.translateService.instant('popup.ok')]
            });
            alert.present();
            this.ngOnInit();
            this.camera_pop = false;
          } else {
            let alert = this.alertCtrl.create({
                title: this.translateService.instant('popup.tilte'),
                subTitle: this.translateService.instant('popup.Something'),
                buttons: [this.translateService.instant('popup.ok')]
            });
            alert.present();
          }

        }),
        error =>
        loading.dismiss().then(() => {})
      );
  }
  onCameraPostCancel() {
    this.camera_pop = false;
  }

  onAttachedRecipe() {
    var a = "camera_post"
    this.camera_pop = false;
    this.navCtrl.push('MyRecipesPage', {
      camera_post: this.Recipes.recipeImages
    })
  }


  

  onEditComment(comment_id,recipe_id,edit_comment){
this.edit_id=comment_id;
      var a = {
      recipe_id:recipe_id,
    commentId:comment_id,
    comment:edit_comment
    }
    this.securityProvider.EditComment(a)
      .subscribe(data => {
        console.log("data" + JSON.stringify(data));
        this.editcomment=45745
         this.ngOnInit();
         this.checkmark=false;
   
      }),
      error => {}
  }
  
  
    onDeleteComment(comment_id,recipe_id){
    var a = {
      recipe_id:recipe_id,
    commentId:comment_id
    }
    this.securityProvider.DeleteComment(a)
      .subscribe(data => {
        console.log("data" + JSON.stringify(data));
        var a=data;
        if(a.success==true || a.success=="true"){
        this.ngOnInit();
        }
      }),
      error => {}
  }
  

   edit_comment(user_id,comment_id){
     this.editcomment=comment_id;
    if(user_id==localStorage['user_id']){
       this.checkmark=true
    }
  
 }


}

