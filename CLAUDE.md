# Miraido 公式サイト エージェント統一ガイド

**プロジェクト:** Miraido 公式Webサイト
**リポジトリ:** MIRAIDO-projects/miraido
**本番:** https://mieaido.net
**ホスティング:** Cloudflare Pages（GitHub main push → 自動デプロイ）
**リーダー:** ももたろう（CEO）
**最終更新:** 2026-03-20

---

## 📋 技術スタック

| カテゴリ | 技術 | バージョン |
|---------|------|-----------|
| フレームワーク | Astro（SSG） | ^5.16.8 |
| スタイリング | Tailwind CSS + Vite プラグイン | ^4.1.18 |
| CMS | microCMS JS SDK | ^3.2.0 |
| アニメーション | GSAP（ScrollTrigger） | ^3.14.2 |
| スムーススクロール | Lenis | ^1.3.17 |

> **重要:** このプロジェクトは **純粋な Astro SSG サイト**。React は使用していない。全てのUI・ページは `.astro` コンポーネントで構成。

---

## 🏗 アーキテクチャ

```
src/
├── pages/              ← Astro ルーティング（SSG）
│   ├── index.astro          トップページ
│   ├── about.astro          団体概要
│   ├── sponsor.astro        スポンサー紹介
│   ├── privacy.astro        プライバシーポリシー
│   ├── legal.astro          特定商取引法
│   ├── 404.astro            404ページ
│   ├── blogs/               ブログ一覧 + 詳細（microCMS）
│   ├── news/                ニュース一覧 + 詳細（microCMS）
│   ├── projects/            プロジェクト一覧 + 詳細（microCMS）
│   ├── contact/             お問い合わせ（index, sponsor, thanks）
│   └── wro2025/             WRO 2025 特設ページ
├── layouts/
│   └── Layout.astro         唯一のレイアウト（Seo, Header, Footer, CookieHud, Lenis+GSAP初期化）
├── components/
│   ├── Header.astro         グローバルヘッダー
│   ├── Footer.astro         グローバルフッター
│   ├── Seo.astro            SEOメタタグ
│   ├── Welcome.astro        ウェルカムセクション
│   ├── ContactForm.astro    お問い合わせフォーム
│   ├── DragonAnimation.astro ドラゴンアニメーション
│   ├── ui/CookieHud.astro   Cookie同意バナー
│   └── blog/                ブログ用コンポーネント
│       ├── BentoGrid.astro
│       ├── CodeBlock.astro
│       ├── AuthorBio.astro
│       ├── RichText.astro
│       └── TableOfContents.astro
├── lib/
│   └── microcms.ts          microCMS クライアント（全API関数）
├── types/
│   └── microcms.ts          microCMS 型定義
├── styles/
│   └── global.css           グローバルスタイル
└── assets/
    ├── background.svg
    └── astro.svg
```

### public/
```
public/
├── favicon.svg
└── images/
    ├── line_qr.png
    └── logo-white.svg
```

---

## 📡 microCMS 連携

クライアント: `src/lib/microcms.ts`

| エンドポイント | 型 | 用途 |
|--------------|-----|------|
| `blogs` | Blog | ブログ記事（Block System対応） |
| `news` | News | ニュース |
| `projects` | Project | プロジェクト |
| `sponsors` | Sponsor | スポンサー |

- blogs/news は `targetSites[contains]miraido` フィルタでMiraido向け記事を取得
- API失敗時は空配列 `{ contents: [] }` にフォールバック（ビルド破壊防止）
- 環境変数: `MICROCMS_SERVICE_DOMAIN`, `MICROCMS_API_KEY`

---

## 🎨 デザイン特徴

- **Day-Night Cycle背景:** Layout.astro にCSS keyframeアニメーション（60秒サイクル）
- **スムーススクロール:** Lenis + GSAP ScrollTrigger 連携
- **フォント:** Zen Old Mincho（Google Fonts）

---

## 🔄 ワークフロー

```
ももたろう → 実装（implementer）→ レビュー（reviewer）→ デプロイ
```

### 基本フロー
1. implementer エージェントでコード実装
2. reviewer エージェントで品質チェック
3. 🔴重大な指摘 → implementer に差し戻し
4. 🟡軽微・💡提案のみ → 完了

### Reviewer チェックリスト
```
✅ npm run build 成功（エラー・警告なし）
✅ npm run preview で全ページ表示確認
✅ SEO メタタグ（og:title, og:description, og:image）
✅ microCMS API フォールバック動作
✅ Cookie バナー表示
✅ フォーム → /contact/thanks 遷移
✅ Git コミット整合性
```

---

## 🚀 コマンド

```bash
npm run dev       # localhost:4321
npm run build     # dist/ 出力（SSG）
npm run preview   # ビルド結果確認
```

---

## 📌 注意事項

- **Reactは使わない** — 全て Astro コンポーネントで実装
- **作業前後は必ず Git コミット** — コミットなしの大規模変更は禁止
- コード実装は implementer エージェントに委譲する
- 実装後は必ず reviewer エージェントでレビューする
