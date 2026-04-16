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

条件:
- h2タグで見出し（2〜3個）
- pタグで本文
- 最後に参照元リンク
- 600〜800字
- HTMLタグのみ出力（\`\`\`やhtml宣言・bodyタグ不要）

文体・トーン（重要）:
- テックメディアの記者が書く「速報記事」スタイル。見出しは「〜が明らかに」「〜を正式発表」「〜が確認」など報道口調で
- 具体的な数値・データを積極的に引用（「〜億パラメータ」「〜%高速化」「〜ドルを調達」など）
- 「これが業界に与える影響は〜」「競合各社も〜」という分析コメントを1段落入れる
- 専門用語には括弧で補足（例：「RAG（検索拡張生成）」）
- 締めは「〜の今後の動向に注目が集まりそうだ」など速報メディアらしい余韻のある終わり方`,
    titlePrompt: (title) => `以下を日本語のブログタイトルに変換してください。30文字以内、タイトルのみ出力。
テックメディアの速報記事タイトル風に。「〜が判明」「〜を正式発表」「〜の全貌」「〜に衝撃」みたいな報道口調で引きを作ってください。

${title}`,
  },

  'crypto-news': {
    rssSources: [
      { url: 'https://www.coindesk.com/arc/outboundfeeds/rss/', name: 'CoinDesk' },
      { url: 'https://cointelegraph.com/rss', name: 'CoinTelegraph' },
      { url: 'https://decrypt.co/feed', name: 'Decrypt' },
      { url: 'https://bitcoinmagazine.com/.rss/full/', name: 'Bitcoin' },
      { url: 'https://thedefiant.io/feed', name: 'DeFi' },
    ],
    tags: (source) => ['仮想通貨', '暗号資産', source],
    contentPrompt: (item) => `以下の海外仮想通貨ニュースをもとに、日本語のブログ記事をHTMLで書いてください。

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
- 仮想通貨・Web3界隈のガチ勢が仲間内チャンネルで話すような、テンション高めで正直な口調
- 「これ正直ヤバくないですか」「HODLerには朗報ですね」「草不可避」みたいなコミュニティ語を自然に使う（多用しすぎずさらっと）
- 「要するに何が起きてるかというと〜」「ポジション民的には〜」という咀嚼コメントを必ず入れる
- 市場への影響を考察するが断定・煽りはNG。必ず「あくまで個人の見解です、投資判断は自己責任で」を自然に添える
- HODL・DeFi・PoS・ETFなどWeb3用語はそのまま使い、必要なら括弧で短く補足`,
    titlePrompt: (title) => `以下を日本語のブログタイトルに変換してください。30文字以内、タイトルのみ出力。
仮想通貨クラスタが「え、マジ？」「これガチ？」となるようなキャッチーな表現で。煽りすぎは不要、でも界隈のノリは出してください。

${title}`,
  },

  'nisa-blog': {
    rssSources: [
      { url: 'https://finance.yahoo.co.jp/rss/news', name: '新NISA' },
      { url: 'https://www.morningstar.co.jp/rss/news.rss', name: '投資信託' },
      { url: 'https://kabutan.jp/rss/', name: '株式' },
      { url: 'https://etf.openfunds.jp/rss', name: 'ETF' },
      { url: 'https://media.moneyforward.com/feed', name: '節税' },
    ],
    tags: (source) => ['NISA', '投資', source],
    contentPrompt: (item) => `以下の投資・NISA関連ニュースをもとに、日本語のブログ記事をHTMLで書いてください。

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
- ファイナンシャルプランナー（FP）が投資初心者〜中級者に説明するような、丁寧で温かみのある口調
- 最初の段落で「〜で悩んでいる方も多いのではないでしょうか」と読者に問いかけてから入る
- 「結論から言うと〜」「大事なポイントは2つです」などわかりやすい構成を意識する
- 「たとえば毎月3万円を積み立てると〜年後には〜万円に」のような具体的な数字例を使う
- リスクについては必ず「ただし〜には注意が必要です」「元本割れのリスクもあります」と触れる
- 締めは「難しく考えすぎなくて大丈夫です。まずは〜から始めてみましょう」という背中を押す言葉で`,
    titlePrompt: (title) => `以下を日本語のブログタイトルに変換してください。30文字以内、タイトルのみ出力。
NISA・投資初心者が「これ読んでみようかな」と思えるような、わかりやすくて親しみやすいタイトルにしてください。

${title}`,
  },

  'ai-image': {
    rssSources: [
      { url: 'https://stability.ai/blog/rss.xml', name: 'Stable Diffusion' },
      { url: 'https://www.midjourney.com/blog/rss.xml', name: 'Midjourney' },
      { url: 'https://comfyanonymous.github.io/ComfyUI_examples/feed.xml', name: 'ComfyUI' },
      { url: 'https://venturebeat.com/category/ai/feed/', name: 'FLUX' },
      { url: 'https://huggingface.co/blog/feed.xml', name: 'LoRA' },
    ],
    tags: (source) => ['AI画像生成', source, 'Stable Diffusion'],
    contentPrompt: (item) => `以下のAI画像生成に関するニュース・情報をもとに、日本語のブログ記事をHTMLで書いてください。

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
- AI画像生成を実際に使っているクリエイターが「これ試してみた！」と興奮気味に報告するような体験レポート口調
- 「実際に生成してみたところ〜」「プロンプトに〜を追加したらこうなった」のような体験談を自然に差し込む
- LoRA・CFG・Sampler・ControlNetなどの技術用語は自然に使いつつ括弧で補足（例：「CFG（プロンプトへの忠実度）を7に設定したところ〜」）
- 「〜な絵柄を作りたい人はここをチェック」「ポイントはネガティブプロンプトの〜の部分」という実用的アドバイスを入れる
- 「個人的にここが一番テンション上がりました」「次はこれも試してみます」という感情・期待感を込める
- 締めは「ぜひ実際に試してみてください！あなたの作品が見たいです」など読者を巻き込む形で`,
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
      { url: 'https://www.nocode.tech/rss', name: 'No-code' },
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
