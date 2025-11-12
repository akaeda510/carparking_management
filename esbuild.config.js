const path = require('path');
const esbuild = require('esbuild');
const rails = require('esbuild-rails');
const { execSync } = require('child_process');

// Tailwind CSSをビルドするための環境変数を設定
// ログにtailwindcss v4.1.16と出ていたため、Tailwindのビルドは別個で行う
try {
  // Tailwind CSSをコンパイルし、app/assets/builds/application.css を生成する
  execSync('npx tailwindcss -i ./app/assets/stylesheets/application.tailwind.css -o ./app/assets/builds/application.css --minify');
  console.log('Tailwind CSS compiled successfully.');
} catch (error) {
  console.error('Tailwind CSS compilation failed:', error.message);
  // エラーがあっても esbuild の処理は続行
}

// Esbuild設定
const config = {
  entryPoints: ['application.js'], // app/javascript/application.js を参照
  bundle: true,
  outdir: path.join(process.cwd(), 'app/assets/builds'),
  absWorkingDir: path.join(process.cwd(), 'app/javascript'),
  sourcemap: true,
  publicPath: '/assets',
  plugins: [
    rails(),
  ],
};

// Esbuild ビルド実行
esbuild.build(config).catch((e) => {
  console.error('Esbuild failed:', e);
  process.exit(1);
});
