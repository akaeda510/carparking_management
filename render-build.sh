set -o errexit

# --- 0. Gem のインストール ---
# Render環境で必要なすべてのGemをインストールします。
echo "== Installing Gems =="
bundle install

# --- 1. アセットのプリコンパイル ---
# CSSやJavaScriptファイルを本番用に最適化します。
echo "== Rails Assets Precompilation =="
bundle exec rails assets:precompile

# --- 2. データベースのマイグレーション ---
# 本番データベース（Neon）にテーブルを作成・更新します。
echo "== Rails Database Migration =="
RAILS_ENV=production bundle exec rails db:migrate

echo "== Build complete =="

npm install

PGHOST=0.0.0.0
