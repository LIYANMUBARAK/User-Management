import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Profile, User } from "./user";


export const userSelectorState = createFeatureSelector<User[]>('users')
export const profileSelectorState = createFeatureSelector<Profile[]>('profile')     


export const userSelectorData = createSelector(
    userSelectorState,
    (state: User[]) => {
        return state
    }
) 

export const profileSelectorData = createSelector(
    profileSelectorState,
    (profile:Profile[]) => profile
   
    
)    