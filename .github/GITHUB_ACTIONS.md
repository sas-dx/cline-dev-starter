# GitHub Actions ワークフロー設定

このディレクトリには、CI/CD（継続的インテグレーション/継続的デリバリー）のためのGitHub Actionsワークフロー設定が含まれています。

## 概要

2種類のデプロイ先に対応したワークフローが用意されています：

1. **AWS デプロイ** (`workflows/aws-deploy.yml`)
   - AWS S3、CloudFront、ECR、ECSなどへのデプロイをサポート
   - 静的ウェブサイトからコンテナアプリケーションまで対応

2. **Vercel デプロイ** (`workflows/vercel-deploy.yml`)
   - Vercelへのデプロイをサポート
   - プルリクエスト時のプレビューデプロイと本番デプロイに対応

## 設定方法

### 共通設定

1. リポジトリのSettings > Secrets and variables > Actionsに移動
2. 必要なシークレットを追加

### AWS デプロイの設定

以下のシークレットを設定してください：

- `AWS_ACCESS_KEY_ID`: AWS IAMユーザーのアクセスキーID
- `AWS_SECRET_ACCESS_KEY`: AWS IAMユーザーのシークレットアクセスキー
- `AWS_REGION`: デプロイ先のAWSリージョン（例：`ap-northeast-1`）

#### 静的ウェブサイトのデプロイ（S3 + CloudFront）

- `AWS_S3_BUCKET`: デプロイ先のS3バケット名
- `AWS_CLOUDFRONT_DISTRIBUTION_ID`: CloudFrontディストリビューションID（キャッシュ無効化に使用）

#### コンテナアプリケーションのデプロイ（ECR + ECS）

- `AWS_ECR_REPOSITORY`: ECRリポジトリ名
- `AWS_ECS_CLUSTER`: ECSクラスター名
- `AWS_ECS_SERVICE`: ECSサービス名

### Vercel デプロイの設定

以下のシークレットを設定してください：

- `VERCEL_TOKEN`: Vercel CLIのトークン（Vercelダッシュボードで生成）
- `VERCEL_ORG_ID`: VercelのOrganization ID
- `VERCEL_PROJECT_ID`: VercelのProject ID

Vercelの各IDは、以下の手順で取得できます：

1. Vercel CLIをインストール: `npm i -g vercel`
2. プロジェクトディレクトリで `vercel link` を実行
3. `.vercel/project.json` ファイルに記載されている情報を確認

## ワークフローのカスタマイズ

各ワークフローファイルは、プロジェクトの要件に合わせてカスタマイズできます：

- ビルドコマンドの変更
- テスト手順の追加
- デプロイ条件の変更
- 通知設定の追加（Slack、Emailなど）

## 注意事項

- 本番環境へのデプロイは、`master`または`main`ブランチへのプッシュ時のみ実行されます
- プルリクエスト時は、ビルドとテストが実行され、Vercelの場合はプレビューデプロイも行われます
- 手動でワークフローを実行する場合は、GitHub Actionsタブから「workflow_dispatch」イベントをトリガーできます
