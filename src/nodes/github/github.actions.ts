import { NodeAction, NodeContext } from '../../interfaces/node.interface';
import axios from 'axios';

export const GitHubActions: Record<string, NodeAction> = {
  createIssue: {
    name: 'Create Issue',
    description: 'Create a new issue in a GitHub repo',
    run: async (ctx: NodeContext) => {
      const { repo, title, body } = ctx.params;
      const token = ctx.credentials['github'].access_token;
      const [owner, repoName] = repo.split('/');

      const res = await axios.post(
        `https://api.github.com/repos/${owner}/${repoName}/issues`,
        { title, body },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3+json',
          },
        },
      );

      return res.data;
    },
  },

  listRepos: {
    name: 'List Repositories',
    description: 'List all repositories of the authenticated user',
    run: async (ctx: NodeContext) => {
      const token = ctx.credentials['github'].access_token;

      const res = await axios.get(`https://api.github.com/user/repos`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      return res.data;
    },
  },
};
