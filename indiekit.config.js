import {Indiekit} from '@indiekit/indiekit';
import {JekyllPreset} from '@indiekit/preset-jekyll';
import {GithubStore} from '@indiekit/store-github';

// Create a new indiekit instance
const indiekit = new Indiekit();

// Configure GitHub content store
const github = new GithubStore({
  user: 'bmann', // Your username on GitHub
  repo: 'bmcgarden', // Repository files will be saved to
  branch: 'master', // Branch to publish to
  token: $GHTOKEN // GitHub personal access token
});

// Configure Jekyll publication preset
const jekyll = new JekyllPreset();

// Configure publication
indiekit.set('publication.me', 'https://bmannconsulting.com');
indiekit.set('publication.preset', jekyll);
indiekit.set('publication.store', github);

// Create a server
const server = indiekit.server();

// Export server
export default server;