import { NodeAction, NodeContext } from '../../interfaces/node.interface';
import axios from 'axios';

export const TwitterActions: Record<string, NodeAction> = {
  postTweet: {
    name: 'Post Tweet',
    description: 'Post a tweet to Twitter',
    async run(ctx: NodeContext): Promise<any> {
      const { bearerToken } = ctx.credentials.twitter;
      const { text, media_ids } = ctx.params;

      const response = await axios.post(
        'https://api.twitter.com/2/tweets',
        {
          text,
          media: media_ids ? { media_ids } : undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    },
  },

  searchTweets: {
    name: 'Search Tweets',
    description: 'Search for tweets using Twitter API v2',
    async run(ctx: NodeContext): Promise<any> {
      const { bearerToken } = ctx.credentials.twitter;
      const { query, max_results, tweet_fields } = ctx.params;

      const params = new URLSearchParams({
        query,
        max_results: max_results?.toString() || '10',
      });

      if (tweet_fields) {
        params.append('tweet.fields', tweet_fields);
      }

      const response = await axios.get(
        `https://api.twitter.com/2/tweets/search/recent?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        },
      );

      return response.data;
    },
  },

  getUserTweets: {
    name: 'Get User Tweets',
    description: 'Get tweets from a specific user',
    async run(ctx: NodeContext): Promise<any> {
      const { bearerToken } = ctx.credentials.twitter;
      const { user_id, max_results, tweet_fields } = ctx.params;

      const params = new URLSearchParams({
        max_results: max_results?.toString() || '10',
      });

      if (tweet_fields) {
        params.append('tweet.fields', tweet_fields);
      }

      const response = await axios.get(
        `https://api.twitter.com/2/users/${user_id}/tweets?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        },
      );

      return response.data;
    },
  },

  likeTweet: {
    name: 'Like Tweet',
    description: 'Like a tweet',
    async run(ctx: NodeContext): Promise<any> {
      const { bearerToken } = ctx.credentials.twitter;
      const { user_id, tweet_id } = ctx.params;

      const response = await axios.post(
        `https://api.twitter.com/2/users/${user_id}/likes`,
        {
          tweet_id,
        },
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    },
  },

  retweet: {
    name: 'Retweet',
    description: 'Retweet a tweet',
    async run(ctx: NodeContext): Promise<any> {
      const { bearerToken } = ctx.credentials.twitter;
      const { user_id, tweet_id } = ctx.params;

      const response = await axios.post(
        `https://api.twitter.com/2/users/${user_id}/retweets`,
        {
          tweet_id,
        },
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    },
  },
};
