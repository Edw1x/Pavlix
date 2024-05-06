import { TitleModel } from './title.interface';

export interface TitleDetails extends TitleModel {
    trailer?: string;
    trailer_embed_link?: string;
    trailer_youtube_id?: string;
    director?: string[];
    writers?: string[];
}
