
import { Injectable } from '@angular/core';
import { createClient, Entry, Space, ContentfulClientApi  } from 'contentful';
/*
  Generated class for the ContentfulProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.

*/
const CONFIG = {
  credentials:{
  space: 'j6ja5v0w6c8u',
  accessToken: 'd27933a8305e96a93ae265b5da40ba152c53c77694de7027b42d620537563f60',
  },

  contentTypeIds: {
    event: 'event',
  }
};

@Injectable()
export class ContentfulProvider {
  cdaClient: ContentfulClientApi;
  config: {
    space: string,
    accessToken: string
  };

  titleHandlers: Function[]


  constructor() {
    try {
      this.config = JSON.parse(localStorage.catalogConfig);
    } catch (e) {
      this.config = CONFIG.credentials;
    }

    this.titleHandlers = [];
    this._createClient();
    this.getSpace();
}

  onTitleChange(fn): void {
    this.titleHandlers.push(fn)
  }

  // get the current space
  getSpace(): Promise<Space> {
    return this.cdaClient.getSpace()
      .then(space => {
        this.titleHandlers.forEach(handler => handler(space.name))

        return space;
      })
    }

  // fetch homeware items
  getEventItems(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: CONFIG.contentTypeIds.event
    }, query))
      .then(res => res.items);
  }
    // return a custom config if available
    getConfig(): { space: string, accessToken: string } {
      return this.config !== CONFIG.credentials ?
        Object.assign({}, this.config) :
        { space: '', accessToken: '' };
    }

    // set a new config and store it in localStorage
    setConfig(config: {space: string, accessToken: string}) {
      localStorage.setItem('catalogConfig', JSON.stringify(config));
      this.config = config;

      this._createClient();
      this.getSpace();

      return Object.assign({}, this.config);
    }

   // set config back to default values
   resetConfig() {
    localStorage.removeItem('catalogConfig');
    this.config = CONFIG.credentials;

    this._createClient();
    this.getSpace();

    return Object.assign({}, this.config);
  }

  _createClient() {
    this.cdaClient = createClient({
      space: this.config.space,
      accessToken: this.config.accessToken
    });
  }

}
