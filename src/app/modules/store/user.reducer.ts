import { createReducer, on } from "@ngrx/store";
import { Profile, User } from "./user";
import { fetchUserProfileAPISuccess } from "./user.action";


export const profileinitial: Profile[] = []

const _profileReducer = createReducer(
    profileinitial,
    on(fetchUserProfileAPISuccess, (_state, { profile }) => {
        return [...Object.values(profile)]
    })
)


export function profileReducer(state: any, action: any) {
    return _profileReducer(state, action)
}