"use client";
import { useRef, useState } from "react";

// サンプル購入希望者データ
const buyerData: Record<string, Array<{
  price: number;
  reason: string;
  family: string;
  timing: string;
  payment: string;
  job: string;
}>> = {
  "ザ・パークハウス中之島タワー": [
    { price: 9200, reason: "投資", family: "カップル", timing: "即時", payment: "現金", job: "経営者" },
    { price: 8950, reason: "住み替え", family: "夫婦+子ども1人", timing: "3ヶ月後", payment: "ローン", job: "会社員" },
    { price: 9100, reason: "転勤", family: "夫婦", timing: "6ヶ月後", payment: "現金", job: "会社員" }
  ],
  "プラウドタワー大阪本町": [
    { price: 6550, reason: "結婚", family: "夫婦", timing: "1ヶ月後", payment: "ローン", job: "会社員" },
    { price: 6380, reason: "投資", family: "単身", timing: "即時", payment: "現金", job: "自営業" },
    { price: 6490, reason: "住み替え", family: "夫婦", timing: "3ヶ月後", payment: "ローン", job: "会社員" }
  ],
  "ブランズタワー大阪本町": [
    { price: 7800, reason: "住み替え", family: "夫婦+子ども2人", timing: "6ヶ月後", payment: "ローン", job: "会社員" },
    { price: 7650, reason: "投資", family: "単身", timing: "即時", payment: "現金", job: "経営者" }
  ]
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [modalMansion, setModalMansion] = useState<string | null>(null);
  const [navOpen, setNavOpen] = useState(false); // ハンバーガーメニュー用
  const searchResultsRef = useRef<HTMLDivElement>(null);

  // 検索ボックスの動作
  const handleSearch = () => {
    setShowResults(true);
    setTimeout(() => {
      searchResultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
  const handleRegionSearch = (region: string) => {
    setSearchTerm(region);
    setShowResults(true);
    setTimeout(() => {
      searchResultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // モーダル制御
  const openBuyerModal = (mansion: string) => setModalMansion(mansion);
  const closeBuyerModal = () => setModalMansion(null);

  // 検索結果（現状は大阪市の物件のみ）
  const mansionCards = [
    {
      name: "ザ・パークハウス中之島タワー",
      area: "大阪市北区中之島",
      type: "3LDK / 85.5㎡",
      hope: 8,
      price: 8800,
      color: "from-red-400 to-red-600"
    },
    {
      name: "プラウドタワー大阪本町",
      area: "大阪市中央区本町",
      type: "2LDK / 65.8㎡",
      hope: 12,
      price: 6200,
      color: "from-blue-400 to-blue-600"
    },
    {
      name: "ブランズタワー大阪本町",
      area: "大阪市中央区本町",
      type: "3LDK / 78.9㎡",
      hope: 6,
      price: 7500,
      color: "from-green-400 to-green-600"
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className="header-nav-bg hero-pattern text-white shadow-2xl relative">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between relative">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-urico-red">U</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">URICO（ウリコ）</h1>
              <p className="text-red-100 text-sm">関西全域246市区町村対応</p>
            </div>
          </div>
          {/* PCナビゲーション */}
          <nav className="header-nav-pc hidden md:flex space-x-6">
            <a href="#search" className="header-nav-link flex items-center">
              <i className="fas fa-search mr-2"></i>検索
            </a>
            <a href="#about" className="header-nav-link flex items-center">
              <i className="fas fa-info-circle mr-2"></i>サービス
            </a>
            <a href="#regions" className="header-nav-link flex items-center">
              <i className="fas fa-map mr-2"></i>対応エリア
            </a>
          </nav>
          {/* ハンバーガーメニュー */}
          <div className="hamburger md:hidden" onClick={() => setNavOpen(!navOpen)}>
            <span style={{ transform: navOpen ? "rotate(45deg) translateY(10px)" : "none" }}></span>
            <span style={{ opacity: navOpen ? 0 : 1 }}></span>
            <span style={{ transform: navOpen ? "rotate(-45deg) translateY(-10px)" : "none" }}></span>
          </div>
          {/* モバイルナビゲーション */}
          {navOpen && (
            <nav className="header-nav-mobile md:hidden absolute left-0 top-full w-full">
              <a href="#search" className="header-nav-link" onClick={() => setNavOpen(false)}>
                <i className="fas fa-search mr-2"></i>検索
              </a>
              <a href="#about" className="header-nav-link" onClick={() => setNavOpen(false)}>
                <i className="fas fa-info-circle mr-2"></i>サービス
              </a>
              <a href="#regions" className="header-nav-link" onClick={() => setNavOpen(false)}>
                <i className="fas fa-map mr-2"></i>対応エリア
              </a>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="urico-red-light py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            関西のマンション売却なら<br />
            <span className="text-urico-red">購入希望者と直接マッチング</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            一括査定サイトとは違う新しいアプローチ。<br />
            関西全域246市区町村であなたのマンションを探している購入希望者が見つかります。
          </p>

          {/* Search Box */}
          <div className="max-w-3xl mx-auto mb-16" id="search">
            <div className="search-card rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">マンション検索</h3>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSearch()}
                  placeholder="マンション名、地域名、駅名を入力..."
                  className="w-full px-6 py-4 text-lg border-2 urico-red-border rounded-full focus:outline-none focus:ring-4 focus:ring-red-200 transition-all"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-2 urico-red hover-urico-red text-white px-8 py-2 rounded-full transition-all transform hover:scale-105"
                >
                  <i className="fas fa-search mr-2"></i>検索
                </button>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {[
                  "大阪市",
                  "京都市",
                  "神戸市",
                  "奈良市",
                  "大津市"
                ].map(region => (
                  <button
                    key={region}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm transition-colors"
                    onClick={() => handleRegionSearch(region)}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="feature-icon w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-users text-3xl text-urico-red"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">直接マッチング</h3>
              <p className="text-gray-600">購入希望者の詳細条件を事前に確認。営業電話なしでスムーズな取引が可能です。</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="feature-icon w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-yen-sign text-3xl text-urico-red"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">希望価格明示</h3>
              <p className="text-gray-600">購入希望者の予算が事前に分かるため、効率的な価格交渉が実現できます。</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="feature-icon w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-map-marked-alt text-3xl text-urico-red"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">関西全域対応</h3>
              <p className="text-gray-600">大阪、京都、兵庫、奈良、滋賀、和歌山の全246市区町村で対応中です。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mansion Listings */}
      <section className="py-20" id="regions">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">人気エリア・物件一覧</h2>

          {/* Search Results */}
          <div
            id="searchResults"
            ref={searchResultsRef}
            className={showResults ? "mb-16" : "hidden"}
          >
            <h3 className="text-3xl font-bold mb-8 text-gray-800">検索結果</h3>
            <div id="searchResultsContainer" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="col-span-3 text-center text-gray-500 py-8">
                検索機能は開発中です。現在は大阪市の物件のみ表示しています。
              </div>
            </div>
          </div>

          {/* Featured Regions: 大阪市 */}
          <div className="space-y-16">
            <div className="region-section" data-region="大阪市">
              <h3 className="text-3xl font-bold mb-8 text-gray-800 border-b-4 urico-red-border pb-4">
                <i className="fas fa-building text-urico-red mr-3"></i>大阪市
                <span className="text-lg text-gray-500 ml-4">(購入希望者登録数: 1,250組)</span>
              </h3>
              <div className="mansion-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mansionCards.map(card => (
                  <div
                    key={card.name}
                    className="mansion-card bg-white rounded-xl shadow-lg overflow-hidden"
                    data-mansion={card.name}
                  >
                    <div className={`h-48 bg-gradient-to-br ${card.color} flex items-center justify-center text-white text-xl font-bold`}>
                      {card.name}
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold mb-2">{card.name}</h4>
                      <p className="text-gray-600 mb-4"><i className="fas fa-map-marker-alt mr-2"></i>{card.area}</p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-bold">{card.type}</span>
                        <span className="bg-red-100 text-urico-red px-3 py-1 rounded-full text-sm font-bold">希望者: {card.hope}組</span>
                      </div>
                      <div className="mb-4">
                        <span className="text-2xl font-bold text-urico-red">{card.price.toLocaleString()}万円〜</span>
                        <span className="text-gray-500 text-sm ml-2">希望価格</span>
                      </div>
                      <button
                        onClick={() => openBuyerModal(card.name)}
                        className="w-full urico-red hover-urico-red text-white py-3 rounded-lg transition-all transform hover:scale-105"
                      >
                        購入希望者を見る
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-lg transition-colors">
                  <i className="fas fa-plus mr-2"></i>大阪市の物件をもっと見る
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white" id="about">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">URICOが選ばれる理由</h2>
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <h3 className="text-3xl font-bold mb-8 text-gray-800">従来の一括査定サイトとの違い</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 bg-red-50 rounded-xl">
                  <i className="fas fa-times-circle text-red-500 text-2xl mt-1"></i>
                  <div>
                    <p className="font-bold text-gray-700 mb-2">一括査定サイトの問題点</p>
                    <p className="text-gray-600">査定金額は高いがマッチングが困難。営業電話の嵐で実際の売却に至らないケースが85%以上。</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-6 bg-green-50 rounded-xl">
                  <i className="fas fa-check-circle text-green-500 text-2xl mt-1"></i>
                  <div>
                    <p className="font-bold text-gray-700 mb-2">URICOの解決策</p>
                    <p className="text-gray-600">事前に購入希望者が登録済み。具体的な購入条件が明確で、直接マッチングで成約率78%を実現。</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-40 h-40 feature-icon rounded-full mb-8">
                <i className="fas fa-handshake text-6xl text-urico-red"></i>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-6">直接マッチングで効率的売却</h4>
              <p className="text-gray-600 text-lg">購入希望者の詳細条件を事前に確認できるため、無駄な時間を省いて効率的な売却が実現できます。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="gradient-bg hero-pattern text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">対応エリア - 関西全域246市区町村</h3>
            <p className="text-red-100 text-lg">以下の全エリアでサービスを提供しています</p>
          </div>

          {/* 大阪府 */}
          <div className="mb-8">
            <h4 className="text-xl font-bold mb-4 border-b border-red-300 pb-2">大阪府（73市区町村）</h4>
            <div className="mb-4">
              <h5 className="font-semibold text-red-200 mb-2">大阪市（24区）</h5>
              <p className="text-sm">大阪市北区、大阪市都島区、大阪市福島区、大阪市此花区、大阪市西区、大阪市港区、大阪市大正区、大阪市天王寺区、大阪市浪速区、大阪市西淀川区、大阪市東淀川区、大阪市東成区、大阪市生野区、大阪市旭区、大阪市城東区、大阪市阿倍野区、大阪市住吉区、大阪市東住吉区、大阪市西成区、大阪市淀川区、大阪市鶴見区、大阪市住之江区、大阪市平野区、大阪市中央区</p>
            </div>
            <div className="mb-4">
              <h5 className="font-semibold text-red-200 mb-2">堺市（7区）</h5>
              <p className="text-sm">堺市堺区、堺市中区、堺市東区、堺市西区、堺市南区、堺市北区、堺市美原区</p>
            </div>
            <div className="mb-4">
              <h5 className="font-semibold text-red-200 mb-2">その他市町村（42）</h5>
              <p className="text-sm">能勢町、豊能町、池田市、箕面市、豊中市、茨木市、高槻市、島本町、吹田市、摂津市、枚方市、交野市、寝屋川市、守口市、門真市、四條畷市、大東市、東大阪市、八尾市、柏原市、和泉市、高石市、泉大津市、忠岡町、岸和田市、貝塚市、熊取町、泉佐野市、田尻町、泉南市、阪南市、岬町、松原市、羽曳野市、藤井寺市、太子町、河南町、千早赤阪村、富田林市、大阪狭山市、河内長野市</p>
            </div>
          </div>

          {/* 京都府 */}
          <div className="mb-8">
            <h4 className="text-xl font-bold mb-4 border-b border-red-300 pb-2">京都府（36市区町村）</h4>
            <div className="mb-4">
              <h5 className="font-semibold text-red-200 mb-2">京都市（11区）</h5>
              <p className="text-sm">京都市北区、京都市上京区、京都市左京区、京都市中京区、京都市東山区、京都市下京区、京都市南区、京都市右京区、京都市伏見区、京都市山科区、京都市西京区</p>
            </div>
            <div className="mb-4">
              <h5 className="font-semibold text-red-200 mb-2">その他市町村（25）</h5>
              <p className="text-sm">福知山市、舞鶴市、綾部市、宇治市、宮津市、亀岡市、城陽市、向日市、長岡京市、八幡市、京田辺市、京丹後市、南丹市、木津川市、乙訓郡大山崎町、久世郡久御山町、綴喜郡井手町、綴喜郡宇治田原町、相楽郡笠置町、相楽郡和束町、相楽郡精華町、相楽郡南山城村、船井郡京丹波町、与謝郡伊根町、与謝郡与謝野町</p>
            </div>
          </div>

          {/* 兵庫県 */}
          <div className="mb-8">
            <h4 className="text-xl font-bold mb-4 border-b border-red-300 pb-2">兵庫県（49市区町村）</h4>
            <div className="mb-4">
              <h5 className="font-semibold text-red-200 mb-2">神戸市（9区）</h5>
              <p className="text-sm">神戸市東灘区、神戸市灘区、神戸市兵庫区、神戸市長田区、神戸市須磨区、神戸市垂水区、神戸市北区、神戸市中央区、神戸市西区</p>
            </div>
            <div className="mb-4">
              <h5 className="font-semibold text-red-200 mb-2">その他市町村（40）</h5>
              <p className="text-sm">姫路市、尼崎市、明石市、西宮市、洲本市、芦屋市、伊丹市、相生市、豊岡市、加古川市、赤穂市、西脇市、宝塚市、三木市、高砂市、川西市、小野市、三田市、加西市、丹波篠山市、養父市、丹波市、南あわじ市、朝来市、淡路市、宍粟市、加東市、たつの市、川辺郡猪名川町、多可郡多可町、加古郡稲美町、加古郡播磨町、神崎郡市川町、神崎郡福崎町、神崎郡神河町、揖保郡太子町、赤穂郡上郡町、佐用郡佐用町、美方郡香美町、美方郡新温泉町</p>
            </div>
          </div>

          {/* 奈良県 */}
          <div className="mb-8">
            <h4 className="text-xl font-bold mb-4 border-b border-red-300 pb-2">奈良県（39市町村）</h4>
            <p className="text-sm">奈良市、大和高田市、大和郡山市、天理市、橿原市、桜井市、五條市、御所市、生駒市、香芝市、葛城市、宇陀市、山辺郡山添村、生駒郡平群町、生駒郡三郷町、生駒郡斑鳩町、生駒郡安堵町、磯城郡川西町、磯城郡三宅町、磯城郡田原本町、宇陀郡曽爾村、宇陀郡御杖村、高市郡高取町、高市郡明日香村、北葛城郡上牧町、北葛城郡王寺町、北葛城郡広陵町、北葛城郡河合町、吉野郡吉野町、吉野郡大淀町、吉野郡下市町、吉野郡黒滝村、吉野郡天川村、吉野郡野迫川村、吉野郡十津川村、吉野郡下北山村、吉野郡上北山村、吉野郡川上村、吉野郡東吉野村</p>
          </div>

          {/* 滋賀県 */}
          <div className="mb-8">
            <h4 className="text-xl font-bold mb-4 border-b border-red-300 pb-2">滋賀県（19市町村）</h4>
            <p className="text-sm">大津市、彦根市、長浜市、近江八幡市、草津市、守山市、栗東市、甲賀市、野洲市、湖南市、高島市、東近江市、米原市、蒲生郡日野町、蒲生郡竜王町、愛知郡愛荘町、犬上郡豊郷町、犬上郡甲良町、犬上郡多賀町</p>
          </div>

          {/* 和歌山県 */}
          <div className="mb-8">
            <h4 className="text-xl font-bold mb-4 border-b border-red-300 pb-2">和歌山県（30市町村）</h4>
            <p className="text-sm">和歌山市、海南市、橋本市、有田市、御坊市、田辺市、新宮市、紀の川市、岩出市、海草郡紀美野町、伊都郡かつらぎ町、伊都郡九度山町、伊都郡高野町、有田郡湯浅町、有田郡広川町、有田郡有田川町、日高郡美浜町、日高郡日高町、日高郡由良町、日高郡印南町、日高郡みなべ町、日高郡日高川町、西牟婁郡白浜町、西牟婁郡上富田町、西牟婁郡すさみ町、東牟婁郡那智勝浦町、東牟婁郡太地町、東牟婁郡古座川町、東牟婁郡北山村、東牟婁郡串本町</p>
          </div>

          <div className="text-center pt-12 border-t border-red-300">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-urico-red">U</span>
              </div>
              <h4 className="text-2xl font-bold">URICO（ウリコ）</h4>
            </div>
            <p className="text-red-100 mb-4">&copy; 2025 URICO. All rights reserved.</p>
            <p className="text-red-200 text-lg font-semibold">関西全域246市区町村対応のマンション売却マッチングサービス</p>
          </div>
        </div>
      </footer>

      {/* Buyer Details Modal */}
      {modalMansion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={closeBuyerModal}>
          <div
            className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-8 relative"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800">{modalMansion} の購入希望者情報</h3>
              <button onClick={closeBuyerModal} className="text-gray-500 hover:text-gray-700 text-3xl">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="space-y-6">
              {(buyerData[modalMansion] || []).length === 0 ? (
                <p className="text-center text-gray-500 py-8">現在、購入希望者情報を準備中です。</p>
              ) : (
                buyerData[modalMansion]?.map((buyer, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border border-red-100">
                    <div className="flex justify-between items-start mb-6">
                      <h4 className="text-xl font-bold text-gray-800">購入希望者 {idx + 1}</h4>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-urico-red">{buyer.price}万円</span>
                        <p className="text-sm text-gray-500">希望価格</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-white rounded-lg">
                        <i className="fas fa-heart text-red-500 text-2xl mb-2"></i>
                        <p className="text-sm text-gray-600">購入理由</p>
                        <p className="font-semibold">{buyer.reason}</p>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg">
                        <i className="fas fa-users text-blue-500 text-2xl mb-2"></i>
                        <p className="text-sm text-gray-600">家族構成</p>
                        <p className="font-semibold">{buyer.family}</p>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg">
                        <i className="fas fa-calendar text-green-500 text-2xl mb-2"></i>
                        <p className="text-sm text-gray-600">希望時期</p>
                        <p className="font-semibold">{buyer.timing}</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-4 bg-white rounded-lg">
                        <i className="fas fa-credit-card text-purple-500 text-2xl mb-2"></i>
                        <p className="text-sm text-gray-600">購入方法</p>
                        <p className="font-semibold">{buyer.payment}</p>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg">
                        <i className="fas fa-briefcase text-orange-500 text-2xl mb-2"></i>
                        <p className="text-sm text-gray-600">職業</p>
                        <p className="font-semibold">{buyer.job}</p>
                      </div>
                    </div>
                    <button className="w-full urico-red hover-urico-red text-white py-3 rounded-lg transition-all transform hover:scale-105 text-lg font-semibold">
                      <i className="fas fa-envelope mr-2"></i>この希望者に連絡する
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
