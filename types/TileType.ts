// Fields such as user_id, user_photo, display_name can be null because a tile can exist without those fields.

import { CommentType } from "./CommentType";
import { ReactionType } from "./ReactionType";

// TODO: Add reactions to this!!!
export interface TileType {
    tile_id: number;
    display_name: string | null;
    completed: boolean | null;
    date_created: Date | null;
    image_path: string | null;
    is_private: boolean| null;
    mosaic_id: number;
    num_likes: number | null;
    primary_color: string;
    user_id: number | null;
    user_photo: string | null;
    x_position: number;
    y_position: number;
    reactions: ReactionType[] | null;
    comments: CommentType[] 
}