import {User} from './User.model';

export class Post {
  id?: bigint;
  user_id?: string;
  image?: string;
  title?: string;
  description?: string;
  date?: string;
  no_likes?: bigint;
  username?: string;
  first_name?: string;
  last_name?: string;
  profile_pic?: string;

}
