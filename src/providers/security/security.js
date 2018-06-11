var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
var httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
var heroesUrl = 'http://18.218.43.56:5001/api/';
// URL to web api
var SecurityProvider = /** @class */ (function () {
    function SecurityProvider(http) {
        this.http = http;
    }
    //////// Save methods //////////
    /** POST: add a new hero to the server */
    SecurityProvider.prototype.signupopen = function (data) {
        var _this = this;
        var url = heroesUrl + "userSignup";
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.loginopen = function (a) {
        var _this = this;
        var url = heroesUrl + "userLogin";
        return this.http.post(url, a, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.MainRecipe = function (offset) {
        var _this = this;
        var url;
        if (localStorage["private"] == 1) {
            url = heroesUrl + "getRecipesByFriends/" + localStorage['user_id'] + "/" + offset;
        }
        else {
            url = heroesUrl + "allRecipes/" + localStorage['user_id'] + "/" + offset;
        }
        return this.http.get(url, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.addRecipes = function (data) {
        var _this = this;
        var url = heroesUrl + "addRecipes";
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.Likes = function (data) {
        var _this = this;
        var url = heroesUrl + "like_recipe";
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.EventChats = function (id) {
        var _this = this;
        var url = heroesUrl + "getEventChat/" + id;
        return this.http.get(url, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.View_detail = function (data) {
        var _this = this;
        var url = heroesUrl + "view_recipe";
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.categoryWiseRecipes = function () {
        var _this = this;
        var url = heroesUrl + "categoryWiseRecipes";
        return this.http.get(url, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.login_fb_service = function (data) {
        var _this = this;
        var url = heroesUrl + "facebook_User_Login";
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.category = function () {
        var _this = this;
        var url = heroesUrl + "get_categories";
        return this.http.get(url, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.MyRecipe = function (id) {
        var _this = this;
        var url = heroesUrl + "categoryWiseMyRecipes/" + id;
        return this.http.get(url, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.togglePrivacy = function (id) {
        var _this = this;
        var url = heroesUrl + "editPrivacyStatus/" + id;
        return this.http.get(url, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.MyRecipes = function (id) {
        var _this = this;
        var url = heroesUrl + "get_my_recipe/" + id;
        return this.http.get(url, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.contactopen = function (data) {
        var _this = this;
        var url = heroesUrl + "contactUs";
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.FaqOpen = function () {
        var _this = this;
        var url = heroesUrl + "get_faq";
        return this.http.get(url, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.AddtoMyRecipe = function (data) {
        var _this = this;
        var url = heroesUrl + "add_my_recipe";
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.Addcomment = function (data) {
        var _this = this;
        var url = heroesUrl + "addComment";
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.forgot = function (data) {
        var _this = this;
        var url = heroesUrl + "userForgotPassword";
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.postRecipe = function (data) {
        var _this = this;
        var url = heroesUrl + "editRecipeStatus/" + data;
        return this.http.get(url, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.EditRecipes = function (data, id) {
        var _this = this;
        var url = heroesUrl + "editRecipeApp/" + id;
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.deleteRecipe = function (id) {
        var _this = this;
        var url = heroesUrl + "deleteRecipe/" + id;
        return this.http.delete(url, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.addFav = function (data) {
        var _this = this;
        var url = heroesUrl + "add_to_favourites";
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.FavRecipes = function (id) {
        var _this = this;
        var url = heroesUrl + "get_favourites/" + id;
        return this.http.get(url, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.get_status = function (id) {
        var _this = this;
        var url = heroesUrl + "getFavrecipesAndMyRecipes/" + id;
        return this.http.get(url, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.EditComment = function (data) {
        var _this = this;
        var url = heroesUrl + "editComment";
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.DeleteComment = function (data) {
        var _this = this;
        var url = heroesUrl + "deleteComment";
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.attachedRecipe = function (data) {
        var _this = this;
        var url = heroesUrl + "attachRecipeImage";
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.AboutUsBalifood = function () {
        var _this = this;
        var url = heroesUrl + "aboutUs";
        return this.http.get(url, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.ChangeProfile = function (data, id) {
        var _this = this;
        var url = heroesUrl + "profileUpdate/" + id;
        return this.http.put(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.UserActiveStatus = function (id) {
        var _this = this;
        var url = heroesUrl + "accountActivationDeactivation/" + id;
        return this.http.get(url, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.AllUserFriend = function (id) {
        var _this = this;
        var url = heroesUrl + "getAllUsrers/" + id;
        return this.http.get(url, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.AddToFriend = function (data) {
        var _this = this;
        var url = heroesUrl + "sendRequest/";
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.GetNotification = function (id) {
        var _this = this;
        var url = heroesUrl + "getAllNotifications/" + id;
        return this.http.get(url, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.GetFreindNotification = function (id) {
        var _this = this;
        var url = heroesUrl + "getFriendRequests/" + id;
        return this.http.get(url, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.acceptOrRejectFriendRequest = function (data) {
        var _this = this;
        var url = heroesUrl + "acceptOrRejectRequest/";
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.acceptOrRejectRequest = function (data) {
        var _this = this;
        var url = heroesUrl + "acceptEventInvitation/";
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.Changepassword = function (data) {
        var _this = this;
        var url = heroesUrl + "changePassword/";
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.AddUrl = function (data) {
        var _this = this;
        var url = heroesUrl + "fetchDataFromUrl/";
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.CreateEvent = function (data) {
        var _this = this;
        var url = heroesUrl + "createEvent/";
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.AddMenu = function (data) {
        var _this = this;
        var url = heroesUrl + "addMenu/";
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.addMembers = function (data) {
        var _this = this;
        var url = heroesUrl + "addMembers/";
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.MyEvent = function (id) {
        var _this = this;
        var url = heroesUrl + "allEvents/" + id;
        return this.http.get(url, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.ContactImport = function (data) {
        var _this = this;
        var url = heroesUrl + "contactSync/";
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.bringItem = function (data) {
        var _this = this;
        var url = heroesUrl + "addWhatToBring/";
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.thisEvent = function (id) {
        var _this = this;
        var url = heroesUrl + "getEvent/" + id;
        return this.http.get(url, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.FetchContact = function (id) {
        var _this = this;
        var url = heroesUrl + "fetchContactList/";
        return this.http.post(url, id, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.UpdateEvent = function (data) {
        var _this = this;
        var url = heroesUrl + "editEvent/" + data.event_id;
        delete data.event_id;
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.updateMenu = function (data) {
        var _this = this;
        var url = heroesUrl + "editEventMenu/";
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.ondeleteEvent = function (id) {
        var _this = this;
        var url = heroesUrl + "deleteEvent/" + id;
        return this.http.get(url, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.EditbringItem = function (data) {
        var _this = this;
        var url = heroesUrl + "editWhatToBring/";
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.onDeleteMemberFromEvent = function (data) {
        var _this = this;
        var url = heroesUrl + "removeMember/";
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.onAcceptRequestInvitationForBringItems = function (data) {
        var _this = this;
        var url = heroesUrl + "whatToBringConfirmation/";
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.onDeleteitem = function (data) {
        var _this = this;
        var url = heroesUrl + "removeWhatToBring/";
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.onDeletemenu = function (data) {
        var _this = this;
        var url = heroesUrl + "removeMenu/";
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    SecurityProvider.prototype.addGrades = function (data) {
        var _this = this;
        var url = heroesUrl + "addMenuGrades";
        return this.http.post(url, data, httpOptions)
            .pipe(tap(function (heroes) { return _this.log("saloonUpdate"); }), catchError(this.handleError('saloonUpdate', [])));
    };
    // SaloonUpdate(data): Observable<any> {
    //   const url = `${ENV.mainApi}/saloonUpdate`;
    //   return this.http.post<any>(url,data,httpOptions)
    //   .pipe(
    //       tap(heroes => this.log(`saloonUpdate`)),
    //       catchError(this.handleError('saloonUpdate', []))
    //   );
    // }
    /**
       * Handle Http operation that failed.
       * Let the app continue.
       * @param operation - name of the operation that failed
       * @param result - optional value to return as the observable result
       */
    SecurityProvider.prototype.handleError = function (operation, result) {
        var _this = this;
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            _this.log(operation + " failed: " + error.message);
            // Let the app keep running by returning an empty result.
            return of(result);
        };
    };
    /** Log a HeroService message with the MessageService */
    SecurityProvider.prototype.log = function (message) {
        // this.messageService.add('HeroService: ' + message);
        //console.log(message)
    };
    SecurityProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], SecurityProvider);
    return SecurityProvider;
}());
export { SecurityProvider };
//# sourceMappingURL=security.js.map