import { NavigationRoutes } from "../navigation/RootNavigator"

export type AlertType = {
    notification_id: number,
    type: NavigationRoutes,
    type_id: number,
    deletedAt: string | null,
    createdAt: string,
    is_active: number,
    notification_text: string,
    user_id: number
}

export type AlertResponseType = {
    notifications: AlertType[],
    hasActive: boolean  
}