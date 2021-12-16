import {User} from './User.model';

export class Post {
  id?: bigint;
  user_id?: string;
  image?: string;
  title?: string;
  description?: string;
  date?: string;
  no_likes?: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  profile_pic?: string;
  is_liked_by_user: boolean;
  comments?: any;
}
