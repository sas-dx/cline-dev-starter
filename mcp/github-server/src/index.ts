#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';

// 環境変数の読み込み
dotenv.config();

// GitHub APIトークンの取得
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// GitHub APIクライアントの初期化
const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

// 引数の型定義
interface GetRepoInfoArgs {
  owner: string;
  repo: string;
}

interface CreateIssueArgs {
  owner: string;
  repo: string;
  title: string;
  body?: string;
  labels?: string[];
  assignees?: string[];
}

interface ListIssuesArgs {
  owner: string;
  repo: string;
  state?: 'open' | 'closed' | 'all';
  labels?: string;
  sort?: 'created' | 'updated' | 'comments';
  direction?: 'asc' | 'desc';
  per_page?: number;
  page?: number;
}

interface CreatePullRequestArgs {
  owner: string;
  repo: string;
  title: string;
  body?: string;
  head: string;
  base: string;
  draft?: boolean;
}

interface ListPullRequestsArgs {
  owner: string;
  repo: string;
  state?: 'open' | 'closed' | 'all';
  sort?: 'created' | 'updated' | 'popularity' | 'long-running';
  direction?: 'asc' | 'desc';
  per_page?: number;
  page?: number;
}

// 引数の検証関数
const isValidGetRepoInfoArgs = (args: any): args is GetRepoInfoArgs =>
  typeof args === 'object' &&
  args !== null &&
  typeof args.owner === 'string' &&
  typeof args.repo === 'string';

const isValidCreateIssueArgs = (args: any): args is CreateIssueArgs =>
  typeof args === 'object' &&
  args !== null &&
  typeof args.owner === 'string' &&
  typeof args.repo === 'string' &&
  typeof args.title === 'string' &&
  (args.body === undefined || typeof args.body === 'string') &&
  (args.labels === undefined || Array.isArray(args.labels)) &&
  (args.assignees === undefined || Array.isArray(args.assignees));

const isValidListIssuesArgs = (args: any): args is ListIssuesArgs =>
  typeof args === 'object' &&
  args !== null &&
  typeof args.owner === 'string' &&
  typeof args.repo === 'string' &&
  (args.state === undefined || ['open', 'closed', 'all'].includes(args.state)) &&
  (args.labels === undefined || typeof args.labels === 'string') &&
  (args.sort === undefined || ['created', 'updated', 'comments'].includes(args.sort)) &&
  (args.direction === undefined || ['asc', 'desc'].includes(args.direction)) &&
  (args.per_page === undefined || typeof args.per_page === 'number') &&
  (args.page === undefined || typeof args.page === 'number');

const isValidCreatePullRequestArgs = (args: any): args is CreatePullRequestArgs =>
  typeof args === 'object' &&
  args !== null &&
  typeof args.owner === 'string' &&
  typeof args.repo === 'string' &&
  typeof args.title === 'string' &&
  (args.body === undefined || typeof args.body === 'string') &&
  typeof args.head === 'string' &&
  typeof args.base === 'string' &&
  (args.draft === undefined || typeof args.draft === 'boolean');

const isValidListPullRequestsArgs = (args: any): args is ListPullRequestsArgs =>
  typeof args === 'object' &&
  args !== null &&
  typeof args.owner === 'string' &&
  typeof args.repo === 'string' &&
  (args.state === undefined || ['open', 'closed', 'all'].includes(args.state)) &&
  (args.sort === undefined || ['created', 'updated', 'popularity', 'long-running'].includes(args.sort)) &&
  (args.direction === undefined || ['asc', 'desc'].includes(args.direction)) &&
  (args.per_page === undefined || typeof args.per_page === 'number') &&
  (args.page === undefined || typeof args.page === 'number');

class GitHubServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: 'github.com/modelcontextprotocol/servers/tree/main/src/github',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    
    // エラーハンドリング
    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'get_repo_info',
          description: 'GitHubリポジトリの情報を取得します',
          inputSchema: {
            type: 'object',
            properties: {
              owner: {
                type: 'string',
                description: 'リポジトリのオーナー名',
              },
              repo: {
                type: 'string',
                description: 'リポジトリ名',
              },
            },
            required: ['owner', 'repo'],
          },
        },
        {
          name: 'create_issue',
          description: 'GitHubリポジトリに新しいイシューを作成します',
          inputSchema: {
            type: 'object',
            properties: {
              owner: {
                type: 'string',
                description: 'リポジトリのオーナー名',
              },
              repo: {
                type: 'string',
                description: 'リポジトリ名',
              },
              title: {
                type: 'string',
                description: 'イシューのタイトル',
              },
              body: {
                type: 'string',
                description: 'イシューの本文',
              },
              labels: {
                type: 'array',
                items: {
                  type: 'string',
                },
                description: 'イシューに付けるラベルのリスト',
              },
              assignees: {
                type: 'array',
                items: {
                  type: 'string',
                },
                description: 'イシューに割り当てるユーザーのリスト',
              },
            },
            required: ['owner', 'repo', 'title'],
          },
        },
        {
          name: 'list_issues',
          description: 'GitHubリポジトリのイシュー一覧を取得します',
          inputSchema: {
            type: 'object',
            properties: {
              owner: {
                type: 'string',
                description: 'リポジトリのオーナー名',
              },
              repo: {
                type: 'string',
                description: 'リポジトリ名',
              },
              state: {
                type: 'string',
                enum: ['open', 'closed', 'all'],
                description: 'イシューの状態',
              },
              labels: {
                type: 'string',
                description: 'カンマ区切りのラベルリスト',
              },
              sort: {
                type: 'string',
                enum: ['created', 'updated', 'comments'],
                description: 'ソート方法',
              },
              direction: {
                type: 'string',
                enum: ['asc', 'desc'],
                description: 'ソート順序',
              },
              per_page: {
                type: 'number',
                description: '1ページあたりの結果数',
              },
              page: {
                type: 'number',
                description: 'ページ番号',
              },
            },
            required: ['owner', 'repo'],
          },
        },
        {
          name: 'create_pull_request',
          description: 'GitHubリポジトリに新しいプルリクエストを作成します',
          inputSchema: {
            type: 'object',
            properties: {
              owner: {
                type: 'string',
                description: 'リポジトリのオーナー名',
              },
              repo: {
                type: 'string',
                description: 'リポジトリ名',
              },
              title: {
                type: 'string',
                description: 'プルリクエストのタイトル',
              },
              body: {
                type: 'string',
                description: 'プルリクエストの本文',
              },
              head: {
                type: 'string',
                description: '変更を含むブランチ',
              },
              base: {
                type: 'string',
                description: 'マージ先のブランチ',
              },
              draft: {
                type: 'boolean',
                description: 'ドラフトプルリクエストとして作成するかどうか',
              },
            },
            required: ['owner', 'repo', 'title', 'head', 'base'],
          },
        },
        {
          name: 'list_pull_requests',
          description: 'GitHubリポジトリのプルリクエスト一覧を取得します',
          inputSchema: {
            type: 'object',
            properties: {
              owner: {
                type: 'string',
                description: 'リポジトリのオーナー名',
              },
              repo: {
                type: 'string',
                description: 'リポジトリ名',
              },
              state: {
                type: 'string',
                enum: ['open', 'closed', 'all'],
                description: 'プルリクエストの状態',
              },
              sort: {
                type: 'string',
                enum: ['created', 'updated', 'popularity', 'long-running'],
                description: 'ソート方法',
              },
              direction: {
                type: 'string',
                enum: ['asc', 'desc'],
                description: 'ソート順序',
              },
              per_page: {
                type: 'number',
                description: '1ページあたりの結果数',
              },
              page: {
                type: 'number',
                description: 'ページ番号',
              },
            },
            required: ['owner', 'repo'],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const toolName = request.params.name;
      const args = request.params.arguments;

      try {
        switch (toolName) {
          case 'get_repo_info':
            return await this.handleGetRepoInfo(args);
          case 'create_issue':
            return await this.handleCreateIssue(args);
          case 'list_issues':
            return await this.handleListIssues(args);
          case 'create_pull_request':
            return await this.handleCreatePullRequest(args);
          case 'list_pull_requests':
            return await this.handleListPullRequests(args);
          default:
            throw new McpError(
              ErrorCode.MethodNotFound,
              `Unknown tool: ${toolName}`
            );
        }
      } catch (error) {
        console.error(`[GitHub API Error] ${toolName}:`, error);
        if (error instanceof McpError) {
          throw error;
        }
        throw new McpError(
          ErrorCode.InternalError,
          `GitHub API error: ${(error as Error).message}`
        );
      }
    });
  }

  private async handleGetRepoInfo(args: any) {
    if (!isValidGetRepoInfoArgs(args)) {
      throw new McpError(
        ErrorCode.InvalidParams,
        'Invalid repository info arguments'
      );
    }

    const { owner, repo } = args;

    try {
      console.error(`リポジトリ情報を取得します: ${owner}/${repo}`);
      const response = await octokit.repos.get({
        owner,
        repo,
      });

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(response.data, null, 2),
          },
        ],
      };
    } catch (error) {
      console.error('リポジトリ情報取得エラー:', error);
      throw new McpError(
        ErrorCode.InternalError,
        `リポジトリ情報の取得に失敗しました: ${(error as Error).message}`
      );
    }
  }

  private async handleCreateIssue(args: any) {
    if (!isValidCreateIssueArgs(args)) {
      throw new McpError(
        ErrorCode.InvalidParams,
        'Invalid create issue arguments'
      );
    }

    const { owner, repo, title, body, labels, assignees } = args;

    try {
      console.error(`イシューを作成します: ${owner}/${repo} - ${title}`);
      const response = await octokit.issues.create({
        owner,
        repo,
        title,
        body,
        labels,
        assignees,
      });

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(response.data, null, 2),
          },
        ],
      };
    } catch (error) {
      console.error('イシュー作成エラー:', error);
      throw new McpError(
        ErrorCode.InternalError,
        `イシューの作成に失敗しました: ${(error as Error).message}`
      );
    }
  }

  private async handleListIssues(args: any) {
    if (!isValidListIssuesArgs(args)) {
      throw new McpError(
        ErrorCode.InvalidParams,
        'Invalid list issues arguments'
      );
    }

    const { owner, repo, state, labels, sort, direction, per_page, page } = args;

    try {
      console.error(`イシュー一覧を取得します: ${owner}/${repo}`);
      const response = await octokit.issues.listForRepo({
        owner,
        repo,
        state,
        labels,
        sort,
        direction,
        per_page,
        page,
      });

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(response.data, null, 2),
          },
        ],
      };
    } catch (error) {
      console.error('イシュー一覧取得エラー:', error);
      throw new McpError(
        ErrorCode.InternalError,
        `イシュー一覧の取得に失敗しました: ${(error as Error).message}`
      );
    }
  }

  private async handleCreatePullRequest(args: any) {
    if (!isValidCreatePullRequestArgs(args)) {
      throw new McpError(
        ErrorCode.InvalidParams,
        'Invalid create pull request arguments'
      );
    }

    const { owner, repo, title, body, head, base, draft } = args;

    try {
      console.error(`プルリクエストを作成します: ${owner}/${repo} - ${title}`);
      const response = await octokit.pulls.create({
        owner,
        repo,
        title,
        body,
        head,
        base,
        draft,
      });

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(response.data, null, 2),
          },
        ],
      };
    } catch (error) {
      console.error('プルリクエスト作成エラー:', error);
      throw new McpError(
        ErrorCode.InternalError,
        `プルリクエストの作成に失敗しました: ${(error as Error).message}`
      );
    }
  }

  private async handleListPullRequests(args: any) {
    if (!isValidListPullRequestsArgs(args)) {
      throw new McpError(
        ErrorCode.InvalidParams,
        'Invalid list pull requests arguments'
      );
    }

    const { owner, repo, state, sort, direction, per_page, page } = args;

    try {
      console.error(`プルリクエスト一覧を取得します: ${owner}/${repo}`);
      const response = await octokit.pulls.list({
        owner,
        repo,
        state,
        sort,
        direction,
        per_page,
        page,
      });

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(response.data, null, 2),
          },
        ],
      };
    } catch (error) {
      console.error('プルリクエスト一覧取得エラー:', error);
      throw new McpError(
        ErrorCode.InternalError,
        `プルリクエスト一覧の取得に失敗しました: ${(error as Error).message}`
      );
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('GitHub MCP server running on stdio');
  }
}

const server = new GitHubServer();
server.run().catch(console.error);
