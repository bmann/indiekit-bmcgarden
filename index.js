import 'dotenv/config.js';
import _ from 'lodash';
import {Indiekit} from '@indiekit/indiekit';
import {JekyllPreset} from '@indiekit/preset-jekyll';
import {GithubStore} from '@indiekit/store-github';

// New indiekit instance
const indiekit = new Indiekit();

// Configire publication preset
const jekyll = new JekyllPreset();

// Configure content store
const github = new GithubStore({
  user: 'bmann',
  repo: 'bmcgarden',
  branch: 'master',
  token: process.env.GITHUB_TOKEN
});

const postTypes = [
  {
  type: 'article',
  name: 'Article',
  post: {
    path: '_notes/{slug}.md',
    url: '/{slug}/'
    },
  media: {
    path: 'assets/{yyyy}/{MM}/{filename}',
    url: 'assets/{yyyy}/{MM}/{filename}'
    }
  }, {
  type: 'note',
  name: 'Note',
  post: {
    path: '_logs/{t}.md',
    url: 'log/{t}/'
    }
  }, {
    type: 'like',
    name: 'Like',
    post: {
      path: '_logs/{t}.md',
      url: 'log/{t}/'
      }
  }, {
    type: 'bookmark',
    name: 'Bookmark',
    post: {
      path: '_logs/{t}.md',
      url: 'log/{t}/'
    }
  }  
];

const storeMessageTemplate = metaData => {
  const {result, postType, fileType} = metaData;
  return `${_.upperFirst(result)} a ${postType} ${fileType}`;
};

// Application settings
// indiekit.set('application.mongodbUrl', process.env.MONGODB_URL)

// Publication settings
// indiekit.set('publication.categories', 'https://paulrobertlloyd.com/categories/index.json');
indiekit.set('publication.locale', 'en');
indiekit.set('publication.me', 'https://bmannconsulting.com');
indiekit.set('publication.postTypes', postTypes);
indiekit.set('publication.preset', jekyll);
indiekit.set('publication.slugSeparator', '-');
indiekit.set('publication.store', github);
indiekit.set('publication.storeMessageTemplate', storeMessageTemplate);
/*
indiekit.set('publication.syndicationTargets', [
  // TODO: Re-enable saving to IA when can syndicate without timing out
  // See: https://github.com/getindiekit/indiekit/issues/324
  //
  // internetArchive,
  twitter
]);
*/
indiekit.set('publication.timeZone', 'America/Vancouver');

// Server
const server = indiekit.server();

export default server;
