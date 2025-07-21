"use client";
import { useState } from "react";

const BRAND_RED = "#dc2626";
const BRAND_RED_DARK = "#b91c1c";
const BRAND_PINK = "#fca5a5";
const BRAND_PINK_LIGHT = "#fecaca";
const DUMMY_IMAGE = "/noimage.png";

const mansionDataOsaka = [
  {
    name: "ザ・パークハウス中之島タワー",
    area: "大阪市北区中之島",
    type: "3LDK / 85.5㎡",
    age: 5,
    walk: 3,
    fee: "月1.5万円",
    hope: 8,
    price: 8800,
    image: DUMMY_IMAGE,
    buyers: [
      { income: "1000万～", family: "カップル", reason: "投資", timing: "即時", payment: "現金", job: "経営者" }
    ]
  },
  // ...他物件
];

const buyerDatabase = {
  "ザ・パークハウス中之島タワー": [
    { name: "田中様", price: "9,200万円", family: "夫婦+子ども2人", reason: "転勤", timing: "3ヶ月以内", job: "商社勤務", payment: "ローン", ng: "ペット飼育歴" },
    // ...他希望者
  ],
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [osakaShowCount, setOsakaShowCount] = useState(6);
  const [modalProperty, setModalProperty] = useState<string | null>(null);

  function filterMansions(list: any[]) {
    if (!searchTerm) return list;
    return list.filter(m =>
      m.name.includes(searchTerm) ||
      m.area.includes(searchTerm)
    );
  }

  return (
    <div className="bg-gray-50 font-sans">
      {/* ヘッダー */}
      <header
        style={{
          background: `linear-gradient(135deg, ${BRAND_RED} 0%, ${BRAND_RED_DARK} 100%)`,
          color: "white",
          padding: "24px 0",
          boxShadow: "0 4px 24px rgba(220,38,38,0.08)"
        }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <div style={{
              width: 48, height: 48, background: "white", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <span style={{ color: BRAND_RED, fontSize: "2rem", fontWeight: "bold" }}>U</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">URICO（ウリコ）</h1>
              <p style={{ color: BRAND_PINK, fontSize: "0.9rem" }}>関西全域246市区町村対応</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-8 font-medium">
            <a href="#search" style={{ color: "white" }} className="hover:text-[#fca5a5] transition">検索</a>
            <a href="#about" style={{ color: "white" }} className="hover:text-[#fca5a5] transition">サービス</a>
            <a href="#regions" style={{ color: "white" }} className="hover:text-[#fca5a5] transition">対応エリア</a>
          </nav>
        </div>
      </header>
      {/* ...（以下、チャットで提示した通りのヒーロー・検索・物件カード・モーダル・もっと見る・フッターを全て反映）... */}
    </div>
  );
}
