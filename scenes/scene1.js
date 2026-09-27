/* SAHNE 1 — METRE VE METREKARE (0–10 s)  One metre, then one square metre.
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg, lerp } = LI.E;
  const KD = LI.KD, F = () => LI.Film, A = LI.Ang, Ink = LI.Ink;
  const END = (t) => 1 - seg(t, 90.4, 91.4);

  function win(t, a, b, fi = 0.4, fo = 0.4) { return seg(t, a, a + fi) * (1 - seg(t, b - fo, b)); }
  function exprs(ctx, t, P, list, sz) {
    const f = F();
    list.forEach(([a, b, items, hot]) => {
      const al = win(t, a, b); if (al <= 0) return;
      f.expr(ctx, typeof items === 'string' ? [items] : items, P.x, P.y, sz ?? P.s, { alpha: al, w: P.w, halo: true, color: hot ? A.amber : undefined });
    });
  }
  const at = (P, k, y) => ({ x: P.x, y: y ?? P.y[k], s: P.s, w: P.w });
  const amber = (a) => `rgba(${LI.AMBER_RGB},${a})`;

  function context(ctx, env, t) {
    exprs(ctx, t, KD.L(env).CX, [
      [4.4, 10.2, 'Bir metre ve bir metrekare'],
      [10.6, 27.8, 'Uzunluk birimlerini gözlemleyelim'],
      [28.4, 45.8, 'Metrekarenin içine desimetrekareler'],
      [46.4, 63.8, 'Aynı akıl yürütme: bir adım daha'],
      [64.4, 79.8, 'Çıkarımı kullanalım'],
    ]);
  }

  function metre(ctx, env, t) {
    const L = KD.L(env), G = L.G, f = F(), a = END(t) * (1 - seg(t, 79.8, 80.4)); if (a <= 0) return;
    const x0 = G.x, y0 = G.y, S = G.S, yb = y0 + S;
    // the filled rows of square decimetres
    const rows = seg(t, 33.4, 37.4) * 10;
    if (rows > 0) { ctx.fillStyle = amber(0.2 * a); const r = Math.floor(rows), fr = rows - r; ctx.fillRect(x0, yb - S * r / 10, S, S * r / 10); if (fr > 0) ctx.fillRect(x0, yb - S * (r + 1) / 10, S * fr, S / 10); }
    else { ctx.fillStyle = amber(0.1 * seg(t, 7.8, 8.6) * a); ctx.fillRect(x0, y0, S, S); }
    // the metre stick (bottom edge), then the rest of the square
    Ink.path(ctx, [[x0, yb], [x0 + S, yb]], { w: 9, p: seg(t, 4.6, 6.0), alpha: a, seed: 2001, taper: [0.05, 0.05] });
    const k = seg(t, 6.8, 8.4);
    if (k > 0) [[[x0 + S, yb], [x0 + S, y0]], [[x0 + S, y0], [x0, y0]], [[x0, y0], [x0, yb]]].forEach(([p, q], i) => { const kk = seg(k, i / 3, (i + 1) / 3); if (kk > 0) Ink.path(ctx, [p, q], { w: 7, p: kk, alpha: a, seed: 2002 + i, taper: [0.05, 0.05], wob: 0.2 }); });
    const dm = seg(t, 29.4, 29.9);
    f.T(ctx, dm > 0.5 ? '1 m = 10 dm' : '1 m', x0 + S / 2, yb + 38, { size: G.s * 0.8, alpha: seg(t, 6.0, 6.4) * a });
    f.T(ctx, dm > 0.5 ? '10 dm' : '1 m', x0 - 50, y0 + S / 2, { size: G.s * 0.8, alpha: seg(t, 8.4, 8.8) * a, align: 'right' });
    f.T(ctx, '1 m²', x0 + S / 2, y0 + S / 2, Object.assign({ size: G.s * 1.4, alpha: win(t, 8.6, 28.6) * a, halo: true }, f.AMB));
    // decimetre ticks on the stick, then the whole grid
    const tk = seg(t, 11.0, 12.6) * (1 - seg(t, 29.0, 29.6));
    for (let i = 1; i < 10; i++) { const p = seg(tk, (i - 1) / 9, i / 9); if (p > 0) Ink.path(ctx, [[x0 + S * i / 10, yb - 16], [x0 + S * i / 10, yb + 2]], { w: 3.5, p, alpha: a, seed: 2010 + i, taper: [0, 0] }); }
    const dl = win(t, 12.8, 28.0) * a;
    if (dl > 0) { Ink.path(ctx, [[x0, yb + 14], [x0 + S / 10, yb + 14]], { w: 5, alpha: dl, color: LI.AMBER_RGB, seed: 2020, taper: [0, 0] }); f.T(ctx, '1 dm', x0 + S / 20, yb + 78, Object.assign({ size: G.s * 0.62, alpha: dl }, f.AMB)); }
    f.grid(ctx, x0, y0, S, 10, seg(t, 29.0, 31.0), seg(t, 31.0, 33.0), a, 2030);
    if (rows > 0) f.T(ctx, `${Math.min(10, Math.ceil(rows))} × 10 = ${Math.min(10, Math.ceil(rows)) * 10}`, x0 + S / 2, y0 - 34, Object.assign({ size: G.s * 0.75, alpha: win(t, 33.4, 45.8) * a, halo: true }, f.AMB));
    // the tile that gets magnified
    const tile = win(t, 46.6, 55.4) * a;
    if (tile > 0) {
      const tx = x0 + S * 0.9, ty = y0 + S * 0.9, Z = L.Z;
      ctx.fillStyle = amber(0.55 * tile); ctx.fillRect(tx, ty, S / 10, S / 10);
      const m = seg(t, 47.0, 47.6) * tile;
      [[[tx + S / 10, ty], [Z.x, Z.y]], [[tx + S / 10, ty + S / 10], [Z.x, Z.y + Z.S]]].forEach(([p, q], i) => Ink.path(ctx, [p, q], { w: 2.5, p: seg(t, 47.0, 47.6), alpha: m * 0.45, seed: 2050 + i, taper: [0, 0] }));
      ctx.fillStyle = amber(0.12 * seg(t, 47.4, 48.4) * tile); ctx.fillRect(Z.x, Z.y, Z.S, Z.S);
      f.square(ctx, Z.x, Z.y, Z.S, seg(t, 47.4, 48.4), tile, 2060, 6);
      f.grid(ctx, Z.x, Z.y, Z.S, 10, seg(t, 48.6, 49.8), seg(t, 49.8, 51.0), tile, 2070, 2);
      f.T(ctx, '1 dm² = 100 cm²', Z.x + Z.S / 2, Z.y - 34, Object.assign({ size: G.s * 0.8, alpha: seg(t, 51.0, 51.4) * tile, halo: true }, f.AMB));
      f.T(ctx, '10 cm', Z.x + Z.S / 2, Z.y + Z.S + 36, { size: G.s * 0.7, alpha: seg(t, 48.4, 48.8) * tile });
      ctx.fillStyle = amber(0.6 * seg(t, 51.4, 51.8) * tile); ctx.fillRect(Z.x, Z.y + Z.S * 0.9, Z.S / 10, Z.S / 10);
      f.T(ctx, '1 cm²', Z.x + Z.S * 0.05, Z.y + Z.S + 34, Object.assign({ size: G.s * 0.62, alpha: seg(t, 51.4, 51.8) * tile }, f.AMB));
    }
  }

  function ladders(ctx, env, t) {
    const L = KD.L(env), D = L.LD, f = F();
    const la = (win(t, 15.0, 45.8) + win(t, 55.8, 79.8)) * END(t);
    const kl = t < 50 ? [15.0, 16.0, 17.0, 18.0].map((s) => seg(t, s, s + 0.6)) : [56.0, 56.3, 56.6, 56.9].map((s) => seg(t, s, s + 0.4));
    f.ladder(ctx, D.x[0], D.y, ['m', 'dm', 'cm', 'mm'], '× 10', kl, la, { s: D.s, head: 'Uzunluk', seed: 0 });
    const aa = win(t, 57.4, 79.8) * END(t);
    f.ladder(ctx, D.x[1], D.y, ['m²', 'dm²', 'cm²', 'mm²'], '× 100', [57.6, 58.4, 59.2, 60.0].map((s) => seg(t, s, s + 0.6)), aa, { s: D.s, head: 'Alan', seed: 50 });
  }

  function words(ctx, env, t) {
    const W = KD.L(env).W;
    exprs(ctx, t, at(W, 0), [[11.4, 27.8, '1 m = 10 dm'], [29.4, 45.8, 'Kenar 10 dm: her sırada 10 kare'],
      [47.4, 55.4, '1 dm = 10 cm'], [56.2, 63.8, 'Uzunlukta her basamak × 10'],
      [65.0, 79.8, '3 m² = 3 × 100 = 300 dm²']]);
    exprs(ctx, t, at(W, 1), [[18.6, 27.8, '1 dm = 10 cm, 1 cm = 10 mm'], [34.0, 45.8, '10 sıra × 10 kare = 100 dm²'],
      [50.0, 55.4, '1 dm² = 10 × 10 = 100 cm²', true], [57.8, 63.8, 'Alanda her basamak 10 × 10 = 100 kat', true],
      [68.6, 79.8, '2 500 cm² = 2 500 ÷ 100 = 25 dm²']]);
    exprs(ctx, t, at(W, 2), [[21.0, 27.8, 'Her basamakta 10 kat', true], [38.4, 45.8, '1 m² = 100 dm²', true],
      [60.4, 63.8, '1 cm² = 100 mm²'], [72.4, 79.8, '1 km = 1 000 m ise 1 km² = 1 000 × 1 000 = 1 000 000 m²', true]]);
  }

  function summary(ctx, env, t) {
    if (t < 80.4) return;
    const S = KD.L(env).SUM, f = F(), a = END(t);
    [['Uzunluk birimleri: her basamak 10 kat', 80.6], ['Alan birimleri: her basamak 100 kat', 81.6], ['Çünkü 1 m² = 10 dm × 10 dm = 100 dm²', 82.6], ['Kenar 10 kat, alan 100 kat!', 83.6, true]].forEach(([s, t0, hot], i) => {
      const al = seg(t, t0, t0 + 0.4) * a; if (al <= 0) return;
      f.expr(ctx, [s], S.x, S.y[i], S.s * (i === 3 ? 1.15 : 1), { alpha: al, w: S.w, halo: true, color: hot ? A.amber : undefined });
    });
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4);
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { context(ctx, env, t); metre(ctx, env, t); ladders(ctx, env, t); words(ctx, env, t); summary(ctx, env, t); };
  void lerp;

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'A metre and a square metre', nameTr: 'Metre ve metrekare', concept: '1 m and 1 m²', conceptTr: '1 m ve 1 m²', render });
})(window.LI = window.LI || {});
