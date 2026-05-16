const siteConfigs = {
  'ai-news': {
    rssSources: [
      { url: 'https://openai.com/blog/rss.xml', name: 'OpenAI' },
      { url: 'https://blog.google/technology/ai/rss/', name: 'Google AI' },
      { url: 'https://huggingface.co/blog/feed.xml', name: 'Hugging Face' },
      { url: 'https://techcrunch.com/category/artificial-intelligence/feed/', name: 'TechCrunch AI' },
      { url: 'https://venturebeat.com/category/ai/feed/', name: 'VentureBeat AI' },
    ],
    tags: (source) => ['AI', 'テクノロジー', source],
    contentPrompt: (item) => `以下の海外AIニュースをもとに、日本語のブログ記事をHTMLで書いてください。

ソース: ${item.source}
タイトル: ${item.title}
概要: ${item.summary}
URL: ${item.link}

【必須フォーマット】HTMLインラインスタイルで見やすく装飾すること:
- 重要キーワードは <span style="color:#e74c3c;font-weight:bold;">〜</span> で赤太字
- 数値・データは <span style="color:#2980b9;font-weight:bold;">〜</span> で青太字
- 注目ポイントのボックス: <div style="background:#e8f4fd;border-left:4px solid #3498db;padding:14px 18px;margin:20px 0;border-radius:6px;">〜</div>
- 注意・補足のボックス: <div style="background:#fff8e1;border-left:4px solid #f39c12;padding:14px 18px;margin:20px 0;border-radius:6px;">〜</div>
- h2は style="font-size:1.5em;" を付ける
- h3は style="color:#27ae60;" を付ける
- 比較や仕様がある場合はtableを使う（ヘッダー行に background:#3498db;color:#fff; を付ける）

構成（必ず守ること）:
1. 冒頭: 「〜を見て驚いた」「〜が発表されて業界がざわついている」など記者目線の導入
2. 本題の説明（h2+p、2〜3セクション）
3. 業界への影響・なぜ重要か（注目ボックスで囲む）
4. 参照元リンク
- 800〜1000字
- HTMLタグのみ出力（\`\`\`やhtml宣言・bodyタグ不要）

文体・トーン:
- テックメディア記者が書く速報記事スタイル
- 具体的な数値・データを積極的に引用（「〜億パラメータ」「〜%高速化」「〜ドルを調達」など）
- 専門用語には括弧で補足（例：「RAG（検索拡張生成）」）
- 締めは「〜の今後の動向に注目が集まりそうだ」など速報メディアらしい余韻`,
    titlePrompt: (title) => `以下を日本語のブログタイトルに変換してください。30文字以内、タイトルのみ出力。
テックメディアの速報記事タイトル風に。「〜が判明」「〜を正式発表」「〜の全貌」「〜に衝撃」みたいな報道口調で引きを作ってください。

${title}`,
  },

  'crypto-news': {
    rssSources: [
      { url: 'https://www.coindesk.com/arc/outboundfeeds/rss/', name: 'CoinDesk' },
      { url: 'https://cointelegraph.com/rss', name: 'CoinTelegraph' },
      { url: 'https://decrypt.co/feed', name: 'Decrypt' },
      { url: 'https://bitcoinmagazine.com/feed', name: 'Bitcoin' },
      { url: 'https://thedefiant.io/feed', name: 'DeFi' },
    ],
    tags: (source) => ['仮想通貨', '暗号資産', source],
    contentPrompt: (item) => `以下の海外仮想通貨ニュースをもとに、日本語のブログ記事をHTMLで書いてください。

ソース: ${item.source}
タイトル: ${item.title}
概要: ${item.summary}
URL: ${item.link}

【必須フォーマット】HTMLインラインスタイルで見やすく装飾すること:
- 重要キーワード・通貨名は <span style="color:#e74c3c;font-weight:bold;">〜</span> で赤太字
- 価格・数値は <span style="color:#f39c12;font-weight:bold;">〜</span> で金色太字
- 注目情報のボックス: <div style="background:#fff8e1;border-left:4px solid #f39c12;padding:14px 18px;margin:20px 0;border-radius:6px;">〜</div>
- 注意・リスクのボックス: <div style="background:#fdf2f8;border-left:4px solid #e91e8c;padding:14px 18px;margin:20px 0;border-radius:6px;">〜</div>
- h2は style="font-size:1.5em;" を付ける
- h3は style="color:#f39c12;" を付ける
- 価格推移や比較はtableで（ヘッダー行に background:#2c3e50;color:#fff; を付ける）

構成（必ず守ること）:
1. 冒頭: 「〜が起きていてポジション民がざわついている」など界隈目線の導入
2. 何が起きているかの解説（h2+p、2〜3セクション）
3. 「要するに何が起きてるかというと〜」のまとめを注目ボックスで
4. 投資判断は自己責任の免責を自然に添える
5. 参照元リンク
- 800〜1000字
- HTMLタグのみ出力（\`\`\`やhtml宣言・bodyタグ不要）

文体・トーン:
- 仮想通貨・Web3ガチ勢が仲間に話すようなテンション高めで正直な口調
- HODL・DeFi・ETFなどWeb3用語はそのまま使い、必要なら括弧で補足`,
    titlePrompt: (title) => `以下を日本語のブログタイトルに変換してください。30文字以内、タイトルのみ出力。
仮想通貨クラスタが「え、マジ？」「これガチ？」となるようなキャッチーな表現で。煽りすぎは不要、でも界隈のノリは出してください。

${title}`,
  },

  'nisa-blog': {
    rssSources: [
      { url: 'https://feeds.marketwatch.com/marketwatch/topstories/', name: 'MarketWatch' },
      { url: 'https://www.investing.com/rss/news.rss', name: 'Investing.com' },
      { url: 'https://news.yahoo.co.jp/rss/topics/business.xml', name: 'Yahoo経済' },
      { url: 'https://toyokeizai.net/list/feed/rss?category=money', name: '東洋経済マネー' },
      { url: 'https://cryptonews.com/news/feed/', name: '金融ニュース' },
    ],
    filterKeywords: [
      '投資', 'NISA', '積立', 'ETF', '投資信託', '資産運用', '配当', 'ファンド', 'iDeCo', '金利', '円安', '為替', '日経平均', '米国株', 'S&P', '節税', '株価', '証券', '利回り',
      'stock', 'invest', 'market', 'fund', 'dividend', 'bond', 'yield', 'Fed', 'rate', 'finance', 'retire', 'portfolio', 'Dow', 'Nasdaq', 'rally', 'inflation',
    ],
    tags: (source) => ['NISA', '投資', source],
    contentPrompt: (item) => `以下の投資・NISA関連ニュースをもとに、日本語のブログ記事をHTMLで書いてください。

ソース: ${item.source}
タイトル: ${item.title}
概要: ${item.summary}
URL: ${item.link}

【必須フォーマット】HTMLインラインスタイルで見やすく装飾すること:
- 重要ポイントは <span style="color:#c0392b;font-weight:bold;">〜</span> で強調
- 数値・金額は <span style="color:#27ae60;font-weight:bold;">〜</span> で緑太字
- まとめ・ポイントボックス: <div style="background:#e8f8f5;border-left:4px solid #27ae60;padding:14px 18px;margin:20px 0;border-radius:6px;">〜</div>
- 注意・リスクボックス: <div style="background:#fff8e1;border-left:4px solid #f39c12;padding:14px 18px;margin:20px 0;border-radius:6px;">⚠️ 〜</div>
- h2は style="font-size:1.5em;" を付ける
- h3は style="color:#27ae60;" を付ける
- 比較・数値シミュレーションはtableで（ヘッダー行に background:#27ae60;color:#fff; を付ける）

構成（必ず守ること）:
1. 冒頭: 「〜で悩んでいる方も多いのではないでしょうか」と読者に問いかけ
2. 「結論から言うと〜」「大事なポイントは〜つです」で本題（h2+p、2〜3セクション）
3. 具体的な数字例（「毎月3万円を積み立てると〜年後には〜万円に」など）
4. リスクの注意を⚠️ボックスで明記
5. 「まずは〜から始めてみましょう」という背中を押す締め
6. 参照元リンク
- 800〜1000字
- HTMLタグのみ出力（\`\`\`やhtml宣言・bodyタグ不要）

文体・トーン:
- FPが投資初心者〜中級者に説明するような丁寧で温かみのある口調`,
    titlePrompt: (title) => `以下を日本語のブログタイトルに変換してください。30文字以内、タイトルのみ出力。
NISA・投資初心者が「これ読んでみようかな」と思えるような、わかりやすくて親しみやすいタイトルにしてください。

${title}`,
  },

  'ai-image': {
    rssSources: [
      { url: 'https://stable-diffusion-art.com/feed/', name: 'Stable Diffusion' },
      { url: 'https://huggingface.co/blog/feed.xml', name: 'HuggingFace' },
      { url: 'https://venturebeat.com/category/ai/feed/', name: 'VentureBeat AI' },
      { url: 'https://techcrunch.com/category/artificial-intelligence/feed/', name: 'TechCrunch AI' },
      { url: 'https://openai.com/blog/rss.xml', name: 'OpenAI' },
    ],
    tags: (source) => ['AI画像生成', source, 'Stable Diffusion'],
    contentPrompt: (item) => `以下のAI画像生成に関するニュース・情報をもとに、日本語のブログ記事をHTMLで書いてください。

ソース: ${item.source}
タイトル: ${item.title}
概要: ${item.summary}
URL: ${item.link}

【必須フォーマット】HTMLインラインスタイルで見やすく装飾すること:
- 重要キーワード・モデル名は <span style="color:#8e44ad;font-weight:bold;">〜</span> で紫太字
- 技術パラメータ・数値は <span style="color:#e74c3c;font-weight:bold;">〜</span> で赤太字
- 試してみてポイントボックス: <div style="background:#f3e5f5;border-left:4px solid #8e44ad;padding:14px 18px;margin:20px 0;border-radius:6px;">〜</div>
- 実用TIPSボックス: <div style="background:#e8f4fd;border-left:4px solid #3498db;padding:14px 18px;margin:20px 0;border-radius:6px;">💡 〜</div>
- h2は style="font-size:1.5em;" を付ける
- h3は style="color:#8e44ad;" を付ける
- 設定値・パラメータ比較はtableで（ヘッダー行に background:#8e44ad;color:#fff; を付ける）

構成（必ず守ること）:
1. 冒頭: 「実際に試してみた」「生成してみたところ〜だった」という体験レポート口調で導入
2. 何が新しいか・何ができるか（h2+p、2〜3セクション）
3. 実用TIPSを💡ボックスで（プロンプト例・設定値など）
4. 「個人的にここが一番テンション上がった」という感情コメント
5. 「ぜひ試してみてください！」という読者を巻き込む締め
6. 参照元リンク
- 800〜1000字
- HTMLタグのみ出力（\`\`\`やhtml宣言・bodyタグ不要）

文体・トーン:
- AI画像生成を実際に使っているクリエイターが興奮気味に報告する体験レポート口調
- LoRA・CFG・Sampler・ControlNetなどの技術用語を自然に使いつつ括弧で補足`,
    titlePrompt: (title) => `以下を日本語のブログタイトルに変換してください。30文字以内、タイトルのみ出力。
AI画像生成クラスタが「え、これ気になる」「試してみたい」となるような、ワクワク感のあるタイトルにしてください。

${title}`,
  },

  'overseas-tools': {
    rssSources: [
      { url: 'https://www.producthunt.com/feed', name: 'ProductHunt' },
      { url: 'https://techcrunch.com/feed/', name: 'SaaS' },
      { url: 'https://venturebeat.com/feed/', name: 'AI Tools' },
      { url: 'https://thenextweb.com/feed/', name: 'Dev Tools' },
      { url: 'https://zapier.com/blog/feeds/latest/', name: 'Zapier' },
    ],
    tags: (source) => ['海外ツール', 'SaaS', source],
    contentPrompt: (item) => `以下の海外SaaS・ツールに関するニュースをもとに、日本語のブログ記事をHTMLで書いてください。

ソース: ${item.source}
タイトル: ${item.title}
概要: ${item.summary}
URL: ${item.link}

条件:
- h2タグで見出し（2〜3個）
- pタグで本文
- 最後に参照元リンク
- 600〜800字
- HTMLタグのみ出力（\`\`\`やhtml宣言・bodyタグ不要）

文体・トーン（重要）:
- 新しい海外ツールを見つけて興奮した旅行ブロガーが友達に「これ見て！！」と紹介するような発見感あるノリ
- 「これ、見つけてしまいました...！」「知ってる人まだ少ないかも」みたいな発見の興奮を演出する
- 必ず「日本語対応：あり / なし」「料金：無料プランあり / 月額$XX〜 / 完全無料」という実用情報をどこかに明記する
- 「日本人にはこういう使い方が合いそう」「英語が苦手でも〜なのでOK」という日本人目線の解説を入れる
- 「個人的には〜の機能が特に好きです」「〜に比べて〜な点が優れてる」という比較・感想も入れる
- 締めは「とりあえず無料で試してみてください！損はしないはず」など背中を押す一言で`,
    titlePrompt: (title) => `以下を日本語のブログタイトルに変換してください。30文字以内、タイトルのみ出力。
海外ツールに興味ある人が「え、こんなの出たの？」「気になる！」となるような、発見感のある親しみやすいタイトルにしてください。

${title}`,
  },
}

module.exports = siteConfigs
