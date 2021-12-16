export class Comment {
  id?: bigint;
  postId?: bigint;
  text?: string;
  userName: string;


  constructor(postId: bigint, text: string) {
    this.postId = postId;
    this.text = text;
  }
}
