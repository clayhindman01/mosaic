export interface UserType {
    user_id: number;
    display_name: string;
    firebase_uid: string;
    user_photo: string | null;
    expo_push_token: string | null;
    user_email: string;
    private: boolean | null;
    theme: "light" | "dark";
    deleted: boolean | null;
    date_created: Date,
}

export interface UserContextType {
    user: UserType | undefined;
    setUser: (user: UserType | undefined) => void;
}