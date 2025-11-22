import { Injectable } from '@angular/core';

import { dbSetterClassesWrapper } from '../../db-process.utils';

import { ads } from '../../../../../databases/datasources/ads.datasource';
import { Post } from 'src/databases/entities';

import { AlertService } from '../../../../services/alert/alert.service';

@Injectable({
  providedIn: 'any'
})
export class DbPostSetService {

  constructor(
    private alert: AlertService
  ) {}

  async savePost(authorId: number, post: Post) {
    try {
      let toSavePost = await ads.getRepository(Post).findOneBy({
        authorId
      })
      if(!toSavePost) toSavePost = new Post();
      Object.assign(toSavePost, post);
      await ads.getRepository(Post).save(toSavePost);
    } catch(e) {
      this.alert.showError('Create Post', e);
      throw e;
    }
  }

}

dbSetterClassesWrapper(DbPostSetService);
