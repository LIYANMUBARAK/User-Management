import { Injectable } from "@angular/core";
import { ofType, Actions, createEffect } from "@ngrx/effects";
import { AuthService } from "src/app/services/auth.service";
import {  fetchUserAPI, fetchUserAPISuccess, fetchUserProfileAPI, fetchUserProfileAPISuccess } from "../store/user.action";
import { map, switchMap, tap } from "rxjs";

@Injectable()

export class userEffects {
    constructor(private actions$: Actions, private userService: AuthService) { }

 
    loadUserProfile$ = createEffect(() =>
    this.actions$.pipe(
        ofType(fetchUserProfileAPI),
        switchMap(() => {
            let userId: string | null = localStorage.getItem('userId')

            return this.userService.fetchUserProfile(userId)
                .pipe(
                    tap((data)=>console.log(data)),
                    map((data) => fetchUserProfileAPISuccess({ profile: data }))
                )
        })
    )
)

    

loadAllUsers$ = createEffect(() =>
this.actions$.pipe(
    ofType(fetchUserAPI),
    switchMap(() => {
        return this.userService.fetchAllUsers()
            .pipe(
                map((data) => fetchUserAPISuccess({ allUser: Object.values(data) }))
            )
    })
)
)



}