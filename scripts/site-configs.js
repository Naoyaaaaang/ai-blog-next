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

文体・トーン:
- AI好きな人が友達に話しかけるような、ゆるくて親しみやすい口調
- 「〜ですね」「〜らしいですよ」「これ、けっこうすごくないですか？」みたいな自然な語り口
- 難しい専門用語は出てきたら「要するに〜ってこと」とさらっと補足
- 驚きや感想をちょこちょこ挟む（「正直びっくりしました」「個人的にはここが熱い」など）
- お堅いニュース記事や教科書っぽい文体はNG、でも雑すぎるのもNG`,
    titlePrompt: (title) => `以下を日本語のブログタイトルに変換してください。30文字以内、タイトルのみ出力。\n「すごい」「ヤバい」「話題」みたいなちょっと気になるキャッチーな言い回しにしてください。煽りすぎは不要、でも読みたくなるくらいの引きは欲しいです。\n\n${title}`,
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

文体・トーン:
- 仮想通貨に興味ある人が仲間に教えるような、テンション高めだけど的確な口調
- 「これ上がりそうじゃないですか？」「ちょっと待って、これかなりアツい話では」みたいなノリ
- 価格動向や規制ニュースは「つまりどういうこと？」を必ず補足
- 投資判断を煽るのはNG。あくまで情報共有のスタンスで
- 専門用語（DeFi、PoS、ETFなど）は出てきたらさらっと解説`,
    titlePrompt: (title) => `以下を日本語のブログタイトルに変換してください。30文字以内、タイトルのみ出力。\n仮想通貨・投資クラスタが「え、マジ？」となるようなキャッチーな表現にしてください。煽りすぎはNGですが、興味を引く引きは欲しいです。\n\n${title}`,
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

文体・トーン:
- 投資初心者〜中級者に向けた、親しみやすくてわかりやすい解説
- 「要するにこういうことです」「初心者の人はここだけ覚えておけばOK」みたいな補足が自然に入る
- 難しい制度・用語はかみ砕いて説明（難しいままにしない）
- 「儲かる」「必ず上がる」などの断定はNG。あくまで情報共有として
- 具体例があると読みやすくなるので積極的に使う`,
    titlePrompt: (title) => `以下を日本語のブログタイトルに変換してください。30文字以内、タイトルのみ出力。\nNISA・投資に興味ある人が「ちょっと読んでみようかな」と思えるようなわかりやすいタイトルにしてください。\n\n${title}`,
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

文体・トーン:
- AI画像生成を楽しんでいる人が仲間に「これ試してみた？」と教えるような口調
- 「モデルの特徴」「使いどころ」「何がすごいか」を具体的に
- LoRA、CFG、Samplerなどの用語は出てきたらさらっと補足
- 「早速試してみたい！」という気持ちになるような締めにする
- 技術的すぎず、でも表面だけをなぞる薄い記事にもしない`,
    titlePrompt: (title) => `以下を日本語のブログタイトルに変換してください。30文字以内、タイトルのみ出力。\nAI画像生成クラスタが「え、これ気になる」となるようなキャッチーな表現にしてください。\n\n${title}`,
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

文体・トーン:
- 海外の新しいツールを日本の人に「こんなの出たよ！」と紹介するような親しみやすい口調
- 「何ができるか」「誰に向いているか」「日本での使いどころ」を明確に
- 英語の固有名詞はそのまま使いつつ、意味はちゃんと説明する
- 「これ無料で使えるの！？」「月額いくら？」みたいな実用的な情報も入れる
- あくまで紹介記事なので、過度な宣伝にならないよう中立的に`,
    titlePrompt: (title) => `以下を日本語のブログタイトルに変換してください。30文字以内、タイトルのみ出力。\n海外ツールに興味ある人が「え、こんなの出たの？」となるような、わかりやすくて気になるタイトルにしてください。\n\n${title}`,
  },
}

module.exports = siteConfigs
