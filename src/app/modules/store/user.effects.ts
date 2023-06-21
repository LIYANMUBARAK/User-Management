import { Injectable } from "@angular/core";
import { ofType, Actions, createEffect } from "@ngrx/effects";
import { AuthService } from "src/app/services/auth.service";
import {  fetchUserProfileAPI, fetchUserProfileAPISuccess } from "../store/user.action";
import { map, switchMap, tap } from "rxjs";

@Injectable()

export class userEffects {
    constructor(private actions$: Actions, private userService: AuthService) { }

    userId: string | null = localStorage.getItem('userId')

    loadUserProfile$ = createEffect(() =>
    this.actions$.pipe(
        ofType(fetchUserProfileAPI),
        switchMap(() => {
            return this.userService.fetchUserProfile(this.userId)
                .pipe(
                    tap((data)=>console.log(data)),
                    map((data) => fetchUserProfileAPISuccess({ profile: data }))
                )
        })
    )
)

}