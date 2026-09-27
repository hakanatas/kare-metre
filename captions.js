/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 6. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 4.4, end: 10.2, tr: '1 metre ve 1 metrekare', en: 'One metre and one square metre',
      note: 'Bu çubuk 1 metre. Kenarları 1 metre olan bir kare çizelim: onun alanı 1 metrekare, kısaca 1 m².' },
    { scene: 2, start: 10.8, end: 18.4, tr: '1 metre = 10 desimetre', en: 'One metre is ten decimetres',
      note: 'Önce uzunluk birimlerini gözlemleyelim. 1 metre, 10 eşit parçaya ayrılır: her parça 1 desimetre. 1 m = 10 dm.' },
    { scene: 2, start: 18.8, end: 27.8, tr: 'Uzunlukta her basamak 10 kat', en: 'Each length step is ten times',
      note: '1 desimetre 10 santimetre, 1 santimetre 10 milimetre. Uzunluk birimlerinde her basamak bir öncekinin 10 katı.' },
    { scene: 3, start: 28.6, end: 37.4, tr: 'Her sırada 10, toplam 10 sıra', en: 'Ten in a row, ten rows',
      note: 'Metrekarenin kenarları 10 desimetre. İçini 1 desimetrekarelik karelere bölelim: her sırada 10 kare var, 10 da sıra var.' },
    { scene: 3, start: 37.8, end: 45.8, tr: '1 m² = 100 dm²', en: 'One square metre is 100 square decimetres',
      note: '10 sıra çarpı 10 kare, 100 kare. Demek ki 1 metrekare 100 desimetrekaredir. Kenar 10 kat, alan 100 kat!' },
    { scene: 4, start: 46.6, end: 55.4, tr: '1 dm² = 10 × 10 = 100 cm²', en: '1 dm² = 10 × 10 = 100 cm²',
      note: 'Aynı akıl yürütmeyi bir basamak aşağıda deneyelim. 1 desimetre 10 santimetre; öyleyse 1 desimetrekarenin içine 10 çarpı 10, yani 100 santimetrekare sığar.' },
    { scene: 4, start: 55.8, end: 63.8, tr: 'Uzunlukta × 10, alanda × 100', en: 'Length × 10, area × 100',
      note: 'İki merdiveni yan yana koyalım. Uzunluk birimlerinde her basamak 10 kat, alan birimlerinde her basamak 10 çarpı 10, 100 kat. 1 cm² de 100 mm²dir.' },
    { scene: 5, start: 64.6, end: 72.0, tr: '3 m² = 300 dm² · 2500 cm² = 25 dm²', en: '3 m² = 300 dm² · 2500 cm² = 25 dm²',
      note: 'Kullanalım: 3 metrekare, 3 çarpı 100, 300 desimetrekare. 2500 santimetrekare ise 2500 bölü 100, 25 desimetrekare.' },
    { scene: 5, start: 72.4, end: 79.8, tr: '1 km² = 1 000 000 m²', en: '1 km² = 1,000,000 m²',
      note: 'Aynı fikir büyük birimlerde de çalışır: 1 kilometre 1000 metre ise 1 kilometrekare 1000 çarpı 1000, yani 1 milyon metrekaredir.' },
    { scene: 6, start: 80.6, end: 86.4, tr: 'Uzunlukta 10 kat, alanda 100 kat', en: 'Ten times in length, 100 times in area',
      note: 'Aklında kalsın: uzunluk birimleri 10’ar 10’ar, alan birimleri 100’er 100’er büyür. Çünkü alan, kenar çarpı kenardır.' },
    { scene: 6, start: 86.8, end: 91.0, tr: 'Kenar 10 kat, alan 100 kat!', en: 'Side × 10, area × 100!',
      note: 'Kenar 10 kat olunca alan 100 kat olur!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
