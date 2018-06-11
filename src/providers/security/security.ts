import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
  const heroesUrl = 'http://18.218.43.56:5001/api/'; 
   // URL to web api

@Injectable()
export class SecurityProvider {
a
  constructor(
    private http: HttpClient) { 
  }




  //////// Save methods //////////

  /** POST: add a new hero to the server */

  
signupopen (data): Observable<any> {
     const url = `${heroesUrl}userSignup`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

  loginopen (a): Observable<any> {
     const url = `${heroesUrl}userLogin`;
    return this.http.post<any>(url,a,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

  MainRecipe (offset): Observable<any> {
	   var url;
	  
	  if(localStorage["private"]==1){
		url = `${heroesUrl}getRecipesByFriends/`+localStorage['user_id']+`/`+offset;
	  }else{
		  url=`${heroesUrl}allRecipes/`+localStorage['user_id']+`/`+offset;
	  }
    
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

    addRecipes (data): Observable<any> {
     const url = `${heroesUrl}addRecipes`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

      Likes (data): Observable<any> {
     const url = `${heroesUrl}like_recipe`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

  
  EventChats(id): Observable<any> {
     const url = `${heroesUrl}getEventChat/`+id;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }
  
  
   View_detail (data): Observable<any> {
     const url = `${heroesUrl}view_recipe`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

     categoryWiseRecipes (): Observable<any> {
     const url = `${heroesUrl}categoryWiseRecipes`;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

login_fb_service(data){
    const url = `${heroesUrl}facebook_User_Login`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
}
  
    category (): Observable<any> {
     const url = `${heroesUrl}get_categories`;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }


 MyRecipe(id): Observable<any> {
     const url = `${heroesUrl}categoryWiseMyRecipes/`+id;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  } 
  
  togglePrivacy(id): Observable<any> {
     const url = `${heroesUrl}editPrivacyStatus/`+id;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

   MyRecipes(id): Observable<any> {
     const url = `${heroesUrl}get_my_recipe/`+id;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }
 
   contactopen(data): Observable<any> {
     const url = `${heroesUrl}contactUs`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

  FaqOpen():Observable<any> {
     const url = `${heroesUrl}get_faq`;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

  AddtoMyRecipe(data):Observable<any> {
     const url = `${heroesUrl}add_my_recipe`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }


Addcomment(data):Observable<any> {
     const url = `${heroesUrl}addComment`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

  forgot(data):Observable<any> {
     const url = `${heroesUrl}userForgotPassword`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

    postRecipe(data):Observable<any> {
     const url = `${heroesUrl}editRecipeStatus/`+data;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

  
      EditRecipes(data,id):Observable<any> {
     const url = `${heroesUrl}editRecipeApp/`+id;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }
   

    deleteRecipe(id):Observable<any> {
     const url = `${heroesUrl}deleteRecipe/`+id;
    return this.http.delete<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }
  
      addFav(data):Observable<any> {
     const url = `${heroesUrl}add_to_favourites`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

   FavRecipes(id):Observable<any> {
     const url = `${heroesUrl}get_favourites/`+id;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }
  

  get_status(id):Observable<any> {
     const url = `${heroesUrl}getFavrecipesAndMyRecipes/`+id;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

   EditComment(data):Observable<any> {
     const url = `${heroesUrl}editComment`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

   DeleteComment(data):Observable<any> {
     const url = `${heroesUrl}deleteComment`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

    attachedRecipe(data):Observable<any> {
     const url = `${heroesUrl}attachRecipeImage`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

   AboutUsBalifood():Observable<any> {
     const url = `${heroesUrl}aboutUs`;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }
  
  ChangeProfile(data,id):Observable<any> {
     const url = `${heroesUrl}profileUpdate/`+id;
    return this.http.put<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }


  UserActiveStatus(id):Observable<any> {
     const url = `${heroesUrl}accountActivationDeactivation/`+id;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

    AllUserFriend(id):Observable<any> {
     const url = `${heroesUrl}getAllUsrers/`+id;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

     AddToFriend(data):Observable<any> {
     const url = `${heroesUrl}sendRequest/`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

     GetNotification(id):Observable<any> {
     const url = `${heroesUrl}getAllNotifications/`+id;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

   GetFreindNotification(id):Observable<any> {
     const url = `${heroesUrl}getFriendRequests/`+id;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

   acceptOrRejectFriendRequest(data):Observable<any> {
     const url = `${heroesUrl}acceptOrRejectRequest/`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

    acceptOrRejectRequest(data):Observable<any> {
     const url = `${heroesUrl}acceptEventInvitation/`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

   Changepassword(data):Observable<any> {
     const url = `${heroesUrl}changePassword/`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

   AddUrl(data):Observable<any> {
     const url = `${heroesUrl}fetchDataFromUrl/`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

   CreateEvent(data):Observable<any> {
     const url = `${heroesUrl}createEvent/`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }
   AddMenu(data):Observable<any> {
     const url = `${heroesUrl}addMenu/`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

    addMembers(data):Observable<any> {
     const url = `${heroesUrl}addMembers/`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

    MyEvent(id):Observable<any> {
     const url = `${heroesUrl}allEvents/`+id;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }


   ContactImport(data):Observable<any> {
     const url = `${heroesUrl}contactSync/`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

   bringItem(data):Observable<any> {
     const url = `${heroesUrl}addWhatToBring/`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }
   thisEvent(id):Observable<any> {
     const url = `${heroesUrl}getEvent/`+id;
     return this.http.get<any>(url,httpOptions)
     .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }
     FetchContact(id):Observable<any> {
     const url = `${heroesUrl}fetchContactList/`;
    return this.http.post<any>(url,id,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }


   UpdateEvent(data):Observable<any> {
     const url = `${heroesUrl}editEvent/`+data.event_id;
     delete data.event_id;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

    updateMenu(data):Observable<any> {
     const url = `${heroesUrl}editEventMenu/`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

   ondeleteEvent(id):Observable<any> {
     const url = `${heroesUrl}deleteEvent/`+id;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

   EditbringItem(data):Observable<any> {
     const url = `${heroesUrl}editWhatToBring/`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

     onDeleteMemberFromEvent(data):Observable<any> {
     const url = `${heroesUrl}removeMember/`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }


    onAcceptRequestInvitationForBringItems(data):Observable<any> {
     const url = `${heroesUrl}whatToBringConfirmation/`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

    onDeleteitem(data):Observable<any> {
     const url = `${heroesUrl}removeWhatToBring/`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

     onDeletemenu(data):Observable<any> {
     const url = `${heroesUrl}removeMenu/`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }

  
      addGrades (data): Observable<any> {
     const url = `${heroesUrl}addMenuGrades`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
     
    );
  }
  
  
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
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // this.messageService.add('HeroService: ' + message);
    //console.log(message)
  }
}