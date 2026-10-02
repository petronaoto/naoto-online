/**
 * 2026 アルプス・バイクツーリング旅行記の本文。
 * ja が原文。本文は Claude が写真の撮影時刻（UTC→CEST）と計画書をもとに下書きしたもの。
 * km は旅全体の累積走行距離（profile.json と同じ尺度）。高度計・距離標に使う。
 */
import type { L10n } from '../i18n';

export type AlpsBlock =
  | { type: 'text'; body: L10n }
  | { type: 'photo'; key: string; caption: L10n; km?: number; time?: string; wide?: boolean }
  | { type: 'video'; key: string; caption: L10n; km?: number; time?: string }
  | { type: 'marker'; km: number; label: L10n };

export type AlpsDay = {
  slug: string;
  label: L10n;
  date: L10n;
  title: L10n;
  route: L10n;
  /** 旅全体の累積kmでの区間 */
  kmFrom?: number;
  kmTo?: number;
  distance?: number;
  together: boolean;
  cover: string;
  blocks: AlpsBlock[];
};

export const alpsIntro: L10n[] = [
  {
    ja: '大学の部活の後輩が、数年前に会社を辞めた。バイクで世界を一周するためだった。',
    en: 'A few years ago, a friend from my university club quit his job. He wanted to ride a motorcycle around the world.',
  },
  {
    ja: '2026年5月、彼はひとりで日本を発った。境港からフェリーでロシアのウラジオストクへ渡り、そこから西へ。ユーラシア大陸を約27,000km走り続け、5か月後、ドイツに差しかかった。',
    en: 'In May 2026 he left Japan alone, taking the ferry from Sakaiminato to Vladivostok and heading west. He rode some 27,000 km across Eurasia, and five months later he was approaching Germany.',
  },
  {
    ja: 'そのタイミングに合わせて、私は1週間の有給休暇を取り、ミュンヘンへ飛んだ。空港の近くで BMW R 1250 GS の Low 仕様を借り、彼と3日間、アルプスを走った。ドロミテの岩峰、雲の上のステルヴィオ峠。一生忘れることのできない旅になった。',
    en: 'I took a week of paid leave and flew to Munich to meet him. I rented a BMW R 1250 GS (low suspension) near the airport and we rode the Alps together for three days: the rock towers of the Dolomites, the Stelvio Pass above the clouds. It became a trip I will never forget.',
  },
];

