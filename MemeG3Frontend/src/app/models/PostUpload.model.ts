export class PostUpload {
  title?: string;
  description?: string;


  constructor(description: string, title: string) {
    this.description = description;
    this.title = title;
  }
}