export const alpsDays: AlpsDay[] = [
  {
    slug: 'prologue',
    label: { ja: 'PROLOGUE', en: 'PROLOGUE' },
    date: { ja: '9月26日（土）〜27日（日）', en: 'Sat 26 – Sun 27 Sep' },
    title: { ja: 'ミュンヘンで、ふたたび', en: 'Meeting again in Munich' },
    route: { ja: '成田 → ドーハ → ミュンヘン', en: 'Narita → Doha → Munich' },
    together: true,
    cover: 'd0-wiesn-tower',
    blocks: [
      {
        type: 'text',
        body: {
          ja: '土曜の夜22時25分、成田を発つカタール航空に乗った。ドーハで乗り継ぎ、ミュンヘンまでは合わせて約23時間の移動になる。',
          en: 'I boarded a Qatar Airways flight out of Narita at 22:25 on Saturday night. With a connection in Doha, the journey to Munich would take about 23 hours.',
        },
      },
      {
        type: 'photo',
        key: 'd0-doha',
        time: '07:12 AST',
        caption: { ja: '夜明けのドーハ、ハマド国際空港。ここから6時間50分でミュンヘンへ', en: 'Dawn at Hamad International Airport, Doha. Six hours fifty to Munich' },
      },
      {
        type: 'text',
        body: {
          ja: '日曜の午後2時過ぎ、ミュンヘンに着いた。後輩と顔を合わせるのは久しぶりだ。彼は5か月前に日本を出て、ロシアからヨーロッパまで走り続けてきた。その彼と、ドイツの街角で再会している。不思議な気分だった。',
          en: 'I landed in Munich a little after two on Sunday afternoon. It had been a long time since I had seen my friend. He had left Japan five months earlier and ridden all the way from Russia into Europe, and now here we were, meeting again on a German street corner. It felt unreal.',
        },
      },
      {
        type: 'text',
        body: {
          ja: '9月のミュンヘンはオクトーバーフェストのさなかだった。テレージエンヴィーゼの会場は人であふれ、大きなビールテントの中からは楽団の演奏と歓声が聞こえてくる。前夜祭として、ふたりで会場を歩いた。',
          en: 'Munich in late September was in the middle of Oktoberfest. The Theresienwiese was packed, and brass bands and cheering spilled out of the huge beer tents. We spent the evening wandering the grounds: a party on the eve of our ride.',
        },
      },
      {
        type: 'photo',
        key: 'd0-stpaul',
        time: '18:14',
        caption: { ja: '会場のすぐ脇に建つ聖パウロ教会', en: 'St. Paul’s Church, right beside the festival grounds' },
      },
      {
        type: 'video',
        key: 'v0-wiesn-tower',
        time: '19:58',
        caption: { ja: '夜空に回る絶叫マシンの塔', en: 'A swing ride spinning high above the fairground' },
      },
      {
        type: 'text',
        body: {
          ja: '明日の朝、バイクを受け取る。いよいよアルプスだ。',
          en: 'Tomorrow morning I would pick up the bike. The Alps were finally close.',
        },
      },
    ],
  },
  {
    slug: 'day1',
    label: { ja: 'DAY 1', en: 'DAY 1' },
    date: { ja: '9月28日（月）', en: 'Mon 28 Sep' },
    title: { ja: '国境をふたつ越えて', en: 'Across two borders' },
    route: { ja: 'ミュンヘン → ガルミッシュ → インスブルック → ブレンナー峠 → ヴィピテーノ', en: 'Munich → Garmisch → Innsbruck → Brenner Pass → Vipiteno' },
    kmFrom: 0,
    kmTo: 235,
    distance: 235,
    together: true,
    cover: 'd1-karwendel',
    blocks: [
      {
        type: 'text',
        body: {
          ja: '朝9時、空港近くのレンタルバイク店で R 1250 GS を受け取った。Low 仕様でシート高は約800mm。普段乗っている CBR650R E-Clutch とは何もかもが違う。左手のクラッチを握る感覚を確かめるように、駐車場で何度か発進と停止を繰り返した。',
          en: 'At nine in the morning I picked up the R 1250 GS from a rental shop near the airport. The low version puts the seat at about 800 mm, but everything about it was different from my CBR650R E-Clutch at home. I practised pulling away and stopping in the car park a few times, getting used to working a clutch lever again.',
        },
      },
      {
        type: 'photo',
        key: 'd1-gs',
        km: 0,
        time: '11:21',
        caption: { ja: '5日間の相棒、BMW R 1250 GS。奥が後輩のバイク', en: 'My partner for five days, a BMW R 1250 GS. My friend’s bike is behind it' },
      },
      {
        type: 'text',
        body: {
          ja: '後輩のバイクには、ユーラシアを越えてきた荷物が積まれている。その横に、借りたばかりのきれいな GS。並べてみると、旅の長さの違いがよくわかる。アウトバーンを南へ走り、ガルミッシュ・パルテンキルヒェンの手前で最初の給油をした。',
          en: 'His bike was loaded with the luggage that had crossed Eurasia; next to it, my freshly rented and spotless GS. Side by side, the difference in the length of our journeys was obvious. We headed south on the autobahn and stopped for our first fuel before Garmisch-Partenkirchen.',
        },
      },
      {
        type: 'photo',
        key: 'd1-esso',
        km: 95,
        time: '12:56',
        caption: { ja: '最初の給油', en: 'First fuel stop' },
      },
      {
        type: 'photo',
        key: 'd1-two-bikes',
        km: 110,
        time: '14:12',
        caption: { ja: 'カーヴェンデル山群の岩壁の下で', en: 'Below the cliffs of the Karwendel range' },
      },
      {
        type: 'marker',
        km: 115,
        label: { ja: 'オーストリア国境', en: 'Austrian border' },
      },
      {
        type: 'photo',
        key: 'd1-maut',
        km: 115,
        time: '14:21',
        caption: { ja: 'オーストリアに入る。高速道路にはヴィニエット（通行証）が必要', en: 'Into Austria. The motorways here need a vignette' },
      },
      {
        type: 'photo',
        key: 'd1-karwendel',
        km: 120,
        time: '14:29',
        caption: { ja: '牧草地の向こうに、カーヴェンデルの山並み', en: 'The Karwendel peaks beyond the meadows' },
        wide: true,
      },
      {
        type: 'text',
        body: {
          ja: '峠道を下る途中の展望所で、インの谷が一気に開けた。眼下にはインスブルック近郊の街並み、その向こうには3,000m級の山々。ドイツを出て、まだ1時間も経っていない。',
          en: 'At a viewpoint on the way down, the Inn valley suddenly opened up below us: the towns around Innsbruck, and beyond them peaks close to 3,000 m. We had left Germany less than an hour before.',
        },
      },
      {
        type: 'photo',
        key: 'd1-inn-valley',
        km: 140,
        time: '14:55',
        caption: { ja: 'インの谷を見下ろす', en: 'Looking down on the Inn valley' },
        wide: true,
      },
      {
        type: 'photo',
        key: 'd1-viewpoint',
        km: 140,
        time: '14:54',
        caption: { ja: '展望所で小休止', en: 'A short break at the viewpoint' },
      },
      {
        type: 'photo',
        key: 'd1-road',
        km: 175,
        time: '16:34',
        caption: { ja: 'インスブルックの南。谷の向こうにノルトケッテの岩稜', en: 'South of Innsbruck, with the Nordkette ridge across the valley' },
      },
      {
        type: 'text',
        body: {
          ja: 'インスブルックを過ぎると、道はブレンナー峠へ向けて登っていく。ローマ時代からアルプス越えに使われてきた峠だ。標高1,370m。高速道路ではなく旧道を選んだ。',
          en: 'Past Innsbruck the road climbs toward the Brenner Pass, a crossing of the Alps since Roman times, at 1,370 m. We took the old road rather than the motorway.',
        },
      },
      {
        type: 'marker',
        km: 219,
        label: { ja: 'ブレンナー峠 1,370m・イタリア国境', en: 'Brenner Pass 1,370 m · Italian border' },
      },
      {
        type: 'photo',
        key: 'd1-italia',
        km: 219,
        time: '17:11',
        caption: { ja: '峠を越えると、そこはイタリア', en: 'Over the pass, and into Italy' },
      },
      {
        type: 'text',
        body: {
          ja: '朝はドイツ、昼はオーストリア、夕方にはイタリア。ひとつの日のうちに国境をふたつ越えた。ヴィピテーノ（シュテルツィング）の宿に着く頃には、西日が岩山を金色に染めていた。',
          en: 'Germany in the morning, Austria at midday, Italy by evening: two borders in a single day. By the time we reached our hotel in Vipiteno (Sterzing), the late sun was turning the rock walls gold.',
        },
      },
      {
        type: 'photo',
        key: 'd1-vipiteno',
        km: 235,
        time: '17:54',
        caption: { ja: 'ヴィピテーノの宿で。1日目、235km', en: 'At the hotel in Vipiteno. Day 1: 235 km' },
      },
    ],
  },
  {
    slug: 'day2',
    label: { ja: 'DAY 2', en: 'DAY 2' },
    date: { ja: '9月29日（火）', en: 'Tue 29 Sep' },
    title: { ja: 'セラ山群をひと回り', en: 'Once around the Sella' },
    route: { ja: 'ヴァル・ガルデーナ → ガルデナ峠 → カンポロンゴ峠 → ポルドイ峠 → セラ峠 → ボルツァーノ', en: 'Val Gardena → Passo Gardena → Passo Campolongo → Passo Pordoi → Passo Sella → Bolzano' },
    kmFrom: 235,
    kmTo: 416,
    distance: 181,
    together: true,
    cover: 'd2-cir',
    blocks: [
      {
        type: 'text',
        body: {
          ja: '今日はドロミテの日だ。セラ山群という巨大な岩の塊のまわりを、ガルデナ、カンポロンゴ、ポルドイ、セラの4つの峠でぐるりと一周する。「セラロンダ」と呼ばれる、ドロミテで最も有名な周遊路だ。',
          en: 'Today was our day in the Dolomites. The plan was to circle the Sella, a huge block of rock, over four passes: Gardena, Campolongo, Pordoi and Sella. The loop is called the Sella Ronda, the most famous ride in the Dolomites.',
        },
      },
      {
        type: 'photo',
        key: 'd2-ortisei',
        km: 285,
        time: '10:55',
        caption: { ja: 'ヴァル・ガルデーナの谷。正面にドロミテの山並み', en: 'Val Gardena, with the Dolomites ahead' },
      },
      {
        type: 'photo',
        key: 'd2-village',
        km: 290,
        time: '10:57',
        caption: { ja: '壁画の描かれた家並み。看板はイタリア語とドイツ語の二か国語', en: 'Painted houses; the signs are in both Italian and German' },
      },
      {
        type: 'text',
        body: {
          ja: '谷を登るにつれて、サッソルンゴ（ランコーフェル）の岩壁が近づいてくる。雲が山腹にまとわりつき、岩の頂だけが青空に浮かんでいた。駐車場には、同じようにバイクで旅をする人たちが何台も止まっている。',
          en: 'As we climbed the valley, the walls of the Sassolungo (Langkofel) drew closer. Cloud clung to its flanks, leaving only the summit floating in the blue. The car park was full of other motorcycles on the same kind of journey.',
        },
      },
      {
        type: 'photo',
        key: 'd2-sassolungo',
        km: 300,
        time: '11:12',
        caption: { ja: '雲の上に浮かぶサッソルンゴ', en: 'The Sassolungo rising above the cloud' },
        wide: true,
      },
      {
        type: 'photo',
        key: 'd2-sassolungo-gs',
        km: 300,
        time: '11:13',
        caption: { ja: '2台並べて', en: 'Our two bikes' },
      },
      {
        type: 'marker',
        km: 316,
        label: { ja: 'ガルデナ峠 2,121m', en: 'Passo Gardena 2,121 m' },
      },
      {
        type: 'photo',
        key: 'd2-cir',
        km: 316,
        time: '11:40',
        caption: { ja: 'ガルデナ峠から、チル山群の尖った岩峰', en: 'The jagged Cir peaks from Passo Gardena' },
        wide: true,
      },
      {
        type: 'text',
        body: {
          ja: 'ガルデナ峠の山小屋のテラスでコーヒーを飲んだ。テーブルの向こうに、ドロミテの山々がどこまでも続いている。後輩はこの5か月、こういう景色を毎日見てきたのだろうか。',
          en: 'We had coffee on the terrace of a hut at Passo Gardena, the Dolomites stretching on and on beyond the table. I wondered whether he had been seeing views like this every day for the past five months.',
        },
      },
      {
        type: 'photo',
        key: 'd2-coffee',
        km: 317,
        time: '11:54',
        caption: { ja: '峠のテラスで一杯', en: 'A coffee on the terrace at the pass' },
      },
      {
        type: 'photo',
        key: 'd2-sassongher',
        km: 322,
        time: '12:47',
        caption: { ja: 'コルヴァーラの上にそびえるサッソンゲル', en: 'The Sassongher towering over Corvara' },
      },
      {
        type: 'marker',
        km: 333,
        label: { ja: 'カンポロンゴ峠 1,875m', en: 'Passo Campolongo 1,875 m' },
      },
      {
        type: 'photo',
        key: 'd2-gs-pass',
        km: 345,
        time: '13:15',
        caption: { ja: '峠道の途中で。谷の奥まで山が重なる', en: 'Partway up a pass, ridges layered into the distance' },
      },
      {
        type: 'marker',
        km: 350,
        label: { ja: 'ポルドイ峠 2,239m', en: 'Passo Pordoi 2,239 m' },
      },
      {
        type: 'photo',
        key: 'd2-valley',
        km: 352,
        time: '13:26',
        caption: { ja: '草原が金色に変わりはじめていた', en: 'The high meadows were starting to turn gold' },
        wide: true,
      },
      {
        type: 'text',
        body: {
          ja: 'ヘアピンカーブを抜けるたびに景色が変わる。午後2時前、4つ目のセラ峠に着いた。標高2,244m。ここでセラ山群をひと回りしたことになる。',
          en: 'Every hairpin brought a new view. Just before two in the afternoon we reached the fourth pass, Passo Sella, at 2,244 m. With that, we had gone all the way around the Sella massif.',
        },
      },
      {
        type: 'marker',
        km: 362,
        label: { ja: 'セラ峠 2,244m', en: 'Passo Sella 2,244 m' },
      },
      {
        type: 'photo',
        key: 'd2-sella',
        km: 362,
        time: '13:53',
        caption: { ja: 'セラ峠から見下ろす谷', en: 'The valley below Passo Sella' },
        wide: true,
      },
      {
        type: 'photo',
        key: 'd2-gs-close',
        km: 395,
        time: '15:04',
        caption: { ja: 'ボルツァーノへ向けて山を下る', en: 'Heading down toward Bolzano' },
      },
      {
        type: 'text',
        body: {
          ja: '夕方、南チロルの中心都市ボルツァーノに着いた。標高は262m。峠の上とは2,000m近い差がある。夕食はグーラッシュとクネーデル。イタリアにいながら、料理はオーストリアの味がする。',
          en: 'In the evening we reached Bolzano, the main town of South Tyrol, at just 262 m, almost 2,000 m below the passes. Dinner was goulash with dumplings: we were in Italy, but the food tasted of Austria.',
        },
      },
      {
        type: 'photo',
        key: 'd2-dinner',
        km: 416,
        time: '17:54',
        caption: { ja: 'グーラッシュとクネーデル', en: 'Goulash with dumplings' },
      },
    ],
  },
  {
    slug: 'day3',
    label: { ja: 'DAY 3', en: 'DAY 3' },
    date: { ja: '9月30日（水）', en: 'Wed 30 Sep' },
    title: { ja: '雲の上の峠、ステルヴィオ', en: 'The Stelvio, above the clouds' },
    route: { ja: 'ボルツァーノ → メラーノ → ステルヴィオ峠 → ボルミオ → フォスカーニョ峠 → リヴィーニョ', en: 'Bolzano → Merano → Stelvio Pass → Bormio → Passo di Foscagno → Livigno' },
    kmFrom: 416,
    kmTo: 577,
    distance: 167,
    together: true,
    cover: 'd3-switchbacks',
    blocks: [
      {
        type: 'text',
        body: {
          ja: 'この旅でいちばん楽しみにしていた日だ。ステルヴィオ峠。標高2,758m、イタリアで最も高いところを通る車道の峠で、東側に48、西側に40のヘアピンカーブが刻まれている。東のプラートから登り、西のボルミオへ下る。両側を走りきるのが今日の目標だった。',
          en: 'This was the day I had looked forward to most: the Stelvio Pass. At 2,758 m it is the highest paved pass in Italy, with 48 hairpins on the east side and 40 on the west. The plan was to climb from Prato in the east and descend to Bormio in the west, riding both sides.',
        },
      },
      {
        type: 'text',
        body: {
          ja: 'メラーノを抜けてプラートから峠道に入ると、カーブの一つひとつに番号の標識が立っている。48、47、46……。数字が小さくなるほど、空気が冷たくなっていく。',
          en: 'Past Merano, the pass road starts at Prato, and every hairpin has a numbered sign: 48, 47, 46… The smaller the numbers, the colder the air.',
        },
      },
      {
        type: 'photo',
        key: 'd3-weisser-knott',
        km: 497,
        time: '12:59',
        caption: { ja: 'トラフォイ側の中腹、標高1,875mの展望レストラン', en: 'A viewpoint restaurant at 1,875 m on the Trafoi side' },
      },
      {
        type: 'photo',
        key: 'd3-trafoi',
        km: 500,
        time: '13:11',
        caption: { ja: '振り返ると、登ってきた谷', en: 'Looking back down the valley we climbed' },
      },
      {
        type: 'marker',
        km: 523,
        label: { ja: 'ステルヴィオ峠 2,758m', en: 'Stelvio Pass 2,758 m' },
      },
      {
        type: 'text',
        body: {
          ja: '午後1時40分、峠の頂上に着いた。ヨーロッパ中から集まったバイクが並び、売店の壁はステッカーで埋め尽くされている。ここで昼食にピザを食べてから、峠の脇の丘を歩いて登った。',
          en: 'We reached the top at 1:40 in the afternoon. Motorcycles from all over Europe lined the road, and the walls of the kiosks were covered in stickers. After a pizza lunch we walked up the hill beside the pass.',
        },
      },
      {
        type: 'photo',
        key: 'd3-clouds',
        km: 523,
        time: '15:09',
        caption: { ja: '雲海の上の頂。遠くに氷河をまとった山々', en: 'A summit above a sea of cloud, glaciated peaks beyond' },
        wide: true,
      },
      {
        type: 'text',
        body: {
          ja: '丘の上に立つと、足もとから雲の海が広がっていた。登ってきた東側の谷は雲の下に沈み、その向こうに氷河をかぶった山々が並んでいる。風は冷たく、指先がかじかんだ。',
          en: 'From the top of the hill a sea of cloud spread out at our feet. The eastern valley we had climbed was buried beneath it, and beyond rose a line of glaciated peaks. The wind was cold enough to numb my fingers.',
        },
      },
      {
        type: 'photo',
        key: 'd3-tower',
        km: 523,
        time: '15:09',
        caption: { ja: '峠の上に残る石造りの建物', en: 'An old stone building on the ridge above the pass' },
      },
      {
        type: 'photo',
        key: 'd3-statue',
        km: 523,
        time: '15:09',
        caption: { ja: '尾根に立つ鉄の人影', en: 'An iron figure standing on the ridge' },
      },
      {
        type: 'text',
        body: {
          ja: '反対側をのぞき込んで、息をのんだ。ボルミオへ下る西側の道が、山の斜面いっぱいに折り重なっている。写真でしか見たことのなかった景色が、目の前にあった。',
          en: 'Then I looked over the other side and caught my breath. The western road down to Bormio was folded back and forth across the whole mountainside. A view I had only ever seen in photographs was right in front of me.',
        },
      },
      {
        type: 'photo',
        key: 'd3-switchbacks',
        km: 524,
        time: '15:21',
        caption: { ja: 'ボルミオ側の九十九折。この道をこれから下る', en: 'The Bormio-side hairpins: the road we were about to ride down' },
        wide: true,
      },
      {
        type: 'photo',
        key: 'd3-bormio-bikes',
        km: 535,
        time: '16:17',
        caption: { ja: '西側の中腹で。滝の横をヘアピンが登っていく', en: 'Halfway down the west side; the hairpins climb beside a waterfall' },
      },
      {
        type: 'text',
        body: {
          ja: '下りは後輩が前を走った。トンネルとギャラリーをいくつも抜け、カーブを描くたびに彼のバイクが小さく見え隠れする。27,000kmを走ってきた背中を追いかけるのは、なんだか誇らしかった。',
          en: 'On the way down my friend rode ahead. Through tunnel after tunnel and gallery after gallery, his bike kept slipping in and out of view at each bend. Following the back of a man who had ridden 27,000 km made me strangely proud.',
        },
      },
      {
        type: 'video',
        key: 'v3-descent',
        km: 540,
        time: '16:30',
        caption: { ja: 'ボルミオへの下り。先を行くのが後輩', en: 'The descent to Bormio, my friend in front' },
      },
      {
        type: 'text',
        body: {
          ja: 'ボルミオからもうひとつ、フォスカーニョ峠（2,291m）を越える。峠の上には税関があり、その先は免税の町リヴィーニョだ。夕方の光の中、黄色いセンターラインがまっすぐ谷へ伸びていた。',
          en: 'From Bormio we crossed one more pass, the Foscagno at 2,291 m. There is a customs post at the top, and beyond it lies the duty-free town of Livigno. In the evening light, the yellow centre line ran straight down into the valley.',
        },
      },
      {
        type: 'video',
        key: 'v3-foscagno',
        km: 560,
        time: '17:06',
        caption: { ja: 'フォスカーニョ峠への道', en: 'The road to Passo di Foscagno' },
      },
      {
        type: 'marker',
        km: 566,
        label: { ja: 'フォスカーニョ峠 2,291m', en: 'Passo di Foscagno 2,291 m' },
      },
      {
        type: 'photo',
        key: 'd3-foscagno2',
        km: 566,
        time: '17:14',
        caption: { ja: '峠の上は霧に包まれていた', en: 'Mist hanging over the top of the pass' },
      },
      {
        type: 'text',
        body: {
          ja: 'リヴィーニョに着いたのは夕方6時前。木造の建物が並ぶ、標高1,816mの山あいの町だ。ここが、ふたりで泊まる最後の夜になる。',
          en: 'We reached Livigno just before six: a mountain town of wooden buildings at 1,816 m. This would be our last night together.',
        },
      },
      {
        type: 'photo',
        key: 'd3-livigno',
        km: 577,
        time: '17:49',
        caption: { ja: 'リヴィーニョの通り', en: 'A street in Livigno' },
      },
    ],
  },
  {
    slug: 'day4',
    label: { ja: 'DAY 4', en: 'DAY 4' },
    date: { ja: '10月1日（木）', en: 'Thu 1 Oct' },
    title: { ja: 'ひとりになって', en: 'On my own' },
    route: { ja: 'リヴィーニョ → ムント・ラ・シェラトンネル → エンガディン → ナウダース → フェルン峠 → フュッセン', en: 'Livigno → Munt la Schera Tunnel → Engadin → Nauders → Fern Pass → Füssen' },
    kmFrom: 577,
    kmTo: 789,
    distance: 211,
    together: false,
    cover: 'd4-coop',
    blocks: [
      {
        type: 'text',
        body: {
          ja: '朝、リヴィーニョのスーパーの前で、後輩と別れた。彼はこれからも旅を続ける。私は2日後に日本へ帰る。特別な言葉は交わさなかった。いつものように「気をつけて」と言って、それぞれのバイクにまたがった。',
          en: 'In the morning I said goodbye to my friend outside a supermarket in Livigno. He would keep travelling; I would fly home in two days. We did not say anything special. Just the usual “take care”, and then each of us got on our own bike.',
        },
      },
      {
        type: 'photo',
        key: 'd4-coop',
        km: 577,
        time: '10:38',
        caption: { ja: '別れの朝。手前が、ユーラシアを越えてきた後輩のバイク', en: 'The morning we parted. In front, my friend’s bike, which had crossed Eurasia' },
      },
      {
        type: 'text',
        body: {
          ja: 'ひとりで走りはじめると、ミラーの中に誰もいないことがやけに気になった。リヴィーニョ湖に沿って北へ走り、ムント・ラ・シェラトンネルに入る。全長3.4km、1車線を信号で交互に通す細いトンネルで、抜けた先はスイスだ。',
          en: 'Once I was riding alone, I kept noticing that there was no one in my mirrors. I followed Lago di Livigno north into the Munt la Schera Tunnel, 3.4 km long and only one lane wide, with traffic lights taking turns in each direction. On the far side was Switzerland.',
        },
      },
      {
        type: 'photo',
        key: 'd4-lake',
        km: 585,
        time: '11:11',
        caption: { ja: 'リヴィーニョ湖に沿って', en: 'Along Lago di Livigno' },
        wide: true,
      },
      {
        type: 'marker',
        km: 590,
        label: { ja: 'スイス国境', en: 'Swiss border' },
      },
      {
        type: 'text',
        body: {
          ja: 'エンガディンの谷を下り、ふたたびオーストリアへ。岩壁の下の道で、工事渋滞にはまった。前の車の列がなかなか進まない。昨日までなら、後輩と顔を見合わせて笑っていたところだ。',
          en: 'Down the Engadin valley and back into Austria. On a road beneath a cliff I got stuck in roadworks traffic, the line of cars barely moving. Until yesterday, my friend and I would have just exchanged a look and laughed.',
        },
      },
      {
        type: 'photo',
        key: 'd4-queue',
        km: 660,
        time: '13:06',
        caption: { ja: '岩壁の下で渋滞', en: 'Stuck in traffic below the cliffs' },
      },
      {
        type: 'marker',
        km: 746,
        label: { ja: 'フェルン峠 1,212m', en: 'Fern Pass 1,212 m' },
      },
      {
        type: 'photo',
        key: 'd4-fernpass',
        km: 745,
        time: '15:26',
        caption: { ja: 'フェルン峠付近。木々が色づきはじめていた', en: 'Near the Fern Pass, where the trees were starting to turn' },
        wide: true,
      },
      {
        type: 'text',
        body: {
          ja: 'チロルの古い街道、フェルン峠を越えると、ドイツはもうすぐだ。夕方、フュッセンの町に入った。宿に荷物を置いてから、ランニングシューズに履き替えて走りに出た。',
          en: 'Over the Fern Pass, an old road through the Tyrol, Germany was close. I rode into Füssen in the late afternoon, dropped my bags at the hotel, changed into running shoes and went out for a run.',
        },
      },
      {
        type: 'photo',
        key: 'd4-fuessen-lake',
        km: 789,
        time: '17:50',
        caption: { ja: 'フュッセン近くの湖', en: 'A lake near Füssen' },
        wide: true,
      },
      {
        type: 'photo',
        key: 'd4-cows',
        km: 789,
        time: '18:07',
        caption: { ja: '放牧の牛がこちらを見ていた', en: 'Grazing cows watching me go by' },
      },
      {
        type: 'text',
        body: {
          ja: '湖のほとりを走りながら、この3日間のことを思い返した。後輩は今ごろ、どのあたりを走っているのだろう。',
          en: 'Running along the lake shore, I thought back over the last three days. I wondered where he was riding by now.',
        },
      },
    ],
  },
  {
    slug: 'day5',
    label: { ja: 'DAY 5', en: 'DAY 5' },
    date: { ja: '10月2日（金）', en: 'Fri 2 Oct' },
    title: { ja: '白鳥の城から、最後の宿へ', en: 'From the swan castle to the last inn' },
    route: { ja: 'フュッセン → ノイシュヴァンシュタイン城 → ミュンヘン', en: 'Füssen → Neuschwanstein Castle → Munich' },
    kmFrom: 789,
    kmTo: 957,
    distance: 164,
    together: false,
    cover: 'd5-neuschwanstein',
    blocks: [
      {
        type: 'text',
        body: {
          ja: '最終日。午前中はノイシュヴァンシュタイン城へ。宿から城の麓までは6kmほどしかない。麓から城までは、森の中の坂道を歩いて登った。',
          en: 'The last day. In the morning I went to Neuschwanstein Castle, only about 6 km from the hotel, and walked up the forest road from the village below.',
        },
      },
      {
        type: 'photo',
        key: 'd5-mushrooms',
        km: 793,
        time: '11:55',
        caption: { ja: '城への坂道の脇に、きのこが群れていた', en: 'Mushrooms clustered beside the path up to the castle' },
      },
      {
        type: 'photo',
        key: 'd5-neuschwanstein',
        km: 794,
        time: '12:08',
        caption: { ja: 'ノイシュヴァンシュタイン城', en: 'Neuschwanstein Castle' },
      },
      {
        type: 'text',
        body: {
          ja: '曇り空の下、白い塔が森の上に浮かんでいた。ここまで来れば、あとはミュンヘンへ戻るだけだ。アウトバーンを北東へ走り、空港近くの最後の宿に着いた。',
          en: 'Under a grey sky, the white towers floated above the forest. From here there was nothing left but the ride back to Munich. I headed north-east on the autobahn and arrived at the last inn, near the airport.',
        },
      },
      {
        type: 'photo',
        key: 'd5-last-inn',
        km: 950,
        time: '15:04',
        caption: { ja: '最後の宿に着いた GS', en: 'The GS at the last inn' },
      },
      {
        type: 'marker',
        km: 957,
        label: { ja: 'ゴール：約958km', en: 'Finish: about 958 km' },
      },
      {
        type: 'text',
        body: {
          ja: '5日間で約958km。ドイツ、オーストリア、イタリア、スイスの4か国を走り、8つの峠を越えた。そのうち3日間は、ユーラシア大陸を横断してきた後輩と一緒だった。',
          en: 'About 958 km in five days, through Germany, Austria, Italy and Switzerland and over eight passes, three of those days alongside a friend who had crossed the entire Eurasian continent.',
        },
      },
      {
        type: 'text',
        body: {
          ja: '彼の世界一周は、まだ続く。私の旅は、明日の朝の飛行機で終わる。でも、ステルヴィオの九十九折を下っていく彼の背中は、きっとこの先もずっと覚えているだろう。',
          en: 'His journey around the world goes on. Mine ends with a flight tomorrow morning. But I think I will always remember the sight of him riding away down the hairpins of the Stelvio.',
        },
      },
    ],
  },
];
